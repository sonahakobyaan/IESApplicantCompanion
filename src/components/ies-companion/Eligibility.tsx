"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { eligibilityCriteria, type EligibilityAnswer, type View } from "@/data";
import { Button } from "./Button";
import { PageIntro } from "./PageIntro";
import { Result } from "./Result";

export function Eligibility({
  answers,
  setAnswers,
  step,
  setStep,
  done,
  setDone,
  go,
}: {
  answers: Record<string, EligibilityAnswer>;
  setAnswers: (v: Record<string, EligibilityAnswer>) => void;
  step: number;
  setStep: (v: number) => void;
  done: boolean;
  setDone: (v: boolean) => void;
  go: (v: View) => void;
}) {
  const current = eligibilityCriteria[step];
  const result = Object.entries(answers).filter(
    ([id, value]) =>
      (id === "location" && value.startsWith("yes")) ||
      (id === "study" && ["bachelor", "master", "doctorate"].includes(value)) ||
      (id === "age" && value === "yes") ||
      (id === "academic" && value.startsWith("yes")) ||
      (id === "language" && value === "yes"),
  ).length;
  const uncertain = Object.values(answers).filter(
    (value) => value.includes("not-sure") || value === "no",
  ).length;
  if (done)
    return (
      <Result
        result={result}
        uncertain={uncertain}
        restart={() => {
          setAnswers({});
          setStep(0);
          setDone(false);
        }}
        go={go}
      />
    );
  return (
    <motion.div
      className="wizard-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="wizard-top">
        <PageIntro
          eyebrow="QUICK, INFORMATIVE, PRIVATE"
          title="Let’s find your starting point."
          description="Five official requirement questions. One clearer next step. Your answers stay in this browser."
        />
        <div className="wizard-progress">
          <div className="progress-label">
            <span>
              Question {step + 1} of {eligibilityCriteria.length}
            </span>
            <b>
              {Math.round(((step + 1) / eligibilityCriteria.length) * 100)}%
            </b>
          </div>
          <div className="progress-track">
            <span
              style={{
                width: `${((step + 1) / eligibilityCriteria.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
      <div className="question-card">
        <span className="question-number">0{step + 1}</span>
        <h2>{current.label}</h2>
        <p>{current.hint}</p>
        <div className="option-grid">
          {current.options.map((option) => {
            const value = option
              .toLowerCase()
              .replaceAll(" ", "-") as EligibilityAnswer;
            return (
              <button
                className={
                  answers[current.id] === value ? "option selected" : "option"
                }
                key={option}
                onClick={() => setAnswers({ ...answers, [current.id]: value })}
              >
                <span className="radio-dot" />
                {option}
                {answers[current.id] === value && <Check size={17} />}
              </button>
            );
          })}
        </div>
        <div className="wizard-actions">
          {step > 0 ? (
            <button className="back-link" onClick={() => setStep(step - 1)}>
              <ChevronLeft size={17} /> Back
            </button>
          ) : (
            <span />
          )}
          {step < eligibilityCriteria.length - 1 ? (
            <Button onClick={() => answers[current.id] && setStep(step + 1)}>
              Continue <ChevronRight size={17} />
            </Button>
          ) : (
            <Button onClick={() => answers[current.id] && setDone(true)}>
              See my result <ArrowRight size={17} />
            </Button>
          )}
        </div>
      </div>
      <p className="privacy-note">
        <Check size={15} /> This is an informational guide, not an official
        eligibility decision.
      </p>
    </motion.div>
  );
}
