import Link from "next/link";
import styles from "../../styles/Commons.module.css";
import { RiLoader4Fill } from "react-icons/ri";
import { IconType } from "react-icons";

type ButtonProps = {
  children: React.ReactNode | string;
  onClick?: () => void;
  bgColor?: string;
  className?: string;
  loading?: boolean;
  inactive?: boolean;
  icon?: IconType;
  iconSize?: number;
  style?: React.CSSProperties;
  noMargin?: boolean;
};
export default function Button({
  children,
  onClick,
  bgColor,
  className = "",
  loading = false,
  icon,
  iconSize = 20,
  style,
  noMargin = false,
}: ButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (onClick && !loading) onClick();
      }}
      className={`${styles.button} ${className} ${loading ? styles.loading : ""
        }} ${noMargin ? styles.noMargin : ""}`}
      style={{ backgroundColor: bgColor, ...style }}
    >
      {loading
        ? null
        : icon
          ? icon({ className: styles.icon, size: iconSize })
          : null}
      {loading ? (
        <RiLoader4Fill size={22} className={styles.spinner} />
      ) : (
        children
      )}
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
