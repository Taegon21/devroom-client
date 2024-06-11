import styles from "./page.module.css";
import LogoIcon from "/public/icons/Logo1.svg";
import EmailIcon from "/public/icons/Email.svg";
import PasswordIcon from "/public/icons/Password.svg";
import UsernameIcon from "/public/icons/Username.svg";
import Link from "next/link";

export default function signup() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.background} />
      </div>
      <div className={styles.right}>
        <div className={styles.rightContainer}>
          <div className={styles.logo}>
            <Link href="/onboarding">
              <LogoIcon />
            </Link>
            <div>DevLatte</div>
          </div>
          <div className={styles.grayText}>Create your Account</div>
          <div className={styles.inputContainer}>
            <label htmlFor="text" className={styles.grayText2}>
              User name
            </label>
            <div className={styles.inputBox}>
              <input
                type="text"
                id="text"
                className={styles.input}
                placeholder="Enter your User name"
              />
              <UsernameIcon className={styles.icon} />
            </div>
          </div>
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
          </div>
          <Link href="/login" className={styles.createAccountButton}>
            Create Account
          </Link>
          <div className={styles.linkContainer}>
            <div className={styles.textAlready}>already have an account?</div>
            <Link href="/login" className={styles.loginLink}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
