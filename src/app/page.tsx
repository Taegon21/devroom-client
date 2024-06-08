import styles from "./page.module.css";
import Link from "next/link";

export default function Main() {
  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <Link href="/signup">계정 만들기</Link>
        <Link href="/login">로그인</Link>
        <Link href="/container/all">홈</Link>
        <Link href="/check-container">조회</Link>
        <Link href="/create-container">컨테이너 생성</Link>
        <Link href="/edit-container">컨테이너 수정</Link>
        <Link href="/professor-page">교수자 페이지</Link>
      </div>
    </div>
  );
}
