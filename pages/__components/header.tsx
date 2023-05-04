import Link from "next/link";
import styles from "../../styles/Home.module.css";
import Logo from "./logo";
export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <Logo />
        <Links />
      </header>
    </>
  );
}

const Links = () => {
  return (
    <>
      <div className={styles.links}>
        <Link className={styles.innerLink} href="/login">
          Login
        </Link>
        <Link href="/register" className={`${styles.innerLink} ${styles.register}`}>
          Register
        </Link>
      </div>
    </>
  );
};
