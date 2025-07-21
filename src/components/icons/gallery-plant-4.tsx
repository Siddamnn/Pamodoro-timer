import React from 'react';

export const GalleryPlant4: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props} data-ai-hint="monstera plant">
    <g transform="translate(0, 10)">
      <path d="M30 80 H70 L75 95 H25 Z" fill="#DCAEDF" />
      <path d="M50 80 V 30" stroke="#A8E6CF" strokeWidth="3" fill="none" />
      <path d="M50 50 C 20 50, 20 20, 50 20 S 80 50, 50 50" fill="#A8E6CF" />
      <circle cx="40" cy="35" r="3" fill="hsl(var(--background))" />
      <circle cx="60" cy="35" r="3" fill="hsl(var(--background))" />
      <path d="M30 30 C 35 25, 40 25, 40 30" stroke="hsl(var(--background))" strokeWidth="2" fill="none" />
    </g>
  </svg>
);
