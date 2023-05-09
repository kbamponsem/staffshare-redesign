import Head from "next/head";
import Image from "next/image";
import { League_Spartan } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "./__components/header";
import HeroImage from "../images/hero.svg";
import Button from "./__components/button";
import { useRouter } from "next/router";
import {
  FaPencilAlt,
  FaShareAlt,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";
import { IconType } from "react-icons/lib";
import Logo from "./__components/logo";
import { getSession } from "next-auth/react";

type HeadInfoProps = {
  subinfo?: string;
};
export const headInfo = ({ subinfo }: HeadInfoProps) => {
  return (
    <>
      <Head>
        <title>StaffShare | {subinfo}</title>
        <meta name="description" content="StaffShare | Designed for You." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/staffshare.png" />
      </Head>
    </>
  );
};

// Info data
const infoData = [
  {
    title: "Create",
    icon: FaPencilAlt,
    description:
      "Create that beautiful and moving piece of music, ready to share with the whole world.",
  },
  {
    title: "Collaborate",
    icon: RiTeamLine,
    description:
      "Work with other musicians to create that masterpiece. Share your ideas and get feedback from other musicians.",
  },
  {
    title: "Share",
    icon: FaShareAlt,
    description:
      "Make known your compositions. Let other musicians and music lovers have access to your sheet music",
  },
];
type InfoProps = {
  title: string;
  icon: IconType;
  description: string;
};
const Info = ({ title, icon, description }: InfoProps) => {
  return (
    <>
      <div className={styles.info}>
        <div className={styles.infoIcon}>{icon({ size: 28 })}</div>
        <h3 className={styles.infoTitle}>{title}</h3>
        <p className={styles.infoDescription}>{description}</p>
      </div>
    </>
  );
};
const InfoSection = () => {
  return (
    <>
      <div className={styles.infoSection}>
        {infoData.map((info, index) => {
          return (
            <Info
              key={index}
              title={info.title}
              icon={info.icon}
              description={info.description}
            />
          );
        })}
      </div>
    </>
  );
};

const JoinTheCommunity = ({ className }: { className?: string }) => {
  const router = useRouter();
  return (
    <Button
      className={`${styles.heroButton} ${className}`}
      bgColor="#5B716D"
      onClick={() => {
        router.push("/register");
      }}
    >
      Join the Community now!
    </Button>
  );
};
const Annoncement = () => {
  return (
    <>
      <div className={styles.annoncement}>
        <h3>
          StaffShare makes it easier to find old, new, amazing Ghanaian pieces
          of music
        </h3>
        <p>
          Find pieces from Newlove Annan, James Varrick Armah, rare Ghanaian
          classical pieces and more.
        </p>
        <JoinTheCommunity />
      </div>
    </>
  );
};

type ConnectionProps = {
  icon: IconType;
  className?: string;
};
const Connection = ({ icon, className }: ConnectionProps) => {
  return (
    <>
      <div className={styles.connection}>{icon({ size: 40, className })}</div>
    </>
  );
};

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <Logo className={styles.logoWrapper} />
        <div className={styles.connectionSection}>
          <div>
            <h3>Let's connect</h3>
            <div className={styles.connectionWrapper}>
              {[FaInstagram, FaLinkedin].map((icon, index) => {
                return <Connection key={index} icon={icon} />;
              })}
            </div>
          </div>
          <div className={styles.banner}>
            <p>StaffShare.co | Designed with ❤️ by StaffShare Inc.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default function Home() {
  return (
    <>
      <div className={styles.main}>
        <Header />
        <div className={styles.bigBody}>
          <div className={styles.hero}>
            <h1>An amazing community for Ghanaian musicians.</h1>
            <p>
              On StaffShare, musicians from all genres: Choral, Classical, Jazz.
              Share their music both written and audio music. Staffshare helps
              Musicians reach other musicians through our amazing platform.
              <br />
              We care about your music❤️.️
            </p>
            <div className={styles.mobileImage}>
              <Image src={HeroImage} alt="Hero" className={styles.heroImage} />
            </div>
            <JoinTheCommunity className={styles.mainHero} />
          </div>
          <div className={styles.imageWrapper}>
            <Image src={HeroImage} alt="Hero" className={styles.heroImage} />
          </div>
        </div>
        <InfoSection />
        <Annoncement />
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}
