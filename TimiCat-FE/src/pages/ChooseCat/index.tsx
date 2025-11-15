import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChooseCat = () => {
  const [selectedBox, setSelectedBox] = useState<"Left" | "Right" | null>(null);
  const [animationStage, setAnimationStage] = useState("notChoose");
  const navigate = useNavigate();

  const handleBoxSelect = (boxType: "Left" | "Right") => {
    if (animationStage !== "notChoose") return;

    // 左边箱子暂时无法打开，敬请期待
    if (boxType === "Left") {
      alert("这个箱子暂时打不开哦，敬请期待");
      return;
    }

    setSelectedBox(boxType);
    setAnimationStage("fading");

    setTimeout(() => {
      setAnimationStage("choose");
      setTimeout(() => {
        navigate("/click-box", { replace: true });
      }, 300);
    }, 1000);
  };
  return (
    // 好动画 👍
    <div
      className={`transition-opacity duration-800 ${
        animationStage === "fading" ? "opacity-30" : "opacity-100"
      }`}
    >
      {(animationStage == "notChoose" || animationStage == "fading") && (
        <div
          className={`transition-all duration-800 ${
            animationStage === "fading" ? "opacity-0" : "opacity-100"
          } relative bg-[linear-gradient(180deg,_rgba(205,_238,_248,_1)_0%,_rgba(255,_255,_255,_1)_100%)] min-h-screen w-full overflow-hidden flex flex-col items-center`}
        >
          <img
            src="/顶部装饰.svg"
            alt="顶部装饰"
            className="absolute left-0 top-0 w-full h-auto opacity-100 z-0"
          />
          <img
            src="/雪花.svg"
            alt="雪花"
            className="absolute left-0 top-[10.56rem] w-full max-w-[30rem] h-auto sm:max-w-[27rem] opacity-100 z-0 "
          />
          <div className="relative w-full flex justify-center mt-[12.25rem] sm:mt-[10rem] z-10 md:mt-[25rem]">
            <div className="relative w-full max-w-[23.25rem] sm:max-w-[26rem] px-4 md:max-w-[40rem]">
              <img
                src="/choose对话框1.svg"
                alt="对话框1"
                className="absolute left-[1rem] top-0 w-[13.75rem] sm:w-[15rem] h-auto opacity-100"
              />
              <span className="absolute left-[3rem] top-[3rem] sm:text-2xl font-normal leading-8 text-black whitespace-nowrap md:left-[4rem] text-3xl">
                选择我还是
              </span>
            </div>
          </div>
          <div className="relative w-full flex justify-center mt-[3rem] sm:mt-[2.5rem] z-10">
            <div className="relative w-full max-w-[23.25rem] sm:max-w-[26rem] px-4">
              <img
                src="/choose对话框2.svg"
                alt="对话框2"
                className="absolute right-[1rem] top-0 w-[13.75rem] sm:w-[15rem] h-auto opacity-90"
              />
              <span className="absolute right-[3rem] top-[3rem] sm:text-2xl font-normal leading-8 text-black whitespace-nowrap md:right-[4rem] text-3xl">
                选择我？
              </span>
            </div>
          </div>
          <img
            src="/树状底部装饰.svg"
            alt="底部装饰"
            className="absolute left-0 bottom-0 w-full h-auto opacity-100 z-0"
          />
          <div className="relative w-full flex justify-center items-center gap-8 sm:gap-12 mt-[8rem] sm:mt-[7rem] z-10">
            <button
              onClick={() => handleBoxSelect("Left")}
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src="/choose朝右箱子.svg"
                alt="左边箱子"
                className="w-[10.63rem] sm:w-[12rem] h-auto opacity-100"
              />
            </button>
            <button
              onClick={() => handleBoxSelect("Right")}
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src="/朝左箱子.svg"
                alt="右边箱子"
                className={`animate-[wiggle_0.5s_ease-in-out_infinite] transition-all ${
                  selectedBox === null ? "animate-shake" : ""
                } w-[10.63rem] sm:w-[12rem] h-auto opacity-100`}
              />
            </button>
          </div>
        </div>
      )}
      {/* 好摇 👍 */}
      <style>{`
        @keyframes wiggle {
          0%, 100% {
            transform: rotate(-2deg) translateX(-2px);
          }
          50% {
            transform: rotate(2deg) translateX(2px);
          }
        }
      `}</style>
    </div>
  );
};

export default ChooseCat;
