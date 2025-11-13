import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import campfireBGM from "@/assets/BGM/campfire.mp3";
import windBGM from "@/assets/BGM/wind.mp3";
import catMeowBGM from "@/assets/BGM/cat-meow.mp3";

// 背景音乐全局上下文：避免路由切换导致音乐重置 👍

interface BgmContextType {
  isPlaying: boolean;
  togglePlay: () => void;
}

const BgmContext = createContext<BgmContextType | null>(null);

export function BgmProvider({ children }: { children: ReactNode }) {
  const audio1 = useRef<HTMLAudioElement>(null);
  const audio2 = useRef<HTMLAudioElement>(null);
  const audioCat = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const catTimerRef = useRef<number | null>(null);

  const initialVolume1 = 1.0; // 篝火音量
  const initialVolume2 = 0.2; // 风声音量
  const catMeowVolume = 0.3; // 猫叫音量

  // 设置初始音量
  useEffect(() => {
    if (audio1.current) audio1.current.volume = 0;
    if (audio2.current) audio2.current.volume = 0;
    if (audioCat.current) audioCat.current.volume = 0;
  }, []);

  // 淡入👍
  const fadeIn = (audio: HTMLAudioElement | null, targetVolume: number) => {
    if (!audio) return;
    let vol = 0;
    audio.volume = 0;
    const step = targetVolume / 20;
    const interval = setInterval(() => {
      if (vol < targetVolume) {
        vol = Math.min(vol + step, targetVolume);
        audio.volume = vol;
      } else {
        clearInterval(interval);
      }
    }, 100);
  };

  // 淡出👍
  const fadeOut = (audio: HTMLAudioElement | null) => {
    if (!audio) return;
    let vol = audio.volume;
    const step = vol / 20;
    const interval = setInterval(() => {
      if (vol > 0) {
        vol = Math.max(vol - step, 0);
        audio.volume = vol;
      } else {
        audio.pause();
        clearInterval(interval);
      }
    }, 100);
  };

  // 播放/暂停
  const togglePlay = () => {
    if (!isPlaying) {
      audio1.current?.play();
      audio2.current?.play();
      fadeIn(audio1.current, initialVolume1);
      fadeIn(audio2.current, initialVolume2);
    } else {
      fadeOut(audio1.current);
      fadeOut(audio2.current);
    }
    setIsPlaying(!isPlaying);
  };

  // 随机猫叫👍
  const continueCatMeow = () => {
    if (catTimerRef.current) {
      clearTimeout(catTimerRef.current);
    }

    // 生成 100-200s 的随机延迟
    const minInterval = 100000;
    const maxInterval = 200000;
    const randomDelay =
      Math.random() * (maxInterval - minInterval) + minInterval;

    catTimerRef.current = window.setTimeout(() => {
      if (audioCat.current && isPlaying) {
        audioCat.current.volume = catMeowVolume;
        audioCat.current.play();
      }
      continueCatMeow();
    }, randomDelay);
  };

  useEffect(() => {
    if (isPlaying) {
      continueCatMeow();
    } else {
      if (catTimerRef.current) {
        clearTimeout(catTimerRef.current);
        catTimerRef.current = null;
      }
    }

    return () => {
      if (catTimerRef.current) {
        clearTimeout(catTimerRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <BgmContext.Provider value={{ isPlaying, togglePlay }}>
      {children}
      <audio ref={audio1} loop src={campfireBGM} />
      <audio ref={audio2} loop src={windBGM} />
      <audio ref={audioCat} src={catMeowBGM} />
    </BgmContext.Provider>
  );
}

// 自定义 Hook：获取BGM
export function useBgm() {
  const context = useContext(BgmContext);
  if (!context) {
    throw new Error("useBgm error");
  }
  return context;
}
