import React from "react";

import Button from "./__components/button";
import { getSession, signOut, useSession } from "next-auth/react";

export default function Dashboard({ session }: any) {
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
          signOut({ callbackUrl: "/login" });
        }}
      >
        Logout
      </Button>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
