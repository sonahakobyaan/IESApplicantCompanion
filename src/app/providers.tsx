"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const tourSteps = [
  {
    selector: "#tour-eligibility",
    title: "Start with eligibility",
    content:
      "Answer five official requirement questions and see what needs confirmation.",
  },
  {
    selector: "#tour-journey",
    title: "See the application path",
    content:
      "Follow the official route from online application to onboarding and online volunteering.",
  },
  {
    selector: "#tour-checklist",
    title: "Prepare at your pace",
    content:
      "Keep your CV, application tasks, and next-stage preparation visible in one place.",
  },
  {
    selector: "#tour-deadlines",
    title: "Keep dates in view",
    content:
      "See the application window and the next programme stage without searching through long pages.",
  },
  {
    selector: "#tour-faq",
    title: "Find a clear answer",
    content:
      "Search official programme guidance on eligibility, documents, funding, accommodation, and travel.",
  },
  {
    selector: "#tour-assistant",
    title: "Meet the IES Guide",
    content:
      "Ask a quick question or jump to the right part of the companion. This is a prototype assistant.",
  },
];

function Tour() {
  const [step, setStep] = useState<number | null>(null);
  const [target, setTarget] = useState<DOMRect | null>(null);
  const current = step === null ? null : tourSteps[step];

  useEffect(() => {
    if (localStorage.getItem("ies-tour-seen")) return;
    const timer = window.setTimeout(() => setStep(0), 900);
    localStorage.setItem("ies-tour-seen", "true");
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!current) return;
    const element = document.querySelector(current.selector);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "center" });
    const update = () => setTarget(element.getBoundingClientRect());
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, [current]);

  if (!current || !target) return null;
  const activeStep = step ?? 0;
  const isLast = activeStep === tourSteps.length - 1;
  const cardTop = target.bottom + 18;
  const cardLeft = Math.min(Math.max(16, target.left), window.innerWidth - 356);

  return (
    <AnimatePresence>
      <motion.div
        className="tour-layer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className="tour-spotlight"
          style={{
            top: target.top - 8,
            left: target.left - 8,
            width: target.width + 16,
            height: target.height + 16,
          }}
        />
        <motion.aside
          className="tour-card"
          style={{ top: cardTop, left: cardLeft }}
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          role="dialog"
          aria-label="IES Applicant Companion tour"
        >
          <span className="tour-count">
            0{activeStep + 1} / 0{tourSteps.length}
          </span>
          <h2>{current.title}</h2>
          <p>{current.content}</p>
          <div className="tour-actions">
            <button onClick={() => setStep(null)}>Skip tour</button>
            <button
              className="tour-next"
              onClick={() => setStep(isLast ? null : activeStep + 1)}
            >
              {isLast ? "Finish" : "Next"}
            </button>
          </div>
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Tour />
      {children}
    </>
  );
}
