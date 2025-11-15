import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { achievementService } from "../../services/achievementService";
import type { Achievement } from "../../services/achievementService";
const AchievementPage = () => {
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    navigate("/home", { replace: true });
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    achievementService
      .getAchievements()
      .then((achData) => {
        setAchievements(achData);
        setLoading(false);
      })
      .catch(() => {
        setError("加载成就失败");
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <img
        src="/侧边栏三张底图.svg"
        alt="背景"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <button
        onClick={handleBack}
        className="absolute left-4 top-8 w-12 h-12 z-30 transition-opacity hover:opacity-80 flex items-center justify-center md:left-[1.38rem] md:top-[2.75rem] md:w-[3.13rem] md:h-[3.13rem]"
      >
        <span className="text-black text-4xl font-bold leading-none md:text-[2.5rem]">
          &lt;
        </span>
      </button>

      <div className="relative z-10 flex flex-col items-center px-4 pb-8">
        <h1 className="text-black text-center text-4xl md:text-5xl font-normal mt-8 md:mt-[2.13rem] mb-[9.89rem] md:mb-[14rem]">
          语录收集
        </h1>

        <div className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-md">
          {loading && <div className="text-black text-lg">加载中...</div>}
          {error && <div className="text-red-500 text-lg">{error}</div>}
          {!loading &&
            !error &&
            Array.isArray(achievements) &&
            achievements.map((ach) => {
              const unlocked = ach.unlocked;
              return (
                <div
                  key={ach.id}
                  onClick={
                    unlocked
                      ? () => navigate(`/achievement/show?id=${ach.id}`)
                      : undefined
                  }
                  className={`flex items-stretch rounded-2xl md:rounded-[1.25rem] overflow-hidden w-full shadow-sm transition-transform ${
                    unlocked
                      ? "cursor-pointer hover:scale-105"
                      : "cursor-not-allowed opacity-60"
                  }`}
                  style={{
                    maxWidth: "21rem",
                    minHeight: "5rem",
                  }}
                >
                  <div
                    className="flex items-center justify-center px-2 py-2 shrink-0"
                    style={{
                      backgroundColor: "rgba(158, 218, 241, 1)",
                      width: "5rem",
                    }}
                  >
                    <span className="text-black text-xl md:text-2xl font-normal text-center whitespace-pre-wrap break-words leading-tight">
                      {`"${ach.name}"`}
                    </span>
                  </div>

                  <div
                    className="flex-1 flex flex-col justify-center"
                    style={{
                      backgroundColor: "rgba(194, 236, 214, 1)",
                    }}
                  >
                    <p className="text-black text-base md:text-lg font-normal leading-relaxed px-4 my-1">
                      {unlocked ? ach.content : "？？？"}
                    </p>

                    <div
                      style={{
                        height: "1px",
                        backgroundColor: "rgba(158, 218, 241, 1)",
                      }}
                    />

                    <p className="text-black text-sm md:text-[1rem] font-normal opacity-80 py-1 px-4">
                      {ach.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex justify-center mt-[2rem] text-sm md:text-base text-black opacity-60">
          点击成就标题，解锁小猫语录。
        </div>
      </div>
    </div>
  );
};
export default AchievementPage;
