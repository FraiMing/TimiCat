interface Props {
  seconds: number;
}

// min ：second
export default function TimeDisplay({ seconds }: Props) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formatted = [minutes, secs]
    .map((v) => v.toString().padStart(2, "0"))
    .join(":");

  return (
    <div className="text-[4rem] font-normal leading-[4rem] text-black">
      {formatted}
    </div>
  );
}
