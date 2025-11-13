// 开始按钮：点击由父组件传入的回调
interface Props {
  onClick: () => void;
}

export default function StartButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-[9.75rem] h-[4.38rem] bg-[rgba(194,236,214,1)] rounded-[1.88rem] text-black text-[3rem] font-normal leading-[3rem] opacity-100 hover:opacity-80 transition-opacity"
    >
      开始
    </button>
  );
}
