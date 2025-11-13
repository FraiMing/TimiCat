import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ==== 游客登录、验证相关函数 ====
export function getGuestToken() {
  return localStorage.getItem("guestToken");
}

export function setGuestSession(token: string, username: string) {
  localStorage.setItem("guestToken", token);
  localStorage.setItem("guestUsername", username);
}

// 退出登录，先放着
export function clearGuestSession() {
  localStorage.removeItem("guestToken");
  localStorage.removeItem("guestUsername");
}
