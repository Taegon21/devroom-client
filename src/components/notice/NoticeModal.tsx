import React from "react";
import styles from "./NoticeModal.module.css";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  courseName: string;
  professorName: string;
  postDate: string;
  noticeBody: string;
}

const Modal = ({
  show,
  onClose,
  title,
  courseName,
  professorName,
  postDate,
  noticeBody,
}: ModalProps) => {
  if (!show) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button onClick={onClose} className={styles.closeButton}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          <p>
            <strong>Course:</strong> {courseName}
          </p>
          <p>
            <strong>Professor:</strong> {professorName}
          </p>
          <p>
            <strong>Date:</strong> {postDate}
          </p>
          <p>
            <strong>notice:</strong> {noticeBody}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
