import React from "react";
import styles from "./SSHModal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string[];
}

const Modal = ({ isOpen, onClose, content }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          아래 SSH 명령어를 <br /> 순차적으로 입력하세요
        </div>
        <div className={styles.content}>
          {content.map((cmd, index) => (
            <p key={index}>{cmd}</p>
          ))}
        </div>
        <button className={styles.button} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
