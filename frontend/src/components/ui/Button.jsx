import { forwardRef } from "react"
import { cn } from "../../lib/utils"

const Button = forwardRef(
  ({ className, variant = "default", size = "default", magic = false, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    const magicClasses = magic ? "magic-glow relative overflow-hidden hover:scale-105 hover:shadow-lg hover:shadow-primary/25" : ""
    
    return (
      <button
        className={cn(
          baseClasses,
          {
            "bg-gradient-to-r from-primary to-green-500 text-primary-foreground hover:from-primary/90 hover:to-green-500/90 shadow-lg": variant === "default",
            "bg-gradient-to-r from-destructive to-red-600 text-destructive-foreground hover:from-destructive/90 hover:to-red-600/90": variant === "destructive",
            "border border-input bg-background/50 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground hover:border-primary/50": variant === "outline",
            "bg-secondary/80 backdrop-blur-sm text-secondary-foreground hover:bg-secondary": variant === "secondary",
            "hover:bg-accent hover:text-accent-foreground hover:backdrop-blur-sm": variant === "ghost",
            "text-primary underline-offset-4 hover:underline gradient-text": variant === "link",
          },
          {
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-11 rounded-md px-8": size === "lg",
            "h-10 w-10": size === "icon",
          },
          magicClasses,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }