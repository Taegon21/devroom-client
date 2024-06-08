"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Logo2Icon from "/public/icons/Logo2.svg";

const CreateContainerPage = () => {
  const [classId, setClassId] = useState<string>("");
  const [type, setType] = useState<string>("vscode");
  const [port, setPort] = useState<string>("");
  const [command, setCommand] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const containerData = {
      classId,
      type,
      port: type === "vscode" ? port : undefined,
      command: type === "ssh" ? command : undefined,
    };
    // console.log("Container Data:", containerData);
  };

  return (
    <>
      <h1 className={styles.title}>컨테이너 생성</h1>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <Logo2Icon />
          <div className={styles.logoText}>Create Container</div>
          <div className={styles.grayText}>
            Create a container for your class
          </div>
        </div>
        <div className={styles.rightContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="classId">Class ID</label>
              <input
                type="text"
                id="classId"
                value={classId}
                placeholder="ex) id-java2024"
                onChange={(e) => setClassId(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="type">Type</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="vscode">VSCode</option>
                <option value="ssh">SSH</option>
              </select>
            </div>
            {type === "ssh" && (
              <div className={styles.formGroup}>
                <label htmlFor="command">명령어</label>
                <input
                  type="text"
                  id="command"
                  placeholder="ex) ssh -p 22 user@host"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  required
                />
              </div>
            )}
            {type === "vscode" && (
              <div className={styles.formGroup}>
                <label htmlFor="port">Port 번호</label>
                <input
                  type="text"
                  id="port"
                  placeholder="ex) 8080"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  required
                />
              </div>
            )}
            <button type="submit" className={styles.submitButton}>
              생성
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateContainerPage;
