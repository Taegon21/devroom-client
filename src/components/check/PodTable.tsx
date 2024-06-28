import React from "react";
import styles from "./PodTable.module.css";
import { type IPodTable } from "@/type/interfaces";

const PodTable = ({ filteredData }: IPodTable) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Class ID</th>
            <th>Student ID</th>
            <th>Type</th>
            <th>Timestamp</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((pod) => (
            <tr key={pod.name}>
              <td>{pod.labels.class_id}</td>
              <td>{pod.labels.student_id}</td>
              <td>{pod.labels.connection === "vscode" ? "VSCode" : "SSH"}</td>
              <td>{new Date(pod.creationTimestamp).toLocaleString()}</td>
              <td>
                <span
                  className={
                    pod.status === "Running"
                      ? styles.statusRunning
                      : styles.statusNotRunning
                  }
                ></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PodTable;
