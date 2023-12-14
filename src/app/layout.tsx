"use client";

import StyledComponentsRegistry from "./lib/registry";
import "./main.css";
import { Roboto } from "next/font/google";
import { CookiesProvider } from "react-cookie";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </CookiesProvider>
      </body>
    </html>
  );
}
