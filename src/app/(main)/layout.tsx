"use client";

import { ReactNode } from "react";
import styles from "./layout.module.css";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
        <div className={styles.school}>성균관대학교</div>
        <div className={styles.userContainer}>
          <Image
            src="/icons/MyProfile.svg"
            alt="myprofile"
            width={60}
            height={60}
          />
          <div>
            <div className={styles.userInfo}>
              <div>{user?.name}</div>
              <div>{user?.isStudent ? "- 학생" : " - 교수"}</div>
            </div>
            <div className={styles.studentId}>{user?.studentId}</div>
          </div>
        </div>
        <div className={styles.menu}>
          <div className={styles.menuItem}>
            <Image
              src="/icons/Space.svg"
              alt="container"
              width={35}
              height={35}
            />
            <div className={styles.menuText}>스페이스</div>
            <Image
              src="/icons/Down.svg"
              alt="container"
              width={15}
              height={15}
              className={styles.down}
            />
          </div>
          <div className={styles.subMenu}>
            <Link href="/container/recent">
              <div
                className={`${styles.menuItem} ${isActive(
                  "/container/recent"
                )}`}
              >
                <div>최근 실행 컨테이너</div>
              </div>
            </Link>
            <Link href="/container/semester">
              <div
                className={`${styles.menuItem} ${isActive(
                  "/container/semester"
                )}`}
              >
                <div>이번 학기 컨테이너</div>
              </div>
            </Link>
            <Link href="/container/all">
              <div
                className={`${styles.menuItem} ${isActive("/container/all")}`}
              >
                <div>전체 학기 컨테이너</div>
              </div>
            </Link>
          </div>
          <Link href="/notice">
            <div className={`${styles.menuItem} ${isActive("/notice")}`}>
              <Image
                src="/icons/Notice.svg"
                alt="notice"
                width={35}
                height={35}
              />
              <div>공지</div>
            </div>
          </Link>
          <Link href="/community">
            <div className={`${styles.menuItem} ${isActive("/community")}`}>
              <Image
                src="/icons/Community.svg"
                alt="community"
                width={35}
                height={35}
              />
              <div>커뮤니티</div>
            </div>
          </Link>
          <Link href="/help">
            <div className={`${styles.menuItem} ${isActive("/help")}`}>
              <Image src="/icons/Help.svg" alt="help" width={35} height={35} />
              <div>도움말</div>
            </div>
          </Link>
          <Link href="/mypage">
            <div className={`${styles.menuItem} ${isActive("/mypage")}`}>
              <Image
                src="/icons/Mypage.svg"
                alt="mypage"
                width={35}
                height={35}
              />
              <div>마이페이지</div>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.topName}>
        <div className={styles.studentId}>{user?.name}</div>
        <div className={styles.studentId}> / {user?.studentId}</div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
