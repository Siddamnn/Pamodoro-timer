import React from 'react';

export const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-6.22-8.5" strokeWidth="2" />
    <path d="M12,7 A5,5 0 0,0 7,12 C7,16 12,19 12,19 C12,19 17,16 17,12 A5,5 0 0,0 12,7Z" />
    <path d="M12 19V12" />
    <path d="M10 12l2 -2" />
    <path d="M14 12l-2 -2" />
  </svg>
);
