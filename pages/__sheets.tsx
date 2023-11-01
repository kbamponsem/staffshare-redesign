import { connectAPI } from "./api/services";
import useSWR from "swr";
import Image from "next/image";
import NoSheets from "../images/empty_sheets.svg";
import Loader from "./__shared/loader";
import { Document, Page, pdfjs } from "react-pdf";
import styles from '../styles/Sheet.module.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const base64ToUint8Array = async (pdfString: string) => {
  const blob = await (await fetch(pdfString)).blob();
  const arrayBuffer = await blob.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  return uint8Array;
};
const fetcher = async ({
  url,
  method = "POST",
  access_token,
}: {
  url: string;
  method?: string;
  access_token: string;
}) => {
  try {

    const { data } = await connectAPI(url, method, {}, access_token);
    const sheets = await Promise.all(
      data.data.map(async (sheet: any) => {
        const pdf = await base64ToUint8Array(sheet.pdf);
        return { ...sheet, pdf };
      }))
    return sheets;
  } catch (error) {
    throw new Error("Failed to fetch sheets");
  }
}
const Empty = () => {
  return (
    <div className="no-sheet">
      <Image
        width={200}
        height={200}
        className="image" alt="Empty" src={NoSheets} />
      <p>No sheets found</p>
    </div>
  );
};

export default function Sheets({ session }: { session: any }) {
  const { data, error } = useSWR(
    { url: "/sheets", method: "GET", access_token: session.user?.id_token },
    fetcher
  );
  console.log("Sheets", data)
  if (error) return <Empty />;
  if (!data) return <Loader />;
  if (data && data.length === 0) return <Empty />;

  return (
    <div className={styles.sheetsWrapper}>
      {data.map((sheet: any, index: any) => {
        return <Sheet key={index} sheet={sheet} />;
      })}
    </div>
  );
}
const EmptySheet = () => {
  return (
    <div className="empty-sheet">
      <Loader />
    </div>
  );
};


const Sheet = ({ sheet }: { sheet: any }) => {
  return (
    <div className={styles.sheet}>
      <div className={styles.pdf}>
        <Document
          renderMode="canvas"
          file={{
            data: sheet.pdf,
          }}
          error={<EmptySheet />}
        >
          <Page
            loading={<EmptySheet />}
            pageNumber={1}
            scale={0.35}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className={"sheet"}
            height={500}
            width={500}
          />
        </Document>
      </div>
      <div className={styles.textSection}>
        <p>{sheet.title}</p>
        <p>{sheet.description}</p>
      </div>
    </div>
  );
};
