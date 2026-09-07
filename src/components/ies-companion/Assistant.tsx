"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, X } from "lucide-react";
import type { View } from "@/data";

export function Assistant({
  go,
  close,
}: {
  go: (v: View) => void;
  close: () => void;
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([
    "Hi, I’m the IES Guide. I can point you to the right place to start.",
  ]);
  const send = (text = message) => {
    if (!text.trim()) return;
    setMessages([
      ...messages,
      text,
      text.toLowerCase().includes("deadline")
        ? "The application deadline is listed in the Deadlines section. Would you like to view it?"
        : text.toLowerCase().includes("document")
          ? "You can find preparation guidance in the checklist. I can take you there."
          : "I can help with that. Try the eligibility check for a personalised starting point.",
    ]);
    setMessage("");
  };
  return (
    <motion.aside
      className="assistant-panel"
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div className="assistant-head">
        <span className="assistant-avatar">
          <Sparkles size={17} />
        </span>
        <div>
          <b>IES Guide</b>
          <small>Prototype assistant</small>
        </div>
        <button onClick={close} aria-label="Close assistant">
          <X size={17} />
        </button>
      </div>
      <div className="chat-body">
        {messages.map((item, i) => (
          <div
            className={i % 2 ? "chat-bubble user" : "chat-bubble"}
            key={`${item}-${i}`}
          >
            {item}
          </div>
        ))}
        <div className="quick-replies">
          <button onClick={() => go("deadlines")}>View deadlines</button>
          <button onClick={() => go("eligibility")}>Check eligibility</button>
          <button onClick={() => go("checklist")}>Open checklist</button>
        </div>
      </div>
      <form
        className="chat-input"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a quick question..."
          aria-label="Ask the IES Guide"
        />
        <button aria-label="Send message">
          <Send size={16} />
        </button>
      </form>
      <p className="assistant-disclaimer">
        I’m a prototype guide, not an official IES representative.
      </p>
    </motion.aside>
  );
}
