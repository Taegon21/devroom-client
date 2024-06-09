import styles from "./Container.module.css";
import VSCodeIcon from "/public/icons/VSCode.svg";
import SSHIcon from "/public/icons/SSH.svg";
import PlayIcon from "/public/icons/Play.svg";

interface ContainerProps {
  type: string;
  port_number?: number | null;
  ssh_commands?: string[] | null;
  course_name: string;
  professor_name: string;
  semester: string;
  language: string;
}

export default function Container({
  type,
  port_number,
  ssh_commands,
  course_name,
  professor_name,
  semester,
  language,
}: ContainerProps) {
  const icon = type === "vscode" ? <VSCodeIcon /> : <SSHIcon />;

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
            <div className={styles.language}>Language: {language}</div>
            <PlayIcon className={styles.icon} />
          </div>
        </div>
      </div>
    </>
  );
}
