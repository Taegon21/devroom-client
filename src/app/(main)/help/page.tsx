"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import styles from "./page.module.css";
import dummyHelpData from "@/data/dummy_help_data.json";
import HelpItem from "@/components/help/HelpItem";
import Filter from "@/components/help/HelpFilter";
import SearchIcon from "/public/icons/Search.svg";

interface HelpData {
  id: number;
  title: string;
  body: string;
  category: string;
}

const Help = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [view, setView] = useState<string>("column");
  const [isWide, setIsWide] = useState(false); // 브라우저의 너비 상태

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleViewChange = (view: string) => {
    setView(view);
  };

  const handleCategoryClick = (category: string) => {
    if (typeof window !== "undefined") {
      document.getElementById(category)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsWide(window.innerWidth > 768);
        setView(window.innerWidth <= 768 ? "column" : "grid");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filteredHelpData = dummyHelpData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categorizedHelpData = filteredHelpData.reduce(
    (acc: { [key: string]: HelpData[] }, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {}
  );

  return (
    <div className={styles.container}>
      <div className={styles.headerTitle}>도움말</div>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <div className={styles.searchBox}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="도움말 검색"
              className={styles.searchInput}
            />
            <SearchIcon className={styles.searchIcon} />
          </div>
          <div
            className={`${styles.viewSelector} ${isWide ? "" : styles.hidden}`}
          >
            <Filter onViewChange={handleViewChange} currentView={view} />
          </div>
        </div>
        <div className={styles.bodyContent}>
          {Object.keys(categorizedHelpData).map((category) => (
            <div key={category} id={category} className={styles.category}>
              <h2 className={styles.categoryTitle}>{category}</h2>
              <div
                className={`${styles.helpItems} ${
                  view === "grid" ? styles.grid : styles.column
                }`}
              >
                {categorizedHelpData[category].map((item) => (
                  <HelpItem
                    key={item.id}
                    title={item.title}
                    body={item.body}
                    category={item.category}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.categoryList}>
        {Object.keys(categorizedHelpData).map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={styles.categoryButton}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Help;
