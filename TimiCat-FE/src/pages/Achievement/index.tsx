import { useNavigate } from "react-router-dom";

const Achievement = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/home", { replace: true });
  };

  // 示例语录数据
  const quotes = [
    {
      id: 1,
      Name: '"初遇"',
      content: "世界很小，小到在雪落之时，你遇到了一只属于自己的小猫。",
      subtitle: "第一次见到小猫",
      achievement: "人，\n你等了咪很多个冬天吗？",
    },
    {
      id: 2,
      Name: '"无声告白"',
      content: "专注的力量能让时间变得有意义。",
      subtitle: "专注时长累计达到 5h 20min",
      achievement: "人，\n爱咪，或者不爱咪，\n咪都在这里。",
    },
    {
      id: 3,
      Name: '"答案"',
      content: "每一次坚持都是对自己的承诺。",
      subtitle: "专注时长累计达到 24h",
      achievement: "人，\n春天远远的，你呢？",
    },
    {
      id: 4,
      Name: '"猫岛"',
      content: "时间会记住你所有的努力。",
      subtitle: "专注时长累计达到 36h",
      achievement: "人，\n你的小岛上，\n只有我一只咪吗？",
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <img
        src="/src/assets/images/侧边栏三张底图.svg"
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
          {quotes.map((quote, index) => (
            <div
              key={index}
              onClick={() => navigate(`/achievement/show?id=${quote.id}`)}
              className="flex items-stretch rounded-2xl md:rounded-[1.25rem] overflow-hidden w-full shadow-sm cursor-pointer hover:scale-105 transition-transform"
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
                  {quote.Name}
                </span>
              </div>

              <div
                className="flex-1 flex flex-col justify-center"
                style={{
                  backgroundColor: "rgba(194, 236, 214, 1)",
                }}
              >
                <p className="text-black text-base md:text-lg font-normal leading-relaxed px-4 my-1">
                  {quote.content}
                </p>

                {/* 蓝色分隔线 - 在内容和副标题之间 */}
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "rgba(158, 218, 241, 1)",
                  }}
                />

                <p className="text-black text-sm md:text-[1rem] font-normal opacity-80 py-1 px-4">
                  {quote.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-[2rem] text-sm md:text-base text-black opacity-60">
          点击成就标题，解锁小猫语录。
        </div>
      </div>
    </div>
  );
};
export default Achievement;
