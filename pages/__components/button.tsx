import Link from "next/link";
import styles from "../../styles/Commons.module.css";
import { FcGoogle } from "react-icons/fc";
import { SiMusescore } from "react-icons/si";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { VscLoading } from "react-icons/vsc";

type ButtonProps = {
  children: React.ReactNode | string;
  onClick?: () => void;
  bgColor?: string;
  className?: string;
  loading?: boolean;
  inactive?: boolean;
};
export default function Button({
  children,
  onClick,
  bgColor,
  className,
  loading = false,
}: ButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (onClick && !loading) onClick();
      }}
      className={`${styles.button} ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {loading ? <VscLoading className={styles.spinner} /> : children}
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
  const router = useRouter();
  return (
    <>
      <div className={styles.alternativeLogin}>
        <HeadLiner> Or Continue With </HeadLiner>
        <div className={styles.alternativeLoginButtons}>
          <Button
            onClick={async () => {
              await signIn("google", { callbackUrl: "/dashboard" });
            }}
          >
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
