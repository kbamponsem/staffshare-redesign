import styles from "../styles/Commons.module.css";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Button from "./__components/button";
import { FcGoogle } from "react-icons/fc";
import { SiMusescore } from "react-icons/si";

// Or section which contains alternative login for Google and MuseScore
export const AlternativeLogin = () => {
    const router = useRouter();
    return (
      <>
        <div className={styles.alternativeLogin}>
          <div className={styles.alternativeLoginButtons}>
            <Button
              onClick={async () => {
                await signIn("google", { callbackUrl: '/dashboard', redirect: false });
              }}
            >
              <FcGoogle size={20} className={styles.icon} />
              <div>Google</div>
            </Button>
            <Button inactive>
              <SiMusescore size={20} className={styles.icon} />
              <div>MuseScore</div>
            </Button>
          </div>
        </div>
      </>
    );
  };
  