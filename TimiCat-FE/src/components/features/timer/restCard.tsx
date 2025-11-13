// 在暂停时会有另一个休息时间的倒计时
import TimeDisplay from "@/components/features/timer/timeDisplay";

interface RestCardProps {
  restDisplay: number;
  togglePause: () => void;
  status: "running" | "paused";
}

export function RestCard({ restDisplay, togglePause, status }: RestCardProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[40vh] p-4">
      <div className="w-full max-w-[20.63rem] h-[13.75rem] rounded-[1.25rem] bg-[rgba(158,218,241,1)] shadow-2xl flex flex-col items-center justify-center gap-4 py-4 px-8">
        <TimeDisplay seconds={restDisplay} />
        <button
          onClick={togglePause}
          className="px-8 py-2 text-black text-[1.5rem] font-normal bg-white rounded-full"
        >
          {status === "running" ? "暂停" : "继续"}
        </button>
      </div>
    </div>
  );
}
