interface Props {
  onClick: () => void;
  status: "running" | "paused";
}

export default function PauseButton({ onClick, status }: Props) {
  return (
    <button onClick={onClick}>
      {status == "running" ? (
        <img src="/src/assets/images/暂停.svg" alt="暂停" />
      ) : (
        <img src="/src/assets/images/继续.svg" alt="继续" />
      )}
    </button>
  );
}
