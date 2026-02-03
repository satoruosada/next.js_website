import Image from 'next/image';
import Link from 'next/link';

import styles from './index.module.css';
import Category from '../Category';
import Date from '../Date';
import { News } from '@/app/_libs/microcms';

type Props = {
    news: News[];
};

export default function NewsList({ news }: Props) {
    if (news.length === 0) {
        return <p>記事がありません。</p>;
    }
    return (
        <ul>
            {news.map((article) => (
                <li key={article.id} className={styles.list}>
                    <Link href={`/news/${article.id}`} className={styles.link}>
                    {article.thumbnail ? (
                      <Image
                        src={article.thumbnail.url}
                        alt=""
                        className={styles.image}
                        width={article.thumbnail.width}
                        height={article.thumbnail.height}
                      />
                    ) : (
                      <Image
                        className={styles.image}
                        src="/no-image.png"
                        alt="No Image"
                        width={1200}
                        height={630}
                      />
                    )}
                    <div className={styles.content}>
                        <h3 className={styles.title}>{article.title}</h3>
                        <div className={styles.meta}>
                            <Category category={article.category} />
                            <Date date={article.publishedAt ?? article.createdAt} />
                        </div>
                    </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
