export type View = "home" | "programme" | "eligibility" | "journey" | "deadlines" | "faq" | "checklist";
export type EligibilityAnswer = "yes" | "no" | "unsure" | "undergraduate" | "graduate" | "secondary" | "other" | "I am still preparing";

export const programme = { name: "IES Applicant Companion", officialUrl: "https://example.org/official-ies-information", description: "A simple guide from curiosity to application." };
export const eligibilityCriteria = [
  { id: "location", label: "Where are you currently studying or living?", hint: "This helps us tailor the guidance to your situation.", options: ["In an eligible country", "Outside an eligible country", "I am not sure"] },
  { id: "study", label: "What is your current level of study?", hint: "Choose the option that best describes your current academic level.", options: ["Undergraduate", "Graduate", "Secondary school", "Other / not currently studying"] },
  { id: "age", label: "Are you within the programme's typical age range?", hint: "Age requirements can vary by intake. Check the official criteria before applying.", options: ["Yes", "No", "I am not sure"] },
  { id: "academic", label: "Do you meet the required academic criteria?", hint: "For example, the required level of study, grades or field of study.", options: ["Yes", "No", "I am not sure"] },
  { id: "language", label: "Do you meet the required language level?", hint: "Language requirements should always be verified against the official call.", options: ["Yes", "No", "I am not sure"] },
  { id: "documents", label: "Do you have the documents needed to apply?", hint: "You can use the checklist to understand what to prepare.", options: ["Yes", "No", "I am still preparing them"] },
];
export const deadlines = [
  { title: "Application opens", date: "2026-10-14", label: "14 Oct 2026", status: "Upcoming", description: "The application window opens for the next intake.", icon: "spark" },
  { title: "Application deadline", date: "2026-11-28", label: "28 Nov 2026", status: "Upcoming", description: "Aim to submit before the final day so you have time to review.", icon: "flag" },
  { title: "Document check", date: "2026-12-06", label: "06 Dec 2026", status: "Upcoming", description: "A useful reminder to confirm your documents are complete.", icon: "file" },
  { title: "Notification period", date: "2027-01-20", label: "From 20 Jan 2027", status: "Upcoming", description: "Check official channels for updates after the review period.", icon: "bell" },
  { title: "Programme start", date: "2027-02-15", label: "15 Feb 2027", status: "Upcoming", description: "The next stage begins for successful applicants.", icon: "arrow" },
];
export const faqItems = [
  { category: "General", question: "What is IES?", answer: "IES is the programme this companion is designed to help applicants understand. Replace this demo answer with the official programme description before production." },
  { category: "Eligibility", question: "Who can apply?", answer: "Eligibility depends on the official call, including academic, language and programme-specific requirements. Use the quick check as a starting point, then verify every requirement on the official source." },
  { category: "Eligibility", question: "How do I know if I am eligible?", answer: "The informational pre-check helps you spot what to confirm. It is not an official decision and does not predict admission." },
  { category: "Documents", question: "What documents do I need?", answer: "Start with academic records, identification, language evidence and any programme-specific documents listed in the official call. The checklist keeps this preparation visible." },
  { category: "Deadlines", question: "When does the application open?", answer: "Demo dates are shown on the Deadlines page. Replace them with verified official dates before using this prototype in production." },
  { category: "Application", question: "What happens after I submit my application?", answer: "Save your confirmation, monitor your email and check the official application channel for updates. Review stages vary by programme." },
  { category: "Application", question: "Can I apply if I am unsure about one requirement?", answer: "Yes, you can continue preparing while you confirm the requirement. Use the official information source or programme contact listed in the call for a final answer." },
];
export const checklistCategories = [
  { title: "Before applying", items: ["Confirm eligibility", "Review programme details", "Check application deadline", "Prepare academic documents", "Prepare identification documents", "Check language requirements"] },
  { title: "Application", items: ["Create application", "Complete personal information", "Upload documents", "Review application", "Submit"] },
  { title: "After applying", items: ["Save confirmation", "Monitor email", "Check application updates", "Prepare for next stage"] },
];
export const journeySteps = [["01", "Explore IES", "Get oriented around the opportunity and what to expect."], ["02", "Check eligibility", "Use the quick guide to identify what to confirm."], ["03", "Prepare documents", "Bring your key information and evidence together."], ["04", "Complete application", "Work through the official application carefully."], ["05", "Submit", "Review your details and keep a copy of your confirmation."], ["06", "Await updates", "Monitor official channels and your inbox."], ["07", "Next steps", "Prepare for the next stage of your IES journey."]] as const;