import taskLocalStorage from "@/components/features/task/taskLocalStorage";
import type { Task } from "@/lib/types/types";
import { useEffect } from "react";

interface ShowTaskProps {
  onClose: () => void;
  onCreateClick: () => void;
  onTaskClick?: (task: Task) => void;
}

// 模仿一言收藏列表
export function ShowTask({
  onClose,
  onCreateClick,
  onTaskClick,
}: ShowTaskProps) {
  const [tasks, setTasks] = taskLocalStorage<Task[]>("tasksV1", []);

  // 读取最新数据用于显示
  useEffect(() => {
    try {
      const raw = localStorage.getItem("tasksV1");
      if (raw) {
        const parsed = JSON.parse(raw);
        setTasks(parsed);
      }
    } catch (err) {
      console.error("ShowTask: failed to reload tasks", err);
    }
  }, [setTasks]);

  // 删除任务
  const handleRemove = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full h-[27.44rem] bg-[rgba(158,218,241,1)] rounded-t-[1.25rem] shadow-2xl overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center px-6 py-4 relative">
          <button
            onClick={onClose}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-2xl">︾</span>
            <h2 className="text-black text-[1.5rem] font-normal">
              收起任务清单
            </h2>
          </button>
          <button onClick={onCreateClick} className="w-8 h-8 absolute right-6">
            <img
              src="/src/assets/images/添加 1.svg"
              alt="创建任务"
              className="w-full h-full"
            />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
          {tasks.length === 0 ? (
            <div className="text-center text-black/60 text-base py-8">
              暂无任务，点击加号开始创建
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="w-full max-w-[30rem] h-[4.5rem] bg-white rounded-[1.56rem] mx-auto flex items-center justify-between px-6"
              >
                <div
                  onClick={() => onTaskClick?.(task)}
                  className="flex-1 cursor-pointer flex flex-col justify-center"
                >
                  <div className="text-black text-2xl font-normal truncate">
                    {task.name}
                  </div>
                  <div className="text-black/60 text-xl flex items-center gap-1">
                    <span>{task.time} min</span>
                    <span>·</span>
                    <span>{task.type}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(task.id)}
                  className="w-6 h-6 flex-shrink-0"
                >
                  <img
                    src="/src/assets/images/删除.svg"
                    alt="删除"
                    className="w-full h-full"
                  />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
