import { useEffect, useState } from "react";
import styles from "../../styles/Commons.module.css";
type InputProps = {
  type: string;
  placeholder: string;
  required?: boolean;
  title: string;
  props?: any;
  value?: string;
  setValue?: (e: any) => void;
};

export default function Input({
  type,
  title,
  required = false,
  placeholder,
  value,
  setValue,
  props,
}: InputProps) {
  const [requiredValue, setRequiredValue] = useState(required);

  useEffect(() => {
    setRequiredValue(required);
  }, [required]);

  return (
    <>
      <div className={styles.inputWrapper}>
        <div className={styles.inputTitle}>
          {title}
          {requiredValue && <span className={styles.inputRequired}>*</span>}
        </div>
        <div>
          <input
            value={value}
            onChange={setValue}
            className={styles.input}
            type={type}
            placeholder={placeholder}
            {...props}
          />
        </div>
      </div>
    </>
  );
}
