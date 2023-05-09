import styles from "../../styles/FormContainer.module.css";
import Prompt from "./prompt";

type FormContainerProps = {
  children: React.ReactNode;
  title: string;
  onSubmit?: () => void;
  onClick?: () => void;
  showPrompt: boolean;
  setShowPrompt: (show: boolean) => void;
  promptType: "success" | "error" | "warning";
  promptMessage: string;
  noSubtitle?: boolean;
};

export default function FormContainer({
  children,
  title,
  onSubmit,
  showPrompt,
  setShowPrompt,
  promptType,
  promptMessage,
  noSubtitle,
  onClick,
}: FormContainerProps) {
  return (
    <>
      <form
        onClick={onClick}
        onSubmit={(e) => {
          e.preventDefault();
          if (onSubmit) onSubmit();
        }}
        className={styles.container}
      >
        <h1 className={styles.title}>{title}</h1>
        {noSubtitle ? null : (
          <div className={styles.subtitle}>
            <p>
              StaffShare helps you connect and have access to the latest sheet
              music ranging from choral, classical, jazz, and many others.
            </p>
            <br />
            <p>
              Join today and have access to the millions of sheets on our
              platform.
            </p>
            <br />
          </div>
        )}
        <Prompt
          show={showPrompt}
          setShow={setShowPrompt}
          type={promptType}
          message={promptMessage}
        />
        {children}
      </form>
    </>
  );
}
