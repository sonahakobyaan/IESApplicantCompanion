"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  ExternalLink,
  HelpCircle,
  PencilLine,
} from "lucide-react";
import { faqItems, programme } from "@/data";
import { PageIntro } from "./PageIntro";
import { reveal } from "./animations";

export function FAQ() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const categories = [
    "All",
    ...Array.from(new Set(faqItems.map((item) => item.category))),
  ];
  const filtered = faqItems.filter(
    (item) =>
      (category === "All" || item.category === category) &&
      `${item.question} ${item.answer}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <PageIntro
        eyebrow="ANSWERS, WITHOUT THE DIGGING"
        title="A clearer answer is usually a search away."
        description="Browse the questions applicants ask most often. Content is structured so official answers can be swapped in easily."
      />
      <div className="faq-tools">
        <div className="search-box">
          <PencilLine size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions..."
            aria-label="Search frequently asked questions"
          />
        </div>
        <div className="category-row">
          {categories.map((item) => (
            <button
              className={category === item ? "category active" : "category"}
              onClick={() => setCategory(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="faq-list">
        {filtered.map((item, i) => (
          <motion.div
            className="faq-item"
            key={item.question}
            layout
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <button
              className="faq-question"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span>
                <small>{item.category}</small>
                {item.question}
              </span>
              {open === i ? (
                <ChevronDown className="rotated" />
              ) : (
                <ChevronDown />
              )}
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <p>{item.answer}</p>
                  <div className="helpful">
                    Was this helpful?{" "}
                    <button>
                      <Check size={14} /> Yes
                    </button>
                    <button>No</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <HelpCircle size={25} />
          <h3>No questions found</h3>
          <p>Try a different phrase or browse all categories.</p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
          >
            Clear search
          </button>
        </div>
      )}
      <div className="faq-bottom">
        <div>
          <h3>Didn’t find your answer?</h3>
          <p>
            Always use the official IES information as your source of truth.
          </p>
        </div>
        <a href={programme.officialUrl} target="_blank" rel="noreferrer">
          Visit official information <ExternalLink size={15} />
        </a>
      </div>
    </>
  );
}
