import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getAllArticles, getArticle } from "@/lib/db";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";

export default function Home({ articles }) {
  const { register, login } = useAuth();

  useEffect(() => {
    const getAll = async () => {
      await getAllArticles();
    };
    getAll();

    const getArticleDetails = async () => {
      await getArticle();
    };
    getArticleDetails();
  });
  const handleRegisterUser = () => {
    const user = register({
      email: "chalosalvador@gmail.com",
      name: "Chalo",
      editorial: "TEST",
      short_bio: "YEAHAAA",
      role: "ROLE_USER",
      password: "123123",
      password_confirmation: "123123",
    });
  };

  const handleLogin = () => {
    const user = login({
      email: "chalosalvador@gmail.com",
      password: "123123",
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <button onClick={handleRegisterUser}>Registrar usuario</button>
        <button onClick={handleLogin}>Iniciar sesión</button>

        <ul>
          {articles.map((article) => (
            <li key={article.id}>{article.title}</li>
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

export async function getStaticProps(context) {
  const articles = await getAllArticles();

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
