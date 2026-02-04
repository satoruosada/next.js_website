import { notFound } from 'next/navigation';
import { getCategoryDetail, getNewsList } from '@/app/_libs/microcms';
import NewsList from '@/app/_components/NewsList';
import Pagination from '@/app/_components/Pagination';
import { NEWS_LIST_LIMIT } from '@/app/_constants';

type Props = {
    params: Promise<{
        id: string;
        current: string;
    }>;
};

export default async function Page({ params }: Props) {
    const { id, current } = await params;
    const page = parseInt(current, 10);

    if (Number.isNaN(page) || page < 1) {
        notFound();
    }

    let category;
    try {
        category = await getCategoryDetail(id);
    } catch {
        notFound();
    }

    const { contents: news, totalCount } = await getNewsList({
        filters: `category[equals]${category.id}`,
        limit: NEWS_LIST_LIMIT,
        offset: NEWS_LIST_LIMIT * (page - 1),
    });

    if (news.length === 0) {
        notFound();
    }

    return (
        <>
            <NewsList news={news} />
            <Pagination
                totalCount={totalCount}
                current={page}
                basePath={`/news/category/${category.id}`}
            />
        </>
    );
}
