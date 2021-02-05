/**
 * Created by chalosalvador on 5/2/21
 */

import { getAllArticles } from "@/lib/db";
import Link from "next/link";

const Articles = ({ articles }) => {
  return (
    <div>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`/articles/${article.id}`}>
              <a>{article.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps(context) {
  const response = await getAllArticles();
  const articles = response.data;

  return {
    props: {
      articles,
    }, // will be passed to the page component as props
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    // revalidate: 1, // In seconds
  };
}

export default Articles;
