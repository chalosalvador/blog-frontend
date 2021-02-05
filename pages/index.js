import { useEffect } from "react";
import Head from "next/head";
import Cookies from "universal-cookie";

import { useAuth } from "@/lib/auth";
import withAuth from "@/hocs/withAuth";
import { getAllArticles } from "@/lib/db";

import styles from "../styles/Home.module.css";
import Link from "next/link";

function Home({ articles }) {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
      </Head>

      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about-us">
        <a>About Us</a>
      </Link>
      <Link href="/login">
        <a>Login</a>
      </Link>

      <main className={styles.main}>
        {user ? <h1>Hola {user.name}</h1> : null}

        <h2 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h2>

        <button onClick={handleLogout}>Cerrar sesión</button>

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
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

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

export default withAuth(Home);
