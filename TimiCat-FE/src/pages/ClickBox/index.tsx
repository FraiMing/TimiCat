import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ClickBox = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [stage, setStage] = useState<
    "initial" | "fading" | "result" | "navigating"
  >("initial");

  // 组件挂载后触发实体化入场动画
  useState(() => {
    setTimeout(() => setIsVisible(true), 50);
  });

  const handleClick = () => {
    localStorage.setItem("hasClickedBox", "true");
    setStage("fading");

    setTimeout(() => {
      setStage("result");

      setTimeout(() => {
        setStage("navigating");

        setTimeout(() => {
          navigate("/home", {
            replace: true,
            state: { fromClickBox: true },
          });
        }, 800);
      }, 3000);
    }, 1000);
  };

  return (
    <div
      className={`relative bg-[linear-gradient(180deg,_rgba(205,_238,_248,_1)_0%,_rgba(255,_255,_255,_1)_100%)] min-h-screen w-full overflow-hidden transition-opacity duration-800 ${
        isVisible && stage !== "navigating" ? "opacity-100" : "opacity-0"
      }`}
    >
      <img
        src="/src/assets/images/顶部装饰.svg"
        alt="顶部装饰"
        className="absolute left-0 top-0 w-full h-auto opacity-100 z-0"
      />

      {/* 初始阶段 */}
      {/* 依旧好动画 👍 */}
      {(stage === "initial" || stage === "fading") && (
        <div className="absolute inset-0">
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
          </div>

          <div
            className={`absolute left-[4rem] sm:left-[5rem] top-[22.75rem] sm:top-[20rem] w-full max-w-[13.13rem] sm:max-w-[14rem] z-20 transition-opacity duration-800 ${
              stage === "fading" ? "opacity-0" : "opacity-100"
            }`}
          >
            <img
              src="/src/assets/images/click对话框.svg"
              alt="click对话框"
              className="w-full h-auto opacity-100"
            />
            <div className="absolute top-[2.81rem] left-6 right-5 text-[1.5rem] font-normal leading-[1.5rem] text-black align-top">
              "嘿，小家伙，出来吧"
            </div>
          </div>

          <h1 className="absolute bottom-[9.0rem] left-1/2 -translate-x-1/2 transition-opacity duration-800 delay-200 opacity-100 text-[1.5rem] font-normal leading-[1.5rem] text-black whitespace-nowrap align-top z-20">
            请点击箱子
          </h1>
        </div>
      )}

      {/* 结果阶段 */}
      {(stage === "result" || stage === "navigating") && (
        <div
          className={`absolute inset-0 transition-opacity duration-800 ${
            stage === "navigating" ? "opacity-0" : "opacity-100"
          } z-20`}
        >
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
          </div>

          <div
            className={`absolute left-[4rem] sm:left-[5rem] top-[22.75rem] sm:top-[20rem] w-full max-w-[13rem] sm:max-w-[14rem] z-20 transition-opacity duration-800 ${
              stage === "navigating" ? "opacity-0" : "opacity-100"
            }`}
          >
            <img
              src="/src/assets/images/click对话框.svg"
              alt="click对话框"
              className="w-full h-auto opacity-100"
            />
            <div className="absolute top-[2.0rem] left-7 right-5 text-[1.5rem] font-normal leading-[1.5rem] text-black align-top">
              "看来你们还不够熟悉，请再相处一段时间吧"
            </div>
          </div>

          <div className="absolute bottom-[9.0rem] left-1/2 -translate-x-1/2 text-[1.5rem] font-normal leading-[1.5rem] text-black text-center whitespace-nowrap align-top">
            请完成一次专注
          </div>
        </div>
      )}

      <button
        onClick={handleClick}
        disabled={stage !== "initial"}
        className="absolute left-1/2 top-[31.31rem] sm:top-[28rem] -translate-x-1/2 transition-opacity duration-1000 delay-300 opacity-100 disabled:opacity-50 z-30"
      >
        <img
          src="/src/assets/images/朝左箱子.svg"
          alt="click箱子"
          className="w-[10.63rem] sm:w-[12rem] h-auto opacity-100"
        />
      </button>
    </div>
  );
};

export default ClickBox;
