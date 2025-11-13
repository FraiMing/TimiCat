import { useState } from "react";
import taskLocalStorage from "@/components/features/task/taskLocalStorage";
import type { Task } from "@/lib/types/types";

interface CreateTaskProps {
  onConfirm?: () => void;
  onCancel?: () => void;
}

// 模仿一言收藏编辑
export function CreateTask({ onConfirm, onCancel }: CreateTaskProps) {
  const [tasks, setTasks] = taskLocalStorage<Task[]>("tasksV1", []);
  const [taskName, setTaskName] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [taskType, setTaskType] = useState<"学习" | "工作" | "运动" | "其他">(
    "学习"
  );

  const taskTypes = ["学习", "工作", "运动", "其他"] as const;

  function handleConfirm() {
    // 验证输入合理
    const name = taskName.trim();
    const time = parseInt(taskTime);

    if (!name) {
      alert("请输入任务名称");
      return;
    }

    if (!time || time <= 0) {
      alert("请输入有效的时间");
      return;
    }

    if (time > 180) {
      alert("任务时间不能超过180分钟");
      return;
    }

    // 创建任务对象
    const newTask: Task = {
      id: Date.now() + Math.random(),
      name,
      time,
      type: taskType,
    };

    setTasks([newTask, ...tasks]);

    // 清空输入，方便下次创建
    setTaskName("");
    setTaskTime("");
    setTaskType("学习");

    // 确定
    onConfirm?.();
  }

  function handleCancel() {
    // 清空输入，方便下次创建
    setTaskName("");
    setTaskTime("");
    setTaskType("学习");

    // 取消
    onCancel?.();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-[22.5rem] rounded-lg overflow-hidden shadow-2xl">
        <div className="h-[4.75rem] bg-[rgba(158,218,241,1)] flex items-center justify-end px-6 gap-4">
          <button
            onClick={handleConfirm}
            title="确认创建"
            className="text-black text-4xl font-bold leading-none"
          >
            ✓
          </button>
          <button
            onClick={handleCancel}
            title="取消"
            className="text-black text-4xl font-bold leading-none"
          >
            ✗
          </button>
        </div>

        <div className="h-[18.75rem] bg-[rgba(205,238,248,1)] px-6 pt-10 pb-10 flex flex-col justify-between">
          <div className="space-y-4">
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="请输入任务名称"
              className="w-full bg-transparent border-none text-black text-[1.5rem] placeholder-black/70 focus:outline-none font-normal leading-[3rem]"
            />

            <input
              type="number"
              value={taskTime}
              onChange={(e) => setTaskTime(e.target.value)}
              placeholder="请输入时间 min"
              min="1"
              max="180"
              className="w-full bg-transparent border-none text-black text-[1.5rem] placeholder-black/70 focus:outline-none font-normal leading-[3rem]"
            />
          </div>

          <div className="flex gap-2 justify-start">
            {taskTypes.map((type) => (
              <button
                key={type}
                onClick={() => setTaskType(type)}
                className={`px-3 py-1 text-black text-[1.5rem] font-normal bg-white rounded-md ${
                  taskType === type ? "underline" : ""
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="text-center text-black/60 text-sm">
            tip：双击标签进行切换
            {/* 不知道为什么，点击一次标签虽然在样式上切换了，但实际上并不能进行正常的切换，还会导致任务创建失败/(ㄒoㄒ)/~~ */}
          </div>
        </div>
      </div>
    </div>
  );
}
