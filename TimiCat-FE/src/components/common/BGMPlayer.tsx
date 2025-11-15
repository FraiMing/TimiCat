import { useBgm } from "@/contexts/BgmContext";

export default function BgmPlayer() {
  const { isPlaying, togglePlay } = useBgm();

  // 静音、播放键
  return (
    <div>
      <button onClick={togglePlay}>
        {isPlaying ? (
          <img src="/音乐.svg" alt="音乐" />
        ) : (
          <img src="/音乐暂停.svg" alt="音乐暂停" />
        )}
      </button>
    </div>
  );
}
