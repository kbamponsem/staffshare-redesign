import { getSession, useSession } from "next-auth/react";
import { connectAPI } from "./api/services";
import useSWR from "swr";
import Image from "next/image";
import NoSheets from "../images/empty_sheets.svg";
import Loader from "./__shared/loader";


const fetcher = ({
  url,
  access_token,
}: {
  url: string;
  access_token: string;
}) =>
  connectAPI(url, "GET", {}, access_token).then((res) => {
    console.log("res", res);
    return res.data;
  });
export default function Sheets({ session }: { session: any }) {
  console.log(session);
  const { data, error } = useSWR(
    { url: "/sheets", access_token: session.data?.user?.access_token },
    fetcher
  );

  if (error) return <div>{JSON.stringify(error)} </div>;
  if (!data) return <Loader />;
  if (data && data.length === 0)
    return (
      <div className="no-sheet">
        <Image className="image" alt="Empty" src={NoSheets} />
        <p>No sheets found</p>
      </div>
    );
  return (
    <div>
      {data.map((sheet: any) => {
        return <Sheet pdf={sheet.pdf} />;
      })}
    </div>
  );
}

const Sheet = ({ pdf }: { pdf?: string }) => {
  return (
    <div className="sheet">
      <iframe className="sheet-page" src={pdf} />
    </div>
  );
};
