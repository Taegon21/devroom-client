"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import SearchIcon from "/public/icons/Search.svg";
import styles from "./page.module.css";
import Filter from "@/components/container/Filter";
import Container from "@/components/container/Container";
import dummyData from "@/data/dummy_container_data.json";

export default function Home() {
  const { id: container } = useParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContainers, setFilteredContainers] = useState(dummyData);
  const [filterOption, setFilterOption] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const titles = {
    recent: "최근 실행 컨테이너",
    semester: "이번 학기 컨테이너",
    all: "전체 학기 컨테이너",
  };

  const title =
    titles[container as keyof typeof titles] || "전체 학기 컨테이너";

  useEffect(() => {
    let filtered = dummyData;

    if (searchQuery !== "") {
      filtered = filtered.filter(
        (c) =>
          c.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.professor_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (container === "recent" || filterOption === "recent") {
      filtered = filtered.filter((c) =>
        ["Fall 2023", "Spring 2024"].includes(c.semester)
      );
    } else if (container === "semester" || filterOption === "semester") {
      filtered = filtered.filter((c) => c.semester === "Spring 2024");
    }

    setFilteredContainers(filtered);
  }, [searchQuery, filterOption, container]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterSelect = (option: string) => {
    setFilterOption(option);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
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
