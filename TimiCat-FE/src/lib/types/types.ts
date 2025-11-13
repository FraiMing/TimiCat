// 任务类型接口
export interface Task {
  id: number;
  name: string;
  time: number;
  type: "学习" | "工作" | "运动" | "其他";
}
