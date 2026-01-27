import React from 'react';
import logoSvg from '../assets/Neurokintsugi_Logo.svg';

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
    <img
      src={logoSvg}
      alt="Neurokintsugi"
      className={`logo logo-${size}`}
      width={width}
      height={height}
    />
  );
};

export default Logo;
