import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import focusService from "@/services/focusService";

// 计时 Hook：正/倒计时 + 后端会话 + 休息配额 + 本地持久化 👍

// 状态：正/倒计时、空闲/运行/暂停
type Mode = "countup" | "countdown";
type TimerStatus = "idle" | "running" | "paused";

// 计时器状态
interface TimerState {
  // 计时
  mode: Mode;
  status: TimerStatus;
  startTime: number | null;
  value: number;
  // 休息
  restRemaining: number;
  restStartTime: number | null;
  isResting: boolean;
  // 后端会话
  sessionId: number | null;
  hasActiveSession: boolean;
}

// Hook 配置
interface UseTimerOptions {
  defaultMode?: Mode; // 默认模式
  defaultSeconds?: number; // 倒计时默认秒
  maxSeconds?: number; // 正计时最大秒
  storageKey?: string; // 本地存储键
}

export function useTimer(options: UseTimerOptions = {}) {
  const navigate = useNavigate();
  const {
    defaultMode = "countup",
    defaultSeconds = 1800,
    maxSeconds = 10800,
    storageKey = "dual-timer-state",
  } = options;

  // 计时器：模式/状态/开始时间/当前值
  const [state, setState] = useState<TimerState>({
    mode: defaultMode,
    status: "idle",
    startTime: null,
    value: defaultMode === "countdown" ? defaultSeconds : 0,
    sessionId: null,
    restRemaining: 300,
    restStartTime: null,
    isResting: false,
    hasActiveSession: false,
  });
  const [display, setDisplay] = useState(0);
  // 倒计时初始秒（默认30min，其次遵从任务设定时长）
  const inputSeconds = defaultSeconds;
  const [showAbandonConfirm, setShowAbandonConfirm] = useState(false);

  // 恢复本地状态
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed: TimerState = JSON.parse(saved);
      setState(parsed);
    }
  }, [storageKey]);

  useEffect(() => {
    const update = () => {
      // 非运行：直接显示设定时长（value）
      if (state.status !== "running") {
        setDisplay(state.value);
        return;
      }

      // 过去的时间
      const now = Date.now();
      const elapsedTime = Math.floor((now - state.startTime!) / 1000);

      if (state.mode == "countup") {
        // 正计时：value + elapsed
        const currentTime = state.value + elapsedTime;
        setDisplay(currentTime);
        // 达上限(180min)自动完成
        if (currentTime >= maxSeconds && state.sessionId) {
          focusService.finish().catch((err) => {
            console.error("自动完成失败:", err);
          });
          setState({
            mode: state.mode,
            status: "idle",
            startTime: null,
            value: maxSeconds,
            sessionId: null,
            restRemaining: state.restRemaining,
            restStartTime: state.restStartTime,
            isResting: state.isResting,
            hasActiveSession: false,
          });
        }
      } else {
        // 倒计时：remain = value - elapsed
        const remainTime = Math.max(state.value - elapsedTime, 0);
        setDisplay(remainTime);
        // 到 0 完成
        if (remainTime === 0 && state.sessionId) {
          focusService.finish().catch((err) => {
            console.error("自动完成失败:", err);
          });
          setState({
            mode: state.mode,
            status: "idle",
            startTime: null,
            value: 0,
            sessionId: null,
            restRemaining: state.restRemaining,
            restStartTime: state.restStartTime,
            isResting: state.isResting,
            hasActiveSession: false,
          });
          navigate("/finish", { replace: true });
        }
      }
    };

    // 立即执行一次，然后每秒更新
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [state, maxSeconds]);

  // 后台计时：切回前台补齐计时 👍
  useEffect(() => {
    const handleVisibilityChange = () => {
      // 仅当页面可见且运行中
      if (!document.hidden && state.status === "running") {
        const now = Date.now();
        const elapsedTime = Math.floor((now - state.startTime!) / 1000);

        if (state.mode === "countup") {
          // 正计时：检查上限
          const currentTime = state.value + elapsedTime;
          if (currentTime >= maxSeconds && state.sessionId) {
            focusService.finish().catch((err) => {
              console.error("自动完成失败:", err);
            });
            setState({
              mode: state.mode,
              status: "idle",
              startTime: null,
              value: maxSeconds,
              sessionId: null,
              restRemaining: state.restRemaining,
              restStartTime: state.restStartTime,
              isResting: state.isResting,
              hasActiveSession: false,
            });
          }
        } else {
          // 倒计时：检查是否到 0
          const remainTime = Math.max(state.value - elapsedTime, 0);
          if (remainTime === 0 && state.sessionId) {
            focusService.finish().catch((err) => {
              console.error("自动完成失败:", err);
            });
            setState({
              mode: state.mode,
              status: "idle",
              startTime: null,
              value: 0,
              sessionId: null,
              restRemaining: state.restRemaining,
              restStartTime: state.restStartTime,
              isResting: state.isResting,
              hasActiveSession: false,
            });
            navigate("/finish", { replace: true });
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [state, maxSeconds]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, storageKey]);

  useEffect(() => {
    if (
      state.mode === "countdown" &&
      state.status === "paused" &&
      state.restRemaining > 0 &&
      !state.isResting
    ) {
      setState((prev) => ({
        ...prev,
        isResting: true,
        restStartTime: Date.now(),
      }));
    }
  }, [state.mode, state.status, state.restRemaining, state.isResting]);

  // 休息倒计时
  const [restDisplay, setRestDisplay] = useState(0);

  useEffect(() => {
    // 未休息：显示剩余配额
    if (!state.isResting || !state.restStartTime) {
      setRestDisplay(state.restRemaining);
      return;
    }

    // 休息中：计算 休息的elapsed 并扣减时长
    const updateRest = () => {
      const now = Date.now();
      const elapsedRest = Math.floor((now - state.restStartTime!) / 1000);
      const remaining = Math.max(0, state.restRemaining - elapsedRest);
      setRestDisplay(remaining);

      // 用完自动停止休息
      if (remaining === 0) {
        setState((prev) => ({
          ...prev,
          isResting: false,
          restStartTime: null,
          restRemaining: 0,
        }));
      }
    };

    // 立即更新一次，然后每秒更新
    updateRest();
    const timer = setInterval(updateRest, 1000);
    return () => clearInterval(timer);
  }, [state.isResting, state.restStartTime, state.restRemaining]);

  // ==== 控制函数部分 ====

  // 开始
  const start = async () => {
    if (state.status !== "idle") return;

    // 如有未完成的 sessionId 先清除一遍，防止bug
    if (state.sessionId) {
      console.warn("检测到未完成的会话，将先取消");
      try {
        await focusService.cancel();
      } catch (error) {
        console.error("清理旧会话失败:", error);
      }
    }

    let startValue = state.value;

    // 倒计时设定不得超过上限
    if (state.mode == "countdown" && startValue > maxSeconds) {
      alert("最长不能超过180min");
      return;
    }

    try {
      // 开始会话
      const backendMode = state.mode === "countup" ? "stopwatch" : "countdown";
      const plannedMinutes =
        state.mode === "countdown" ? Math.floor(startValue / 60) : undefined;

      const response = await focusService.start(backendMode, plannedMinutes);

      setState({
        ...state,
        status: "running",
        startTime: Date.now(),
        value: startValue,
        sessionId: response.session_id,
        hasActiveSession: true,
      });
    } catch (error) {
      console.error("启动计时器失败:", error);
      alert("启动失败，请重试");
    }
  };

  // 暂停/继续
  const togglePause = async () => {
    if (state.status == "running") {
      // 暂停
      if (!state.sessionId) {
        console.error("没有活动的会话ID");
        alert("会话状态异常，请重新开始");
        return;
      }

      // 计算已运行时间，保存当前累计值
      const now = Date.now();
      const elapsedTime = Math.floor((now - state.startTime!) / 1000);
      const newValue =
        state.mode == "countup"
          ? state.value + elapsedTime
          : Math.max(state.value - elapsedTime, 0);

      setState((prev) => ({
        ...prev,
        status: "paused",
        startTime: null,
        value: newValue,
      }));

      try {
        // 调用后端暂停
        await focusService.pause();
      } catch (error) {
        console.error("暂停失败:", error);
        // 如果后端失败，恢复 running 状态，防止bug
        setState((prev) => ({
          ...prev,
          status: "running",
          startTime: now,
          value: state.value,
        }));
        alert("暂停失败，请重试");
      }
    } else if (state.status === "paused") {
      // 继续
      if (!state.sessionId) {
        console.error("没有活动的会话ID");
        alert("会话状态异常，请重新开始");
        return;
      }

      // 如果正在休息中，计算已使用的休息时间并扣除
      let newRestRemaining = state.restRemaining;
      if (state.isResting && state.restStartTime) {
        const restElapsed = Math.floor(
          (Date.now() - state.restStartTime) / 1000
        );
        newRestRemaining = Math.max(0, state.restRemaining - restElapsed);
      }

      // 先更新前端状态为 running
      setState((prev) => ({
        ...prev,
        status: "running",
        startTime: Date.now(),
        isResting: false,
        restStartTime: null,
        restRemaining: newRestRemaining,
      }));

      try {
        // 调用后端继续
        await focusService.resume();
      } catch (error) {
        console.error("继续失败:", error);
        // 如果后端失败，恢复 paused 状态，防止bug
        setState((prev) => ({
          ...prev,
          status: "paused",
          startTime: null,
          isResting: state.isResting,
          restStartTime: state.restStartTime,
          restRemaining: state.restRemaining,
        }));
        alert("继续失败，请重试");
      }
    }
  };

  // 内部停止（完成/取消）
  const performStop = async (isFinish: boolean = false) => {
    if (!state.sessionId) {
      console.warn("没有活动的会话，直接重置状态");
      setState((prev) => ({
        ...prev,
        status: "idle",
        startTime: null,
        value: prev.mode == "countup" ? 0 : inputSeconds,
        sessionId: null,
        restRemaining: 300,
        restStartTime: null,
        isResting: false,
        hasActiveSession: false,
      }));
      return;
    }

    try {
      // 若运行中且取消，先尝试暂停 👍
      if (!isFinish && state.status === "running") {
        try {
          await focusService.pause();
          // 等待确保后端状态更新
          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (pauseError) {
          console.error("暂停失败:", pauseError);
          // 继续执行取消，即使暂停失败
        }
      }

      if (isFinish) {
        // 完成会话
        await focusService.finish();
      } else {
        // 取消会话
        await focusService.cancel();
      }

      setState((prev) => ({
        ...prev,
        status: "idle",
        startTime: null,
        value: prev.mode == "countup" ? 0 : inputSeconds,
        sessionId: null,
        restRemaining: 300, // 重置休息时间为5分钟
        restStartTime: null,
        isResting: false,
        hasActiveSession: false,
      }));
    } catch (error: any) {
      console.error(isFinish ? "完成失败:" : "取消失败:", error);
      // 即使后端失败，也重置前端状态
      setState((prev) => ({
        ...prev,
        status: "idle",
        startTime: null,
        value: prev.mode == "countup" ? 0 : inputSeconds,
        sessionId: null,
        restRemaining: 300,
        restStartTime: null,
        isResting: false,
        hasActiveSession: false,
      }));

      // 提示，方便测bug
      if (error.response?.status === 400) {
        const errorMsg =
          error.response.data?.message || error.response.data || "会话状态异常";
        console.error("后端错误信息:", errorMsg);
        alert(`操作失败：${errorMsg}`);
      } else {
        alert((isFinish ? "完成" : "取消") + "失败，但已重置计时器");
      }
    }
  };

  // 停止：倒计时弹确认；正计时直接完成
  const stop = () => {
    // 如果是倒计时模式且未完成，显示确认卡片
    if (state.mode === "countdown" && state.status !== "idle") {
      setShowAbandonConfirm(true);
      return;
    }
    // 正计时模式直接完成
    performStop(true);
  };

  // 确认放弃倒计时
  const confirmAbandon = async () => {
    setShowAbandonConfirm(false);
    await performStop(false);
  };

  // 取消放弃
  const cancelAbandon = () => {
    setShowAbandonConfirm(false);
  };

  // 切换模式
  const toggleMode = () => {
    // 如果计时器正在运行或暂停，禁止切换模式
    if (state.status === "running" || state.status === "paused") {
      return;
    }

    setState({
      mode: state.mode == "countup" ? "countdown" : "countup",
      status: "idle",
      startTime: null,
      value: state.mode == "countup" ? inputSeconds : 0,
      sessionId: null,
      restRemaining: 300,
      restStartTime: null,
      isResting: false,
      hasActiveSession: false,
    });
  };

  // 设定倒计时并切换模式
  const setCountdownTime = (minutes: number) => {
    const seconds = minutes * 60;
    if (seconds > maxSeconds) {
      alert("最长不能超过180min");
      return;
    }
    setState({
      mode: "countdown",
      status: "idle",
      startTime: null,
      value: seconds,
      sessionId: null,
      restRemaining: 300,
      restStartTime: null,
      isResting: false,
      hasActiveSession: false,
    });
  };

  return {
    // 以上各种状态
    mode: state.mode,
    status: state.status,
    display,
    sessionId: state.sessionId,
    hasActiveSession: state.hasActiveSession,
    isResting: state.isResting,
    restDisplay,
    restRemaining: state.restRemaining,
    showAbandonConfirm,
    confirmAbandon,
    cancelAbandon,
    start,
    togglePause,
    stop,
    toggleMode,
    setCountdownTime,
  };
}
