interface IsAbandonCardProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export function IsAbandonCard({ onCancel, onConfirm }: IsAbandonCardProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-[22.5rem] h-[13.75rem] rounded-[1.25rem] bg-[rgba(205,238,248,1)] shadow-2xl flex flex-col items-center justify-between py-6 px-8">
        <h2 className="text-black text-[2rem] font-normal leading-[2.5rem] text-center">
          您确定要放弃吗？
        </h2>

        <p className="text-black text-[1.25rem] font-normal leading-[1.75rem] text-center">
          放弃本次专注将不计入总时长
        </p>

        <div className="flex gap-8 justify-center">
          <button
            onClick={onCancel}
            className="px-6 py-2 text-black text-[1.5rem] font-normal bg-white rounded-full"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 text-black text-[1.5rem] font-normal bg-white rounded-full"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  );
}
