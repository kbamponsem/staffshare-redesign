import { signOut, useSession } from "next-auth/react";
import Button from "./__components/button";
import styles from "../styles/Dashboard.module.css";

export default function MainSection() {
  const session = useSession();
  return (
    <div className={styles.mainSection}>
      <div>{JSON.stringify(session)}</div>
      <Button
        onClick={() => {
          signOut({ callbackUrl: "/login" });
        }}
      >
        Logout
      </Button>
    </div>
  );
}
