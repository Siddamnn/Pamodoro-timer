export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface ProgressData {
  completedSessions: number;
  unlockedPlants: string[];
  selectedPlant: string;
  customMinutes?: number;
  customBreak?: number;
}
