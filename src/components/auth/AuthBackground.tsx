
interface AuthBackgroundProps {
  imageSrc?: string;
  opacity?: number;
  children: React.ReactNode;
}

const AuthBackground = ({ 
  imageSrc, 
  opacity = 0.1, 
  children 
}: AuthBackgroundProps) => {
  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Image/GIF */}
      {imageSrc && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${imageSrc})`,
            opacity: opacity
          }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AuthBackground;
