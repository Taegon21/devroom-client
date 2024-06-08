import React from "react";
import styles from "./PodTable.module.css";

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

interface PodTableProps {
  filteredData: PodData[];
}

const PodTable = ({ filteredData }: PodTableProps) => {
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
              <td>
                {pod.labels.vscode === "yes" ? "vscode" : ""}
                {pod.labels.ssh === "yes" ? "SSH" : ""}
              </td>
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
