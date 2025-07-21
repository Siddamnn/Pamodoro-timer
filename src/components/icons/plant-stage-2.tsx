import React from 'react';

export const PlantStage2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
     <g transform="translate(0, 20)">
        <path d="M50,50 V30" stroke="#A8E6CF" fill="none" strokeWidth="2" strokeLinecap="round"/>
        <path d="M50,40 C55,40 55,35 58,35" stroke="#A8E6CF" fill="none" strokeWidth="2" strokeLinecap="round"/>
        <path d="M50,40 C45,40 45,35 42,35" stroke="#A8E6CF" fill="none" strokeWidth="2" strokeLinecap="round"/>
     </g>
  </svg>
);
