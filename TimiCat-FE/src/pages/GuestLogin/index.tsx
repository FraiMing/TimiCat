import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "@/services/apiClient";
import { setGuestSession } from "@/lib/helpers/utils";

export default function GuestLogin() {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await apiClient.post("/guest-login");
      const { token, username } = res.data;

      // 保存到localStorage
      setGuestSession(token, username);

      // 跳转到选择猫咪页面
      nav("/choose-cat");
    } catch (err) {
      console.error("游客登录失败:", err);
      setError("登录失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-[linear-gradient(180deg,_rgba(205,_238,_248,_1)_0%,_rgba(255,_255,_255,_1)_100%)] min-h-screen w-full overflow-hidden flex flex-col items-center">
      <img
        src="/顶部装饰.svg"
        alt="顶部装饰"
        className="absolute left-0 top-0 w-full h-auto opacity-100 z-0"
      />

      <div className="relative w-full flex justify-center mt-[12.75rem] sm:mt-[10rem] px-4 z-10 md:mt-[24rem]">
        <img
          src="/登录logo.svg"
          alt="登录logo"
          className="w-full max-w-[23.25rem] h-auto sm:max-w-[26rem] opacity-100"
        />
      </div>

      <div className="relative w-full flex justify-center mt-[1.75rem] sm:mt-[2rem] px-4 z-10 md:mt-[1.5rem]">
        <img
          src="/Frame 1.svg"
          alt="Frame 1"
          className="w-[15rem] h-auto sm:w-[17rem] opacity-100"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2 text-center px-4 z-10">
          {error}
        </p>
      )}

      <button
        onClick={handleGuestLogin}
        disabled={isLoading}
        className="mt-[1rem] sm:mt-[1.25rem] text-3xl font-normal text-black whitespace-nowrap disabled:opacity-50 hover:opacity-80 transition-opacity z-10"
      >
        {isLoading ? "登录中..." : "游客登录"}
      </button>

      <img
        src="/底部装饰.svg"
        alt="底部装饰"
        className="absolute left-0 bottom-0 w-full h-auto opacity-100 z-0"
      />
    </div>
  );
}
