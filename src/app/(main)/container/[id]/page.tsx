"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import SearchIcon from "/public/icons/Search.svg";
import styles from "./page.module.css";
import Filter from "@/components/home/Filter";

export default function Home() {
  const param = useParams();
  const container = param.id;

  const title =
    container === "recent"
      ? "최근 실행 컨테이너"
      : container === "semester"
      ? "이번 학기 컨테이너"
      : "전체 학기 컨테이너";

  // 검색 상태
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [_, setFilterOption] = useState<string | null>(null);

  const allContainers = [
    "Container 1",
    "Container 2",
    "Container 3",
    "Recent Container 123",
    "Semester Container 1",
  ];

  useEffect(() => {
    if (searchQuery === "") {
      setResults(allContainers);
    } else {
      const filteredResults = allContainers.filter((container) =>
        container.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filteredResults);
    }
  }, [searchQuery]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterSelect = (option: string) => {
    setFilterOption(option);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerTitle}>{title}</div>
      <div className={styles.searchContainer}>
        <div className={styles.header}>
          <div className={styles.searchBox}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="컨테이너 검색"
              className={styles.searchInput}
            />
            <SearchIcon className={styles.searchIcon} />
          </div>
          <Filter onSelect={handleFilterSelect} />
        </div>
      </div>
      <div className={styles.results}>
        {results.map((result, index) => (
          <div key={index} className={styles.resultItem}>
            {result}
          </div>
        ))}
      </div>
    </div>
  );
}
