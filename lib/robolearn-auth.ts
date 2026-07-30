const encoder = new TextEncoder();

function fromBase64Url(value: string) {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
  return atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "="));
}

function toHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function sign(value: string) {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return "";
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toHex(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

export async function requireRoboLearnUser(request: Request) {
  const cookie = request.headers.get("cookie")?.match(/(?:^|;\s*)robolearn_session=([^;]+)/)?.[1];
  if (!cookie) return null;
  try {
    const [encodedPayload, signature] = cookie.split(".");
    const payload = fromBase64Url(encodedPayload);
    const [username, expiry] = payload.split(".");
    const valid = signature === await sign(payload) && Number(expiry) > Math.floor(Date.now() / 1000);
    return valid && ["levonghiahiep", "phanthethong"].includes(username) ? username : null;
  } catch {
    return null;
  }
}
