import { useEffect } from "react";
import styles from "../../styles/Commons.module.css";
type PromptProps = {
  message: string;
  type: "success" | "error" | "warning";
  show: boolean;
  setShow: (show: boolean) => void;
};
export default function Prompt({ message, type, show, setShow }: PromptProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return show ? (
    <>
      <div className={`${styles.prompt} ${styles[type]}`}>
        <div className={styles.promptMessageText}>{message}</div>
      </div>
    </>
  ) : null;
}
