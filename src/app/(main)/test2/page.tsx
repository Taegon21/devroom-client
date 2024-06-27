"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useCreateClass } from "@/api/hooks/useProfessor";

interface ClassCreationData {
  className: string;
  studentIds: string[];
  options: { [key: string]: string };
  command: string[];
  customScript: string;
}

const CreateClassForm: React.FC = () => {
  const [professorId, setProfessorId] = useState<string>("2019312218");
  const [classData, setClassData] = useState<ClassCreationData>({
    className: "",
    studentIds: [],
    options: { vscode: "yes" },
    command: [],
    customScript: "",
  });

  const { mutate: createClass, isError, error } = useCreateClass();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setClassData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStudentIdsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setClassData((prev) => ({
      ...prev,
      studentIds: value.split(",").map((id) => id.trim()),
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createClass({ professorId, classData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create a New Class</h1>
      <label>
        Professor ID:
        <input
          type="text"
          name="professorId"
          value={professorId}
          onChange={(e) => setProfessorId(e.target.value)}
        />
      </label>
      <label>
        Class Name:
        <input
          type="text"
          name="className"
          value={classData.className}
          onChange={handleChange}
        />
      </label>
      <label>
        Student IDs (comma separated):
        <input
          type="text"
          name="studentIds"
          onChange={handleStudentIdsChange}
        />
      </label>
      <label>
        Custom Script:
        <textarea
          name="customScript"
          value={classData.customScript}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Create Class</button>
      {isError && <p>Error: {error?.message}</p>}
    </form>
  );
};

export default CreateClassForm;
