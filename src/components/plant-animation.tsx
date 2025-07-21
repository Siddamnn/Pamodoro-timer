import React from 'react';
import { PlantPot } from './icons/plant-pot';
import { PlantStage1 } from './icons/plant-stage-1';
import { PlantStage2 } from './icons/plant-stage-2';
import { PlantStage3 } from './icons/plant-stage-3';

interface PlantAnimationProps {
  progress: number;
  PlantComponent: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const PlantAnimation: React.FC<PlantAnimationProps> = ({ progress, PlantComponent }) => {
  return (
    <div
      className="relative flex h-48 w-48 items-center justify-center"
      aria-label={`Pomodoro session progress: ${Math.round(progress * 100)}%`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: 1 }}>
        <PlantPot />
      </div>
      <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: progress > 0.05 ? 1 : 0 }}>
        <PlantStage1 />
      </div>
      <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: progress > 0.33 ? 1 : 0 }}>
        <PlantStage2 />
      </div>
      <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: progress > 0.66 ? 1 : 0 }}>
        <PlantStage3 />
      </div>
      <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: progress >= 1 ? 1 : 0 }}>
        <PlantComponent className="h-full w-full" />
      </div>
    </div>
  );
};
