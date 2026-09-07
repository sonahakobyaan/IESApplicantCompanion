export type View = "home" | "programme" | "eligibility" | "journey" | "deadlines" | "faq" | "checklist";
export type EligibilityAnswer = string;

export const programme = {
  name: "International Excellence Scholarship",
  companionName: "IES Applicant Companion",
  organisation: "Copernicus Berlin",
  officialUrl: "https://www.copernicusberlin.org/",
  description: "A flexible 3-, 6-, 9-, or 12-month programme combining academic study, professional development, community engagement, and cultural discovery in Berlin.",
  tagline: "Your simple guide from curiosity to application.",
  universities: ["Humboldt-Universitaet zu Berlin", "Freie Universitaet Berlin", "Berlin School of Economics and Law", "University of Potsdam"],
  fields: "All fields of study",
  history: "The IES idea emerged in 1995 and Copernicus Berlin was founded in 2000 around the programme. Since then, generations of scholarship holders have built academic, professional, and personal connections between Germany and their home countries.",
};

export const eligibleCountries = [
  "Albania", "Armenia", "Azerbaijan", "Belarus", "Bosnia and Herzegovina", "China", "Georgia", "Kazakhstan", "Kyrgyzstan", "Kosovo", "Moldova", "Mongolia", "Montenegro", "North Macedonia", "Russia", "Serbia", "Tajikistan", "Turkmenistan", "Türkiye", "Ukraine", "Uzbekistan",
];

export const eligibilityCriteria = [
  { id: "location", label: "Are you a student in one of the eligible countries?", hint: "IES is open to students from 21 countries across Eastern and Southeastern Europe, the Caucasus, Central Asia, Mongolia, and China.", options: ["Yes, I am from an eligible country", "No, I am not from an eligible country", "I am not sure"] },
  { id: "study", label: "What is your current level of study?", hint: "You must be studying for a Bachelor, Master, or Doctorate when the scholarship starts.", options: ["Bachelor", "Master", "Doctorate", "None of these"] },
  { id: "age", label: "Will you be 28 or younger when the scholarship starts?", hint: "The official requirement is not older than 28 at the start of the scholarship.", options: ["Yes", "No", "I am not sure"] },
  { id: "academic", label: "Are you comfortable applying in any field of study?", hint: "IES accepts students from all fields of study.", options: ["Yes, my field is eligible", "No", "I am not sure"] },
  { id: "language", label: "Do you have at least B1 German or B1 English skills?", hint: "A language certificate is not required with the application. Skills can be assessed during the interview.", options: ["Yes", "No", "I am not sure"] },
  { id: "documents", label: "Can you prepare a complete chronological CV with a photo?", hint: "The CV should be in German or English and include your academic, work, and volunteering background.", options: ["Yes, I can prepare it", "No", "I am still preparing it"] },
];

export const applicationDocuments = [
  "Complete chronological curriculum vitae (CV) with photo",
  "CV written in German or English",
  "Academic background included in the CV",
  "Work and volunteering background included in the CV",
];

export const applicationNotes = [
  "A German or English language certificate is not required for the application.",
  "If your application is complete and convincing, the selection committee will assess your language skills during the interview.",
  "A university transcript is not required for the application. The hosting university may request academic documents later.",
];

export const deadlines = [
  { title: "Application period opens", date: "2026-04-07", label: "7 Apr 2026", status: "Passed", description: "Applications opened for the Summer Semester 2027 intake.", icon: "spark" },
  { title: "Application deadline", date: "2026-07-30", label: "30 Jul 2026", status: "Passed", description: "The application deadline for the Summer Semester 2027 intake has passed.", icon: "flag" },
  { title: "Task phase", date: "2026-08-15", label: "After application review", status: "Configurable", description: "Selected candidates receive tasks, including a short video introduction.", icon: "file" },
  { title: "Online interview phase", date: "2026-09-15", label: "After task phase", status: "Configurable", description: "Selected candidates are invited to an online interview.", icon: "bell" },
  { title: "Onboarding and online volunteering", date: "2026-10-01", label: "Before the in-person programme", status: "Configurable", description: "Selected scholarship holders join online onboarding and initial tasks.", icon: "arrow" },
];

export const programmeComponents = [
  { title: "Exchange study", description: "Study at a leading university in Berlin or Potsdam, attend courses related to your field, and experience a new academic environment." },
  { title: "Community engagement", description: "Contribute through volunteering, local and international projects, events, workshops, educational activities, and organisational tasks." },
  { title: "Professional internship", description: "Complete an internship aligned with your academic background and career goals. A placement may be within Copernicus Berlin or with an external organisation." },
  { title: "Discovering Europe", description: "Take part in cultural and educational activities, meet people from different backgrounds, and discover Berlin, Germany, and Europe." },
];

export const scholarshipCoverage = [
  "Accommodation in furnished Copernicus Berlin Campus apartments",
  "Administrative costs, consulting, and mentoring",
  "Cultural events, social meetings, workshops, and international seminars",
  "Educational tour and university enrolment fee",
  "Health insurance for the full scholarship option",
  "Liability insurance and monthly pocket money",
];

export const scholarshipAmounts = [
  ["Accommodation", "€4,950"], ["Administrative costs", "€790"], ["Consulting and mentoring", "€750"], ["Cultural events", "€250"], ["Educational tour", "€560"], ["Health insurance", "€900"], ["International seminars", "€550"], ["Liability insurance", "€175"], ["Pocket money", "€1,200"], ["Social meetings", "€390"], ["University enrolment fee", "€350"], ["Workshops and training", "€540"],
];

export const faqItems = [
  { category: "General", question: "What is the International Excellence Scholarship?", answer: "IES is a flexible 3-, 6-, 9-, or 12-month programme in Berlin combining exchange study, professional development, community engagement, and cultural discovery." },
  { category: "Eligibility", question: "Who can apply?", answer: `Students from the following eligible countries can apply: ${eligibleCountries.join(", ")}. Applicants must be studying for a Bachelor, Master, or Doctorate when the scholarship starts and must not be older than 28.` },
  { category: "Eligibility", question: "Are all fields of study eligible?", answer: "Yes. IES accepts students from all fields of study." },
  { category: "Eligibility", question: "What language level is required?", answer: "Applicants need German language skills of at least B1 or English language skills of at least B1. A language certificate is not required with the application; language skills may be assessed during the interview." },
  { category: "Documents", question: "What document is required for the application?", answer: "You need a complete chronological CV with a photo, written in German or English. Include your academic background and your work and volunteering background." },
  { category: "Documents", question: "Do I need a language certificate or university transcript?", answer: "No language certificate is required for the application. A university transcript is also not required, although the hosting university may request academic documents at a later stage." },
  { category: "Application", question: "What are the application stages?", answer: "The process has three main selection stages: online application through the CAMPUS platform, a task phase for selected candidates, and an online interview phase. Selected scholarship holders then join online onboarding and initial volunteering tasks." },
  { category: "Application", question: "What does community engagement involve?", answer: "You may support educational activities, community events, research, communication, digital content, project coordination, or participant engagement. Tasks are matched where possible with your skills and interests." },
  { category: "Accommodation", question: "Where do scholarship holders live?", answer: "IES scholarship holders live in furnished apartments at the centrally located Copernicus Berlin Campus. Apartments offer single and double rooms, high-speed internet, cable television, and laundry facilities." },
  { category: "Funding", question: "What does the full scholarship cover?", answer: "The full scholarship includes accommodation, administrative costs, consulting and mentoring, cultural events, an educational tour, health insurance, international seminars, liability insurance, pocket money, social meetings, university enrolment, and workshops and training. Travel expenses are not covered." },
  { category: "Funding", question: "Are partial scholarship options available?", answer: "Yes. Partial Scholarship Plus covers most programme costs but not health insurance. The Partial Scholarship also requires the recipient to pay accommodation costs for two months (€1,650); travel expenses are not covered by either option." },
  { category: "Travel", question: "Are travel expenses covered?", answer: "No. Travel expenses are not covered by the full, partial plus, or partial scholarship options." },
  { category: "After applying", question: "What happens after I submit my application?", answer: "If selected for the next stage, you will receive tasks including a short video introduction. Candidates who progress are invited to an online interview, followed by onboarding and initial online volunteering before the in-person programme." },
];

export const checklistCategories = [
  { title: "Before applying", items: ["Confirm your country is eligible", "Confirm you will be studying for a Bachelor, Master, or Doctorate", "Confirm you will be 28 or younger at programme start", "Review the programme components", "Check the application period", "Prepare your academic background details"] },
  { title: "Application", items: ["Write a complete chronological CV", "Add a photo to your CV", "Write your CV in German or English", "Include work and volunteering experience", "Submit through the CAMPUS platform", "Review your application before submitting"] },
  { title: "After applying", items: ["Watch for task-phase communication", "Prepare your short video introduction", "Prepare for the online interview", "Join online onboarding if selected", "Begin initial online volunteering", "Monitor official programme updates"] },
];

export const journeySteps = [["01", "Explore IES", "Understand the mix of study, professional experience, community engagement, and cultural discovery."], ["02", "Check eligibility", "Confirm your country, study level, age, field, language, and CV readiness."], ["03", "Prepare your CV", "Create the complete chronological CV required for the application."], ["04", "Apply online", "Submit your application through the CAMPUS platform during the official application period."], ["05", "Complete tasks", "Selected candidates receive tasks, including a short video introduction."], ["06", "Join the interview", "Candidates who progress are invited to an online interview."], ["07", "Begin onboarding", "Join online onboarding and initial volunteering before the in-person experience in Berlin."]] as const;
