import styles from "./page.module.css";
import LogoIcon from "/public/icons/Logo1.svg";
import EmailIcon from "/public/icons/Email.svg";
import PasswordIcon from "/public/icons/Password.svg";
import Link from "next/link";
export default function login() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
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
            />
            <PasswordIcon className={styles.icon} />
          </div>
          <div className={styles.forgotPassword}>Forgot password?</div>
          <Link href="/container/all" className={styles.loginButton}>
            Login now
          </Link>
          <div className={styles.orDivider}>
            <span>or</span>
          </div>
          <Link href="/signup" className={styles.signupButton}>
            Sign up now
          </Link>
        </div>
      </div>
      <div className={styles.right}>오른쪽</div>
    </div>
  );
}
