import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <>
      <div>로그인 layout</div>
      <div>{children}</div>
    </>
  );
}
