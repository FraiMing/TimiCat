import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ShowAchievement = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);

  // 获取成就ID
  const achievementId = searchParams.get("id") || "1";

  // 成就内容映射对应
  const achievementContents: { [key: string]: string } = {
    "1": "人，\n你等了咪很多个冬天吗？",
    "2": "人，\n爱咪，或者不爱咪，\n咪都在这里。",
    "3": "人，\n春天远远的，你呢？",
    "4": "人，\n你的小岛上，\n只有我一只咪吗？",
  };

  const currentAchievement =
    achievementContents[achievementId] || achievementContents["1"];

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 50);
  }, []);

  // 返回首页
  const handleBack = () => {
    setIsVisible(false);
    setTimeout(() => {
      navigate("/achievement", {
        replace: true,
      });
    }, 800);
  };

  return (
    <div
      className={`relative bg-[linear-gradient(180deg,_rgba(205,_238,_248,_1)_0%,_rgba(255,_255,_255,_1)_100%)] min-h-screen w-full overflow-hidden transition-opacity duration-800 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <img
        src="/src/assets/images/顶部装饰.svg"
        alt="顶部装饰"
        className="absolute left-0 top-0 w-full h-auto opacity-100 z-0"
      />

      <button
        onClick={handleBack}
        className="absolute left-[1.38rem] top-[2.75rem] w-[3.13rem] h-[3.13rem] z-30 transition-opacity hover:opacity-80 flex items-center justify-center"
      >
        <span className="text-black text-[2.5rem] font-bold leading-none">
          &lt;
        </span>
      </button>

      <img
        src="/src/assets/images/click雪花.svg"
        alt="click雪花"
        className="absolute left-0 top-[10.31rem] w-full max-w-[23.07rem] sm:max-w-[25rem] h-auto opacity-100 z-0"
      />
      <img
        src="/src/assets/images/click猫爪1.svg"
        alt="click猫爪1"
        className="absolute left-2 bottom-[10rem] w-[9.38rem] sm:w-[10.5rem] h-auto opacity-80 -rotate-[21.43deg] z-5"
      />
      <img
        src="/src/assets/images/click猫爪2.svg"
        alt="click猫爪2"
        className="absolute right-2 top-[15.19rem] w-40 sm:w-[11rem] h-auto opacity-40 rotate-[48.91deg] z-5"
      />

      <div className="absolute left-1/2 -translate-x-1/2 top-[12.31rem] w-full max-w-[21.25rem] sm:max-w-[23rem] h-[37.5rem] sm:h-[40rem] z-10">
        <img
          src="/src/assets/images/Group 3.svg"
          alt="Group 3"
          className="w-full h-full opacity-100"
        />
        <div className="absolute top-[10rem] left-[3rem] right-6 text-[1.5rem] font-normal leading-[2rem] text-black whitespace-pre-wrap">
          {currentAchievement}
        </div>
      </div>

      <div className="absolute left-1/2 top-[31.31rem] sm:top-[28rem] -translate-x-1/2 z-30">
        <img
          src="/src/assets/images/猫.svg"
          alt="箱子"
          className="w-[22rem] sm:w-[18rem] h-auto opacity-100"
        />
      </div>
    </div>
  );
};

export default ShowAchievement;
