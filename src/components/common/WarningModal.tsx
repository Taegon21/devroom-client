// components/Modal.js
import React from "react";
import styles from "./WarningModal.module.css";

interface WarningModalProps {
  message: string;
  onClose: () => void;
}

const WarningModal = ({ message, onClose }: WarningModalProps) => {
  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>{message}</p>
            <button onClick={onClose} className={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WarningModal;
