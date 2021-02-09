import Head from "next/head";
import Link from "next/link";

import { useAuth } from "../lib/auth";
import withAuth from "../hocs/withAuth";
import { getAllArticles } from "../lib/db";

import styles from "../styles/Home.module.css";

export default withAuth(function HomePage({ articles }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio</title>
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>Welcome to Next.js!</h2>

        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <Link href={`/articles/${article.id}`}>
                <a>{article.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img
            src="/logo-menta.png"
            alt="Vercel Logo"
            className={styles.logo}
          />
        </a>
      </footer>
    </div>
  );
});

export async function getStaticProps() {
  const res = await getAllArticles();
  const articles = res.data;
  if (!articles) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      articles,
    }, // will be passed to the page component as props
  };
}
