// 典中典保护路由
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGuestToken, clearGuestSession } from "@/lib/helpers/utils";
import apiClient from "@/services/apiClient";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const nav = useNavigate();
  const token = getGuestToken();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    const verifyToken = async () => {
      if (!token) {
        nav("/guest-login", { replace: true });
        return;
      }

      try {
        await apiClient.get("/me");
        if (!isCancelled) {
          setIsVerifying(false);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("Token 验证失败:", err);
          clearGuestSession();
          nav("/guest-login", { replace: true });
        }
      }
    };

    verifyToken();

    return () => {
      isCancelled = true;
    };
  }, []);

  if (isVerifying) {
    return <div>验证中...</div>;
  }

  return <>{children}</>;
}
