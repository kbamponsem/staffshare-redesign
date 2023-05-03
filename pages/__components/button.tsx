import Link from "next/link";
import styles from "../../styles/Commons.module.css";
import { FcGoogle } from "react-icons/fc";
import { SiMusescore } from "react-icons/si";

type ButtonProps = {
  children: React.ReactNode | string;
  onClick?: () => void;
};
export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }}
      className={styles.button}
    >
      {children}
    </button>
  );
}

type HeadLinerProps = {
  children: React.ReactNode | string;
};
const HeadLiner = ({ children }: HeadLinerProps) => {
  return (
    <>
      <div className={styles.headLiner}>
        <div className={styles.sider}></div>
        {children}
        <div className={styles.sider}></div>
      </div>
    </>
  );
};

// Or section which contains alternative login for Google and MuseScore
export const AlternativeLogin = () => {
  return (
    <>
      <div className={styles.alternativeLogin}>
        <HeadLiner> Or Continue With </HeadLiner>
        <div className={styles.alternativeLoginButtons}>
          <Button>
            <FcGoogle size={20} className={styles.icon} />
            <div>Google</div>
          </Button>
          <Button>
            <SiMusescore size={20} className={styles.icon} />
            <div>MuseScore</div>
          </Button>
        </div>
      </div>
    </>
  );
};

type AlreadyProps = {
  children: React.ReactNode | string;
  to: string;
  linkText: string;
};
export const Already = ({ children, to, linkText }: AlreadyProps) => {
  return (
    <div className={styles.already}>
      {children}
      <Link className={styles.link} href={to}>
        {linkText}
      </Link>
    </div>
  );
};
