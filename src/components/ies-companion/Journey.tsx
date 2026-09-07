import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { journeySteps, type View } from "@/data";
import { Button } from "./Button";
import { PageIntro } from "./PageIntro";
import { reveal } from "./animations";

export function Journey({
  completed,
  setCompleted,
  go,
}: {
  completed: string[];
  setCompleted: (v: string[]) => void;
  go: (v: View) => void;
}) {
  const toggle = (id: string) =>
    setCompleted(
      completed.includes(id)
        ? completed.filter((item) => item !== id)
        : [...completed, id],
    );
  return (
    <>
      <PageIntro
        eyebrow="YOUR ROADMAP"
        title="From first question to final application."
        description="A simple view of the journey, with room to mark the preparation steps you control."
      />
      <div className="journey-page">
        <div className="journey-line">
          {journeySteps.map(([number, title, copy], i) => (
            <motion.div
              className={`timeline-item ${i === 1 ? "highlight" : ""}`}
              key={number}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <button
                className={
                  completed.includes(number)
                    ? "timeline-number checked"
                    : "timeline-number"
                }
                onClick={() => toggle(number)}
                aria-label={`Mark ${title} complete`}
              >
                {completed.includes(number) ? <Check size={18} /> : number}
              </button>
              <div>
                <span className="eyebrow">STEP {number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
              <span className="timeline-status">
                {completed.includes(number)
                  ? "Complete"
                  : i < 2
                    ? "Start here"
                    : "Up next"}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="journey-cta">
          <div>
            <span className="eyebrow">KEEP GOING</span>
            <h3>Turn the roadmap into a plan.</h3>
            <p>Use the checklist to track your own preparation.</p>
          </div>
          <Button small onClick={() => go("checklist")}>
            Open checklist <ArrowRight size={15} />
          </Button>
        </div>
      </div>
    </>
  );
}
