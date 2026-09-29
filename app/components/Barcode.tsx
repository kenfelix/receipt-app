"use client";

import React from 'react';

// Code 128B pattern table (widths of 6 alternating bars & spaces, total width 11)
const CODE128_PATTERNS: string[] = [
  "212222", "222122", "222221", "121223", "121322", "131222", "122213", "122312", "132212", "221213", // 0-9
  "221312", "231212", "112232", "122132", "122231", "113222", "123122", "123221", "223211", "221132", // 10-19
  "221231", "213212", "223112", "312131", "311222", "321122", "321221", "312212", "322112", "322211", // 20-29
  "212123", "212321", "232121", "111323", "131123", "131321", "112313", "132113", "132311", "211313", // 30-39
  "231113", "231311", "112133", "112331", "132131", "113123", "113321", "133121", "313121", "211331", // 40-49
  "231131", "213113", "213311", "213131", "311123", "311321", "331121", "312113", "312311", "332111", // 50-59
  "314111", "221411", "431111", "111224", "111422", "121124", "121421", "141122", "141221", "112214", // 60-69
  "112412", "122114", "122411", "142112", "142211", "241211", "221114", "413111", "241112", "134111", // 70-79
  "111242", "121142", "121241", "114212", "124112", "124211", "411212", "421112", "421211", "212141", // 80-89
  "214121", "412121", "111143", "111341", "131141", "114113", "114311", "411113", "411311", "113141", // 90-99
  "114131", "311141", "411131", "211412", "211214", "211232", "2331112" // 100-106 (106 is STOP pattern: 7 widths: 2331112)
];

const START_CODE_B = 104;
const STOP_CODE = 106;

function encodeCode128B(text: string): number[] {
  // Convert standard ASCII (32-126) to Code 128B values (0-94)
  const patternIndices: number[] = [START_CODE_B];
  let checksum = START_CODE_B;

  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    // Printable ASCII 32-127 corresponds to Code 128 value (charCode - 32)
    const codeVal = charCode >= 32 && charCode <= 126 ? charCode - 32 : 0;
    patternIndices.push(codeVal);
    checksum += codeVal * (i + 1);
  }

  const checkDigit = checksum % 103;
  patternIndices.push(checkDigit);
  patternIndices.push(STOP_CODE);

  return patternIndices;
}

interface BarcodeProps {
  value: string;
  height?: number;
  barWidth?: number;
  className?: string;
  showText?: boolean;
}

export const Barcode: React.FC<BarcodeProps> = ({
  value,
  height = 50,
  barWidth = 1.6,
  className = "",
  showText = false,
}) => {
  const cleanVal = (value || "SPAR").trim();
  const patternIndices = encodeCode128B(cleanVal);

  // Generate bars
  const rects: React.ReactNode[] = [];
  let currentX = 0;

  patternIndices.forEach((patternIndex, idx) => {
    const pattern = CODE128_PATTERNS[patternIndex];
    if (!pattern) return;

    for (let p = 0; p < pattern.length; p++) {
      const width = parseInt(pattern[p], 10) * barWidth;
      const isBar = p % 2 === 0;

      if (isBar) {
        rects.push(
          <rect
            key={`${idx}-${p}`}
            x={currentX}
            y={0}
            width={width}
            height={height}
            fill="black"
          />
        );
      }
      currentX += width;
    }
  });

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        width={currentX}
        height={height}
        viewBox={`0 0 ${currentX} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      >
        {rects}
      </svg>
      {showText && (
        <span className="font-mono text-xs tracking-widest mt-1 text-black font-semibold">
          {cleanVal}
        </span>
      )}
    </div>
  );
};

export default Barcode;
