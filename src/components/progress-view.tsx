
'use client';

import type { ProgressData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trophy, Lock } from 'lucide-react';
import { GalleryPlant1 } from './icons/gallery-plant-1';
import { GalleryPlant2 } from './icons/gallery-plant-2';
import { GalleryPlant3 } from './icons/gallery-plant-3';
import { GalleryPlant4 } from './icons/gallery-plant-4';
import { cn } from '@/lib/utils';

interface ProgressViewProps {
  progress: ProgressData;
}

const milestones = [
  { count: 10, name: 'Bronze Trophy' },
  { count: 25, name: 'Silver Trophy' },
  { count: 50, name: 'Gold Trophy' },
];

const plantGallery = [
    { id: 'gallery-plant-1', component: GalleryPlant1, name: 'Serene Succulent' },
    { id: 'gallery-plant-2', component: GalleryPlant2, name: 'Peace Lily' },
    { id: 'gallery-plant-3', component: GalleryPlant3, name: 'Focused Fern' },
    { id: 'gallery-plant-4', component: GalleryPlant4, name: 'Majestic Monstera' },
];

export function ProgressView({ progress }: ProgressViewProps) {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Your Progress</CardTitle>
          <CardDescription>
            You have completed{' '}
            <span className="font-bold text-primary">{progress.completedSessions}</span>{' '}
            Pomodoro sessions. Keep up the great work!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-8">
            {milestones.map((milestone) => (
              <div
                key={milestone.count}
                className={cn(
                  'flex items-center gap-4 rounded-lg p-4 transition-all',
                  progress.completedSessions >= milestone.count
                    ? 'bg-secondary'
                    : 'bg-muted/50'
                )}
              >
                <Trophy
                  className={cn(
                    'h-10 w-10',
                    progress.completedSessions >= milestone.count
                      ? 'text-yellow-500'
                      : 'text-muted-foreground'
                  )}
                />
                <div>
                  <p className="font-bold font-headline">
                    {milestone.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Complete {milestone.count} sessions
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Your Plant Gallery</CardTitle>
          <CardDescription>
            Unlock new plants by completing sessions. The first plant is always used in your timer.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {plantGallery.map(plant => {
                    const isUnlocked = progress.unlockedPlants.includes(plant.id);
                    return (
                        <div key={plant.id} className="flex flex-col items-center justify-between p-4 rounded-lg border-2 border-dashed border-border bg-muted/30">
                            <div className={cn("h-32 w-32", !isUnlocked && "opacity-30")}>
                                <plant.component />
                            </div>
                            <div className="text-center mt-2 h-10">
                                <p className="font-semibold text-sm">{plant.name}</p>
                                {!isUnlocked && <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mt-1"><Lock className="h-3 w-3" /> Locked</div>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
