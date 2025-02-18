"use server";

import { UserGet, UserLogin, UserLoginResponse, UserRegister } from "@/types/user";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function register(userRegister: UserRegister): Promise<UserGet> {
  try {
    const response = await fetch("http://localhost:8083/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userRegister),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Ошибка регистрации");
    }

    const resp: UserLoginResponse = await response.json();
    if (!resp.user?.id) {
      throw new Error("Неверный формат ответа сервера");
    }

    return resp.user;

  } catch (error) {
    throw new Error(
      error instanceof Error 
        ? error.message 
        : "Произошла ошибка при регистрации"
    );
  }
}

export async function SendVerificationCode() {
    try {
        const response = await fetch(`http://localhost:8083/verify-send`, {
            method: "POST",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message);
        }

        } catch (error) {
        throw new Error(
            error instanceof Error 
            ? error.message 
            : "Произошла ошибка при отправке кода"
        );
    }
}

export async function CheckVerificationCode(code: string): Promise<boolean> {
    if(!code || code === undefined || code === "") {
        return false
    }

    try {
        const response = await fetch(`http://localhost:8083/verify=check?code=${code}`, {
            method: "POST",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || "Неверный код");
        }

        const data: boolean = await response.json();
        if (!data) {
            throw new Error("Неверный код");
        }

        return data;

        } catch (error) {
        console.error("Login error:", error);
        throw new Error(
            error instanceof Error 
            ? error.message 
            : "Произошла ошибка при входе"
        );
    }
}