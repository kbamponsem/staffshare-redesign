import { Html, Head, Main, NextScript } from "next/document";
import { League_Spartan } from "next/font/google";


export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="StaffShare" />
        <link rel="icon" href="/staffshare.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
