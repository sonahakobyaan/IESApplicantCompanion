"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Bell, Clock3 } from "lucide-react";
import { deadlines } from "@/data";
import { IconFor } from "./IconFor";
import { PageIntro } from "./PageIntro";
import { useStored } from "./useStored";

export function Deadlines() {
  const [now, setNow] = useState(0);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(Date.now());
    const interval = window.setInterval(() => setNow(Date.now()), 60000);
    return () => window.clearInterval(interval);
  }, []);
  const next = deadlines.find(
    (deadline) => new Date(deadline.date).getTime() > now,
  );
  const countdownTarget = next ?? deadlines[deadlines.length - 1];
  const [reminderDate, setReminderDate] = useStored<string | null>(
    "ies-deadline-reminder",
    null,
  );
  const [notificationState, setNotificationState] = useState<
    NotificationPermission | "unsupported"
  >("unsupported");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if ("Notification" in window) setNotificationState(Notification.permission);
  }, []);
  const setDeadlineReminder = async () => {
    if (!next) return;
    if ("Notification" in window && Notification.permission === "default") {
      const permission = await Notification.requestPermission();
      setNotificationState(permission);
    }
    setReminderDate(next.date);
  };
  const days = Math.max(
    0,
    Math.ceil((new Date(countdownTarget.date).getTime() - now) / 86400000),
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
        {deadlines.map((item) => (
          <div
            className={`deadline-card ${item === next ? "featured" : ""}`}
            key={item.title}
          >
            <div className="deadline-top">
              <span className="deadline-icon">
                <IconFor icon={item.icon} />
              </span>
              <span className="status-badge">
                {item === next ? "Next up" : item.status}
              </span>
            </div>
            <h3>{item.title}</h3>
            <strong>{item.label}</strong>
            <p>{item.description}</p>
            {item === next && (
              <div className="countdown">
                <span>
                  {next ? "Next programme stage in" : "Latest programme date"}
                </span>
                <b>
                  {days} <small>days</small>
                </b>
                <button
                  className="reminder-button"
                  onClick={setDeadlineReminder}
                >
                  <Bell size={14} />
                  {reminderDate === next.date
                    ? "Reminder saved"
                    : "Set a browser reminder"}
                </button>
                {reminderDate === next.date && (
                  <small className="reminder-note">
                    Saved in this browser
                    {notificationState === "granted"
                      ? " · notifications enabled"
                      : " · return here to review"}
                    .
                  </small>
                )}
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
