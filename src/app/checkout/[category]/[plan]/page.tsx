import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DetailSkeleton } from "@/components/DetailSkeleton";
import { Checkout } from "@/components/pricing/Checkout";
import { findPlan, pricingCategories } from "@/config/pricing";

// One static checkout page per priced plan, e.g. /checkout/websites/business.
// Plans with a custom quote (price: null) go to /contact instead.
export function generateStaticParams() {
  return pricingCategories.flatMap((c) =>
    c.plans.filter((p) => p.price !== null).map((p) => ({ category: c.id, plan: p.id })),
  );
}

export async function generateMetadata({ params }: PageProps<"/checkout/[category]/[plan]">): Promise<Metadata> {
  const { category, plan } = await params;
  const found = findPlan(category, plan);
  return {
    title: found && found.plan.price !== null ? `Checkout: ${found.plan.name} plan` : "Checkout",
    robots: { index: false, follow: false },
  };
}

export default function CheckoutPage({ params }: PageProps<"/checkout/[category]/[plan]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <CheckoutDetail params={params} />
    </Suspense>
  );
}

async function CheckoutDetail({ params }: Pick<PageProps<"/checkout/[category]/[plan]">, "params">) {
  const { category, plan } = await params;
  const found = findPlan(category, plan);
  if (!found || found.plan.price === null) notFound();
  return <Checkout categoryId={category} planId={plan} />;
}
