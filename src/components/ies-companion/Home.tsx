"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Check,
  ClipboardCheck,
  Clock3,
  Compass,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import type { View } from "@/data";
import { Button } from "./Button";
import { reveal, stagger } from "./animations";

export function Home({
  go,
  readiness,
  completed,
  total,
  eligibilityDone,
}: {
  go: (v: View) => void;
  readiness: number;
  completed: number;
  total: number;
  eligibilityDone: boolean;
}) {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            INDEPENDENT APPLICANT-SUPPORT PROTOTYPE
          </span>
          <h1>
            Your journey to <em>IES</em> starts here.
          </h1>
          <p>
            Check your eligibility, understand the application process, prepare
            what you need and keep important deadlines in one place.
          </p>
          <div className="hero-actions">
            <Button onClick={() => go("eligibility")}>
              Check my eligibility <ArrowRight size={17} />
            </Button>
            <Button secondary onClick={() => go("programme")}>
              Explore the programme
            </Button>
          </div>
          <div className="hero-meta">
            <span>
              <span className="status-dot" /> Built for clarity
            </span>
            <span>
              <Check size={15} /> No account required
            </span>
          </div>
        </div>
        <div className="journey-visual">
          <div className="visual-head">
            <span>YOUR APPLICATION JOURNEY</span>
            <span className="live-pill">
              <span /> LIVE GUIDE
            </span>
          </div>
          {[
            ["01", "Discover", "Start with the essentials"],
            ["02", "Check eligibility", "See what to confirm"],
            ["03", "Prepare", "Build your application"],
            ["04", "Apply", "Take the next step"],
          ].map((item, i) => (
            <motion.div
              className={`visual-step ${i === 1 ? "current" : ""}`}
              key={item[0]}
              variants={reveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.45 + i * 0.1 }}
            >
              <span className="step-num">{item[0]}</span>
              <div>
                <b>{item[1]}</b>
                <small>{item[2]}</small>
              </div>
              <ArrowRight size={17} />
            </motion.div>
          ))}
          <div className="visual-foot">
            <span>Ready when you are</span>
            <Sparkles size={16} />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">ONE PLACE TO BEGIN</span>
          <h2>Move forward with a little more certainty.</h2>
          <p>
            From first question to final application, the important pieces are
            easier to find and act on.
          </p>
        </div>
        <div className="feature-grid">
          {[
            [
              Compass,
              "Know where you stand",
              "Answer a few questions and get a quick informational eligibility result.",
            ],
            [
              Clock3,
              "Never miss an important date",
              "See configurable application dates and your next recommended action.",
            ],
            [
              ClipboardCheck,
              "Prepare with confidence",
              "Follow a simple, persistent checklist so nothing gets lost.",
            ],
            [
              HelpCircle,
              "Find answers faster",
              "Search common questions without digging through long documents.",
            ],
            [
              BookOpen,
              "Understand the journey",
              "See what happens before, during and after your application.",
            ],
          ].map(([Icon, title, copy], i) => (
            <motion.button
              className="feature-card"
              id={
                i === 0
                  ? "tour-eligibility"
                  : i === 1
                    ? "tour-deadlines"
                    : i === 2
                      ? "tour-checklist"
                      : i === 3
                        ? "tour-faq"
                        : "tour-journey"
              }
              key={title as string}
              variants={reveal}
              whileInView="visible"
              initial="hidden"
              viewport={{ once: true, amount: 0.25 }}
              onClick={() =>
                go(
                  (i === 0
                    ? "eligibility"
                    : i === 1
                      ? "deadlines"
                      : i === 2
                        ? "checklist"
                        : i === 3
                          ? "faq"
                          : "journey") as View,
                )
              }
              whileHover={{ y: -4 }}
            >
              <span className="feature-icon">
                <Icon size={21} />
              </span>
              <span>
                <b>{title as string}</b>
                <small>{copy as string}</small>
              </span>
              <ArrowRight size={17} />
            </motion.button>
          ))}
        </div>
      </section>
      <section className="readiness-banner">
        <div>
          <span className="eyebrow">YOUR PREPARATION</span>
          <h2>
            {eligibilityDone
              ? "Welcome back. Keep your momentum."
              : "Ready to see if IES could be right for you?"}
          </h2>
          <p>
            {eligibilityDone
              ? `You have ${completed} of ${total} preparation steps complete.`
              : "Start with a quick check and get a clear next step."}
          </p>
        </div>
        {eligibilityDone ? (
          <div className="mini-score">
            <strong>{readiness}%</strong>
            <span>readiness</span>
          </div>
        ) : (
          <Button onClick={() => go("eligibility")}>
            Start eligibility check <ArrowRight size={16} />
          </Button>
        )}
      </section>
      <div className="disclaimer">
        <HelpCircle size={17} />
        <p>
          <b>A note on accuracy</b> This quick check is an informational guide
          based on criteria provided by IES. Final eligibility is determined by
          the official IES application process.
        </p>
      </div>
    </motion.div>
  );
}
