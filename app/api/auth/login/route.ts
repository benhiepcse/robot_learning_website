import { NextResponse } from "next/server";

const ACCOUNTS: Record<string, string> = {
  levonghiahiep: "d4f9b102f84a3992ff4fa889884ac4be44cf4add54a033c5dcda79877931e917",
  phanthethong: "b90a32bd3f5f6a3a728639e4c4220a157bb86c1c2eaa533ea59b56b2b799a581",
};

const encoder = new TextEncoder();

function toHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function toBase64Url(value: string) {
  return btoa(value).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

async function hash(value: string) {
  return toHex(await crypto.subtle.digest("SHA-256", encoder.encode(value)));
}

async function sign(value: string) {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not configured");
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toHex(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { username?: string; password?: string; remember?: boolean };
    const username = body.username?.trim().toLowerCase() ?? "";
    const passwordHash = await hash(body.password ?? "");

    if (!ACCOUNTS[username] || ACCOUNTS[username] !== passwordHash) {
      return NextResponse.json({ ok: false, message: "Tên đăng nhập hoặc mật khẩu không đúng." }, { status: 401 });
    }

    const maxAge = body.remember ? 60 * 60 * 24 * 30 : 60 * 60 * 8;
    const expiresAt = Math.floor(Date.now() / 1000) + maxAge;
    const payload = `${username}.${expiresAt}`;
    const token = `${toBase64Url(payload)}.${await sign(payload)}`;
    const response = NextResponse.json({ ok: true, username });

    response.cookies.set("robolearn_session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge,
    });
    return response;
  } catch {
    return NextResponse.json({ ok: false, message: "Không thể đăng nhập lúc này." }, { status: 500 });
  }
}
