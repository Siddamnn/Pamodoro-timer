
'use client';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { ProgressView } from '@/components/progress-view';
import type { ProgressData } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProgressPage() {
  const [progress] = useLocalStorage<ProgressData>('progress', {
    completedSessions: 0,
    unlockedPlants: ['gallery-plant-1'],
    selectedPlant: 'gallery-plant-1',
  });

  if (!progress) {
    return (
        <div className="container mx-auto max-w-4xl p-4 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Your Garden is Empty</CardTitle>
                    <CardDescription>Complete a Pomodoro session to start growing your garden!</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Loading your progress...</p>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8">
        <ProgressView progress={progress} />
    </div>
  );
}
