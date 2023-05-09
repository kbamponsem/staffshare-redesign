import Image from "next/image";
import AltoLogo from "../../images/clef_alto.svg";
import styles from "../../styles/Commons.module.css";

type LogoProps = {
  size?: number;
  textSize?: number;
  className?: string;
  mobileShowText?: boolean;
};

export default function Logo({
  size = 50,
  className,
  mobileShowText = true,
  textSize = 25,
}: LogoProps) {
  return (
    <div className={className}>
      <div className={`${styles.logo}`}>
        <Image
          width={size}
          className={styles.icon}
          height={size}
          src={AltoLogo}
          alt="AltoLogo"
        />
        <p
          style={{ fontSize: textSize }}
          className={`${styles.text}  ${
            mobileShowText ? "" : "mobile__deactivate"
          }`}
        >
          StaffShare
        </p>
      </div>
    </div>
  );
}
