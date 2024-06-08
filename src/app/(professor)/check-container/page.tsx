"use client";
import { useState } from "react";
import styles from "./page.module.css";
import data from "@/data/dummy_check_data.json";
import PodTable from "@/components/check/PodTable";
import GridComponent from "@/components/check/PodGrid";

interface PodData {
  name: string;
  ip: string;
  labels: {
    app: string;
    class_id: string;
    pod_template_hash: string;
    professor_id: string;
    student_id: string;
    vscode: string;
    ssh: string;
  };
  creationTimestamp: string;
  status: string;
}

const CheckPage = () => {
  const [filterClassId, setFilterClassId] = useState<string>("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterClassId(e.target.value);
  };

  const filteredData = data.filter((pod: PodData) => {
    return filterClassId === "" || pod.labels.class_id === filterClassId;
  });

  const classIds = Array.from(
    new Set(data.map((pod: PodData) => pod.labels.class_id))
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>Pod 조회 페이지</div>
        <div className={styles.filter}>
          <label htmlFor="class-id">Class ID:</label>
          <select
            id="class-id"
            value={filterClassId}
            onChange={handleFilterChange}
          >
            <option value="">전체</option>
            {classIds.map((classId) => (
              <option key={classId} value={classId}>
                {classId}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <PodTable filteredData={filteredData} />
      </div>
      <GridComponent filteredData={filteredData} />
    </div>
  );
};

export default CheckPage;
