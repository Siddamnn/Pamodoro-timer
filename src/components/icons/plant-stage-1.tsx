import React from 'react';

export const PlantStage1: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g transform="translate(0, 20)">
        <path d="M50,50 C50,40 55,40 55,45" stroke="#A8E6CF" fill="none" strokeWidth="2" strokeLinecap="round"/>
        <path d="M50,50 C50,40 45,40 45,45" stroke="#A8E6CF" fill="none" strokeWidth="2" strokeLinecap="round"/>
    </g>
  </svg>
);
