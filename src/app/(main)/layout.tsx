"use client";

import { ReactNode } from "react";
import styles from "./layout.module.css";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const user = useAuthStore((state) => state.user);
  const navigation = usePathname();

  const isActive = (path: string) => {
    return navigation === path ? styles.active : "";
  };

  return (
    <div className={styles.layout}>
      
      <div className={styles.sidebar}>
        <Link href="/home">
          <div className={isActive("/home")}>홈</div>
        </Link>
        <Link href="/notice">
          <div className={isActive("/notice")}>공지</div>
        </Link>
        <Link href="/community">
          <div className={isActive("/community")}>커뮤니티</div>
        </Link>
        <Link href="/help">
          <div className={isActive("/help")}>도움말</div>
        </Link>
        <Link href="/mypage">
          <div className={isActive("/mypage")}>마이페이지</div>
        </Link>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
