import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Finish = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  // 检查是否完成过专注（用于图片改变）
  // 所以这里检查localStorage，如果存在则说明不是第一次
  const hasCompletedBefore =
    localStorage.getItem("hasCompletedFocus") === "true";

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 50);
  }, []);

  // 返回首页
  const handleBack = () => {
    // 在返回时标记已完成过第一次专注
    localStorage.setItem("hasCompletedFocus", "true");

    setIsVisible(false);
    setTimeout(() => {
      navigate("/home", {
        replace: true,
        state: { fromFinish: true },
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
        src="/顶部装饰.svg"
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
        src="/click雪花.svg"
        alt="click雪花"
        className="absolute left-0 top-[10.31rem] w-full max-w-[23.07rem] sm:max-w-[25rem] h-auto opacity-100 z-0"
      />
      <img
        src="/click猫爪1.svg"
        alt="click猫爪1"
        className="absolute left-2 bottom-[10rem] w-[9.38rem] sm:w-[10.5rem] h-auto opacity-80 -rotate-[21.43deg] z-5"
      />
      <img
        src="/click猫爪2.svg"
        alt="click猫爪2"
        className="absolute right-2 top-[15.19rem] w-40 sm:w-[11rem] h-auto opacity-40 rotate-[48.91deg] z-5"
      />

      <div className="absolute left-1/2 -translate-x-1/2 top-[12.31rem] w-full max-w-[21.25rem] sm:max-w-[23rem] h-[37.5rem] sm:h-[40rem] z-10">
        <img
          src="/Group 3.svg"
          alt="Group 3"
          className="w-full h-full opacity-100"
        />
      </div>

      <div className="absolute left-[4rem] sm:left-[5rem] top-[22.75rem] sm:top-[20rem] w-full max-w-[13.13rem] sm:max-w-[14rem] z-20 md:max-w-[17rem] z-20">
        <img
          src="/click对话框.svg"
          alt="click对话框"
          className="w-full h-auto opacity-100"
        />
        <div className="absolute top-[1rem] left-6 right-2 text-2xl font-normal leading-[2rem] text-black align-top md:left-[3rem] top-[2.5rem] right-5">
          "人，学累了吗？让咪陪你休息一下吧。"
        </div>
      </div>

      <div className="absolute bottom-[9.0rem] left-1/2 -translate-x-1/2 text-[1.5rem] font-normal leading-[1.5rem] text-black text-center whitespace-nowrap align-top z-20">
        恭喜您已完成本次专注
      </div>
      <div className="absolute left-1/2 top-[31.31rem] sm:top-[28rem] -translate-x-1/2 z-30">
        <img
          src={hasCompletedBefore ? "/猫.svg" : "/箱中猫.svg"}
          alt="箱子"
          className="w-[22rem] sm:w-[18rem] h-auto opacity-100"
        />
      </div>
    </div>
  );
};

export default Finish;
