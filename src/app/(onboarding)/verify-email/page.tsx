"use client";

import React, { FormEvent, useState } from "react";
import styles from "./page.module.css";
import LogoIcon from "/public/icons/Logo1.svg";
import EmailIcon from "/public/icons/Email.svg";
import Link from "next/link";
import { verifyEmail } from "@/app/api/auth/auth"; // 가정된 이메일 인증 API 함수
import { useUserStore } from "@/store/userStore";

export default function VerifyEmail() {
  const { email, setEmail } = useUserStore((state) => ({
    email: state.email,
    setEmail: state.setEmail,
  }));

  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleVerifyEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await verifyEmail({ username: email, code });
      setMessage("Email verification successful! You can now login.");
    } catch (err) {
      console.error("Email verification failed:", err);
      setMessage("Email verification failed. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.background} />
      </div>
      <div className={styles.right}>
        <form onSubmit={handleVerifyEmail} className={styles.rightContainer}>
          <div className={styles.logo}>
            <Link href="/onboarding">
              <LogoIcon />
            </Link>
            <div>DevLatte</div>
          </div>
          <div className={styles.grayText}>Email Verification</div>
          <div className={styles.inputContainer}>
            <label htmlFor="email" className={styles.grayText2}>
              Email
            </label>
            <div className={styles.inputBox}>
              <input
                type="email"
                id="email"
                className={styles.input}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <EmailIcon className={styles.icon} />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="code" className={styles.grayText2}>
              Verification Code
            </label>
            <div className={styles.inputBox}>
              <input
                type="text"
                id="code"
                className={styles.input}
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <EmailIcon className={styles.icon} />
            </div>
          </div>
          <button type="submit" className={styles.createAccountButton}>
            Verify Email
          </button>
          {message && <div className={styles.message}>{message}</div>}
          <div className={styles.linkContainer}>
            <div className={styles.textAlready}>already have an account?</div>
            <Link href="/login" className={styles.loginLink}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
