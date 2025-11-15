import { useNavigate } from "react-router-dom";

const Dress = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/home", { replace: true });
  };
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
          装扮
        </h1>
        <p className="text-black text-center text-4xl md:text-5xl font-normal mt-[2.13rem] md:mt-[2.13rem] mb-[9.89rem] md:mb-[14rem]">
          敬请期待
        </p>
      </div>
    </div>
  );
};
export default Dress;
