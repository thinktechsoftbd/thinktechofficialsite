import "server-only";

// Server-to-server client for the ThinkTech ERP API. The site trades its
// integration client ID and secret for a short-lived access token at
// POST /api/security/integration/token and sends it as a Bearer token.
// The secret never leaves the server.

type TokenResponse = { accessToken: string; tokenType: string; expiresIn: number };

const REQUEST_TIMEOUT_MS = 10_000;
// Ask for a new token this long before the current one expires.
const TOKEN_REFRESH_MARGIN_MS = 60_000;

declare global {
  var __thinktechErpToken: { value: string; expiresAt: number } | undefined;
}

function settings() {
  const baseUrl = process.env.ERP_API_URL?.replace(/\/+$/, "");
  const clientId = process.env.ERP_CLIENT_ID;
  const clientSecret = process.env.ERP_CLIENT_SECRET;
  if (!baseUrl || !clientId || !clientSecret) {
    throw new Error("ERP_API_URL, ERP_CLIENT_ID and ERP_CLIENT_SECRET must be set to call the ERP API.");
  }
  return { baseUrl, clientId, clientSecret };
}

async function requestToken(): Promise<string> {
  const { baseUrl, clientId, clientSecret } = settings();
  const res = await fetch(`${baseUrl}/api/security/integration/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ clientId, clientSecret }),
    cache: "no-store",
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`ERP token request failed with HTTP ${res.status}.`);

  const token = (await res.json()) as TokenResponse;
  globalThis.__thinktechErpToken = {
    value: token.accessToken,
    expiresAt: Date.now() + token.expiresIn * 1000 - TOKEN_REFRESH_MARGIN_MS,
  };
  return token.accessToken;
}

async function accessToken(): Promise<string> {
  const cached = globalThis.__thinktechErpToken;
  return cached && cached.expiresAt > Date.now() ? cached.value : requestToken();
}

/** GET a JSON resource from the ERP API with the site's integration token. */
export async function erpGet<T>(path: string): Promise<T> {
  const { baseUrl } = settings();
  const send = async (token: string) =>
    fetch(`${baseUrl}${path}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

  let res = await send(await accessToken());
  // The token can be revoked or the API restarted with a new signing key: retry once with a fresh one.
  if (res.status === 401) res = await send(await requestToken());
  if (!res.ok) throw new Error(`ERP request GET ${path} failed with HTTP ${res.status}.`);
  return (await res.json()) as T;
}
