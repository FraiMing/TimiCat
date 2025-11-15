interface Props {
  onClick: () => void;
}

export default function StopButton({ onClick }: Props) {
  return (
    <button onClick={onClick}>
      <img src="/停止.svg" alt="停止" />
    </button>
  );
}
