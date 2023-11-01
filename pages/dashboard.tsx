import React from "react";
import styles from "../styles/Dashboard.module.css";
import Button from "./__components/button";
import { getSession, signOut, useSession } from "next-auth/react";
import Logo from "./__components/logo";
import Input from "./__components/input";
import { FaSearch } from "react-icons/fa";
import { IoIosCloudUpload } from "react-icons/io";
import MainSection from "./__mainsection";
import Popup from "./__popup";
import { headInfo } from ".";
import Sheets from "./__sheets";
import Image from "next/image";
import { connectAPI } from "./api/services";
import { Session } from "next-auth";

const DashboardSearchBar = ({ className }: { className: string }) => {
  return (
    <Input
      wrapperStyle={{
        margin: 0,
        padding: 0,
        width: "100%",
        justifySelf: "start",
        marginRight: "2rem",
      }}
      inputStyle={{ width: "100%", backgroundColor: "#272727" }}
      icon={FaSearch}
      type={"text"}
      value={""}
      className={className}
      placeholder={"Search for sheet music"}
    />
  );
};

export const Avatar = ({
  image,
  username,
  onClick,
}: {
  image?: string;
  username?: string;
  onClick?: () => any;
}) => {
  const firstname = username?.split(" ")[0];
  return (
    <div className="avatar-wrapper" onClick={onClick}>
      <div id="avatar" className={"avatar"}>
        {image ? (
          <Image
            width={40}
            height={40}
            style={{ borderRadius: "50%" }}
            src={image}
            alt="Avatar"
          />
        ) : (
          <div>{username?.charAt(0).toUpperCase()}</div>
        )}
      </div>
      <p className="text">Hi, {firstname}</p>
    </div>
  );
};

const SmallPopup = ({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: (o: boolean) => any;
}) => {
  return opened ? (
    <div
      id="smallPopup"
      onClick={(e: any) => {
        if (e.target !== e.currentTarget) return;
        setOpened(false);
      }}
      className={styles.smallPopup}
    >
      <Button
        style={{ margin: 0 }}
        onClick={() => {
          signOut({ callbackUrl: "/login" });
        }}
      >
        Logout
      </Button>
    </div>
  ) : null;
};

const DashboardHeader = ({
  setOpened,
  setSmallOpened,
  opened,
  smallOpened,
  session
}: {
  opened: boolean;
  setOpened: (o: boolean) => any;
  smallOpened: boolean;
  setSmallOpened: (o: boolean) => any;
  session: any;
}) => {
  const { user } = session;
  return (
    <div className={styles.dashboardHeader}>
      <div className={styles.logoSection}>
        <Logo size={40} />
      </div>
      <div className={styles.barSection}>
        <DashboardSearchBar className={styles.input} />
        <Button
          style={{ margin: 0, padding: 0, width: "10rem" }}
          icon={IoIosCloudUpload}
          onClick={() => {
            setOpened(!opened);
          }}
        >
          Upload
        </Button>
      </div>
      <div className={styles.avatarSection}>
        <Avatar
          onClick={() => {
            setSmallOpened(!smallOpened);
          }}
          image={user?.image as string}

          username={user?.name as string}
        />
        <SmallPopup opened={smallOpened} setOpened={setSmallOpened} />
      </div>
    </div>
  );
};

export default function Dashboard({ session }: { session: Session }) {
  const [openedUpload, setOpenedUpload] = React.useState(false);
  const [smallPopupOpened, setSmallPopupOpened] = React.useState(false);

  return (
    <>
      {headInfo({ subinfo: "Sheets" })}
      <div className={styles.dashboard}>
        <DashboardHeader
          session={session}
          smallOpened={smallPopupOpened}
          setSmallOpened={setSmallPopupOpened}
          opened={openedUpload}
          setOpened={setOpenedUpload}
        />
        <MainSection>
          <Sheets session={session} />
        </MainSection>
        <Popup opened={openedUpload} setOpened={setOpenedUpload} session={session} />
      </div>
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

  const email = session.user?.email;
  const id = session.user?.id;
  // Create or update user in database
  const { status, data } = await connectAPI("/oauth/check", "POST", {
    email,
    id
  });

  if (status === 200 && !data.data) {
    // User does not exist
    // Redirect to onboarding page
    return {
      redirect: {
        destination: "/onboarding",
        permanent: false,
      }
    }
  }

  return {
    props: {
      session,
    },
  };
}
