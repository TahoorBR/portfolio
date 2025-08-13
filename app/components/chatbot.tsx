"use client";

import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import certsData from "../data/certs.json";
import skillsData from "../data/skills.json";
import projectsData from "../data/projects.json";
import aboutMeData from "../data/aboutMe.json";

// Styled components
const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: 'Bebas Neue', cursive;
  color: #a0f0e0;
  background: rgba(0, 107, 95, 0.18);
  border-radius: 20px;
  box-shadow: 0 0 12px #00c8b8;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  padding: 1rem;
  overflow: hidden;
`;

const Messages = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 0.8rem;
  scrollbar-width: thin;
  scrollbar-color: #00c8b8 transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #00c8b8;
    border-radius: 10px;
    border: 2px solid transparent;
  }
`;

const Message = styled.p<{ role: string }>`
  color: ${({ role }) =>
    role === "user" ? "#3b82f6" : role === "assistant" ? "#ddd" : "red"};
  font-weight: ${({ role }) => (role === "user" ? "bold" : "normal")};
  margin: 0.2rem 0;
  line-height: 1.4;
`;

const Highlight = styled.span`
  color: #00fff2;
  font-weight: bold;
  text-decoration: underline;
`;

const Form = styled.form`
  display: flex;
  gap: 0.5rem;
  max-width: 100%;
  align-items: center;
`;

const Input = styled.input`
  flex-grow: 1;
  min-width: 0;
  border: 2px solid #00c8b8;
  border-radius: 14px;
  background: rgba(0, 107, 95, 0.35);
  color: #cde4e3;
  padding: 0.6rem 1rem;
  font-family: 'Bebas Neue', cursive;
  font-size: 1.1rem;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #00fff2;
    box-shadow: 0 0 10px #00fff2;
    background: rgba(0, 107, 95, 0.6);
  }
`;

const Button = styled.button`
  height: 100%;
  padding: 0 1.2rem;
  box-sizing: border-box;
  background: #00c8b8;
  border: none;
  border-radius: 14px;
  color: #0b1216;
  font-family: 'Bebas Neue', cursive;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #00fff2;
    box-shadow: 0 0 12px #00fff2;
  }

  &:disabled {
    background-color: #007663;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

// Convert raw AI text into HTML (Markdown + line breaks + bullets)
const formatText = (text: string) => {
  return text
    .replace(/\n/g, "<br>")                        // line breaks
    .replace(/^### (.*$)/gim, "<h4>$1</h4>")       // H3 headers
    .replace(/^## (.*$)/gim, "<h3>$1</h3>")        // H2 headers
    .replace(/^# (.*$)/gim, "<h2>$1</h2>")         // H1 headers
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")        // bold
    .replace(/\*(.*?)\*/g, "<i>$1</i>")            // italic
    .replace(/^- (.*$)/gim, "• $1");               // bullets
};

// Highlight keywords in AI response
const highlightKeywords = (text: string) => {
  const allKeywords = [
    ...skillsData.flatMap((cat: any) => cat.skills.map((s: any) => s.name)),
    ...projectsData.map((p: any) => p.title),
    ...certsData.certifications.map((c: any) => c.title),
    ...certsData.awards,
    ...certsData.education.map((e: any) => e.degree),
  ];

  let formatted = text;
  allKeywords.forEach((keyword) => {
    const regex = new RegExp(`\\b(${keyword})\\b`, "gi");
    formatted = formatted.replace(regex, "<highlight>$1</highlight>");
  });

  return formatted;
};

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setChat((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...chat, userMessage] }),
      });
      const data = await res.json();

      if (data.error) {
        setChat((prev) => [...prev, { role: "error", content: data.error }]);
      } else {
        // Highlight and format AI response
        const highlighted = highlightKeywords(data.reply);
        const formatted = formatText(highlighted);

        setChat((prev) => [
          ...prev,
          { role: "assistant", content: formatted },
        ]);
      }
    } catch (err) {
      setChat((prev) => [...prev, { role: "error", content: "Network error" }]);
    }
  };

  return (
    <ChatBox>
      <Messages>
        {chat.map((msg, idx) => (
          <Message
            key={idx}
            role={msg.role}
            dangerouslySetInnerHTML={{ __html: msg.content }}
          />
        ))}
        <div ref={messagesEndRef} />
      </Messages>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          autoComplete="off"
        />
        <Button type="submit" disabled={!input.trim()}>
          Send
        </Button>
      </Form>
    </ChatBox>
  );
}
