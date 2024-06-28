"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Logo2Icon from "/public/icons/Logo2.svg";
import WarningModal from "@/components/common/WarningModal";
import { useDeleteClass, useFetchCheck } from "@/api/hooks/useProfessor";
import { ContainerCheckSchema, ContainerDeleteSchema } from "@/type/schemas";
import { IDelete } from "@/type/interfaces";
import { useUserStore } from "@/store/userStore";

const transformData = (input: ContainerCheckSchema[]): IDelete[] => {
  if (!input) return [];
  return input.map((item) => {
    const output: IDelete = {
      className: item.labels.class_id,
      type: item.labels.connection,
      status: item.status,
      command:
        item.labels.connection === "ssh" ? `ssh -p 22 user@${item.ip}` : "",
    };
    return output;
  });
};

const EditContainerPage = () => {
  const { studentId } = useUserStore();
  const [classId, setClassId] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [containerStatus, setStatus] = useState<string>("");
  const [command, setCommand] = useState<string>("");
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const { data: containerCheckData, isLoading, error } = useFetchCheck();
  const { mutate: deleteClass, status } = useDeleteClass();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const classData = transformData(containerCheckData);

  const handleClassIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setClassId(selectedId);

    const selectedData = classData.find(
      (data) => data.className === selectedId
    );
    if (selectedData) {
      setType(selectedData.type);
      setStatus(selectedData.status);
      setCommand(selectedData.command);
    } else {
      setType("");
      setStatus("");
      setCommand("");
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const containerData = {
      classId,
      type,
      port: type === "vscode" ? containerStatus : undefined,
      command: type === "ssh" ? command : undefined,
    };
    console.log("Container Data:", containerData);
    setShowSaveModal(true);
  };

  const handleDelete = () => {
    const deleteData: ContainerDeleteSchema = {
      className: classId.replace(/^id-/, ""),
      studentId: "all",
    };
    console.log("Delete Data:", deleteData);
    deleteClass({ professorId: studentId, deleteData: deleteData });
    setShowDeleteModal(true);
  };

  return (
    <>
      <h1 className={styles.title}>컨테이너 수정 및 삭제</h1>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <Logo2Icon />
          <div className={styles.logoText}>Edit Container</div>
          <div className={styles.grayText}>Edit or delete your container</div>
        </div>
        <div className={styles.rightContainer}>
          <form className={styles.form} onSubmit={handleSave}>
            <div className={styles.formGroup}>
              <label htmlFor="classId">Class ID</label>
              <select
                id="classId"
                value={classId}
                onChange={handleClassIdChange}
                required
              >
                <option value="">Select Class ID</option>
                {classData.map((data: IDelete, index: number) => (
                  <option key={index} value={data.className}>
                    {data.className}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="type">Type</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                disabled={!classId}
              >
                <option value=""></option>
                <option value="vscode">VSCode</option>
                <option value="ssh">SSH</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="port">Status</label>
              <input
                type="text"
                id="port"
                value={containerStatus}
                onChange={(e) => setStatus(e.target.value)}
                required
                disabled={type !== "vscode"}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="command">명령어</label>
              <input
                type="text"
                id="command"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                required
                disabled={type !== "ssh"}
              />
            </div>
            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.saveButton}>
                수정
              </button>
              <button
                type="button"
                className={styles.deleteButton}
                onClick={handleDelete}
              >
                삭제
              </button>
            </div>
          </form>
        </div>
      </div>
      {showSaveModal && (
        <WarningModal
          message={`"${classId}" 컨테이너가 수정되었습니다`}
          onClose={() => setShowSaveModal(false)}
        />
      )}
      {showDeleteModal && (
        <WarningModal
          message={`"${classId}" 컨테이너가 삭제되었습니다`}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
};

export default EditContainerPage;
