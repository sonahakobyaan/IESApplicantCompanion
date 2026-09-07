"use client";

import { useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowRight, ExternalLink, Menu, MessageCircle, X } from "lucide-react";
import {
  checklistCategories,
  programme,
  type EligibilityAnswer,
  type View,
} from "@/data";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { useStored } from "./useStored";
import { Home } from "./Home";
import { Programme } from "./Programme";
import { Eligibility } from "./Eligibility";
import { Journey } from "./Journey";
import { Deadlines } from "./Deadlines";
import { FAQ } from "./FAQ";
import { Checklist } from "./Checklist";
import { Assistant } from "./Assistant";

const navItems: { id: View; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "programme", label: "Programme" },
  { id: "eligibility", label: "Eligibility" },
  { id: "journey", label: "How it works" },
  { id: "deadlines", label: "Deadlines" },
  { id: "faq", label: "FAQ" },
  { id: "checklist", label: "Checklist" },
];

export function App() {
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [view, setView] = useState<View>("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [answers, setAnswers] = useStored<Record<string, EligibilityAnswer>>(
    "ies-answers",
    {},
  );
  const [completed, setCompleted] = useStored<string[]>("ies-checklist", []);
  const [eligibleStep, setEligibleStep] = useState(0);
  const [eligibilityDone, setEligibilityDone] = useStored(
    "ies-eligibility-done",
    false,
  );
  const go = (next: View) => {
    const updateView = () => {
      setView(next);
      setMobileOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const browserWithTransitions = document as Document & {
      startViewTransition?: (update: () => void) => unknown;
    };
    if (browserWithTransitions.startViewTransition) {
      browserWithTransitions.startViewTransition(updateView);
    } else {
      updateView();
    }
  };
  const checklistTotal = checklistCategories.reduce(
    (sum, group) => sum + group.items.length,
    0,
  );
  const readiness = Math.min(
    100,
    Math.round(
      (completed.length / checklistTotal) * 55 +
        (eligibilityDone ? 25 : 0) +
        20,
    ),
  );
  return (
    <MotionConfig
      transition={{ duration: 0.32, ease: "easeOut" }}
      reducedMotion="user"
    >
      <LayoutGroup id="ies-companion">
        <div className="app-shell">
          <motion.div
            className="scroll-progress"
            style={{ scaleX: smoothScrollProgress }}
            aria-hidden="true"
          />
          <header
            className="topbar"
            style={{ viewTransitionName: "site-header" } as React.CSSProperties}
          >
            <div className="container nav-wrap">
              <button
                className="logo-button"
                onClick={() => go("home")}
                aria-label="Go to home"
              >
                <Logo />
              </button>
              <nav className={mobileOpen ? "nav mobile-visible" : "nav"}>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    className={
                      view === item.id ? "nav-link active" : "nav-link"
                    }
                    onClick={() => go(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
                <Button small onClick={() => go("eligibility")}>
                  Check my eligibility <ArrowRight size={15} />
                </Button>
              </nav>
              <button
                className="menu-button"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation"
              >
                {mobileOpen ? <X /> : <Menu />}
              </button>
            </div>
          </header>
          <main className="container main-content">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                {view === "home" && (
                  <Home
                    go={go}
                    readiness={readiness}
                    completed={completed.length}
                    total={checklistTotal}
                    eligibilityDone={eligibilityDone}
                  />
                )}
                {view === "programme" && <Programme go={go} />}
                {view === "eligibility" && (
                  <Eligibility
                    answers={answers}
                    setAnswers={setAnswers}
                    step={eligibleStep}
                    setStep={setEligibleStep}
                    done={eligibilityDone}
                    setDone={setEligibilityDone}
                    go={go}
                  />
                )}
                {view === "journey" && (
                  <Journey
                    completed={completed}
                    setCompleted={setCompleted}
                    go={go}
                  />
                )}
                {view === "deadlines" && <Deadlines />}
                {view === "faq" && <FAQ />}
                {view === "checklist" && (
                  <Checklist
                    completed={completed}
                    setCompleted={setCompleted}
                    go={go}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </main>
          <footer className="footer">
            <div className="container footer-grid">
              <div>
                <Logo />
                <p>
                  An independent prototype designed to improve the applicant
                  experience.
                </p>
              </div>
              <div>
                <span className="footer-label">Explore</span>
                <div className="footer-links">
                  {navItems.slice(1, 6).map((item) => (
                    <button key={item.id} onClick={() => go(item.id)}>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="footer-note">
                <span className="demo-dot" /> Demo data · Always verify
                requirements and dates through official IES sources.
                <br />
                <a
                  href={programme.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Official IES information <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </footer>
          <button
            className="assistant-fab"
            id="tour-assistant"
            onClick={() => setChatOpen(!chatOpen)}
            aria-label="Open IES Guide assistant"
          >
            {chatOpen ? <X /> : <MessageCircle />}
            <span>IES Guide</span>
          </button>
          <AnimatePresence>
            {chatOpen && <Assistant go={go} close={() => setChatOpen(false)} />}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
}
