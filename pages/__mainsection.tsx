import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Button from "./__components/button";
import styles from "../styles/Dashboard.module.css";
import Logo from "./__components/logo";
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarRightCollapseFilled } from 'react-icons/tb'

export default function MainSection({
  children,
}: {
  children: React.ReactNode | string;
}) {
  const { data } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const collapse = () => {
    setCollapsed(!collapsed);
  }
  return (
    <div className={styles.mainSection}>
      <div className={collapsed ? styles.collapsedLeftPane : styles.leftPane}>
        <div className={styles.leftPaneHeader}>
        </div>

        <div className={styles.leftPaneFooter}>
          {!collapsed && <div className={styles.collapseText}>
            Collapse
          </div>}
          {
            collapsed ?
              <TbLayoutSidebarRightCollapseFilled onClick={collapse} className={styles.btn} size={25} />
              :
              <TbLayoutSidebarLeftCollapseFilled onClick={collapse} className={styles.btn} size={25} />
          }
        </div>
      </div>
      <div className={styles.bodySection}>{children}</div>
    </div >
  );
}
