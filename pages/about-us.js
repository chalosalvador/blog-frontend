import Link from "next/link";

export default function AboutUs() {
  return (
    <>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about-us">
        <a>About Us</a>
      </Link>
      <Link href="/login">
        <a>Login</a>
      </Link>

      <div>AboutUs</div>
    </>
  );
}
