import { ArrowRight, Check, Sparkles } from "lucide-react";
import {
  programme,
  programmeComponents,
  scholarshipAmounts,
  scholarshipCoverage,
  type View,
} from "@/data";
import { Button } from "./Button";
import { PageIntro } from "./PageIntro";

export function Programme({ go }: { go: (v: View) => void }) {
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
              {programme.description} Designed for motivated and socially
              engaged students, IES combines academic study with practical
              experience, community participation, and cultural discovery in
              Berlin.
            </p>
          </div>
          {programmeComponents.map(({ title, description }) => (
            <div className="text-row" key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
          <div className="text-row">
            <h3>Partner universities</h3>
            <p>{programme.universities.join(" · ")}</p>
          </div>
          <div className="text-row">
            <h3>Campus life & funding</h3>
            <p>{scholarshipCoverage.join(" ")}</p>
          </div>
          <div className="text-row">
            <h3>Programme history</h3>
            <p>{programme.history}</p>
          </div>
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
