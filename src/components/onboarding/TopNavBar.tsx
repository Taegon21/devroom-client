import React from "react";
import styles from "./TopNavBar.module.css";
import LogoRowIcon from "/public/icons/LogoRow.svg";
import Link from "next/link";

export default function page() {
  return (
    <div className={styles.topNavBar}>
      <LogoRowIcon />
      <div className={styles.navLeft}>
        <div className={styles.logoText}>도움말</div>
        <div className={styles.logoText}>릴리즈 노트</div>
        <Link href="/login" className={styles.logoText}>
          <div className={styles.logoText}>로그인</div>
        </Link>
        <Link href="/signup" className={styles.logoText}>
          <div className={styles.logoText}>회원가입</div>
        </Link>
      </div>
    </div>
  );
}
