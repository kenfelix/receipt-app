"use client";

import React from 'react';

interface SparLogoProps {
  variant?: 'thermal' | 'color';
  className?: string;
  size?: number; // height in px
}

export const SparLogo: React.FC<SparLogoProps> = ({
  variant = 'thermal',
  className = '',
  size = 40,
}) => {
  const isColor = variant === 'color';
  const textColor = isColor ? '#E11B22' : '#000000'; // SPAR Red or Black
  const emblemBg = isColor ? '#007A3D' : '#000000'; // SPAR Green or Black
  const emblemTree = '#FFFFFF';
  const emblemBorder = isColor ? '#007A3D' : '#000000';

  return (
    <div className={`flex items-center justify-center gap-2 select-none ${className}`}>
      {/* SPAR Wordmark */}
      <span
        style={{
          fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
          fontWeight: 900,
          fontSize: `${size * 0.85}px`,
          letterSpacing: '-0.02em',
          color: textColor,
          lineHeight: 1,
        }}
      >
        SPAR
      </span>

      {/* SPAR Fir Tree Emblem in Circle */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'inline-block' }}
      >
        {/* Outer Ring */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill={emblemBg}
          stroke={emblemBorder}
          strokeWidth="3"
        />
        {/* Inner thin white circle line */}
        <circle
          cx="50"
          cy="50"
          r="41"
          fill="none"
          stroke={emblemTree}
          strokeWidth="2.5"
        />
        {/* Stylized SPAR Fir Tree */}
        {/* Top tier */}
        <path
          d="M 50 17 
             L 63 35 
             L 57 35 
             L 68 53 
             L 60 53 
             L 73 73 
             L 54 73 
             L 54 81 
             L 46 81 
             L 46 73 
             L 27 73 
             L 40 53 
             L 32 53 
             L 43 35 
             L 37 35 
             Z"
          fill={emblemTree}
        />
      </svg>
    </div>
  );
};

export default SparLogo;
