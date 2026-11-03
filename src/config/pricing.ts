// Static content for the /pricing and /checkout pages (no database).
//
// SAMPLE CONTENT: every price, discount, bonus and feature below is a
// placeholder for the design. Replace them with ThinkTech's real packages
// before launch. Only set `oldPrice` when it is a genuine regular price:
// showing an invented "was" price is misleading advertising.

export type PlanFeature = {
  text: string;
  /** false renders the feature greyed out with a dash. Defaults to true. */
  included?: boolean;
  /** Draws attention to a key selling point. */
  highlight?: boolean;
};

export type Plan = {
  /** URL segment: /checkout/<category id>/<plan id>. */
  id: string;
  name: string;
  description: string;
  /** USD. One-time for project packages, per month for monthly plans. null = custom quote. */
  price: number | null;
  /** Regular price, shown crossed out with an "x% off" badge. */
  oldPrice?: number;
  featured?: boolean;
  /** Delivery estimate for project packages. */
  timeline?: string;
  /** Extra shown in the gift box on the card. */
  bonus?: string;
  features: PlanFeature[];
};

export type CompareValue = string | boolean;

/** Optional extra offered on the checkout page. One-time price in USD. */
export type Addon = { id: string; name: string; description: string; price: number };

export type PricingCategory = {
  id: string;
  label: string;
  /** Name from the Icon component map (src/components/ui/Icon.tsx). */
  icon: string;
  title: string;
  billing: "one-time" | "monthly";
  includes: string[];
  plans: Plan[];
  compare: { group: string; rows: { label: string; values: CompareValue[] }[] }[];
  addons: Addon[];
  note: string;
};

/** Discount for paying monthly plans yearly. */
export const YEARLY_DISCOUNT = 0.15;

export function findPlan(categoryId: string, planId: string) {
  const category = pricingCategories.find((c) => c.id === categoryId);
  const plan = category?.plans.find((p) => p.id === planId);
  return category && plan ? { category, plan } : null;
}

export const pricingCategories: PricingCategory[] = [
  {
    id: "websites",
    label: "Websites",
    icon: "globe",
    title: "Website packages",
    billing: "one-time",
    includes: ["Responsive design", "SSL & speed setup", "Basic SEO", "You own the code"],
    plans: [
      {
        id: "starter",
        name: "Starter",
        description: "A fast, professional website for a new or small business.",
        price: 499,
        oldPrice: 699,
        timeline: "Ready in about 2 weeks",
        bonus: "1 month of free support after launch",
        features: [
          { text: "Up to 5 pages" },
          { text: "Mobile-friendly responsive design" },
          { text: "Contact form with email alerts" },
          { text: "Google Analytics & Search Console setup" },
          { text: "1 round of design revisions" },
          { text: "Content management system", included: false },
          { text: "Online store", included: false },
        ],
      },
      {
        id: "business",
        name: "Business",
        description: "A custom-designed site your team can update on its own.",
        price: 1299,
        oldPrice: 1599,
        featured: true,
        timeline: "Ready in about 4 weeks",
        bonus: "3 months of free support after launch",
        features: [
          { text: "Custom UI/UX design", highlight: true },
          { text: "Up to 15 pages" },
          { text: "Content management system to edit pages yourself" },
          { text: "Blog or news section" },
          { text: "Advanced SEO & speed optimisation" },
          { text: "WhatsApp & live chat integration" },
          { text: "3 rounds of design revisions" },
          { text: "Online store", included: false },
        ],
      },
      {
        id: "e-commerce",
        name: "E-commerce",
        description: "Everything you need to sell online and manage orders.",
        price: 2499,
        oldPrice: 2999,
        timeline: "Ready in about 6–8 weeks",
        bonus: "6 months of free support after launch",
        features: [
          { text: "Online store with unlimited products", highlight: true },
          { text: "bKash, Nagad & card payments" },
          { text: "Inventory & order management" },
          { text: "Customer accounts & order tracking" },
          { text: "Courier & delivery integration" },
          { text: "Sales reports dashboard" },
          { text: "Everything in Business" },
        ],
      },
    ],
    compare: [
      {
        group: "Design & content",
        rows: [
          { label: "Pages", values: ["Up to 5", "Up to 15", "Unlimited"] },
          { label: "Custom UI/UX design", values: [false, true, true] },
          { label: "Content management system", values: [false, true, true] },
          { label: "Blog or news section", values: [false, true, true] },
          { label: "Design revisions", values: ["1 round", "3 rounds", "3 rounds"] },
        ],
      },
      {
        group: "Growth",
        rows: [
          { label: "SEO", values: ["Basic", "Advanced", "Advanced"] },
          { label: "Analytics setup", values: [true, true, true] },
          { label: "WhatsApp & live chat", values: [false, true, true] },
          { label: "Online store & payments", values: [false, false, true] },
        ],
      },
      {
        group: "Delivery & support",
        rows: [
          { label: "Typical timeline", values: ["2 weeks", "4 weeks", "6–8 weeks"] },
          { label: "Free support after launch", values: ["1 month", "3 months", "6 months"] },
          { label: "Source code ownership", values: [true, true, true] },
        ],
      },
    ],
    addons: [
      { id: "domain-hosting", name: "Domain & hosting setup", description: "We register your domain and set up fast, secure hosting for the first year.", price: 79 },
      { id: "logo", name: "Logo & brand kit", description: "A logo, colour palette and fonts that match your new website.", price: 149 },
      { id: "content", name: "Content writing", description: "Professional copy for up to 10 pages, written for search engines.", price: 199 },
    ],
    note: "One-time project prices in USD. Hosting, domain and paid third-party services are billed separately. Your final quote is based on your exact scope.",
  },
  {
    id: "mobile",
    label: "Mobile apps",
    icon: "smartphone",
    title: "Mobile app packages",
    billing: "one-time",
    includes: ["UI/UX design", "Admin panel", "App store publishing", "You own the code"],
    plans: [
      {
        id: "mvp",
        name: "MVP",
        description: "Launch your idea quickly and test it with real users.",
        price: 3999,
        oldPrice: 4999,
        timeline: "Ready in about 6 weeks",
        bonus: "1 month of free support after launch",
        features: [
          { text: "Android & iOS from one codebase (Flutter)" },
          { text: "Up to 10 screens" },
          { text: "Login & user profiles" },
          { text: "Push notifications" },
          { text: "Basic admin panel" },
          { text: "In-app payments", included: false },
          { text: "ERP / CRM integration", included: false },
        ],
      },
      {
        id: "growth",
        name: "Growth",
        description: "A complete product with payments, chat and analytics.",
        price: 7999,
        oldPrice: 9999,
        featured: true,
        timeline: "Ready in about 10–12 weeks",
        bonus: "3 months of free support after launch",
        features: [
          { text: "Android & iOS from one codebase (Flutter)" },
          { text: "Up to 25 screens", highlight: true },
          { text: "In-app payments" },
          { text: "Real-time chat & notifications" },
          { text: "Full admin dashboard" },
          { text: "Usage analytics" },
          { text: "ERP / CRM integration", included: false },
        ],
      },
      {
        id: "scale",
        name: "Scale",
        description: "Native apps built for heavy use and deep integrations.",
        price: 14999,
        timeline: "Ready in about 4–6 months",
        bonus: "6 months of free support after launch",
        features: [
          { text: "Native Swift & Kotlin apps", highlight: true },
          { text: "Unlimited screens" },
          { text: "Offline mode & data sync" },
          { text: "ERP / CRM integration" },
          { text: "Automated testing & CI/CD" },
          { text: "Everything in Growth" },
        ],
      },
    ],
    compare: [
      {
        group: "Product",
        rows: [
          { label: "Platforms", values: ["Android & iOS", "Android & iOS", "Android & iOS"] },
          { label: "Technology", values: ["Flutter", "Flutter", "Native"] },
          { label: "Screens", values: ["Up to 10", "Up to 25", "Unlimited"] },
          { label: "In-app payments", values: [false, true, true] },
          { label: "Real-time chat", values: [false, true, true] },
          { label: "Offline mode", values: [false, false, true] },
        ],
      },
      {
        group: "Back office",
        rows: [
          { label: "Admin panel", values: ["Basic", "Full dashboard", "Full dashboard"] },
          { label: "Analytics", values: [false, true, true] },
          { label: "ERP / CRM integration", values: [false, false, true] },
        ],
      },
      {
        group: "Delivery & support",
        rows: [
          { label: "Typical timeline", values: ["6 weeks", "10–12 weeks", "4–6 months"] },
          { label: "App store publishing", values: [true, true, true] },
          { label: "Free support after launch", values: ["1 month", "3 months", "6 months"] },
        ],
      },
    ],
    addons: [
      { id: "landing-page", name: "App landing page", description: "A one-page website that promotes your app and links to the stores.", price: 299 },
      { id: "store-kit", name: "Store listing kit", description: "App store screenshots, icon and description designed to convert.", price: 149 },
      { id: "extra-support", name: "3 extra months of support", description: "Fixes and small updates for three more months after launch.", price: 599 },
    ],
    note: "One-time project prices in USD. Apple and Google developer account fees and paid third-party services are billed separately.",
  },
  {
    id: "software",
    label: "Software & ERP",
    icon: "layers",
    title: "Business software & ERP",
    billing: "one-time",
    includes: ["Requirement workshop", "Data migration", "User training", "You own the code"],
    plans: [
      {
        id: "essentials",
        name: "Essentials",
        description: "Core modules to replace spreadsheets for a growing business.",
        price: 2999,
        oldPrice: 3499,
        timeline: "Live in about 6 weeks",
        bonus: "1 month of free support after go-live",
        features: [
          { text: "Inventory, sales & purchase modules" },
          { text: "Up to 10 users" },
          { text: "Standard reports" },
          { text: "Import your data from Excel" },
          { text: "1 training session" },
          { text: "Accounting & HR modules", included: false },
          { text: "Multi-branch support", included: false },
        ],
      },
      {
        id: "professional",
        name: "Professional",
        description: "A connected system for finance, people and operations.",
        price: 6999,
        oldPrice: 8499,
        featured: true,
        timeline: "Live in about 3 months",
        bonus: "3 months of free support after go-live",
        features: [
          { text: "Accounting, HR & payroll modules", highlight: true },
          { text: "Up to 50 users" },
          { text: "Role-based permissions" },
          { text: "Multi-branch support" },
          { text: "Custom reports & dashboards" },
          { text: "Website, SMS & payment integrations" },
          { text: "Custom modules", included: false },
        ],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        description: "Tailored modules, unlimited users and a service-level agreement.",
        price: null,
        timeline: "Timeline agreed in the proposal",
        bonus: "12 months of support included",
        features: [
          { text: "Custom modules built around your process", highlight: true },
          { text: "Unlimited users" },
          { text: "Cloud or on-premise deployment" },
          { text: "Service-level agreement" },
          { text: "Dedicated project manager" },
          { text: "Everything in Professional" },
        ],
      },
    ],
    compare: [
      {
        group: "Modules",
        rows: [
          { label: "Inventory, sales & purchase", values: [true, true, true] },
          { label: "Accounting", values: [false, true, true] },
          { label: "HR & payroll", values: [false, true, true] },
          { label: "Custom modules", values: [false, false, true] },
        ],
      },
      {
        group: "Scale & control",
        rows: [
          { label: "Users", values: ["Up to 10", "Up to 50", "Unlimited"] },
          { label: "Role-based permissions", values: [false, true, true] },
          { label: "Multi-branch", values: [false, true, true] },
          { label: "Deployment", values: ["Cloud", "Cloud", "Cloud or on-premise"] },
        ],
      },
      {
        group: "Delivery & support",
        rows: [
          { label: "Data migration", values: ["From Excel", "From Excel or old system", "Any source"] },
          { label: "Training", values: ["1 session", "3 sessions", "Tailored programme"] },
          { label: "Service-level agreement", values: [false, false, true] },
          { label: "Support included", values: ["1 month", "3 months", "12 months"] },
        ],
      },
    ],
    addons: [
      { id: "training-day", name: "On-site training day", description: "A full day of hands-on training for your team at your office.", price: 199 },
      { id: "extra-users", name: "10 extra user licences", description: "Add ten more users beyond your plan limit.", price: 299 },
      { id: "migration", name: "Migration from your old system", description: "We move customers, products and history from your current software.", price: 499 },
    ],
    note: "One-time project prices in USD. Server, cloud hosting and third-party licences are billed separately. Enterprise pricing is quoted after a requirement workshop.",
  },
  {
    id: "support",
    label: "Support & maintenance",
    icon: "shield-check",
    title: "Support & maintenance plans",
    billing: "monthly",
    includes: ["Security updates", "Uptime monitoring", "Backups", "Monthly report"],
    plans: [
      {
        id: "basic",
        name: "Basic",
        description: "Keep a website or app secure and up to date.",
        price: 99,
        bonus: "Free health check of your current system",
        features: [
          { text: "Up to 5 hours of work per month" },
          { text: "Security & dependency updates" },
          { text: "Uptime monitoring" },
          { text: "Monthly backups" },
          { text: "Email support, reply within 2 business days" },
          { text: "Performance tuning", included: false },
          { text: "New feature development", included: false },
        ],
      },
      {
        id: "standard",
        name: "Standard",
        description: "Ongoing care plus small improvements every month.",
        price: 249,
        featured: true,
        bonus: "Free health check of your current system",
        features: [
          { text: "Up to 15 hours of work per month", highlight: true },
          { text: "Security & dependency updates" },
          { text: "Uptime monitoring" },
          { text: "Weekly backups" },
          { text: "Email & WhatsApp support, reply within 1 business day" },
          { text: "Performance tuning" },
          { text: "New feature development", included: false },
        ],
      },
      {
        id: "premium",
        name: "Premium",
        description: "A dedicated engineer for your product, every month.",
        price: 499,
        bonus: "Free health check and quarterly roadmap review",
        features: [
          { text: "Up to 40 hours of work per month", highlight: true },
          { text: "Dedicated engineer" },
          { text: "Daily backups" },
          { text: "Priority support, reply the same business day" },
          { text: "Performance tuning" },
          { text: "New feature development" },
        ],
      },
    ],
    compare: [
      {
        group: "Work included",
        rows: [
          { label: "Hours per month", values: ["Up to 5", "Up to 15", "Up to 40"] },
          { label: "Security & dependency updates", values: [true, true, true] },
          { label: "Performance tuning", values: [false, true, true] },
          { label: "New feature development", values: [false, false, true] },
        ],
      },
      {
        group: "Reliability",
        rows: [
          { label: "Uptime monitoring", values: [true, true, true] },
          { label: "Backups", values: ["Monthly", "Weekly", "Daily"] },
        ],
      },
      {
        group: "Support",
        rows: [
          { label: "Channels", values: ["Email", "Email & WhatsApp", "Priority"] },
          { label: "Reply time", values: ["2 business days", "1 business day", "Same business day"] },
          { label: "Dedicated engineer", values: [false, false, true] },
        ],
      },
    ],
    addons: [
      { id: "security-audit", name: "Security audit", description: "A one-off review of your system security with a written report.", price: 149 },
      { id: "performance-audit", name: "Performance audit", description: "Find and fix what slows your website or app down.", price: 149 },
    ],
    note: "Prices in USD per month. Pay yearly to save 15%. Extra hours are billed at the plan's hourly rate.",
  },
];
