"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import SearchIcon from "/public/icons/Search.svg";
import styles from "./page.module.css";
import Filter from "@/components/home/Filter";
import Container from "@/components/home/Container";
import dummyData from "@/data/dummy_container_data.json";

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
  const [filteredContainers, setFilteredContainers] = useState(dummyData);
  const [_, setFilterOption] = useState<string | null>(null);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredContainers(dummyData);
    } else {
      const filteredResults = dummyData.filter(
        (container) =>
          container.course_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          container.professor_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setFilteredContainers(filteredResults);
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
          <div className={styles.filter}>
            <Filter onSelect={handleFilterSelect} />
          </div>
        </div>
      </div>
      <div className={styles.results}>
        {filteredContainers.map((container, index) => (
          <Container key={index} {...container} />
        ))}
      </div>
    </div>
  );
}
