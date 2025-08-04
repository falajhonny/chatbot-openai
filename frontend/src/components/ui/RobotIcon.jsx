import { cn } from "../../lib/utils"

function RobotIcon({ className, size = 24, animated = false, ...props }) {
  return (
    <div className={cn("relative inline-block", className)} {...props}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("relative z-10", animated && "animate-float")}
      >
        {/* Glow effect background */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(34, 197, 94)" />
            <stop offset="50%" stopColor="rgb(16, 185, 129)" />
            <stop offset="100%" stopColor="rgb(5, 150, 105)" />
          </linearGradient>
          <linearGradient id="eyeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" />
            <stop offset="100%" stopColor="rgb(37, 99, 235)" />
          </linearGradient>
        </defs>

        {/* Robot body */}
        <rect 
          x="8" 
          y="12" 
          width="32" 
          height="24" 
          rx="4" 
          fill="url(#bodyGradient)" 
          stroke="rgba(255,255,255,0.2)" 
          strokeWidth="1"
          filter="url(#glow)"
        />
        
        {/* Robot head */}
        <rect 
          x="12" 
          y="8" 
          width="24" 
          height="16" 
          rx="3" 
          fill="url(#bodyGradient)" 
          stroke="rgba(255,255,255,0.2)" 
          strokeWidth="1"
        />

        {/* Eyes */}
        <circle 
          cx="18" 
          cy="16" 
          r="3" 
          fill="url(#eyeGradient)"
          className={animated ? "animate-pulse" : ""}
        />
        <circle 
          cx="30" 
          cy="16" 
          r="3" 
          fill="url(#eyeGradient)"
          className={animated ? "animate-pulse" : ""}
        />
        
        {/* Eye highlights */}
        <circle cx="19" cy="15" r="1" fill="rgba(255,255,255,0.8)" />
        <circle cx="31" cy="15" r="1" fill="rgba(255,255,255,0.8)" />

        {/* Mouth */}
        <rect 
          x="20" 
          y="19" 
          width="8" 
          height="2" 
          rx="1" 
          fill="rgba(255,255,255,0.6)"
        />

        {/* Antenna */}
        <circle cx="24" cy="6" r="2" fill="url(#bodyGradient)" />
        <line 
          x1="24" 
          y1="8" 
          x2="24" 
          y2="12" 
          stroke="url(#bodyGradient)" 
          strokeWidth="2" 
          strokeLinecap="round"
        />

        {/* Arms */}
        <rect 
          x="4" 
          y="18" 
          width="6" 
          height="3" 
          rx="1.5" 
          fill="url(#bodyGradient)"
        />
        <rect 
          x="38" 
          y="18" 
          width="6" 
          height="3" 
          rx="1.5" 
          fill="url(#bodyGradient)"
        />

        {/* Legs */}
        <rect 
          x="14" 
          y="36" 
          width="4" 
          height="8" 
          rx="2" 
          fill="url(#bodyGradient)"
        />
        <rect 
          x="30" 
          y="36" 
          width="4" 
          height="8" 
          rx="2" 
          fill="url(#bodyGradient)"
        />

        {/* Body details */}
        <circle cx="16" cy="24" r="1.5" fill="rgba(255,255,255,0.4)" />
        <circle cx="24" cy="26" r="1.5" fill="rgba(255,255,255,0.4)" />
        <circle cx="32" cy="24" r="1.5" fill="rgba(255,255,255,0.4)" />

        {/* Chest panel */}
        <rect 
          x="18" 
          y="28" 
          width="12" 
          height="4" 
          rx="2" 
          fill="rgba(255,255,255,0.1)" 
          stroke="rgba(255,255,255,0.3)" 
          strokeWidth="0.5"
        />
      </svg>
      
      {/* Animated sparkles around the robot */}
      {animated && (
        <>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary/60 rounded-full animate-ping" />
          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-green-400/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-1/2 -right-2 w-1 h-1 bg-emerald-400/60 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        </>
      )}
      
      {/* Glow effect */}
      {animated && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-green-400/20 rounded-full blur-lg animate-pulse" />
      )}
    </div>
  )
}

export { RobotIcon }