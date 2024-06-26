"use client";

import { FormEvent, useState } from "react";
import styles from "./page.module.css";
import LogoIcon from "/public/icons/Logo1.svg";
import EmailIcon from "/public/icons/Email.svg";
import PasswordIcon from "/public/icons/Password.svg";
import Link from "next/link";
import { useAuthStore, authenticateUser } from "@/store/authStore";
import { useRouter } from "next/navigation";
import WarningModal from "@/components/common/WarningModal";
import { authenticateCognitoUser } from "@/app/api/auth/auth";
import { useUserStore } from "@/store/userStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  // Zustand 스토어의 상태 업데이트 함수들
  const {
    setEmail: setGlobalEmail,
    setName,
    setRole,
    setStudentId,
    setIdToken,
  } = useUserStore();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { idToken, name, role, studentId } = await authenticateCognitoUser(
        email,
        password
      );

      // Zustand 스토어에 로그인 정보 저장
      setGlobalEmail(email);
      setName(name);
      setRole(role);
      setStudentId(studentId);
      setIdToken(idToken);

      console.log("Access Token:", idToken);
      console.log("Name:", name);
      console.log("Role:", role);
      console.log("Student ID:", studentId);

      // 사용자 역할에 따라 리디렉션
      if (role === "Student") {
        router.push("/container/all");
      } else if (role === "Professor") {
        router.push("/create-container");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid email or password");
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setError("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.leftContainer}>
          <div className={styles.logo}>
            <Link href="/onboarding">
              <LogoIcon />
            </Link>
            <div>DevLatte</div>
          </div>
          <div className={styles.grayText}>Login into your account</div>
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.inputContainer}>
              <label htmlFor="email" className={styles.grayText2}>
                Email address
              </label>
              <div className={styles.inputBox}>
                <input
                  type="email"
                  id="email"
                  className={styles.input}
                  placeholder="Enter your email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <EmailIcon className={styles.icon} />
              </div>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="password" className={styles.grayText2}>
                Password
              </label>
              <div className={styles.inputBox}>
                <input
                  type="password"
                  id="password"
                  className={styles.input}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <PasswordIcon className={styles.icon} />
              </div>
              <div className={styles.forgotPassword}>Forgot password?</div>
              <button type="submit" className={styles.loginButton}>
                Login now
              </button>
              <div className={styles.orDivider}>
                <span>or</span>
              </div>
              <Link href="/signup" className={styles.signupButton}>
                Sign up now
              </Link>
            </div>
          </form>
        </div>
      </div>
      {showModal && <WarningModal message={error} onClose={closeModal} />}
      <div className={styles.right}>
        <div className={styles.background} />
      </div>
    </div>
  );
}
