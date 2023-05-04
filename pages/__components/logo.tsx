import Image from "next/image";
import AltoLogo from "../../images/clef_alto.svg";
import styles from "../../styles/Commons.module.css";

type LogoProps = {
  size?: number;
  className?: string;
};

export default function Logo({ size = 50, className }: LogoProps) {
  return (
    <div>
      <div className={`${styles.logo} ${className}`}>
        <Image
          width={size}
          className={styles.icon}
          height={size}
          src={AltoLogo}
          alt="AltoLogo"
        />
        <p className={styles.text}>StaffShare</p>
      </div>
    </div>
  );
}
