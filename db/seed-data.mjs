// Starter content for the ThinkTech website.
//
// Services, industries, insights and FAQs describe what ThinkTech offers and
// are ready to edit. Case studies, testimonials and job openings are SAMPLE
// placeholders that show the layout. Replace them with real projects, client
// quotes and roles, or set is_published / is_open = false, before launch.

export const services = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    tagline: "Software shaped around how your business actually works.",
    summary:
      "End-to-end design and engineering of business-critical platforms, from discovery workshops to production support.",
    description:
      "Off-the-shelf tools force you to bend your processes to fit them. We build software that fits you instead. Our cross-functional squads of product managers, architects, engineers and QA run short discovery sprints to map your workflows. Then they ship in two-week increments, so you see working software early and steer with real feedback instead of status reports.",
    icon: "code",
    capabilities: [
      "Product discovery & technical scoping",
      "Solution architecture & system design",
      "Microservices and modular monoliths",
      "API design, integration & middleware",
      "Legacy modernization & re-platforming",
      "Long-term maintenance & SLAs",
    ],
    deliverables: [
      "Architecture decision records",
      "Clickable prototype before build",
      "Production-ready source code you own",
      "Automated test suite & CI/CD pipeline",
      "Runbooks and handover documentation",
    ],
    technologies: ["TypeScript", "Node.js", ".NET", "Java", "Python", "Go", "PostgreSQL", "Redis"],
    sort_order: 1,
  },
  {
    slug: "web-application-development",
    title: "Web Application Development",
    tagline: "Fast, accessible web platforms that scale with demand.",
    summary:
      "Customer portals, SaaS products, dashboards and marketplaces built for performance, SEO and accessibility.",
    description:
      "Your web application is often the first thing a customer touches. We build modern web platforms with server rendering, edge caching and accessible components that load in under a second and stay maintainable as your team grows. Marketing sites, multi-tenant SaaS and internal tools all get the same engineering discipline.",
    icon: "globe",
    capabilities: [
      "SaaS & multi-tenant platforms",
      "Customer & partner portals",
      "Progressive web apps",
      "Headless CMS & commerce",
      "Real-time dashboards",
      "Accessibility (WCAG 2.2 AA) audits",
    ],
    deliverables: [
      "Design system & component library",
      "Core Web Vitals performance budget",
      "SEO-ready information architecture",
      "Analytics & event tracking plan",
    ],
    technologies: ["Next.js", "React", "Vue", "Angular", "Node.js", "Tailwind CSS", "GraphQL"],
    sort_order: 2,
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    tagline: "Native-quality apps for iOS and Android, shipped on schedule.",
    summary:
      "Consumer and enterprise mobile apps, built native or cross-platform depending on what your product needs.",
    description:
      "We help you pick the right approach for your product, not the one we happen to prefer. Fully native Swift and Kotlin suit performance-critical experiences. Flutter or React Native suit teams that need one codebase across platforms. Either way you get offline-first architecture, a secure release pipeline and app store submission handled for you.",
    icon: "smartphone",
    capabilities: [
      "iOS (Swift) & Android (Kotlin)",
      "Flutter & React Native",
      "Offline-first sync",
      "Push notifications & deep linking",
      "In-app payments & subscriptions",
      "App store optimization & release management",
    ],
    deliverables: [
      "Platform recommendation with trade-offs",
      "Beta distribution via TestFlight / Play Console",
      "Crash reporting & analytics setup",
      "Store listing assets",
    ],
    technologies: ["Swift", "Kotlin", "Flutter", "React Native", "Firebase", "Expo"],
    sort_order: 3,
  },
  {
    slug: "data-and-ai",
    title: "Data & AI Engineering",
    tagline: "Practical AI that earns its place in production.",
    summary:
      "Data platforms, analytics and AI features such as retrieval-augmented assistants, document automation and forecasting, built with measurable outcomes.",
    description:
      "We start with the business metric, not the model. Our data and AI teams build the pipelines, evaluation harnesses and guardrails that make AI dependable: grounded assistants over your own documents, intelligent document processing, demand forecasting and analytics your leadership will actually use. Every AI feature ships with an evaluation suite and a cost model.",
    icon: "sparkles",
    capabilities: [
      "Retrieval-augmented generation (RAG)",
      "AI agents & workflow automation",
      "Intelligent document processing",
      "Data warehousing & ELT pipelines",
      "BI dashboards & self-serve analytics",
      "Forecasting & predictive models",
    ],
    deliverables: [
      "Use-case prioritisation matrix",
      "Evaluation datasets & quality benchmarks",
      "Cost-per-request model",
      "Model monitoring & guardrails",
    ],
    technologies: ["Python", "PyTorch", "LangGraph", "pgvector", "dbt", "Airflow", "Power BI", "Snowflake"],
    sort_order: 4,
  },
  {
    slug: "cloud-and-devops",
    title: "Cloud & DevOps",
    tagline: "Reliable infrastructure, automated end to end.",
    summary:
      "Cloud migration, infrastructure as code, CI/CD and observability across AWS, Azure and Google Cloud.",
    description:
      "We design cloud foundations that are secure by default and cheap to run. That means infrastructure as code, automated delivery pipelines, observability and right-sized environments. Whether you're migrating from on-premise servers or taming an overgrown cloud bill, we leave you with a platform your team can operate confidently.",
    icon: "cloud",
    capabilities: [
      "Cloud migration & landing zones",
      "Infrastructure as code",
      "CI/CD pipelines",
      "Kubernetes & container platforms",
      "Observability & incident response",
      "FinOps & cost optimisation",
    ],
    deliverables: [
      "Cloud architecture diagrams",
      "Terraform / Bicep modules",
      "Disaster-recovery runbook",
      "Monthly cost & reliability report",
    ],
    technologies: ["AWS", "Azure", "Google Cloud", "Terraform", "Kubernetes", "Docker", "GitHub Actions", "Grafana"],
    sort_order: 5,
  },
  {
    slug: "erp-and-business-systems",
    title: "ERP & Business Systems",
    tagline: "One connected system for finance, operations and people.",
    summary:
      "ERP implementation, customization and integration that connect sales, inventory, finance, HR and reporting.",
    description:
      "Disconnected spreadsheets and siloed tools slow every decision. We implement and tailor ERP platforms, build custom modules where packaged software falls short, and integrate your CRM, eCommerce, payroll and banking systems into a single source of truth. Data migration, user training and post-go-live support are part of every rollout.",
    icon: "layers",
    capabilities: [
      "ERP implementation & customization",
      "Custom ERP modules",
      "Inventory, procurement & POS",
      "Accounting & financial reporting",
      "HRM & payroll",
      "CRM and third-party integrations",
    ],
    deliverables: [
      "Process maps (as-is / to-be)",
      "Data migration & reconciliation plan",
      "Role-based training sessions",
      "Hypercare support after go-live",
    ],
    technologies: ["Odoo", "Microsoft Dynamics 365", "SAP Business One", ".NET", "PostgreSQL", "REST & EDI"],
    sort_order: 6,
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX & Product Design",
    tagline: "Interfaces people understand on the first try.",
    summary:
      "User research, UX strategy, interface design and design systems that turn complex workflows into simple experiences.",
    description:
      "Good design reduces support tickets, training time and churn. Our designers interview your users, map their journeys and prototype solutions they can test before a line of production code is written. We deliver design systems your engineers can build with directly, so the product stays consistent as it grows.",
    icon: "pen-tool",
    capabilities: [
      "User research & usability testing",
      "Information architecture",
      "Wireframes & interactive prototypes",
      "Visual & interface design",
      "Design systems",
      "Accessibility reviews",
    ],
    deliverables: [
      "Research synthesis & personas",
      "High-fidelity Figma prototypes",
      "Documented component library",
      "Usability test report",
    ],
    technologies: ["Figma", "FigJam", "Maze", "Storybook", "Lottie"],
    sort_order: 7,
  },
  {
    slug: "qa-and-test-automation",
    title: "QA & Test Automation",
    tagline: "Release with confidence, every sprint.",
    summary:
      "Manual and automated testing across web, mobile and APIs, plus performance and security testing.",
    description:
      "Quality isn't a phase at the end of a project. We embed QA engineers in delivery teams, automate regression suites that run on every commit, and stress-test your systems before your customers do. The result is fewer production incidents and faster, calmer release days.",
    icon: "shield-check",
    capabilities: [
      "Test strategy & planning",
      "UI, API & mobile automation",
      "Performance & load testing",
      "Security & vulnerability testing",
      "User acceptance testing support",
      "QA for AI features",
    ],
    deliverables: [
      "Risk-based test plan",
      "Automated regression suite in CI",
      "Performance baseline report",
      "Release quality dashboard",
    ],
    technologies: ["Playwright", "Cypress", "Appium", "k6", "Postman", "OWASP ZAP"],
    sort_order: 8,
  },
];

export const industries = [
  {
    slug: "healthcare",
    name: "Healthcare & Life Sciences",
    summary: "Patient-facing apps, clinical workflows and interoperable health data, with privacy built in from day one.",
    challenges: ["Fragmented patient records", "Strict privacy and compliance requirements", "Clinician time lost to admin"],
    solutions: ["Telemedicine & patient portals", "HL7 / FHIR integrations", "Clinic and hospital management systems"],
    icon: "heart-pulse",
    sort_order: 1,
  },
  {
    slug: "fintech",
    name: "Banking & Fintech",
    summary: "Secure, compliant digital finance products, from payment gateways to lending platforms and wealth apps.",
    challenges: ["Regulatory compliance & auditability", "Fraud and security threats", "Legacy core-banking constraints"],
    solutions: ["Digital wallets & payments", "Loan origination & KYC automation", "Real-time risk & fraud analytics"],
    icon: "landmark",
    sort_order: 2,
  },
  {
    slug: "retail-ecommerce",
    name: "Retail & eCommerce",
    summary: "Unified commerce across online and physical stores, with inventory, POS and personalization that connect.",
    challenges: ["Inventory out of sync across channels", "Rising customer acquisition costs", "Peak-season traffic spikes"],
    solutions: ["Headless commerce storefronts", "POS & inventory integration", "Recommendation & loyalty engines"],
    icon: "shopping-bag",
    sort_order: 3,
  },
  {
    slug: "logistics",
    name: "Logistics & Supply Chain",
    summary: "Visibility from warehouse to doorstep with tracking, route optimization and partner integrations.",
    challenges: ["Limited shipment visibility", "Manual dispatch and paperwork", "Carrier and partner data silos"],
    solutions: ["Fleet & shipment tracking", "Warehouse management systems", "Route and load optimization"],
    icon: "truck",
    sort_order: 4,
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    summary: "Connected factories and lean operations through ERP, MES integrations and production analytics.",
    challenges: ["Unplanned downtime", "Disconnected shop-floor data", "Complex bills of materials"],
    solutions: ["Production planning & ERP", "IoT dashboards & OEE tracking", "Quality management systems"],
    icon: "factory",
    sort_order: 5,
  },
  {
    slug: "education",
    name: "Education & eLearning",
    summary: "Learning platforms and campus systems that keep students engaged and administrators in control.",
    challenges: ["Low learner engagement", "Manual admissions and fee collection", "Scaling live classes"],
    solutions: ["Learning management systems", "Student information systems", "Assessment & proctoring tools"],
    icon: "graduation-cap",
    sort_order: 6,
  },
  {
    slug: "real-estate",
    name: "Real Estate & PropTech",
    summary: "Property platforms, CRM and facility management that shorten sales cycles and simplify operations.",
    challenges: ["Slow, paper-heavy transactions", "Scattered lead management", "Tenant service backlogs"],
    solutions: ["Listing portals & virtual tours", "Real-estate CRM & booking", "Facility & lease management"],
    icon: "building",
    sort_order: 7,
  },
  {
    slug: "travel-hospitality",
    name: "Travel & Hospitality",
    summary: "Booking engines, guest experience apps and revenue tools for travel and hospitality brands.",
    challenges: ["Dependence on third-party OTAs", "Fragmented guest data", "Dynamic pricing complexity"],
    solutions: ["Direct booking engines", "Guest experience apps", "Channel manager integrations"],
    icon: "plane",
    sort_order: 8,
  },
];

// SAMPLE — replace with real, client-approved case studies before launch.
export const caseStudies = [
  {
    slug: "omnichannel-retail-erp",
    title: "Unifying 40 stores and an online shop on a single ERP",
    client_label: "Regional fashion retailer",
    industry: "retail-ecommerce",
    service: "erp-and-business-systems",
    headline_metric: "62%",
    headline_label: "faster stock reconciliation",
    summary:
      "We replaced spreadsheets and three disconnected tools with one ERP that syncs inventory, POS and eCommerce in near real time.",
    challenge:
      "Store managers reconciled stock manually every night, online orders routinely oversold items that were already gone from the shelf, and finance waited two weeks for month-end numbers.",
    solution:
      "We implemented a customized ERP with POS integration, a sync service for the online store and automated purchase suggestions. We migrated five years of product and sales history and trained 120 staff across all locations.",
    outcomes: [
      { metric: "62%", label: "faster stock reconciliation" },
      { metric: "-85%", label: "oversold online orders" },
      { metric: "3 days", label: "to close the books, down from 14" },
    ],
    technologies: ["Odoo", "PostgreSQL", "Python", "Next.js", "Redis"],
    duration: "7 months",
    team_size: "8 specialists",
    is_featured: true,
    published_at: "2026-06-18",
  },
  {
    slug: "telehealth-platform",
    title: "A telehealth platform that took a clinic network online",
    client_label: "Multi-specialty clinic network",
    industry: "healthcare",
    service: "mobile-app-development",
    headline_metric: "38k",
    headline_label: "consultations in year one",
    summary:
      "Patient and doctor apps with video consultations, e-prescriptions and appointment scheduling, integrated with the clinic's records system.",
    challenge:
      "Long waiting-room queues and phone-only booking were limiting how many patients the clinic network could serve, especially in rural areas.",
    solution:
      "We built Flutter apps for patients and doctors, a web dashboard for clinic administrators and secure video consultations, with records exchanged over FHIR APIs.",
    outcomes: [
      { metric: "38k", label: "consultations in the first year" },
      { metric: "4.7★", label: "average app-store rating" },
      { metric: "-45%", label: "missed appointments" },
    ],
    technologies: ["Flutter", "Node.js", "WebRTC", "FHIR", "AWS"],
    duration: "5 months",
    team_size: "6 specialists",
    is_featured: true,
    published_at: "2026-04-02",
  },
  {
    slug: "ai-document-processing-lender",
    title: "Cutting loan processing time with AI document intelligence",
    client_label: "Digital lending company",
    industry: "fintech",
    service: "data-and-ai",
    headline_metric: "4×",
    headline_label: "faster loan decisions",
    summary:
      "An AI pipeline that classifies, extracts and validates data from loan applications, with humans reviewing every exception.",
    challenge:
      "Underwriters spent most of their day keying data from bank statements and ID documents, which created backlogs and inconsistent decisions.",
    solution:
      "We built a document-processing pipeline that combines OCR, a fine-tuned extraction model and rule-based validation. Every model has an evaluation suite, and low-confidence fields go to a review queue.",
    outcomes: [
      { metric: "4×", label: "faster loan decisions" },
      { metric: "97.8%", label: "field-level extraction accuracy" },
      { metric: "70%", label: "of applications fully automated" },
    ],
    technologies: ["Python", "PyTorch", "pgvector", "FastAPI", "Azure"],
    duration: "4 months",
    team_size: "5 specialists",
    is_featured: true,
    published_at: "2026-08-21",
  },
  {
    slug: "fleet-tracking-logistics",
    title: "Real-time fleet visibility for a growing logistics operator",
    client_label: "Third-party logistics provider",
    industry: "logistics",
    service: "custom-software-development",
    headline_metric: "21%",
    headline_label: "lower fuel cost per route",
    summary:
      "A dispatch and tracking platform with driver apps, route optimization and live customer tracking links.",
    challenge:
      "Dispatchers planned routes on paper and customers called constantly asking where their deliveries were.",
    solution:
      "We delivered a dispatch console, Android driver app with proof-of-delivery, and route optimization engine, plus a public tracking page that cut inbound calls dramatically.",
    outcomes: [
      { metric: "21%", label: "lower fuel cost per route" },
      { metric: "-60%", label: "\"where is my order\" calls" },
      { metric: "99.95%", label: "platform uptime" },
    ],
    technologies: ["Kotlin", "Go", "PostgreSQL", "PostGIS", "Kubernetes"],
    duration: "6 months",
    team_size: "7 specialists",
    is_featured: false,
    published_at: "2026-02-10",
  },
  {
    slug: "cloud-migration-manufacturer",
    title: "Migrating a manufacturer's on-premise stack to the cloud",
    client_label: "Industrial equipment manufacturer",
    industry: "manufacturing",
    service: "cloud-and-devops",
    headline_metric: "34%",
    headline_label: "lower infrastructure cost",
    summary:
      "A zero-downtime migration of ERP, file servers and production dashboards to a secure, automated cloud landing zone.",
    challenge:
      "Ageing servers were nearing end-of-life, backups were manual and an outage in the server room had halted production twice in one year.",
    solution:
      "We designed a cloud landing zone with infrastructure as code, migrated workloads in waves, and added monitoring, automated backups and a tested disaster-recovery plan.",
    outcomes: [
      { metric: "34%", label: "lower infrastructure cost" },
      { metric: "0", label: "minutes of unplanned downtime during cutover" },
      { metric: "15 min", label: "recovery time objective" },
    ],
    technologies: ["Azure", "Terraform", "Docker", "GitHub Actions", "Grafana"],
    duration: "3 months",
    team_size: "4 specialists",
    is_featured: false,
    published_at: "2025-11-28",
  },
  {
    slug: "learning-platform-edtech",
    title: "An adaptive learning platform for 50,000 students",
    client_label: "EdTech startup",
    industry: "education",
    service: "web-application-development",
    headline_metric: "2.3×",
    headline_label: "course completion rate",
    summary:
      "A web and mobile learning platform with adaptive quizzes, live classes and progress analytics for parents and teachers.",
    challenge:
      "The startup's first platform could not handle exam-season traffic, and students dropped off courses midway.",
    solution:
      "We rebuilt the platform on a scalable architecture, added adaptive practice that adjusts to each learner, and gave teachers dashboards to spot students who need help.",
    outcomes: [
      { metric: "2.3×", label: "course completion rate" },
      { metric: "50k", label: "concurrent learners at peak" },
      { metric: "<1s", label: "median page load" },
    ],
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Redis", "AWS"],
    duration: "6 months",
    team_size: "9 specialists",
    is_featured: false,
    published_at: "2026-09-15",
  },
];

// SAMPLE — replace with real, attributable client quotes before launch.
export const testimonials = [
  {
    quote:
      "ThinkTech treated our ERP rollout like it was their own business. They challenged our assumptions in discovery, which saved us months of rework later.",
    author_name: "Head of Operations",
    author_role: "Retail group",
    company: null,
    rating: 5,
    sort_order: 1,
  },
  {
    quote:
      "We saw working software every two weeks. That transparency is rare, and it made it easy to keep our board confident in the project.",
    author_name: "Chief Technology Officer",
    author_role: "Fintech platform",
    company: null,
    rating: 5,
    sort_order: 2,
  },
  {
    quote:
      "Their designers and engineers work as one team. Our clinicians adopted the new app in days, not months.",
    author_name: "Medical Director",
    author_role: "Clinic network",
    company: null,
    rating: 5,
    sort_order: 3,
  },
];

// Commitments rather than vanity metrics. Swap in real numbers (projects
// delivered, clients, team size, years) once you have them.
export const stats = [
  { value: "8", label: "Core service lines", sort_order: 1 },
  { value: "8", label: "Industry practices", sort_order: 2 },
  { value: "1 day", label: "Reply time on every inquiry", sort_order: 3 },
  { value: "2 wk", label: "Sprints with a live demo", sort_order: 4 },
];

export const faqs = [
  {
    question: "How quickly can you start on a new project?",
    answer:
      "We reply to every inquiry within one business day. After a short scoping call we usually send a proposal within a week, and a team can typically start one to two weeks after sign-off.",
    sort_order: 1,
  },
  {
    question: "Which engagement models do you offer?",
    answer:
      "Fixed-scope projects for well-defined work, time-and-materials for evolving products, and dedicated teams that work as an extension of your own. We'll recommend the model that fits your situation and switch if your needs change.",
    sort_order: 2,
  },
  {
    question: "Will you sign an NDA before we share details?",
    answer:
      "Yes. We're happy to sign your NDA, or our standard mutual NDA, before any detailed discussion.",
    sort_order: 3,
  },
  {
    question: "Who owns the source code and intellectual property?",
    answer:
      "You do. All code, designs and documentation produced for your project are transferred to you, and you'll have repository access from day one.",
    sort_order: 4,
  },
  {
    question: "How do you keep projects on track?",
    answer:
      "Every project has a dedicated project manager, two-week sprints with live demos, a shared backlog and a weekly status report covering scope, budget and risks.",
    sort_order: 5,
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Yes. Every launch includes a hypercare period, after which we offer monthly support and maintenance plans with agreed response times.",
    sort_order: 6,
  },
];

// SAMPLE — replace with your real open roles.
export const jobOpenings = [
  {
    slug: "senior-full-stack-engineer",
    title: "Senior Full-Stack Engineer (TypeScript)",
    department: "Engineering",
    location: "Hybrid",
    employment_type: "Full-time",
    experience: "5+ years",
    summary:
      "Lead the design and delivery of web platforms for clients across fintech, retail and healthcare, mentoring engineers as you go.",
    responsibilities: [
      "Own features end to end, from technical design to production monitoring",
      "Build performant React / Next.js front ends and Node.js services",
      "Review code and mentor mid-level engineers",
      "Work directly with clients to refine requirements",
    ],
    requirements: [
      "5+ years building production web applications",
      "Strong TypeScript, React and Node.js skills",
      "Solid SQL and data-modelling experience (PostgreSQL preferred)",
      "Clear written and spoken English",
    ],
    nice_to_have: ["Cloud certification (AWS / Azure)", "Experience with design systems", "Open-source contributions"],
    posted_at: "2026-10-01",
  },
  {
    slug: "flutter-developer",
    title: "Flutter Developer",
    department: "Mobile",
    location: "Hybrid",
    employment_type: "Full-time",
    experience: "3+ years",
    summary: "Build polished cross-platform mobile apps used by thousands of people every day.",
    responsibilities: [
      "Develop and maintain Flutter apps for iOS and Android",
      "Integrate REST / GraphQL APIs and offline storage",
      "Write widget and integration tests",
      "Handle app store releases with the QA team",
    ],
    requirements: [
      "3+ years of mobile development, 2+ with Flutter",
      "Good understanding of state management (Riverpod, Bloc or similar)",
      "Experience publishing apps to both stores",
    ],
    nice_to_have: ["Native Swift or Kotlin experience", "Experience with maps or real-time features"],
    posted_at: "2026-09-24",
  },
  {
    slug: "ai-engineer",
    title: "AI / ML Engineer",
    department: "Data & AI",
    location: "Remote",
    employment_type: "Full-time",
    experience: "3+ years",
    summary: "Design, evaluate and ship AI features, from retrieval-augmented assistants to document intelligence pipelines.",
    responsibilities: [
      "Build RAG pipelines and LLM-powered workflows",
      "Create evaluation datasets and automated quality checks",
      "Optimise latency and cost of model inference",
      "Partner with product teams to scope AI use cases",
    ],
    requirements: [
      "3+ years of Python in production",
      "Hands-on experience with LLM APIs and vector search",
      "Understanding of evaluation methods and prompt engineering",
    ],
    nice_to_have: ["Experience fine-tuning models", "MLOps tooling experience"],
    posted_at: "2026-09-30",
  },
  {
    slug: "business-analyst-erp",
    title: "Business Analyst — ERP",
    department: "Consulting",
    location: "On-site",
    employment_type: "Full-time",
    experience: "3+ years",
    summary: "Translate client operations into clear ERP requirements and guide rollouts from discovery to go-live.",
    responsibilities: [
      "Run discovery workshops and map business processes",
      "Write functional specifications and user stories",
      "Coordinate UAT and train end users",
    ],
    requirements: [
      "3+ years as a business analyst on ERP or business-systems projects",
      "Working knowledge of accounting, inventory or HR processes",
      "Excellent facilitation and documentation skills",
    ],
    nice_to_have: ["Odoo or Dynamics 365 functional certification"],
    posted_at: "2026-09-12",
  },
];

export const posts = [
  {
    slug: "fixed-price-vs-time-and-materials",
    title: "Fixed price, time & materials or dedicated team? Choosing the right engagement model",
    excerpt:
      "The way you contract a software project shapes everything from budget certainty to product quality. Here's how to pick the model that fits.",
    category: "Engagement",
    author_name: "ThinkTech Delivery Team",
    reading_minutes: 6,
    published_at: "2026-10-02",
    body: `Choosing a development partner is only half the decision. The engagement model you agree on decides who carries the risk, how you handle change, and how much control you have over the team.

## Fixed price: certainty for well-defined scope

A fixed-price project works best when requirements are stable and can be written down in detail: a marketing website, a clearly specified integration, or phase one of a product with a validated prototype.

- **Pros:** predictable budget and timeline, minimal management overhead.
- **Cons:** change requests add cost and friction, and vendors pad estimates to cover uncertainty.

## Time & materials: flexibility for evolving products

With time and materials (T&M) you pay for the effort actually spent. It suits products where you expect to learn as you go, such as new SaaS platforms, MVPs and AI features where the right approach emerges through experiments.

- **Pros:** you can re-prioritise every sprint, with no change-request overhead.
- **Cons:** requires active product ownership and trust, built through transparent reporting.

## Dedicated team: an extension of your company

A dedicated team works exclusively on your product for months or years, following your roadmap and rituals. It's ideal when you need to scale engineering capacity without the hiring overhead.

## Our recommendation

Many successful projects combine models: a fixed-price discovery phase to define scope and architecture, followed by T&M or a dedicated team for delivery. Whatever you choose, insist on working software every sprint. It's the single best indicator that a project is on track.`,
  },
  {
    slug: "rag-in-production-checklist",
    title: "Taking retrieval-augmented generation to production: a practical checklist",
    excerpt:
      "A RAG demo takes an afternoon. A RAG system your customers can trust takes discipline. Here's the checklist we use.",
    category: "AI",
    author_name: "ThinkTech Data & AI Team",
    reading_minutes: 8,
    published_at: "2026-09-18",
    body: `Retrieval-augmented generation (RAG) lets a language model answer questions from your own documents. It is the most common enterprise AI pattern we build. It is also the easiest to get subtly wrong.

## 1. Start with an evaluation set

Before you tune anything, collect 50–200 real questions with known good answers. Every change you make to chunking, retrieval or prompting should be measured against this set. Without it, you're guessing.

## 2. Get the documents right

- Clean extraction matters more than model choice: tables, headers and scanned PDFs need care.
- Chunk by meaning (sections, headings), not just by character count.
- Store metadata such as source, date and access level alongside every chunk.

## 3. Retrieval is where most quality is won

Hybrid search (keyword plus vector) consistently beats either on its own. Add a re-ranking step for the top results, and filter by user permissions *before* anything reaches the model.

## 4. Ground and cite

Instruct the model to answer only from retrieved context and to cite its sources. Show those citations in the UI so users can verify answers in one click.

## 5. Plan for cost and latency

Cache frequent queries, choose the smallest model that passes your evaluation set, and track cost per conversation from day one.

## 6. Monitor in production

Log questions, retrieved chunks and user feedback. Review low-rated answers weekly and add them to your evaluation set. That loop is what makes the system better over time.`,
  },
  {
    slug: "signs-you-have-outgrown-spreadsheets",
    title: "Seven signs your business has outgrown spreadsheets",
    excerpt:
      "Spreadsheets are where most businesses start. Here's how to tell when they've become the bottleneck, and what to do next.",
    category: "ERP",
    author_name: "ThinkTech Consulting Team",
    reading_minutes: 5,
    published_at: "2026-08-27",
    body: `Spreadsheets are flexible, familiar and free, which is exactly why they quietly become the backbone of so many growing businesses. But there comes a point where they cost more than they save.

## The warning signs

- **Month-end takes weeks.** Finance spends days reconciling numbers from different files.
- **Nobody trusts the numbers.** Two reports show two different totals for the same thing.
- **Stock surprises.** You sell items you don't have, or discover dead stock months too late.
- **Version chaos.** "Final_v7_REALLY_FINAL.xlsx" is a real file on your shared drive.
- **Key-person risk.** One person understands the master spreadsheet, and they want to go on holiday.
- **No audit trail.** You can't tell who changed a price or approved a purchase.
- **Growth means more admin.** Every new branch or product line adds manual work.

## What to do next

You don't need to replace everything at once. Start by mapping your core processes from order to cash and procure to pay, and identify where data is entered twice. A phased ERP rollout that begins with the most painful process typically pays for itself fastest.

## Choosing the right system

Packaged ERPs cover most standard processes well. Custom modules make sense only where your process is a genuine competitive advantage. A good partner will tell you which is which.`,
  },
  {
    slug: "native-vs-cross-platform-2026",
    title: "Native or cross-platform? Choosing a mobile stack in 2026",
    excerpt:
      "Flutter and React Native have matured enormously, but native still wins in some cases. A practical guide to the trade-offs.",
    category: "Mobile",
    author_name: "ThinkTech Mobile Team",
    reading_minutes: 6,
    published_at: "2026-07-30",
    body: `The native-versus-cross-platform debate used to be about compromise. Today, both approaches can deliver excellent apps. The right choice depends on your product, team and roadmap.

## When cross-platform is the right call

- You need iOS and Android at the same time on a limited budget.
- Your app is mostly forms, lists, content and standard device features.
- You want one team to own the whole mobile experience.

Flutter excels at pixel-perfect custom UI. React Native shines when you have a strong React web team and want to share logic.

## When to go native

- Heavy use of platform-specific features such as advanced camera work, AR, widgets and wearables.
- Performance-critical experiences like real-time audio, video or complex animation.
- You already have, or plan to build, separate platform teams.

## The hidden factors

Think beyond launch: hiring market, long-term maintenance, access to new OS features on day one, and how your app will integrate with existing web and backend systems. We usually run a short technical spike before committing, because a week of prototyping is cheap insurance.`,
  },
  {
    slug: "cloud-cost-quick-wins",
    title: "Ten quick wins to cut your cloud bill without hurting reliability",
    excerpt:
      "Most cloud bills carry 20–40% waste. These ten changes are low-risk and can often be done in a single sprint.",
    category: "Cloud",
    author_name: "ThinkTech Cloud Team",
    reading_minutes: 4,
    published_at: "2026-06-12",
    body: `Cloud spend tends to creep up quietly as teams ship features. The good news is that much of the waste is easy to recover.

## Quick wins

- **Turn off non-production environments** outside working hours.
- **Right-size instances** using actual CPU and memory utilisation data.
- **Delete orphaned resources** such as unattached disks, old snapshots and idle load balancers.
- **Use storage tiers**: move infrequently accessed data to cheaper classes automatically.
- **Commit to steady workloads** with reserved instances or savings plans.
- **Use spot capacity** for fault-tolerant batch jobs and CI runners.
- **Set log retention policies** so you aren't paying to store everything forever.
- **Review data transfer costs**, especially cross-region and NAT gateway traffic.
- **Tag everything** so every cost has an owner.
- **Set budgets and alerts** so surprises are caught in days, not at month-end.

## Make it a habit

The biggest savings come from making cost visible to the teams who create it. A monthly cost review alongside your reliability metrics keeps both in balance.`,
  },
];
