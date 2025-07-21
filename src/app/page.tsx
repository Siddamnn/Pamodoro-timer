
'use client';

import { useLocalStorage } from '@/hooks/use-local-storage';
import type { Task, ProgressData } from '@/lib/types';
import { PomodoroTimer } from '@/components/pomodoro-timer';
import { TaskList } from '@/components/task-list';
import { Card, CardContent } from '@/components/ui/card';
import { GalleryPlant1 } from '@/components/icons/gallery-plant-1';


export default function Home() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [progress, setProgress] = useLocalStorage<ProgressData>('progress', {
    completedSessions: 0,
    unlockedPlants: ['gallery-plant-1'],
    selectedPlant: 'gallery-plant-1',
    customMinutes: 25,
    customBreak: 5,
  });

  const handleSessionComplete = () => {
    const newCount = progress.completedSessions + 1;
    const newUnlocked = [...progress.unlockedPlants];

    // Unlock a new plant every 4 sessions, up to 4 plants
    if (newCount % 4 === 0 && newCount / 4 < 4) {
      const plantId = `gallery-plant-${(newCount / 4) + 1}`;
      if (!newUnlocked.includes(plantId)) {
        newUnlocked.push(plantId);
      }
    }

    setProgress({
      ...progress,
      completedSessions: newCount,
      unlockedPlants: newUnlocked,
    });
  };

  const handleSettingsChange = (newSettings: { customMinutes: number, customBreak: number }) => {
    setProgress(prev => ({...prev, ...newSettings}));
  }

  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card className="h-full shadow-lg">
            <CardContent className="p-4 md:p-6">
              <PomodoroTimer
                onSessionComplete={handleSessionComplete}
                PlantComponent={GalleryPlant1}
                onSettingsChange={handleSettingsChange}
                initialCustomMinutes={progress.customMinutes}
                initialCustomBreak={progress.customBreak}
              />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </div>
  );
}
