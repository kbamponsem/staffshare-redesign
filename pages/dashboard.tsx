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
      inputStyle={{ width: "100%" }}
      icon={FaSearch}
      type={"text"}
      className={className}
      placeholder={"Search for sheet music"}
    />
  );
};

export const Avatar = ({
  image,
  username,
}: {
  image?: string;
  username?: string;
}) => {
  return (
    <div className={"avatar"}>
      {image ? (
        <img
          style={{ maxWidth: 40, maxHeight: 40, borderRadius: "50%" }}
          src={image}
          alt={username}
        />
      ) : (
        <div>{username?.charAt(0).toUpperCase()}</div>
      )}
    </div>
  );
};
const DashboardHeader = ({
  setOpened,
  opened,
}: {
  opened: boolean;
  setOpened: (o: boolean) => any;
}) => {
  const { data } = useSession();
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
          image={data?.user?.image as string}
          username={data?.user?.name as string}
        />
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [openedUpload, setOpenedUpload] = React.useState(false);
  return (
    <>
      <DashboardHeader opened={openedUpload} setOpened={setOpenedUpload} />
      <MainSection />
      <Popup
        title="Upload Sheet"
        opened={openedUpload}
        setOpened={setOpenedUpload}
      />
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
