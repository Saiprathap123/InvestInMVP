interface IVCLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function IVCLogo({ size = 'md', className = '' }: IVCLogoProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} inline-flex items-center justify-center`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer circle with gradient */}
        <circle
          cx="12"
          cy="12"
          r="11"
          fill="url(#ivcGradient)"
          stroke="#1e40af"
          strokeWidth="1"
        />
        
        {/* Inner circle */}
        <circle
          cx="12"
          cy="12"
          r="8"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          opacity="0.8"
        />
        
        {/* IVC text */}
        <text
          x="12"
          y="16"
          textAnchor="middle"
          className="fill-white text-[8px] font-bold"
          style={{ fontSize: '7px' }}
        >
          IVC
        </text>
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="ivcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Currency formatter utility
export function formatIVC(amount: number | string, showSymbol: boolean = true): string {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  const formatted = numAmount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  return showSymbol ? `${formatted} IVC` : formatted;
}

// Currency display component
interface IVCDisplayProps {
  amount: number | string;
  size?: 'sm' | 'md' | 'lg';
  showSymbol?: boolean;
  className?: string;
}

export function IVCDisplay({ amount, size = 'md', showSymbol = true, className = '' }: IVCDisplayProps) {
  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <IVCLogo size={size} />
      <span className={textSizes[size]}>
        {formatIVC(amount, showSymbol)}
      </span>
    </div>
  );
}