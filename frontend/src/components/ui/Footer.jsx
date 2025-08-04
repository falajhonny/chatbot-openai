import { User, Heart, Sparkles } from "lucide-react"

function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/20 bg-card/10 backdrop-blur-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2 glass-morphism px-3 py-2 rounded-full">
            <User className="h-4 w-4 animate-pulse" />
            <span>Desenvolvido com</span>
            <Heart className="h-4 w-4 text-red-400 animate-pulse" />
            <span>por</span>
            <span className="gradient-text font-semibold">jhonny</span>
          </div>
          <Sparkles className="h-3 w-3 text-primary/60 animate-pulse" />
          <a 
            href="mailto:falajhonny@gmail.com" 
            className="glass-morphism px-3 py-2 rounded-full hover:text-primary hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          >
            falajhonny@gmail.com
          </a>
        </div>
      </div>
    </footer>
  )
}

export { Footer }