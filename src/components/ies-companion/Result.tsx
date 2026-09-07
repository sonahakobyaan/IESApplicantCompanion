"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, RotateCcw, Sparkles } from "lucide-react";
import type { View } from "@/data";
import { Button } from "./Button";
import { PageIntro } from "./PageIntro";
import { reveal } from "./animations";

export function Result({
  result,
  uncertain,
  restart,
  go,
}: {
  result: number;
  uncertain: number;
  restart: () => void;
  go: (v: View) => void;
}) {
  const positive = uncertain === 0 && result >= 4;
  const tone = positive ? "good" : uncertain > 1 ? "warn" : "neutral";
  const readiness = Math.min(92, 48 + result * 7 - uncertain * 4);
  return (
    <motion.div
      className="result-page"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <PageIntro
        eyebrow="YOUR INFORMATIONAL RESULT"
        title={
          positive
            ? "You appear to meet the basic criteria."
            : "You have a promising starting point."
        }
        description="Based on your answers, here’s what we’d recommend next. Verify all requirements through the official IES application process."
      />
      <div className="result-grid">
        <div className={`result-card ${tone}`}>
          <div className="result-icon">
            {positive ? <Check /> : <Sparkles />}
          </div>
          <span className="result-kicker">
            {positive ? "LOOKING GOOD" : "KEEP CONFIRMING"}
          </span>
          <h2>
            {positive
              ? "Your next step is preparation."
              : "A few things need a closer look."}
          </h2>
          <p>
            {positive
              ? "Your answers suggest the basic criteria are in place. It’s time to turn your attention to documents and deadlines."
              : "You may be eligible, but some requirements need to be confirmed before you apply."}
          </p>
          <div className="reason-list">
            {[
              "Core eligibility requirements reviewed",
              uncertain
                ? "Some answers need confirmation"
                : "Language requirement appears to be met",
              "CV preparation can be reviewed in the checklist",
            ].map((reason, i) => (
              <div key={reason}>
                <span
                  className={i === 1 && uncertain ? "mark warn-mark" : "mark"}
                >
                  {i === 1 && uncertain ? "!" : "✓"}
                </span>
                {reason}
              </div>
            ))}
          </div>
        </div>
        <div className="readiness-card">
          <span className="eyebrow">APPLICATION READINESS</span>
          <div
            className="circle-score"
            style={
              { "--score": `${readiness * 3.6}deg` } as React.CSSProperties
            }
          >
            <div>
              <strong>{readiness}%</strong>
              <small>prepared</small>
            </div>
          </div>
          <p>
            This reflects how complete your preparation is. It is not a
            prediction of admission.
          </p>
          <div className="score-bars">
            {[
              ["Eligibility", positive ? 82 : 61],
              ["Documents", 42],
              ["Language", uncertain ? 54 : 78],
              ["Preparation", 36],
            ].map(([label, value]) => (
              <div key={label as string}>
                <span>
                  {label as string}
                  <b>{value}%</b>
                </span>
                <div className="tiny-track">
                  <i style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <motion.div
        className="next-action"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={reveal}
      >
        <div>
          <span className="eyebrow">YOUR NEXT BEST ACTION</span>
          <h3>Prepare your academic documents</h3>
          <p>
            Keep your core documents together so the official application feels
            more manageable.
          </p>
        </div>
        <Button small onClick={() => go("checklist")}>
          Open checklist <ArrowRight size={15} />
        </Button>
      </motion.div>
      <div className="result-links">
        <button onClick={() => go("deadlines")}>
          View deadlines <ArrowRight size={15} />
        </button>
        <button onClick={() => go("faq")}>
          Review FAQ <ArrowRight size={15} />
        </button>
        <button onClick={restart}>
          <RotateCcw size={15} /> Start again
        </button>
      </div>
    </motion.div>
  );
}
