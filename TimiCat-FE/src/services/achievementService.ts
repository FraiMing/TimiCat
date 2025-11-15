import apiClient from "./apiClient";

// 成就数据类型接口
export interface Achievement {
  id: number;
  name: string;
  content: string;
  subtitle: string;
  achievement: string;
  requirement: number;
  unlocked: boolean;
}

class AchievementService {
  async getAchievements(): Promise<Achievement[]> {
    const response = await apiClient.get<{ achievements: Achievement[] }>(
      "/api/v1/achievements"
    );
    return response.data.achievements;
  }

  async getAchievementById(id: number): Promise<Achievement> {
    const response = await apiClient.get<Achievement>(
      `/api/v1/achievements/${id}`
    );
    return response.data;
  }
}

export const achievementService = new AchievementService();
export default achievementService;
