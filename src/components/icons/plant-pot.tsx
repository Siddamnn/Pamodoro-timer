import React from 'react';

export const PlantPot: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g transform="translate(0, 20)">
      <path d="M25,50 H75 L80,75 H20 Z" fill="hsl(var(--secondary))" stroke="hsl(var(--secondary-foreground))" strokeWidth="1"/>
      <rect x="23" y="45" width="54" height="5" fill="hsl(var(--secondary))" stroke="hsl(var(--secondary-foreground))" strokeWidth="1" rx="2"/>
      <path d="M35,50 C40,40 60,40 65,50" fill="hsl(var(--background))" />
    </g>
  </svg>
);
