"use client";

import { useAuthStore } from "@/store/authStore";
import styles from "./page.module.css";
import ProfilePic from "/public/icons/MyProfile.svg";
import Link from "next/link";

const MyPage = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <ProfilePic />
        <h1 className={styles.userName}>{user?.name}</h1>
        <p className={styles.userRole}>{user?.isStudent ? "학생" : "교수"}</p>
        <p className={styles.userId}>{user?.studentId}</p>
      </div>
      <div className={styles.infoSection}>
        <h2 className={styles.sectionTitle}>내 정보</h2>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>이름:</span>
          <span className={styles.infoValue}>{user?.name}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>역할:</span>
          <span className={styles.infoValue}>
            {user?.isStudent ? "학생" : "교수"}
          </span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>학번/교번:</span>
          <span className={styles.infoValue}>{user?.studentId}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>이메일:</span>
          <span className={styles.infoValue}>{user?.email}</span>
        </div>
      </div>

      <div className={styles.statisticsSection}>
        <h2 className={styles.sectionTitle}>컨테이너 정보</h2>
        <div className={styles.statsItem}>
          <span className={styles.statsLabel}>운영중인 컨테이너 개수:</span>
          <span className={styles.statsValue}>5개</span>
        </div>
        <div className={styles.statsItem}>
          <span className={styles.statsLabel}>사용된 컨테이너 개수:</span>
          <span className={styles.statsValue}>67개</span>
        </div>
      </div>

      <div className={styles.linkSection}>
        <h2 className={styles.sectionTitle}>로그인 관리</h2>
        <div className={styles.linkItem}>회원 정보 변경하기</div>
        <Link href="/login">
          <div className={styles.linkItem}>로그아웃</div>
        </Link>
        <Link href="/signup">
          <div className={styles.linkItem}>탈퇴하기</div>
        </Link>
      </div>
    </div>
  );
};

export default MyPage;
