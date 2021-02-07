/**
 * Created by chalosalvador on 5/2/21
 */
import { useRouter } from "next/router";

import withAuth from "../../hocs/withAuth";
import { getAllArticles, getArticle } from "../../lib/db";

const ArticleDetails = ({ article }) => {
  const router = useRouter();
  const { articleId } = router.query;

  return (
    <div>
      <div>Article {articleId}</div>
      <div>{article.title}</div>
    </div>
  );
};

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const response = await getAllArticles();
  const articles = response.data;

  // Get the paths we want to pre-render based on posts
  const paths = articles.map((article) => ({
    params: { articleId: "" + article.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { articleId } = context.params;
  const article = await getArticle(articleId);

  console.log("article", article);

  if (!article) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article,
    }, // will be passed to the page component as props
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    // revalidate: 1, // In seconds
  };
}

// export default withAuth(ArticleDetails);
export default ArticleDetails;
