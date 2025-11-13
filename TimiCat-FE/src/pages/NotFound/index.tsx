import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center align-middle h-screen w-full overflow-hidden">
      <img
        src="/src/assets/images/404底图.svg"
        alt="404背景"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="relative z-10 flex flex-col items-center mt-[28rem]">
        <div className="text-3xl text-black">此页面已被小猫啃坏</div>
        <Link to="/home" className="mt-4 text-xl text-black">
          回到首页
        </Link>
      </div>
    </div>
  );
}
