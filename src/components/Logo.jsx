import React from 'react';

// Logo component - Neurokintsugi origami unicorn
const Logo = ({ size = 'large' }) => {
  const sizes = {
    large: { width: 120, height: 120 },
    medium: { width: 72, height: 72 },
    small: { width: 48, height: 48 },
    tiny: { width: 28, height: 28 }
  };
  const { width, height } = sizes[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      className={`logo logo-${size}`}
      aria-label="Neurokintsugi"
      role="img"
    >
      <defs>
        <linearGradient id={`bgGradient-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFA500" />
          <stop offset="100%" stopColor="#FF5F1F" />
        </linearGradient>
      </defs>

      {/* Orange circle background */}
      <circle cx="100" cy="100" r="95" fill={`url(#bgGradient-${size})`} />

      {/* Origami unicorn - geometric style */}
      <g transform="translate(30, 25) scale(0.7)">
        {/* Back body */}
        <polygon points="60,140 100,100 80,160" fill="#e8e8e8" stroke="#d0d0d0" strokeWidth="1"/>

        {/* Main body */}
        <polygon points="80,100 140,80 160,130 100,160 80,140" fill="#f5f5f5" stroke="#d0d0d0" strokeWidth="1"/>
        <polygon points="80,100 140,80 110,110" fill="#e0e0e0" stroke="#d0d0d0" strokeWidth="1"/>
        <polygon points="140,80 160,130 150,100" fill="#ececec" stroke="#d0d0d0" strokeWidth="1"/>

        {/* Neck */}
        <polygon points="140,80 170,50 180,90 160,110" fill="#f5f5f5" stroke="#d0d0d0" strokeWidth="1"/>
        <polygon points="140,80 160,60 155,85" fill="#e8e8e8" stroke="#d0d0d0" strokeWidth="1"/>

        {/* Head */}
        <polygon points="170,50 195,35 200,55 185,70 180,75" fill="#f5f5f5" stroke="#d0d0d0" strokeWidth="1"/>
        <polygon points="170,50 185,45 180,60" fill="#e8e8e8" stroke="#d0d0d0" strokeWidth="1"/>

        {/* Horn */}
        <polygon points="190,35 195,10 200,35" fill="#f8f8f8" stroke="#c0c0c0" strokeWidth="1"/>

        {/* Ear */}
        <polygon points="175,38 180,22 188,38" fill="#e8e8e8" stroke="#d0d0d0" strokeWidth="1"/>

        {/* Front leg 1 */}
        <polygon points="145,140 150,190 160,190 158,140" fill="#f0f0f0" stroke="#d0d0d0" strokeWidth="1"/>

        {/* Front leg 2 */}
        <polygon points="125,150 128,190 138,190 138,150" fill="#e5e5e5" stroke="#d0d0d0" strokeWidth="1"/>

        {/* Back leg 1 */}
        <polygon points="95,155 92,190 102,190 105,155" fill="#f0f0f0" stroke="#d0d0d0" strokeWidth="1"/>

        {/* Back leg 2 */}
        <polygon points="75,145 70,185 80,185 85,150" fill="#e5e5e5" stroke="#d0d0d0" strokeWidth="1"/>

        {/* Tail */}
        <polygon points="60,130 35,115 30,135 50,145" fill="#f0f0f0" stroke="#d0d0d0" strokeWidth="1"/>
        <polygon points="35,115 25,105 30,120" fill="#e5e5e5" stroke="#d0d0d0" strokeWidth="1"/>

        {/* Mane accents */}
        <polygon points="155,70 145,55 155,60 165,50" fill="#e8e8e8" stroke="#d0d0d0" strokeWidth="1"/>
      </g>
    </svg>
  );
};

export default Logo;
