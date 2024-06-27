import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/utils/provider";

export const metadata: Metadata = {
  title: {
    default: "DevRoom",
    template: "DevRoom| %s",
  },
  icons: [
    { url: "/favicon.ico", sizes: "any" },
    {
      url: "/favicon.png",
      sizes: "32x32",
      type: "image/png",
    },
  ],
};

const pretendardBold = localFont({
  src: "./fonts/Pretendard-Bold.ttf",
  display: "swap",
  weight: "700",
});

const pretendardMedium = localFont({
  src: "./fonts/Pretendard-Medium.ttf",
  display: "swap",
  weight: "300",
});
const pretendard = localFont({
  src: "./fonts/Pretendard-Regular.ttf",
  display: "swap",
  weight: "300",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendardBold.className} ${pretendardMedium.className} ${pretendard.className}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
