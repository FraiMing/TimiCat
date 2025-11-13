import apiClient from "./apiClient";

export type FocusMode = "stopwatch" | "countdown";
export type FocusStatus =
  | "idle"
  | "started"
  | "paused"
  | "finished"
  | "canceled";

// 开始会话请求参数
export interface StartFocusRequest {
  mode: FocusMode;
  planned_minutes?: number; // 设定的倒计时长
  task_name?: string; // 任务名称
  task_labels?: string[]; // 任务标签
}

// 开始成功返回：会话ID+开始时间
export interface StartFocusResponse {
  session_id: number;
  status: "started";
  started_at: string;
}

// 暂停返回累计秒数
export interface PauseFocusResponse {
  status: "paused";
  total_sec: number;
}

// 继续只返回状态
export interface ResumeFocusResponse {
  status: "started";
}

// 完成返回总秒数与分钟
export interface FinishFocusResponse {
  status: "finished";
  session_id: number;
  duration_sec: number; // 后端使用秒数计算
  minutes: number;
}

// 取消返回状态
export interface CancelFocusResponse {
  status: "canceled";
}

// 单日日期、时长
export interface DayItem {
  date: string;
  minutes: number;
}

// 汇总：今日时长/次数/连续天数/近7或30天趋势/近48h是否活跃
export interface FocusSummary {
  today_minutes: number;
  today_count: number;
  streak_days: number;
  trend: DayItem[];
  inactive_48h: boolean; // 惩罚机制，敬请期待
}

class FocusService {
  async start(
    mode: FocusMode,
    plannedMinutes?: number,
    taskName?: string,
    taskLabels?: string[]
  ): Promise<StartFocusResponse> {
    const payload: StartFocusRequest = {
      mode,
      planned_minutes: plannedMinutes,
      task_name: taskName,
      task_labels: taskLabels,
    };

    const response = await apiClient.post<StartFocusResponse>(
      "/api/v1/sessions/start",
      payload
    );
    return response.data;
  }

  // 暂停：返回累计秒数
  async pause(): Promise<PauseFocusResponse> {
    const response = await apiClient.post<PauseFocusResponse>(
      "/api/v1/sessions/pause"
    );
    return response.data;
  }

  // 恢复：将状态从 paused 切回 started
  async resume(): Promise<ResumeFocusResponse> {
    const response = await apiClient.post<ResumeFocusResponse>(
      "/api/v1/sessions/resume"
    );
    return response.data;
  }

  // 完成：计入时长
  async finish(): Promise<FinishFocusResponse> {
    const response = await apiClient.post<FinishFocusResponse>(
      "/api/v1/sessions/finish"
    );
    return response.data;
  }

  // 取消：不计入总时长
  async cancel(): Promise<CancelFocusResponse> {
    const response = await apiClient.post<CancelFocusResponse>(
      "/api/v1/sessions/cancel"
    );
    return response.data;
  }

  // 获取统计摘要：支持 7d / 30d
  // 30d模式敬请期待
  async getSummary(range: "7d" | "30d" = "7d"): Promise<FocusSummary> {
    const response = await apiClient.get<FocusSummary>(
      `/api/v1/stats/summary?range=${range}`
    );
    return response.data;
  }
}

export const focusService = new FocusService();
export default focusService;
