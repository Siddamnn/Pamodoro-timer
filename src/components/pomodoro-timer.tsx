
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { PlantAnimation } from './plant-animation';

type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

const modes = {
  classic: { pomodoro: 25, shortBreak: 5 },
  focused: { pomodoro: 45, shortBreak: 15 },
  custom: { pomodoro: 25, shortBreak: 5},
};

interface PomodoroTimerProps {
  onSessionComplete: () => void;
  PlantComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  onSettingsChange: (settings: { customMinutes: number, customBreak: number }) => void;
  initialCustomMinutes?: number;
  initialCustomBreak?: number;
}

export function PomodoroTimer({ onSessionComplete, PlantComponent, onSettingsChange, initialCustomMinutes = 25, initialCustomBreak = 5 }: PomodoroTimerProps) {
  const [activeMode, setActiveMode] = useState<keyof typeof modes>('classic');
  const [customMinutes, setCustomMinutes] = useState(initialCustomMinutes);
  const [customBreak, setCustomBreak] = useState(initialCustomBreak);

  const getInitialTime = useCallback(() => {
    if (activeMode === 'custom') {
      return customMinutes * 60;
    }
    return modes[activeMode].pomodoro * 60;
  }, [activeMode, customMinutes]);

  const [sessionType, setSessionType] = useState<'work' | 'break'>('work');
  const [totalTime, setTotalTime] = useState(getInitialTime);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [isActive, setIsActive] = useState(false);

  const progress = useMemo(() => (totalTime - timeLeft) / totalTime, [totalTime, timeLeft]);

  useEffect(() => {
    let newTotalTime: number;
    if (sessionType === 'work') {
      newTotalTime = activeMode === 'custom' ? customMinutes * 60 : modes[activeMode].pomodoro * 60;
    } else {
      newTotalTime = activeMode === 'custom' ? customBreak * 60 : modes[activeMode].shortBreak * 60;
    }
    setTotalTime(newTotalTime);
    setTimeLeft(newTotalTime);
  }, [sessionType, activeMode, customMinutes, customBreak]);


  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      if (sessionType === 'work') {
        onSessionComplete();
        setSessionType('break');
      } else {
        setSessionType('work');
      }
      setIsActive(false);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onSessionComplete, sessionType]);

  const handleModeChange = (value: string) => {
    if (value === 'classic' || value === 'focused' || value === 'custom') {
      setIsActive(false);
      setSessionType('work');
      setActiveMode(value as any);
      const newTotalTime = value === 'custom' ? customMinutes * 60 : modes[value as keyof typeof modes].pomodoro * 60;
      setTotalTime(newTotalTime);
      setTimeLeft(newTotalTime);
    }
  };

  const handleCustomMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setCustomMinutes(value);
    onSettingsChange({ customMinutes: value, customBreak });
  }

  const handleCustomBreakChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setCustomBreak(value);
    onSettingsChange({ customMinutes, customBreak: value });
  }

  const handleReset = () => {
    setIsActive(false);
    handleModeChange(activeMode);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <Tabs defaultValue="classic" onValueChange={handleModeChange} className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="classic">Classic</TabsTrigger>
          <TabsTrigger value="focused">Focused</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>
        <TabsContent value="custom" className="mt-4 grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <Label htmlFor="work-duration">Work (min)</Label>
                <Input id="work-duration" type="number" value={customMinutes} onChange={handleCustomMinutesChange} />
            </div>
            <div className="space-y-1">
                <Label htmlFor="break-duration">Break (min)</Label>
                <Input id="break-duration" type="number" value={customBreak} onChange={handleCustomBreakChange} />
            </div>
        </TabsContent>
      </Tabs>
      
      <div className="relative my-6">
        <PlantAnimation progress={progress} PlantComponent={PlantComponent} />
      </div>

      <div className="text-center">
        <h2 className="text-sm font-semibold tracking-wider uppercase text-primary font-headline">
          {sessionType === 'work' ? 'Time to Focus' : 'Time for a Break'}
        </h2>
        <p className="text-7xl md:text-8xl font-bold font-headline tracking-tighter"
           style={{fontFeatureSettings: '"tnum"'}}
        >
          {formatTime(timeLeft)}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={() => setIsActive(!isActive)} size="lg" className="w-32 rounded-full shadow-lg">
          {isActive ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button onClick={handleReset} size="lg" variant="outline" className="rounded-full shadow-lg">
          <RotateCcw className="mr-2 h-5 w-5" />
          Reset
        </Button>
      </div>
    </div>
  );
}
