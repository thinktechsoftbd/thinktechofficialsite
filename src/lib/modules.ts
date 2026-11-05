// Helpers for subscription modules (subscription_module in the shared ERP
// database). Plain functions so both server and client components can use them.

/** What the pricing page needs to show a module as a tab and a panel. */
export type PricingModule = {
  id: string;
  name: string;
  /** Name from the Icon component map (src/components/ui/Icon.tsx). */
  icon: string;
  description: string | null;
  /** id of the module's card in the "Subscription software" section. */
  anchor: string;
};

// subscription_module has no icon column, so pick one from the module name.
// The first matching rule wins (a "mobile app" module gets the phone icon).
const iconRules: [RegExp, string][] = [
  [/mobile/i, "smartphone"],
  [/attendance|payroll/i, "fingerprint"],
  [/medi|clinic|doctor|health|chamber|hospital/i, "stethoscope"],
  [/e-?commerce|shop|store/i, "shopping-bag"],
  [/erp|accounting|inventory/i, "layout-dashboard"],
  [/web ?site|website/i, "monitor"],
];

export function moduleIcon(name: string) {
  return iconRules.find(([pattern]) => pattern.test(name))?.[1] ?? "layers";
}

export function moduleAnchor(name: string) {
  return `module-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}
