import React from 'react';

const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    {/* Document Icon paths */}
    <g>
        <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
        <path d="M9 9h3"></path>
        <path d="M9 13h4"></path>
    </g>
    
    {/* Brain Icon paths, transformed. stroke-width is increased to compensate for scale reduction */}
    <g transform="translate(10, 11) scale(0.6)" strokeWidth="2.5">
       <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8"></path>
       <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8"></path>
       <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-1.5"></path>
       <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h1.5"></path>
       <path d="M12 16v-8.5a3.5 3.5 0 0 0 -7 0v .5"></path>
       <path d="M12 16v-8.5a3.5 3.5 0 0 1 7 0v .5"></path>
    </g>
  </svg>
);

export default LogoIcon;
