import React from "react";
import styles from "./NoticeItem.module.css";

interface NoticeItemProps {
  notice_title: string;
  notice_body: string;
  course_name: string;
  professor_name: string;
  post_date: string;
}

const NoticeItem = ({
  notice_title,
  notice_body,
  course_name,
  professor_name,
  post_date,
}: NoticeItemProps) => {
  return (
    <div className={styles.noticeItem}>
      <div className={styles.noticeHeader}>
        <span className={styles.courseName}>{course_name}</span>
        <span className={styles.professorName}> ({professor_name})</span>
      </div>
      <div className={styles.noticeTitle}>{notice_title}</div>

      <div className={styles.noticeFooter}>
        <p className={styles.noticeBody}>{notice_body}</p>
        <span className={styles.postDate}>게시일시: {post_date}</span>
      </div>
    </div>
  );
};

export default NoticeItem;
