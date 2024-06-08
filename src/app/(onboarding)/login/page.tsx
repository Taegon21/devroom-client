"use client";

import { useState } from "react";
import styles from "./page.module.css";
import LogoIcon from "/public/icons/Logo1.svg";
import EmailIcon from "/public/icons/Email.svg";
import PasswordIcon from "/public/icons/Password.svg";
import Link from "next/link";
import { useAuthStore, authenticateUser } from "@/store/authStore";
import { useRouter } from "next/navigation";
import WarningModal from "@/components/common/WarningModal";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const login = useAuthStore((state) => state.login);

  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const user = authenticateUser(email, password);

    if (user) {
      login(user);
      router.push(user.isStudent ? "/container/all" : "/create-container");
    } else {
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
            <LogoIcon />
            <div>DevLatte</div>
          </div>
          <div className={styles.grayText}>Login into your account</div>
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
            <button className={styles.loginButton} onClick={handleSubmit}>
              Login now
            </button>
            <div className={styles.orDivider}>
              <span>or</span>
            </div>
            <Link href="/signup" className={styles.signupButton}>
              Sign up now
            </Link>
          </div>
        </div>
      </div>
      {showModal && <WarningModal message={error} onClose={closeModal} />}
      <div className={styles.right}>
        <div className={styles.background} />
      </div>
    </div>
  );
}
