import TimeDisplay from "@/components/features/timer/timeDisplay";
import StartButton from "@/components/features/timer/startButton";
import PauseButton from "@/components/features/timer/pauseButton";
import StopButton from "@/components/features/timer/stopButton";
import ToggleModeButton from "@/components/features/timer/toggleModeButton";
import { useTimer } from "@/lib/hooks/useTimer";
import BgmPlayer from "@/components/common/BGMPlayer";
import { RestCard } from "@/components/features/timer/restCard";
import { IsAbandonCard } from "@/components/features/timer/isAbandonCard";
import { ShowTask } from "@/components/features/task/showTask";
import { CreateTask } from "@/components/features/task/createTask";
import { CustomSidebar } from "@/components/common/CustomSidebar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useBgm } from "@/contexts/BgmContext";

export default function Home() {
  const location = useLocation();
  const [fadeIn, setFadeIn] = useState(false);
  const { isPlaying, togglePlay } = useBgm();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 检查是否完成过第一次专注（Finish）
  const hasCompletedFocus =
    localStorage.getItem("hasCompletedFocus") === "true";

  // 对话框显示的状态
  const [showDialog, setShowDialog] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  // ====== BGM的一些功能不知道为什么，刚写完的几天是有用的，写到后期发现失效了😢（期待它在某种条件下重新跑起来） ======
  // 万恶的浏览器，不让挂载时播放音频
  // BGM 自动解锁：用户第一次点击页面任意位置时自动播放👍
  const [bgmUnlocked, setBgmUnlocked] = useState(() => {
    return sessionStorage.getItem("bgm-unlocked") === "true";
  });

  useEffect(() => {
    // 如果已解锁或正在播放，不添加监听器
    if (bgmUnlocked || isPlaying) return;

    const handleClick = () => {
      togglePlay();
      sessionStorage.setItem("bgm-unlocked", "true");
      setBgmUnlocked(true);
    };

    // 添加全局点击监听器，once: true 表示只触发一次
    document.addEventListener("click", handleClick, { once: true });

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [bgmUnlocked, isPlaying, togglePlay]);

  // 依旧好动画 👍
  // 检查是否从 ClickBox 或 Finish 跳转过来
  useEffect(() => {
    if (location.state?.fromClickBox || location.state?.fromFinish) {
      // 从 ClickBox 或 Finish 跳转，触发淡入动画
      setTimeout(() => setFadeIn(true), 50);

      // 清除 state，避免刷新时再次触发动画
      window.history.replaceState({}, document.title);
    } else {
      // 其他方式进入，直接显示
      setFadeIn(true);
    }
  }, [location]);

  // 自定义Hook
  const {
    mode,
    status,
    display,
    isResting,
    restDisplay,
    showAbandonConfirm,
    confirmAbandon,
    cancelAbandon,
    start,
    togglePause,
    stop,
    toggleMode,
    setCountdownTime,
    hasActiveSession,
  } = useTimer({
    defaultMode: "countdown",
    defaultSeconds: 1800,
    maxSeconds: 10800,
    storageKey: "dual-timer-state",
  });

  useEffect(() => {
    if (hasActiveSession) setSidebarOpen(false);
  }, [hasActiveSession]);

  // 任务状态
  const [showTaskList, setShowTaskList] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [currentTaskType, setCurrentTaskType] = useState<
    "学习" | "工作" | "运动" | "其他"
  >("学习");

  // 任务清单状态切换函数
  const openTaskList = () => {
    setShowTaskList(true);
    setShowCreateTask(false);
  };

  const openCreateTask = () => {
    setShowTaskList(false);
    setShowCreateTask(true);
  };

  const closeAll = () => {
    setShowTaskList(false);
    setShowCreateTask(false);
  };

  // 点击任务时设置倒计时长为任务时长
  const handleTaskClick = (task: {
    time: number;
    type: "学习" | "工作" | "运动" | "其他";
  }) => {
    if (status === "running" || status === "paused") {
      return;
    }

    setCountdownTime(task.time);
    setCurrentTaskType(task.type);
    closeAll();
  };

  // 按下start触发动画（）
  const handleStart = () => {
    start();
    setShowDialog(true);

    // 短暂延迟后触发淡入动画 👍
    setTimeout(() => {
      setDialogVisible(true);
    }, 50);

    // 5秒后开始淡出
    setTimeout(() => {
      setDialogVisible(false);

      setTimeout(() => {
        setShowDialog(false);
      }, 800);
    }, 5050);
  }; // 根据是否从 ClickBox 或 Finish 跳转来决定是否应用淡入动画
  const shouldAnimate =
    location.state?.fromClickBox || location.state?.fromFinish;

  return (
    <>
      {/* 自定义侧栏 */}
      <CustomSidebar
        isOpen={sidebarOpen && !hasActiveSession}
        onClose={() => setSidebarOpen(false)}
      />

      <div
        className={`relative bg-[linear-gradient(180deg,_rgba(205,_238,_248,_1)_0%,_rgba(255,_255,_255,_1)_100%)] min-h-screen w-full overflow-hidden ${
          shouldAnimate
            ? `transition-opacity duration-800 ${
                fadeIn ? "opacity-100" : "opacity-0"
              }`
            : ""
        }`}
      >
        <img
          src="/src/assets/images/大的顶部装饰.svg"
          alt="顶部装饰"
          className="absolute left-0 top-0 w-full h-auto opacity-100 z-0"
        />
        <img
          src="/src/assets/images/底页装饰.svg"
          alt="底页装饰"
          className="absolute left-1 top-[15rem] w-[23.88rem] h-[35.68rem] opacity-100 z-0"
        />
        {/* 侧栏触发按钮（计时运行期间禁用打开） */}
        <button
          onClick={() => {
            if (hasActiveSession) {
              alert("专注中，无法打开侧栏");
              return;
            }
            setSidebarOpen(true);
          }}
          disabled={hasActiveSession}
          className={`absolute left-[1.38rem] top-[2.75rem] w-[3.13rem] h-[3.13rem] z-30 ${
            hasActiveSession
              ? "opacity-50 pointer-events-none"
              : "transition-opacity hover:opacity-80"
          }`}
        >
          <img
            src="/src/assets/images/更多.svg"
            alt="菜单"
            className="w-full h-full"
          />
        </button>
        {/* 转换正、倒计时按钮 */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[2.75rem] z-20">
          <ToggleModeButton onClick={toggleMode} mode={mode} />
        </div>
        {/* BGM 播放器 */}
        <div className="absolute right-[1.38rem] top-[2.75rem] w-[3.13rem] h-[3.13rem] z-20">
          <BgmPlayer />
        </div>
        {/* 计时显示 */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[10rem] z-20">
          <TimeDisplay seconds={display} />
        </div>
        {/* 任务标签 */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[18rem] w-[5.5rem] h-[2.2rem] bg-white rounded-lg flex items-center justify-center z-20">
          <span className="text-black text-[2rem] font-normal">
            {currentTaskType}
          </span>
        </div>
        {/* 中间的箱子（水平居中） */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[27rem] z-10">
          <img
            src={
              hasActiveSession
                ? "/src/assets/images/猫.svg" // 有活动会话时（running/paused）显示猫
                : hasCompletedFocus
                ? "/src/assets/images/箱中猫.svg" // 完成过专注但无活动会话时显示箱中猫
                : "/src/assets/images/朝左箱子.svg" // 从未完成过专注时显示箱子
            }
            alt="箱子"
            className="w-[22rem] h-auto opacity-100"
          />
        </div>
        {/* 开始、暂停/播放、停止按钮 */}
        {status === "idle" ? (
          <div className="absolute left-1/2 -translate-x-1/2 top-[43rem] z-20">
            <StartButton onClick={handleStart} />
          </div>
        ) : (
          <div className="absolute left-1/2 -translate-x-1/2 top-[43rem] w-[55%] max-w-[20rem] flex items-center justify-between z-20">
            <PauseButton
              onClick={togglePause}
              status={status as "running" | "paused"}
            />
            <StopButton onClick={stop} />
          </div>
        )}
        {/* 任务列表按钮 */}
        <div className="fixed bottom-0 left-0 right-0 z-40">
          <div className="w-full h-[5rem] bg-[rgba(158,218,241,1)] rounded-t-[1.25rem] flex flex-col items-center justify-center relative">
            <button
              onClick={openTaskList}
              className="absolute inset-0 flex flex-col items-center justify-center text-black text-[1.5rem] font-normal"
            >
              <span className="text-2xl">︿</span>
              <span>任务清单</span>
            </button>
          </div>
        </div>
        {/* 任务列表组件 */}
        {showTaskList && (
          <ShowTask
            onClose={closeAll}
            onCreateClick={openCreateTask}
            onTaskClick={handleTaskClick}
          />
        )}
        {/* 创建任务组件 */}
        {showCreateTask && (
          <CreateTask onConfirm={openTaskList} onCancel={openTaskList} />
        )}
        {/* 休息卡片 */}
        {isResting && mode === "countdown" && (
          <RestCard
            restDisplay={restDisplay}
            togglePause={togglePause}
            status={status as "running" | "paused"}
          />
        )}
        {/* 放弃确认卡片 */}
        {showAbandonConfirm && (
          <IsAbandonCard onCancel={cancelAbandon} onConfirm={confirmAbandon} />
        )}

        {/* 开始专注对话框 */}
        {showDialog && (
          <div
            className={`absolute inset-0 transition-opacity duration-800 ${
              dialogVisible ? "opacity-100" : "opacity-0"
            } z-50`}
          >
            <div className="absolute left-[4rem] sm:left-[5rem] top-[22.75rem] sm:top-[20rem] w-full max-w-[13rem] sm:max-w-[14rem] z-20">
              <img
                src="/src/assets/images/click对话框.svg"
                alt="click对话框"
                className="w-full h-auto opacity-100"
              />
              <div className="absolute top-[2.0rem] left-6 right-2 text-[1.5rem] font-normal leading-[1.5rem] text-black align-top">
                "人，开始学习了吗？让我陪着你吧。"
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
