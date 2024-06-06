import styles from "./page.module.css";
import Link from "next/link";

export default function Main() {
  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <Link href="/signup">계정 만들기</Link>
        <Link href="/login">로그인</Link>
        <Link href="/container">홈</Link>
      </div>
    </div>
  );
}
