"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, ChangeEvent } from "react";
import styles from "./page.module.css";
import dummyNoticeData from "@/data/dummy_notice_data.json";
import FilterNotice from "@/components/notice/FilterNotice";
import NoticeItem from "@/components/notice/NoticeItem";

interface NoticeData {
  course_name: string;
  professor_name: string;
  notice_title: string;
  notice_body: string;
  post_date: string;
}

export default function Notice() {
  const param = useParams();
  const container = param.id;
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedProfessor, setSelectedProfessor] = useState<string>("");
  const [_, setFilterOption] = useState<string | null>(null);

  const handleFilterSelect = (option: string) => {
    setFilterOption(option);
  };

  useEffect(() => {
    if (container === "specific" && courseOptions.length > 0) {
      const initialCourse = courseOptions[0];
      setSelectedCourse(initialCourse);
      const initialProfessor = dummyNoticeData.find(
        (notice) => notice.course_name === initialCourse
      )?.professor_name;
      setSelectedProfessor(initialProfessor || "");
    }
  }, [container]);

  const title =
    container === "all" ? "전체 과목 공지 보기" : "과목별 공지 보기";

  const handleCourseSelect = (course: string) => {
    setSelectedCourse(course);
    const professor = dummyNoticeData.find(
      (notice) => notice.course_name === course
    )?.professor_name;
    setSelectedProfessor(professor || "");
  };

  const filteredNotices: NoticeData[] =
    container === "all"
      ? dummyNoticeData
      : container === "specific" && selectedCourse
      ? dummyNoticeData.filter(
          (notice) =>
            notice.course_name.toLowerCase() === selectedCourse.toLowerCase()
        )
      : [];

  const courseOptions: string[] = Array.from(
    new Set(dummyNoticeData.map((notice) => notice.course_name))
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          {title}
          {container === "specific" && selectedCourse && (
            <span className={styles.courseInfo}>
              {` - ${selectedCourse} (${selectedProfessor})`}
            </span>
          )}
        </div>
        <FilterNotice onSelect={handleFilterSelect} />
      </div>
      {container === "specific" && (
        <div className={styles.filterContainer}>
          {courseOptions.map((course, index) => (
            <button
              key={index}
              className={`${styles.courseButton} ${
                selectedCourse === course ? styles.active : ""
              }`}
              onClick={() => handleCourseSelect(course)}
            >
              {course}
            </button>
          ))}
        </div>
      )}
      <div className={styles.notices}>
        {filteredNotices.map((notice, index) => (
          <NoticeItem
            key={index}
            notice_title={notice.notice_title}
            notice_body={notice.notice_body}
            course_name={notice.course_name}
            professor_name={notice.professor_name}
            post_date={notice.post_date}
          />
        ))}
      </div>
    </div>
  );
}
