import React from "react";
import styles from "./PodGrid.module.css";

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

interface GridComponentProps {
  filteredData: PodData[];
}

const GridComponent = ({ filteredData }: GridComponentProps) => {
  return (
    <div className={styles.gridContainer}>
      {filteredData.map((pod: PodData) => (
        <div key={pod.name} className={styles.gridItem}>
          <div>
            <strong>Class ID:</strong> {pod.labels.class_id}
          </div>
          <div>
            <strong>Student ID:</strong> {pod.labels.student_id}
          </div>
          <div>
            <strong>Type:</strong> {pod.labels.vscode === "yes" ? "vscode" : ""}
            {pod.labels.ssh === "yes" ? "SSH" : ""}
          </div>
          <div>
            <strong>Timestamp:</strong>{" "}
            {new Date(pod.creationTimestamp).toLocaleString()}
          </div>
          <div>
            <strong>Status:</strong>{" "}
            <span
              className={
                pod.status === "Running"
                  ? styles.statusRunning
                  : styles.statusNotRunning
              }
            ></span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridComponent;
