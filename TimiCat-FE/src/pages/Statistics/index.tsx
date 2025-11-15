"use client";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Bar, BarChart, XAxis } from "recharts";
import type { ChartConfig } from "@/components/common/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/common/chart";
import { focusService, type FocusSummary } from "@/services/focusService";

const Statistics = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<FocusSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取统计数据
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await focusService.getSummary("7d");
        setSummary(data);
      } catch (err) {
        setError("获取统计数据失败");
        console.error("Failed to fetch summary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const handleBack = () => {
    navigate("/home", { replace: true });
  };

  const chartConfig = {
    minutes: {
      label: "分钟",
      color: "rgba(142, 210, 240, 1)",
    },
  } satisfies ChartConfig;

  const chartData =
    summary && Array.isArray(summary.trend)
      ? summary.trend.map((item) => ({
          date: item.date,
          minutes: item.minutes,
        }))
      : [];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <img
        src="/侧边栏三张底图.svg"
        alt="背景"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <button
        onClick={handleBack}
        className="absolute left-4 top-8 w-12 h-12 z-30 transition-opacity hover:opacity-80 flex items-center justify-center md:left-[1.38rem] md:top-[2.75rem] md:w-[3.13rem] md:h-[3.13rem]"
      >
        <span className="text-black text-4xl font-bold leading-none md:text-[2.5rem]">
          &lt;
        </span>
      </button>

      <div className="relative z-10 flex flex-col items-center px-4 pb-8 pt-10 md:pt-18">
        <h1 className="text-black text-center text-4xl md:text-5xl font-normal mb-8 md:mb-12">
          历史统计
        </h1>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-xl text-gray-600">加载中...</div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="text-xl text-red-500">{error}</div>
          </div>
        )}

        {!loading && !error && summary && (
          <div className="w-full max-w-4xl mx-auto space-y-8 mt-28 md:mt-32">
            {/* shadcn-barchart 图表容器 */}
            <div className="w-full rounded-lg p-4 md:p-6">
              <ChartContainer
                config={chartConfig}
                className="h-[250px] md:h-[300px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}-${date.getDate()}`;
                    }}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    labelFormatter={(value) => {
                      return value;
                    }}
                  />
                  <Bar
                    dataKey="minutes"
                    fill="rgba(142, 210, 240, 1)"
                    radius={[8, 8, 0, 0]}
                    background={{ fill: "rgba(230, 245, 250, 1)" }}
                  />
                </BarChart>
              </ChartContainer>
            </div>

            <div className="w-full rounded-lg p-6 md:p-8">
              <div className="w-full flex flex-col items-start gap-4 md:gap-6 px-2 md:px-6">
                <div className="w-full">
                  <div className="text-black text-[1.2rem] sm:text-xl md:text-2xl font-normal mb-2">
                    今日专注时长：
                  </div>
                  <div className="font-bold text-xl sm:text-2xl md:text-3xl">
                    {summary.today_minutes}min
                  </div>
                </div>

                <div className="w-full">
                  <div className="text-black text-[1.2rem] sm:text-xl md:text-2xl font-normal mb-2">
                    今日专注次数：
                  </div>
                  <div className="font-bold text-xl sm:text-2xl md:text-3xl">
                    {summary.today_count}次
                  </div>
                </div>

                <div className="w-full">
                  <div className="text-black text-[1.2rem] sm:text-xl md:text-2xl font-normal mb-2">
                    总共专注时间：
                  </div>
                  <div className="font-bold text-xl sm:text-2xl md:text-3xl">
                    {summary.total_minutes}min
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Statistics;
