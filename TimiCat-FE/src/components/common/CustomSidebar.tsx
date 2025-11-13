// 自制侧栏
import { Link } from "react-router-dom";

interface CustomSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CustomSidebar({ isOpen, onClose }: CustomSidebarProps) {
  return (
    <>
      {/* 遮罩层 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* 侧栏 */}
      <div
        className={`fixed left-0 top-[2.75rem] z-50 w-[13.38rem] h-full bg-[linear-gradient(180deg,_rgba(205,_238,_248,_1)_0%,_rgba(255,_255,_255,_1)_100%)] rounded-r-[1.25rem] shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative flex flex-col h-full overflow-hidden">
          <img
            src="/src/assets/images/侧栏雪花1.svg"
            alt="雪花1"
            className="absolute left-[7.75rem] top-[4.66rem] w-[4.38rem] h-[4.38rem] opacity-100 -rotate-[13.62deg] z-0"
          />
          <img
            src="/src/assets/images/侧栏雪花2.svg"
            alt="雪花2"
            className="absolute left-[0.69rem] top-[28.63rem] w-[3.75rem] h-[3.75rem] opacity-100 -rotate-[13.62deg] z-0"
          />
          <img
            src="/src/assets/images/侧栏雪花3.svg"
            alt="雪花3"
            className="absolute left-[7.88rem] top-[38.13rem] w-[5rem] h-[5rem] opacity-100 rotate-[11.29deg] z-0"
          />

          <img
            src="/src/assets/images/侧栏小猫.svg"
            alt="小猫"
            className="absolute bottom-[4.5rem] w-[10.04rem] h-[6.75rem] opacity-100 rotate-[19.73deg] z-0"
          />

          {/* 选项容器 */}
          <nav className="relative flex-1 pt-8 z-10">
            <ul className="space-y-[7rem]">
              <li>
                <Link
                  to="/statistics"
                  onClick={onClose}
                  className="block ml-[1.13rem] mt-[5rem] w-[10rem] h-[2.5rem] text-black text-[2.5rem] font-normal leading-[2.5rem] hover:opacity-80 transition-opacity"
                >
                  历史统计
                </Link>
              </li>
              <li>
                <Link
                  to="/achievement"
                  onClick={onClose}
                  className="block ml-[1.13rem] w-[10rem] h-[2.5rem] text-black text-[2.5rem] font-normal leading-[2.5rem] hover:opacity-80 transition-opacity"
                >
                  语录收集
                </Link>
              </li>
              <li>
                <Link
                  to="/dress"
                  onClick={onClose}
                  className="block ml-[1.13rem] w-[10rem] h-[2.5rem] text-black text-[2.5rem] font-normal leading-[2.5rem] hover:opacity-80 transition-opacity"
                >
                  装扮
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
