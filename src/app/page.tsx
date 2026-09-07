"use client";
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity */

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Compass,
  ExternalLink,
  FileText,
  Flag,
  HelpCircle,
  Menu,
  MessageCircle,
  PencilLine,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import {
  checklistCategories,
  deadlines,
  eligibilityCriteria,
  faqItems,
  journeySteps,
  programme,
  type EligibilityAnswer,
  type View,
} from "@/data";

const navItems: { id: View; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "programme", label: "Programme" },
  { id: "eligibility", label: "Eligibility" },
  { id: "journey", label: "How it works" },
  { id: "deadlines", label: "Deadlines" },
  { id: "faq", label: "FAQ" },
  { id: "checklist", label: "Checklist" },
];
function useStored<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) setValue(JSON.parse(saved) as T);
  }, [key]);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue] as const;
}
function Logo() {
  return (
    <div className="brand">
      <Image
        src="/logo_horizontal.png"
        alt="IES Applicant Companion"
        width={2048}
        height={520}
        priority
      />
    </div>
  );
}
function IconFor({ icon }: { icon: string }) {
  const props = { size: 18, strokeWidth: 2 };
  if (icon === "file") return <FileText {...props} />;
  if (icon === "bell") return <Bell {...props} />;
  if (icon === "flag") return <Flag {...props} />;
  if (icon === "arrow") return <ArrowRight {...props} />;
  return <Sparkles {...props} />;
}
function Button({
  children,
  onClick,
  secondary = false,
  small = false,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  small?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      className={`button ${secondary ? "button-secondary" : ""} ${small ? "button-small" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function App() {
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
    setView(next);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    <div className="app-shell">
      <header className="topbar">
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
                className={view === item.id ? "nav-link active" : "nav-link"}
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
        <AnimatePresence mode="wait">
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
            <span className="demo-dot" /> Demo data · Always verify requirements
            and dates through official IES sources.
            <br />
            <a href={programme.officialUrl} target="_blank" rel="noreferrer">
              Official IES information <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </footer>
      <button
        className="assistant-fab"
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
  );
}
function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      className="page-intro"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </motion.div>
  );
}
function Home({
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
            <div
              className={`visual-step ${i === 1 ? "current" : ""}`}
              key={item[0]}
            >
              <span className="step-num">{item[0]}</span>
              <div>
                <b>{item[1]}</b>
                <small>{item[2]}</small>
              </div>
              <ArrowRight size={17} />
            </div>
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
              key={title as string}
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
function Programme({ go }: { go: (v: View) => void }) {
  return (
    <>
      <PageIntro
        eyebrow="THE BIG PICTURE"
        title="Understand the opportunity before you apply."
        description="A clear starting point for learning what IES is, who it is for and what the journey can look like."
      />
      <div className="programme-layout">
        <div className="programme-main">
          <div className="quote-block">
            <Sparkles size={22} />
            <h2>What is IES?</h2>
            <p>
              Replace this section with the official IES programme description.
              This prototype creates a calm, structured place for applicants to
              understand the opportunity before they commit time to an
              application.
            </p>
          </div>
          {[
            [
              "Why participate?",
              "Use this space for the official benefits, learning outcomes or experience applicants can expect.",
            ],
            [
              "Who is it for?",
              "Add the official audience and eligibility summary here, with a link to the full requirements.",
            ],
            [
              "What can applicants expect?",
              "Describe the programme rhythm, key stages and support available in concise, human language.",
            ],
          ].map(([title, copy]) => (
            <div className="text-row" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
        <aside className="side-panel">
          <span className="eyebrow">THE SHORT VERSION</span>
          <div className="side-list">
            {[
              "Explore the programme",
              "Check your starting point",
              "Prepare your documents",
              "Apply with confidence",
            ].map((item, i) => (
              <div key={item}>
                <span>0{i + 1}</span>
                {item}
                <Check size={15} />
              </div>
            ))}
          </div>
          <Button onClick={() => go("eligibility")}>
            Check my eligibility <ArrowRight size={16} />
          </Button>
        </aside>
      </div>
    </>
  );
}
function Eligibility({
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
  const result = Object.values(answers).filter(
    (value) => value === "yes" || value === "undergraduate",
  ).length;
  const uncertain = Object.values(answers).filter(
    (value) => value === "unsure" || value === "I am still preparing",
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
          description="Six thoughtful questions. One clearer next step. Your answers stay in this browser."
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
function Result({
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
              "Education requirement appears to be met",
              uncertain
                ? "Some answers need confirmation"
                : "Language requirement appears to be met",
              "Document readiness can be improved",
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
      <div className="next-action">
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
      </div>
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
function Journey({
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
            <div
              className={`timeline-item ${i === 1 ? "highlight" : ""}`}
              key={number}
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
            </div>
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
function Deadlines() {
  const next = deadlines[1];
  const days = Math.max(
    0,
    Math.ceil((new Date(next.date).getTime() - Date.now()) / 86400000),
  );
  return (
    <>
      <PageIntro
        eyebrow="DATES THAT MATTER"
        title="Keep the important moments in view."
        description="These are configurable demo dates. Before production use, replace them with the official IES timeline."
      />
      <div className="demo-notice">
        <Clock3 size={17} />
        <span>
          <b>Demo timeline</b> Dates shown here are placeholders for the
          prototype and should be replaced with verified official dates.
        </span>
      </div>
      <div className="deadline-grid">
        {deadlines.map((item, i) => (
          <div
            className={`deadline-card ${i === 1 ? "featured" : ""}`}
            key={item.title}
          >
            <div className="deadline-top">
              <span className="deadline-icon">
                <IconFor icon={item.icon} />
              </span>
              <span className="status-badge">
                {i === 1 ? "Next up" : item.status}
              </span>
            </div>
            <h3>{item.title}</h3>
            <strong>{item.label}</strong>
            <p>{item.description}</p>
            {i === 1 && (
              <div className="countdown">
                <span>Application closes in</span>
                <b>
                  {days} <small>days</small>
                </b>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="now-card">
        <div>
          <span className="eyebrow">WHAT SHOULD I DO NOW?</span>
          <h2>Give yourself room to review.</h2>
          <p>
            The best next action is to prepare your academic and identification
            documents before the application window opens.
          </p>
        </div>
        <ArrowRight size={22} />
      </div>
    </>
  );
}
function FAQ() {
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
          <div className="faq-item" key={item.question}>
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
          </div>
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
function Checklist({
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
        <div className="complete-banner">
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
        </div>
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
function Assistant({
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
export default function HomePage() {
  return <App />;
}
