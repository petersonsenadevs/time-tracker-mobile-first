
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showLink?: boolean;
  linkTo?: string;
}

const sizeClasses = {
  sm: 'h-8 w-auto',
  md: 'h-12 w-auto',
  lg: 'h-16 w-auto',
  xl: 'h-20 w-auto'
};

const Logo = ({ size = 'md', className, showLink = true, linkTo = '/' }: LogoProps) => {
  const logoImage = (
    <img 
      src="https://iwxedutdoaukcadsvqux.supabase.co/storage/v1/object/public/klk//Logo%20JORNALIA_BLANCO.png" 
      alt="Jornalia Logo" 
      className={cn(sizeClasses[size], 'object-contain', className)}
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
