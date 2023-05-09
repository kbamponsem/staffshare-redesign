import { useEffect, useState } from "react";
import styles from "../../styles/Commons.module.css";
import { IconType } from "react-icons";
type InputProps = {
  type: string;
  placeholder: string;
  required?: boolean;
  title?: string;
  props?: any;
  value?: string | undefined;
  noTitle?: boolean;
  setValue?: (e: any) => void;
  icon?: IconType | null;
  className?: string;
  wrapperStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
};

export default function Input({
  type,
  title = undefined,
  required = false,
  placeholder,
  value,
  setValue,
  icon = null,
  props,
  wrapperStyle,
  inputStyle,
  className,
}: InputProps) {
  const [requiredValue, setRequiredValue] = useState(required);

  useEffect(() => {
    setRequiredValue(required);
  }, [required]);

  return (
    <div style={wrapperStyle} className={styles.inputWrapper}>
      {title && (
        <div className={styles.inputTitle}>
          {title}
          {requiredValue && <span className={styles.inputRequired}>*</span>}
        </div>
      )}
      <div className={styles.inputWithIcon}>
        {icon && <div className={styles.inputIcon}>{icon({})}</div>}
        <input
          style={inputStyle}
          value={value}
          onChange={setValue}
          className={`${styles.input} ${icon ? styles.shifted : ""}`}
          type={type}
          placeholder={placeholder}
          {...props}
        />
      </div>
    </div>
  );
}
