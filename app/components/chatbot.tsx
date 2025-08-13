/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import certsData from "../data/certs.json";
import skillsData from "../data/skills.json";
import projectsData from "../data/projects.json";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
`;

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
  padding: 0;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  padding: 1rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #00c8b8;
  border-bottom: none; /* Removed divider line */
`;

const Messages = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
  scrollbar-width: thin;
  scrollbar-color: #00c8b8 transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #00c8b8;
    border-radius: 10px;
  }

  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const MessageBubble = styled.div<{ role: string }>`
  max-width: 80%;
  align-self: ${({ role }) =>
    role === "user" ? "flex-end" : "flex-start"};
  background-color: ${({ role }) =>
    role === "user" ? "rgba(0, 200, 184, 0.2)" : "rgba(255, 255, 255, 0.05)"};
  border: 1px solid
    ${({ role }) =>
      role === "user" ? "#00c8b8" : "rgba(0, 200, 184, 0.5)"};
  border-radius: 14px;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  line-height: 1.4;
  animation: ${fadeIn} 0.3s ease;
  word-break: break-word;
`;

const Role = styled.div`
  font-size: 0.8rem;
  opacity: 0.7;
  margin-bottom: 0.2rem;
`;

const Content = styled.div`
  highlight {
    color: #00fff2;
    font-weight: bold;
    text-decoration: underline;
  }
`;

const Form = styled.form`
  display: flex;
  gap: 0.5rem;
  padding: 0.8rem;
  border-top: none; /* Removed divider line */
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

  &:focus {
    border-color: #00fff2;
    box-shadow: 0 0 10px #00fff2;
    background: rgba(0, 107, 95, 0.6);
  }
`;

const Button = styled.button`
  padding: 0 1.2rem;
  background: #00c8b8;
  border: none;
  border-radius: 14px;
  color: #0b1216;
  font-family: 'Bebas Neue', cursive;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;

  &:hover {
    background-color: #00fff2;
    box-shadow: 0 0 12px #00fff2;
  }

  &:disabled {
    background-color: #007663;
    cursor: not-allowed;
  }
`;

const TypingDots = styled.div`
  display: flex;
  gap: 0.3rem;
  padding: 0.4rem;
  align-items: center;
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  background-color: #00c8b8;
  border-radius: 50%;
  animation: blink 1.4s infinite both;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes blink {
    0%, 80%, 100% { opacity: 0; }
    40% { opacity: 1; }
  }
`;

// Helpers
const formatText = (text: string) => {
  return text
    .replace(/\n/g, "<br>")
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/\*(.*?)\*/g, "<i>$1</i>")
    .replace(/^- (.*$)/gim, "• $1");
};

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
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setChat((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...chat, userMessage] }),
      });
      const data = await res.json();
      setLoading(false);

      if (data.error) {
        setChat((prev) => [...prev, { role: "error", content: data.error }]);
      } else {
        const highlighted = highlightKeywords(data.reply);
        const formatted = formatText(highlighted);
        setChat((prev) => [...prev, { role: "assistant", content: formatted }]);
      }
    } catch {
      setLoading(false);
      setChat((prev) => [...prev, { role: "error", content: "Network error" }]);
    }
  };

  return (
    <ChatBox>
      <ChatHeader>AI Assistant</ChatHeader>
      <Messages>
        {chat.map((msg, idx) => (
          <MessageBubble key={idx} role={msg.role}>
            <Role>
              {msg.role === "user"
                ? "You"
                : msg.role === "assistant"
                ? "AI"
                : "Error"}
            </Role>
            <Content dangerouslySetInnerHTML={{ __html: msg.content }} />
          </MessageBubble>
        ))}
        {loading && (
          <MessageBubble role="assistant">
            <TypingDots>
              <Dot />
              <Dot />
              <Dot />
            </TypingDots>
          </MessageBubble>
        )}
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
        <Button type="submit" disabled={!input.trim() || loading}>
          Send
        </Button>
      </Form>
    </ChatBox>
  );
}
