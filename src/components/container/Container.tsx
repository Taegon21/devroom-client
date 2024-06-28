import React, { useState } from "react";
import styles from "./Container.module.css";
import VSCodeIcon from "/public/icons/VSCode.svg";
import SSHIcon from "/public/icons/SSH.svg";
import PlayIcon from "/public/icons/Play.svg";
import SSHModal from "./SSHModal";
import { type IContainer } from "@/type/interfaces";

export default function Container({ serviceData }: IContainer) {
  const [isModalOpen, setModalOpen] = useState(false);

  const {
    labels: { connection, class_id, professor_id },
    port,
    clusterIP,
    creationTimestamp,
  } = serviceData;

  const type = connection;
  const port_number = port;
  const ssh_commands =
    connection === "ssh" ? [`ssh user@${clusterIP} -p ${port}`] : null;
  const course_name = class_id;
  const professor_name = professor_id;
  const semester = new Date(creationTimestamp).toLocaleDateString();
  const language = port;
  const icon = type === "vscode" ? <VSCodeIcon /> : <SSHIcon />;

  const handlePlayClick = () => {
    if (type === "vscode") {
      const url = `${process.env.NEXT_PUBLIC_CONTAINER_URL}:${port_number}`;
      window.open(url, "_blank");
    } else {
      setModalOpen(true);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.topContainer}>{icon}</div>
        <div className={styles.bottomContainer}>
          <div className={styles.topDescription}>
            <div className={styles.courseName}>{course_name}</div>
            <div className={styles.professorName}> ({professor_name})</div>
          </div>
          <div className={styles.semester}>{semester}</div>
          <div className={styles.bottomDescription}>
            <div className={styles.language}>Port num: {language}</div>
            <PlayIcon
              className={`${styles.icon} ${
                type === "vscode" ? styles.disabledIcon : ""
              }`}
              onClick={handlePlayClick}
            />
          </div>
        </div>
      </div>
      {ssh_commands && (
        <SSHModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          content={ssh_commands}
        />
      )}
    </>
  );
}
