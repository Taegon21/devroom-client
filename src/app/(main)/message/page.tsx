// components/MessagePage.tsx
"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styles from "./page.module.css";
import dummyData from "@/data/dummy_notice_data.json";
import dummyMessageData from "@/data/dummy_message_data.json";

interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
}

const MessagePage = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedProfessor, setSelectedProfessor] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    if (selectedCourse) {
      const professor = dummyData.find(
        (notice) => notice.course_name === selectedCourse
      )?.professor_name;
      setSelectedProfessor(professor || "");
      setMessages(dummyMessageData); 
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (dummyData.length > 0) {
      setSelectedCourse(dummyData[0].course_name);
    }
  }, []);

  useEffect(() => {
    setMessages(dummyMessageData);
  }, []);

  const handleCourseChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(event.target.value);
  };

  const handleNewMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newMsg: Message = {
      id: messages.length + 1,
      sender: "You",
      text: newMessage,
      timestamp: new Date().toLocaleString(),
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");

    // 임시로 2초 후에 교수님의 답변이 오는 기능
    setTimeout(() => {
      const professorReply: Message = {
        id: messages.length + 2,
        sender: "Professor",
        text: "I received your message.",
        timestamp: new Date().toLocaleString(),
      };
      setMessages((prevMessages) => [...prevMessages, professorReply]);
    }, 2000);
  };

  const courseOptions = Array.from(
    new Set(dummyData.map((notice) => notice.course_name))
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerTitle}>메세지</div>
        <div className={styles.selection}>
          <div className={styles.selectBox}>
            <select
              id="courseSelect"
              value={selectedCourse}
              onChange={handleCourseChange}
              className={styles.select}
            >
              {courseOptions.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
          {selectedProfessor && (
            <div className={styles.professorName}>
              Professor: {selectedProfessor}
            </div>
          )}
        </div>
        <div className={styles.messages}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.message} ${
                msg.sender === "You" ? styles.sent : styles.received
              }`}
            >
              <div className={styles.messageHeader}>
                <span className={styles.sender}>
                  {msg.sender === "You" ? "You" : selectedProfessor}
                </span>
                <span className={styles.timestamp}>{msg.timestamp}</span>
              </div>
              <div className={styles.text}>{msg.text}</div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className={styles.inputForm}>
          <input
            type="text"
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="메시지 입력..."
            className={styles.input}
          />
          <button type="submit" className={styles.sendButton}>
            전송
          </button>
        </form>
      </div>
    </>
  );
};

export default MessagePage;
