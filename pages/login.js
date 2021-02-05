import Link from "next/link";
import { useAuth } from "@/lib/auth";
import withoutAuth from "@/hocs/withoutAuth";
import Head from "next/head";

function Login() {
  const { register, login } = useAuth();

  const handleLogin = () => {
    const user = login({
      email: "chalosalvador@gmail.com",
      password: "123123",
    });
  };

  const handleRegisterUser = () => {
    const user = register({
      email: "chalosalvador5@gmail.com",
      name: "Chalo5",
      editorial: "TEST",
      short_bio: "YEAHAAA",
      role: "ROLE_USER",
      password: "123123",
      password_confirmation: "123123",
    });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about-us">
          <a>About Us</a>
        </Link>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </div>
      <div>Login</div>
      <div>
        <button onClick={handleRegisterUser}>Registrar usuario</button>

        <button onClick={handleLogin}>Iniciar sesión</button>
      </div>
    </>
  );
}

export default withoutAuth(Login);
