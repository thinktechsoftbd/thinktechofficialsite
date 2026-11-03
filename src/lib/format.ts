// Dates come from Postgres as YYYY-MM-DD strings; format them in UTC so the
// output is identical on the server and in the browser.
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export function formatDate(isoDate: string) {
  return dateFormatter.format(new Date(`${isoDate}T00:00:00Z`));
}

const usdFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

/** 1299 -> "$1,299" */
export function formatUsd(amount: number) {
  return `$${usdFormatter.format(amount)}`;
}
