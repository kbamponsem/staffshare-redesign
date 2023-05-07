import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { League_Spartan } from "next/font/google";
import { BASE_URL } from "./__shared/constants";

const font = League_Spartan({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "700"],
});
export default function App({
  Component,
  pageProps,
  session,
}: SessionProviderProps & AppProps) {
  // const []
  return (
    <SessionProvider session={session} baseUrl={BASE_URL}>
      <main className={font.className}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
