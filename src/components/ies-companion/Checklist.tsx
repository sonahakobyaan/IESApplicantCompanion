"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, RotateCcw, Sparkles } from "lucide-react";
import { checklistCategories, type View } from "@/data";
import { Button } from "./Button";
import { PageIntro } from "./PageIntro";

export function Checklist({
  completed,
  setCompleted,
  go,
}: {
  completed: string[];
  setCompleted: (v: string[]) => void;
  go: (v: View) => void;
}) {
  const total = checklistCategories.reduce(
    (sum, group) => sum + group.items.length,
    0,
  );
  const percent = Math.round((completed.length / total) * 100);
  const toggle = (item: string) =>
    setCompleted(
      completed.includes(item)
        ? completed.filter((value) => value !== item)
        : [...completed, item],
    );
  return (
    <>
      <PageIntro
        eyebrow="YOUR PREPARATION SPACE"
        title={
          percent === 100
            ? "You’re ready to apply."
            : "Make preparation feel manageable."
        }
        description="Keep your progress in one place. Your checklist is saved in this browser for your next visit."
      />
      <div className="checklist-summary">
        <div>
          <span className="eyebrow">OVERALL PROGRESS</span>
          <h2>
            {completed.length} <small>of {total} tasks complete</small>
          </h2>
          <div className="progress-track">
            <span style={{ width: `${percent}%` }} />
          </div>
        </div>
        <div className="big-percent">
          {percent}
          <span>%</span>
        </div>
        <button className="reset-button" onClick={() => setCompleted([])}>
          <RotateCcw size={15} /> Reset
        </button>
      </div>
      <div className="checklist-grid">
        {checklistCategories.map((group) => {
          const groupDone = group.items.filter((item) =>
            completed.includes(item),
          ).length;
          return (
            <section className="checklist-group" key={group.title}>
              <div className="group-heading">
                <h3>{group.title}</h3>
                <span>
                  {groupDone}/{group.items.length}
                </span>
              </div>
              {group.items.map((item) => (
                <button
                  className={
                    completed.includes(item) ? "check-item done" : "check-item"
                  }
                  key={item}
                  onClick={() => toggle(item)}
                >
                  <span className="checkbox">
                    {completed.includes(item) && <Check size={14} />}
                  </span>
                  <span>{item}</span>
                </button>
              ))}
            </section>
          );
        })}
      </div>
      {percent === 100 ? (
        <motion.div
          className="complete-banner"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
        >
          <Sparkles size={21} />
          <div>
            <b>You’re ready.</b>
            <span>
              All preparation steps are complete. Keep your confirmation
              somewhere safe.
            </span>
          </div>
          <Button small onClick={() => go("deadlines")}>
            Review deadlines <ArrowRight size={15} />
          </Button>
        </motion.div>
      ) : (
        <div className="checklist-tip">
          <Sparkles size={19} />
          <span>
            <b>Small steps add up.</b> Start with the documents you already
            have, then use the official requirements to fill the gaps.
          </span>
        </div>
      )}
    </>
  );
}
