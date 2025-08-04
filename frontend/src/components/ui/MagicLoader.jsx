import { cn } from "../../lib/utils"

const MagicLoader = ({ className, size = "default", text = "Carregando..." }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6", 
    lg: "w-8 h-8"
  }

  return (
    <div className={cn("flex items-center justify-center space-x-2", className)}>
      <div className="relative">
        {/* Outer ring */}
        <div className={cn(
          "rounded-full border-2 border-primary/20 animate-spin",
          sizeClasses[size]
        )}>
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-transparent border-t-primary animate-spin" 
               style={{ animationDuration: '1s' }} />
        </div>
        
        {/* Inner dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
      
      {text && (
        <span className="text-sm text-muted-foreground animate-pulse">
          {text}
        </span>
      )}
    </div>
  )
}

const TypingLoader = ({ className }) => {
  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="text-sm text-muted-foreground ml-2">Digitando</span>
    </div>
  )
}

export { MagicLoader, TypingLoader }