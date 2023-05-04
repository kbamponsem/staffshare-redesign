import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { League_Spartan } from "next/font/google";

const font = League_Spartan({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "700"],
});
export default function App({
  Component,
  pageProps,
  session,
}: SessionProviderProps & AppProps) {
  return (
    <SessionProvider session={session}>
      <main className={font.className}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
