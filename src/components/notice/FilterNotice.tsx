"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FilterIcon from "/public/icons/Filter.svg";
import DownIcon from "/public/icons/Down.svg";
import UpIcon from "/public/icons/Up.svg";
import styles from "./FilterNotice.module.css";

interface FilterProps {
  onSelect: (option: string) => void;
}

export default function Filter({ onSelect }: FilterProps) {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const router = useRouter();

  const toggleFilter = () => {
    setFilterOpen(!isFilterOpen);
  };

  const handleSelect = (option: string) => {
    onSelect(option);
    setFilterOpen(false);
    switch (option) {
      case "전체 과목 공지 보기":
        router.push("/notice/all");
        break;
      case "과목별 공지 보기":
        router.push("/notice/specific");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className={styles.filter}>
        <div className={styles.filterButton}>
          <FilterIcon />
          <div className={styles.icon}>
            {isFilterOpen ? (
              <UpIcon onClick={toggleFilter} />
            ) : (
              <DownIcon onClick={toggleFilter} />
            )}
          </div>
        </div>
        <div
          className={`${styles.filterOptions} ${
            isFilterOpen ? styles.open : ""
          }`}
        >
          <div onClick={() => handleSelect("전체 과목 공지 보기")}>
            전체 과목 공지 보기
          </div>
          <div onClick={() => handleSelect("과목별 공지 보기")}>
            과목별 공지 보기
          </div>
        </div>
      </div>
      <div className={styles.smallScreen}>
        <div className={styles.filterSmall}>
          <div
            onClick={() => handleSelect("전체 과목 공지 보기")}
            className={styles.filterButtonSmall}
          >
            전체 과목 공지 보기
          </div>
          <div
            onClick={() => handleSelect("과목별 공지 보기")}
            className={styles.filterButtonSmall}
          >
            과목별 공지 보기
          </div>
        </div>
      </div>
    </>
  );
}
