interface Props {
  onClick: () => void;
  mode: "countup" | "countdown";
}

export default function ToggleModeButton({ onClick, mode }: Props) {
  return (
    <button
      onClick={onClick}
      className="relative w-[10.63rem] h-[3.13rem] bg-white rounded-full flex items-center justify-around px-[0.5rem] hover:opacity-80 transition-all"
    >
      {/* 滑动背景👍 */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 w-[5rem] h-[2.5rem] bg-[rgba(205,238,248,0.8)] rounded-full transition-all duration-300 ${
          mode === "countdown" ? "left-[0.3rem]" : "left-[5.33rem]"
        }`}
      />

      <div className="relative z-10 w-[2.5rem] h-[2.5rem] flex items-center justify-center">
        <img
          src="/src/assets/images/倒计时.svg"
          alt="倒计时"
          className="w-[2rem] h-[2rem]"
        />
      </div>

      <div className="relative z-10 w-[2.5rem] h-[2.5rem] flex items-center justify-center">
        <img
          src="/src/assets/images/时钟.svg"
          alt="正计时"
          className="w-[2rem] h-[2rem]"
        />
      </div>
    </button>
  );
}
