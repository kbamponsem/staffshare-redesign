import { useEffect, useState } from "react";
import {
  Session,
  removeSession,
  setSession as localSetSession,
} from "./__shared/services";
import Button from "./__components/button";
import { signOut, useSession } from "next-auth/react";
import { getSession as localGetSession } from "./__shared/services";
import { useRouter } from "next/router";

export default function Dashboard() {
  // Use both custom credentials session and next-auth session
  const [session, setSession] = useState<Session>();
  const router = useRouter();
  const nextSession = useSession();

  useEffect(() => {
    const session = localGetSession();
    console.log(nextSession);
    if (nextSession.status === "authenticated") {
      const obj: Session = {
        type: "oauth",
        user: {
          email: nextSession?.data?.user?.email as string,
          username: nextSession?.data?.user?.name as string,
        },
      };
      setSession(obj);
      localSetSession(obj);
    } else if (session) {
      setSession(session);
    } else {
      router.push("/login");
    }
  }, [nextSession]);

  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <p>{JSON.stringify(session)}</p>
      </div>
      <Button
        onClick={() => {
          // Remove session
          // Remove OAuth session
          removeSession();
          signOut();
          router.replace("/login");
        }}
      >
        Logout
      </Button>
    </>
  );
}
