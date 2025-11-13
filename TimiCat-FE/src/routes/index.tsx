import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import Home from "@/pages/HomePage";
import ChooseCat from "@/pages/ChooseCat";
import GuestLogin from "@/pages/GuestLogin";
import ClickBox from "@/pages/ClickBox";
import Finish from "@/pages/Finish";
import ShowAchievement from "@/pages/Achievement/showAchievement";
import Achievement from "@/pages/Achievement";
import Dress from "@/pages/Dress";
import Statistics from "@/pages/Statistics";

function Index() {
  const token = localStorage.getItem("guestToken");
  const hasClickedBox = localStorage.getItem("hasClickedBox");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/guest-login" element={<GuestLogin />} />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/"
          element={
            token ? (
              // 如果已点击过箱子，跳转到 HomePage，否则跳转到 ChooseCat
              <Navigate
                to={hasClickedBox === "true" ? "/home" : "/choose-cat"}
                replace
              />
            ) : (
              // 没token，跳转到 GuestLogin
              <Navigate to="/guest-login" replace />
            )
          }
        />

        {/* 受保护的路由 - 使用 ProtectedRoute 包裹 */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/choose-cat"
          element={
            <ProtectedRoute>
              <ChooseCat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/click-box"
          element={
            <ProtectedRoute>
              <ClickBox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/finish"
          element={
            <ProtectedRoute>
              <Finish />
            </ProtectedRoute>
          }
        />
        <Route
          path="/achievement"
          element={
            <ProtectedRoute>
              <Achievement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dress"
          element={
            <ProtectedRoute>
              <Dress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/statistics"
          element={
            <ProtectedRoute>
              <Statistics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/achievement/show"
          element={
            <ProtectedRoute>
              <ShowAchievement />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Index;
