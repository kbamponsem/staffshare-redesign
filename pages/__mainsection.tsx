import { signOut, useSession } from "next-auth/react";
import Button from "./__components/button";
import styles from "../styles/Dashboard.module.css";

export default function MainSection({
  children,
}: {
  children: React.ReactNode | string;
}) {
  const {data} = useSession();
  return (
    <div className={styles.mainSection}>
      <div className={styles.leftPane}>
        <p>{JSON.stringify(data?.user?.email)}</p>
      </div>
      <div className={styles.bodySection}>{children}</div>
    </div>
  );
}
