// Company details shown across the site. Replace the placeholder contact
// details and social links before launch.
export const site = {
  name: "ThinkTech",
  legalName: "ThinkTech",
  tagline: "Software engineered for what's next",
  description:
    "ThinkTech is a software engineering company that designs, builds and scales custom software, web and mobile apps, ERP systems and practical AI for growing businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contact: {
    email: "thinktechsoftbd@gmail.com", // TODO: replace with your real address
    careersEmail: "thinktechsoftbd@gmail.com", // TODO
    phone: "+8801819495947", // TODO
    address: [ "Rangpur, Bangladesh"], // TODO
    hours: "Sunday–Thursday, 9:00–18:00",
  },
  social: {
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    facebook: "https://www.facebook.com/",
    x: "https://x.com/",
  },
} as const;

export type NavItem = { label: string; href: string; description?: string };

// Primary navigation: six items or fewer, as on most leading IT-services sites.
// "Services" is expanded into a mega-menu from the database.
export const companyNav: NavItem[] = [
  { label: "About ThinkTech", href: "/about", description: "Who we are, how we work and what we value." },
  { label: "Careers", href: "/careers", description: "Open roles and life at ThinkTech." },
  { label: "Contact", href: "/contact", description: "Talk to our team about your project." },
];

export const budgetRanges = ["Under $10k", "$10k – $25k", "$25k – $50k", "$50k – $100k", "$100k+", "Not sure yet"];

export const engagementModels = [
  {
    title: "Fixed scope",
    icon: "target",
    fit: "Best for well-defined projects",
    points: ["Agreed scope, timeline and price", "Milestone-based payments", "Ideal for MVPs and phase-one builds"],
  },
  {
    title: "Time & materials",
    icon: "refresh-cw",
    fit: "Best for evolving products",
    points: ["Re-prioritise every sprint", "Pay for effort actually spent", "Full transparency with weekly reports"],
  },
  {
    title: "Dedicated team",
    icon: "users",
    fit: "Best for long-term scale",
    points: ["Engineers fully focused on your product", "Works within your tools and rituals", "Scale up or down with 30 days' notice"],
  },
] as const;

export const processSteps = [
  { title: "Discover", text: "Workshops to understand your goals, users and constraints, ending in a clear scope and estimate." },
  { title: "Design", text: "Architecture and clickable prototypes validated with real users before build starts." },
  { title: "Build", text: "Two-week sprints with a live demo at the end of each one, and automated tests on every change." },
  { title: "Launch", text: "Staged rollout, monitoring and hypercare so go-live is a non-event." },
  { title: "Evolve", text: "Analytics-driven improvements, support plans and a roadmap that grows with you." },
] as const;

export const differentiators = [
  {
    icon: "eye",
    title: "Working software, every sprint",
    text: "You see real progress in a live demo every two weeks, not slide decks.",
  },
  {
    icon: "key-round",
    title: "You own everything",
    text: "Source code, designs and documentation are yours, with repository access from day one.",
  },
  {
    icon: "gauge",
    title: "Engineering discipline",
    text: "Code review, automated testing, CI/CD and security checks are standard on every project.",
  },
  {
    icon: "handshake",
    title: "Senior-led teams",
    text: "Experienced architects and leads stay hands-on throughout delivery, not just in the sales pitch.",
  },
] as const;

export const techStack: Record<string, string[]> = {
  Frontend: ["React", "Next.js", "Vue", "Angular", "Tailwind CSS"],
  Backend: ["Node.js", ".NET", "Java", "Python", "Go"],
  Mobile: ["Swift", "Kotlin", "Flutter", "React Native"],
  "Data & AI": ["PostgreSQL", "pgvector", "PyTorch", "dbt", "Power BI"],
  Cloud: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Terraform"],
  ERP: ["Odoo", "Dynamics 365", "SAP Business One"],
};

export const values = [
  { title: "Clarity over complexity", text: "We explain trade-offs in plain language and keep solutions as simple as the problem allows." },
  { title: "Ownership", text: "We treat every product as if our own name were on it, and we stay accountable after launch." },
  { title: "Craft", text: "Clean code, thoughtful design and rigorous testing aren't extras. They're how we work." },
  { title: "Partnership", text: "Long-term relationships matter more to us than short-term wins." },
] as const;
