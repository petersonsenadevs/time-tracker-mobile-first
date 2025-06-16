
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  height?: string;
  className?: string;
  showLink?: boolean;
  linkTo?: string;
}

const Logo = ({ height = 'h-12', className, showLink = true, linkTo = '/' }: LogoProps) => {
  const logoImage = (
    <img 
      src="https://iwxedutdoaukcadsvqux.supabase.co/storage/v1/object/public/klk//Logo%20JORNALIA_BLANCO.png" 
      alt="Jornalia Logo" 
      className={cn(height, 'w-auto object-contain', className)}
    />
  );

  if (showLink) {
    return (
      <Link to={linkTo} className="inline-block hover:opacity-80 transition-opacity">
        {logoImage}
      </Link>
    );
  }

  return logoImage;
};

export default Logo;
