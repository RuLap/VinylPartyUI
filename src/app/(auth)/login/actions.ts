"use server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { UserGet, UserLogin, UserLoginResponse } from "@/types/user";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function login(userLogin: UserLogin): Promise<UserGet> {
  try {
    const response = await fetch("http://localhost:8083/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userLogin),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Ошибка авторизации");
    }

    const resp: UserLoginResponse = await response.json();
    if (!resp.user?.id) {
      throw new Error("Неверный формат ответа сервера");
    }

    const token = await new SignJWT({
      sub: resp.user.id,
      user: resp.user
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secretKey);

    (await
      cookies()).set({
      name: "session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    });

    return resp.user;

  } catch (error) {
    console.error("Login error:", error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : "Произошла ошибка при входе"
    );
  }
}