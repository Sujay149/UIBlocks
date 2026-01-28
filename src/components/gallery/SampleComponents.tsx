import { ReactNode, useState, useEffect } from "react";
import { ChevronDown, X, Home, Settings, User, Bell, Search, Menu, Star, Zap, Layers, MessageCircle, Loader2, Check, Circle, CalendarIcon, ChevronUp } from "lucide-react";

// Sample animated components for the gallery

// Custom preview components for user-created components
export const SujayCardsss = () => {
  return (
    <div className="w-48 p-6 rounded-2xl glass border border-primary/30 hover:scale-[1.02] transition-all duration-200">
      <div className="space-y-3">
        <div className="h-4 w-3/4 rounded bg-gradient-to-r from-primary to-accent-purple shimmer" />
        <div className="h-3 w-1/2 rounded bg-muted" />
        <div className="h-2 w-full rounded bg-muted/50" />
        <div className="flex gap-2 mt-4">
          <div className="h-6 w-6 rounded-lg glass" />
          <div className="h-6 w-6 rounded-lg glass" />
          <div className="h-6 w-6 rounded-lg glass" />
        </div>
      </div>
    </div>
  );
};

export const SujayCard = () => {
  return (
    <div className="w-40 p-4 rounded-xl glass float">
      <div className="w-full h-16 rounded-lg bg-gradient-to-br from-accent-indigo/30 to-accent-cyan/30 mb-3" />
      <h4 className="text-xs font-semibold mb-1 text-foreground">Sujay Card</h4>
      <p className="text-[10px] text-muted-foreground">Custom glass card</p>
    </div>
  );
};

export const SujayBtn = () => {
  return (
    <button className="px-6 py-3 rounded-xl glass hover:scale-105 transition-all duration-300 group overflow-hidden relative">
      <span className="relative z-10 text-sm font-medium gradient-text">Sujay Button</span>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    </button>
  );
};

export const GlassButton = () => {
  return (
    <button className="relative group px-6 py-3 rounded-xl glass overflow-hidden transition-all duration-200 hover:scale-105">
      <span className="relative z-10 font-medium text-sm text-foreground group-hover:text-primary transition-colors">
        Glass Button
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    </button>
  );
};

export const GlowButton = () => {
  return (
    <button className="relative px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm overflow-hidden group transition-all duration-300 hover:shadow-glow">
      <span className="relative z-10">Glow Effect</span>
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent-purple to-primary bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite] opacity-0 group-hover:opacity-30" />
    </button>
  );
};

export const NeonBorderButton = () => {
  return (
    <button className="relative px-6 py-3 rounded-xl bg-background border border-primary/50 font-medium text-sm text-primary overflow-hidden group hover:border-primary transition-all duration-300 hover:shadow-glow">
      Neon Border
    </button>
  );
};

export const PulseButton = () => {
  return (
    <button className="relative px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm">
      <span className="relative z-10">Pulse</span>
      <div className="absolute inset-0 rounded-xl bg-primary animate-glow-pulse" />
    </button>
  );
};

export const GlassCard = () => {
  return (
    <div className="w-48 p-4 rounded-xl glass group hover:scale-[1.02] transition-all duration-200">
      <div className="w-full h-20 rounded-lg bg-gradient-to-br from-primary/20 to-accent-purple/20 mb-3" />
      <div className="h-3 w-3/4 rounded bg-muted mb-2" />
      <div className="h-2 w-1/2 rounded bg-muted/50" />
    </div>
  );
};

export const GlassInput = () => {
  return (
    <div className="relative group">
      <input
        type="text"
        placeholder="Glass Input..."
        className="w-48 px-4 py-3 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
      />
    </div>
  );
};

export const GlassBadge = () => {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-foreground group hover:scale-105 transition-all duration-200 cursor-pointer">
      <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
      Active
    </span>
  );
};

export const AnimatedToggle = () => {
  return (
    <button className="relative w-14 h-8 rounded-full bg-muted p-1 group">
      <div className="absolute left-1 top-1 w-6 h-6 rounded-full bg-primary shadow-glow transition-transform duration-300 group-hover:translate-x-6" />
    </button>
  );
};

export const FloatingCard = () => {
  return (
    <div className="w-40 p-4 rounded-xl glass float">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent-indigo to-accent-cyan" />
        <span className="text-xs font-medium text-foreground">Floating</span>
      </div>
      <div className="h-2 w-full rounded bg-muted/50" />
    </div>
  );
};

export const ShimmerCard = () => {
  return (
    <div className="w-48 p-4 rounded-xl glass">
      <div className="w-full h-16 rounded-lg shimmer mb-3" />
      <div className="h-3 w-3/4 rounded shimmer mb-2" />
      <div className="h-2 w-1/2 rounded shimmer" />
    </div>
  );
};

export const GradientCard = () => {
  return (
    <div className="w-48 p-4 rounded-xl glass overflow-hidden group">
      <div className="w-full h-20 rounded-lg bg-gradient-to-br from-accent-indigo via-accent-purple to-accent-pink mb-3 group-hover:scale-105 transition-transform duration-300" />
      <div className="h-3 w-3/4 rounded bg-muted mb-2" />
      <div className="h-2 w-1/2 rounded bg-muted/50" />
    </div>
  );
};

export const GlassAlert = () => {
  return (
    <div className="w-64 p-4 rounded-xl glass border border-primary/30">
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-foreground mb-1">Alert Title</h4>
          <p className="text-xs text-muted-foreground">This is a glass alert message.</p>
        </div>
      </div>
    </div>
  );
};

export const GradientBorder = () => {
  return (
    <div className="relative p-[1px] rounded-xl bg-gradient-to-r from-primary via-accent-purple to-accent-cyan overflow-hidden group">
      <div className="px-6 py-3 rounded-[11px] bg-background text-sm font-medium text-foreground group-hover:bg-transparent transition-colors duration-300">
        Gradient Border
      </div>
    </div>
  );
};

export const IconButton = () => {
  return (
    <button className="p-3 rounded-xl glass group hover:bg-primary/10 transition-all duration-200">
      <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </button>
  );
};

// NEW COMPONENTS - Modals, Tooltips, Dropdowns, Navigation

export const GlassModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 rounded-xl glass text-sm font-medium text-foreground hover:bg-primary/10 transition-all duration-200"
      >
        Open Modal
      </button>
      
      {isOpen && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-4 rounded-xl bg-popover/95 backdrop-blur-xl border border-border shadow-elevated animate-scale-in z-50">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-sm text-foreground">Glass Modal</span>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-3 h-3 text-muted-foreground" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mb-3">A beautiful modal with glass effect and smooth animations.</p>
          <div className="flex gap-2">
            <button className="flex-1 px-3 py-1.5 rounded-lg bg-muted text-xs text-muted-foreground hover:text-foreground transition-colors">
              Cancel
            </button>
            <button className="flex-1 px-3 py-1.5 rounded-lg bg-primary text-xs text-primary-foreground hover:shadow-glow transition-all">
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const GlassTooltip = () => {
  return (
    <div className="relative group">
      <button className="px-4 py-2 rounded-xl glass text-sm font-medium text-foreground hover:bg-primary/10 transition-all duration-200">
        Hover Me
      </button>
      
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg bg-popover/95 backdrop-blur-xl border border-border shadow-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap">
        <span className="text-xs text-foreground">Glass Tooltip</span>
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-popover/95" />
      </div>
    </div>
  );
};

export const GlassDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm font-medium text-foreground hover:bg-primary/10 transition-all duration-200"
      >
        Dropdown
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 p-2 rounded-xl bg-popover/95 backdrop-blur-xl border border-border shadow-elevated animate-fade-in z-50">
          {[
            { icon: Home, label: "Dashboard" },
            { icon: Settings, label: "Settings" },
            { icon: User, label: "Profile" },
            { icon: Bell, label: "Notifications" },
          ].map((item, i) => (
            <button
              key={i}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-150"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const GlassNavbar = () => {
  return (
    <nav className="flex items-center gap-1 p-1.5 rounded-xl glass">
      {[
        { icon: Home, active: true },
        { icon: Search, active: false },
        { icon: Bell, active: false },
        { icon: User, active: false },
      ].map((item, i) => (
        <button
          key={i}
          className={`p-2.5 rounded-lg transition-all duration-200 ${
            item.active 
              ? 'bg-primary/20 text-primary shadow-glow' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <item.icon className="w-4 h-4" />
        </button>
      ))}
    </nav>
  );
};

export const GlassTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Overview", "Features", "Pricing"];
  
  return (
    <div className="flex items-center gap-1 p-1 rounded-xl glass">
      {tabs.map((tab, i) => (
        <button
          key={i}
          onClick={() => setActiveTab(i)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === i 
              ? 'bg-primary text-primary-foreground shadow-glow' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export const GlassBreadcrumb = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm">
      <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Home</a>
      <span className="text-muted-foreground/50">/</span>
      <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Products</a>
      <span className="text-muted-foreground/50">/</span>
      <span className="text-foreground font-medium">Details</span>
    </div>
  );
};

export const GlassContextMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 rounded-xl glass text-sm font-medium text-foreground hover:bg-primary/10 transition-all duration-200"
      >
        Right Click
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-44 p-1.5 rounded-xl bg-popover/95 backdrop-blur-xl border border-border shadow-elevated animate-scale-in z-50">
          <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <Star className="w-4 h-4" /> Add to favorites
          </button>
          <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <Layers className="w-4 h-4" /> Move to folder
          </button>
          <div className="my-1 h-px bg-border" />
          <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">
            <X className="w-4 h-4" /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export const GlassNotification = () => {
  return (
    <div className="flex items-start gap-3 w-64 p-4 rounded-xl glass animate-fade-in">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center">
        <Zap className="w-5 h-5 text-primary-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">New Update</p>
        <p className="text-xs text-muted-foreground mt-0.5">Your component library has been updated.</p>
      </div>
      <button className="p-1 rounded-lg hover:bg-muted transition-colors">
        <X className="w-3 h-3 text-muted-foreground" />
      </button>
    </div>
  );
};

export const GlassSidebar = () => {
  return (
    <div className="flex flex-col gap-1 w-48 p-2 rounded-xl glass">
      {[
        { icon: Home, label: "Dashboard", active: true },
        { icon: Layers, label: "Projects", active: false },
        { icon: MessageCircle, label: "Messages", active: false, badge: 3 },
        { icon: Settings, label: "Settings", active: false },
      ].map((item, i) => (
        <button
          key={i}
          className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
            item.active 
              ? 'bg-primary/20 text-primary' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
          }`}
        >
          <span className="flex items-center gap-3">
            <item.icon className="w-4 h-4" />
            {item.label}
          </span>
          {item.badge && (
            <span className="px-1.5 py-0.5 rounded-full bg-primary text-[10px] text-primary-foreground font-medium">
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export const GlassCommandPalette = () => {
  return (
    <div className="w-72 rounded-xl bg-popover/95 backdrop-blur-xl border border-border shadow-elevated overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Search commands..."
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <span className="px-1.5 py-0.5 rounded text-[10px] text-muted-foreground bg-muted">ESC</span>
      </div>
      <div className="p-2">
        <div className="px-2 py-1.5 text-[10px] text-muted-foreground uppercase tracking-wider">Quick Actions</div>
        {[
          { icon: Home, label: "Go to Dashboard", shortcut: "⌘D" },
          { icon: Search, label: "Search files", shortcut: "⌘F" },
          { icon: Settings, label: "Open settings", shortcut: "⌘," },
        ].map((item, i) => (
          <button
            key={i}
            className="flex items-center justify-between w-full px-2 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <span className="flex items-center gap-3">
              <item.icon className="w-4 h-4" />
              {item.label}
            </span>
            <span className="text-xs text-muted-foreground">{item.shortcut}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export const GlassAvatar = () => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl glass group hover:scale-[1.02] transition-all duration-200 cursor-pointer">
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent-cyan" />
        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-accent-green border-2 border-background" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">Alex Chen</p>
        <p className="text-xs text-muted-foreground">Online</p>
      </div>
    </div>
  );
};

export const GlassProgress = () => {
  return (
    <div className="w-48 space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Progress</span>
        <span className="text-foreground font-medium">75%</span>
      </div>
      <div className="h-2 rounded-full glass overflow-hidden">
        <div 
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent-cyan transition-all duration-500"
          style={{ width: '75%' }}
        />
      </div>
    </div>
  );
};

export const GlassSlider = () => {
  return (
    <div className="w-48 space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Volume</span>
        <span className="text-foreground font-medium">80%</span>
      </div>
      <div className="relative h-2 rounded-full glass">
        <div 
          className="absolute left-0 top-0 h-full rounded-full bg-primary"
          style={{ width: '80%' }}
        />
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary shadow-glow border-2 border-background cursor-grab"
          style={{ left: 'calc(80% - 8px)' }}
        />
      </div>
    </div>
  );
};

export const GlassAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="w-56 rounded-xl glass overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/30 transition-colors"
      >
        <span className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary" />
          Accordion Item
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-32' : 'max-h-0'}`}>
        <div className="px-4 pb-3 pt-0 text-xs text-muted-foreground">
          This is the accordion content with glass morphism styling and smooth animations.
        </div>
      </div>
    </div>
  );
};

// ============ LOADING COMPONENTS ============

export const GlassSpinner = () => {
  return (
    <div className="flex items-center justify-center p-4 rounded-xl glass">
      <div className="relative">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <div className="absolute inset-0 w-8 h-8 rounded-full bg-primary/20 blur-md animate-pulse" />
      </div>
    </div>
  );
};

export const GlassPulseLoader = () => {
  return (
    <div className="flex items-center gap-2 p-4 rounded-xl glass">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
};

export const GlassRingLoader = () => {
  return (
    <div className="flex items-center justify-center p-4 rounded-xl glass">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-muted" />
        <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <div className="absolute inset-1 rounded-full border-2 border-accent-cyan border-b-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
      </div>
    </div>
  );
};

export const GlassSkeletonCard = () => {
  return (
    <div className="w-48 p-4 rounded-xl glass">
      <div className="w-full h-20 rounded-lg bg-muted/50 animate-pulse mb-3" />
      <div className="space-y-2">
        <div className="h-3 w-3/4 rounded bg-muted/50 animate-pulse" />
        <div className="h-2 w-1/2 rounded bg-muted/30 animate-pulse" />
      </div>
    </div>
  );
};

export const GlassSkeletonList = () => {
  return (
    <div className="w-56 space-y-2 p-3 rounded-xl glass">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-3 p-2 rounded-lg" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="w-8 h-8 rounded-full bg-muted/50 animate-pulse" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 w-3/4 rounded bg-muted/50 animate-pulse" />
            <div className="h-2 w-1/2 rounded bg-muted/30 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const GlassProgressBar = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 500);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="w-48 space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Loading...</span>
        <span className="text-foreground font-medium">{progress}%</span>
      </div>
      <div className="h-2 rounded-full glass overflow-hidden">
        <div 
          className="h-full rounded-full bg-gradient-to-r from-primary via-accent-cyan to-primary bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export const GlassSpinnerDots = () => {
  return (
    <div className="flex items-center gap-1 p-4 rounded-xl glass">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-primary"
          style={{
            animation: 'pulse 1s ease-in-out infinite',
            animationDelay: `${i * 0.15}s`,
            opacity: 0.4,
          }}
        />
      ))}
    </div>
  );
};

// ============ FORM COMPONENTS ============

export const GlassCheckbox = () => {
  const [checked, setChecked] = useState(false);
  
  return (
    <label className="flex items-center gap-3 px-4 py-3 rounded-xl glass cursor-pointer group hover:bg-primary/5 transition-all duration-200">
      <div 
        onClick={() => setChecked(!checked)}
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
          checked 
            ? 'bg-primary border-primary shadow-glow' 
            : 'border-muted-foreground/50 group-hover:border-primary/50'
        }`}
      >
        {checked && <Check className="w-3 h-3 text-primary-foreground" />}
      </div>
      <span className="text-sm text-foreground">Glass Checkbox</span>
    </label>
  );
};

export const GlassRadioGroup = () => {
  const [selected, setSelected] = useState(0);
  const options = ["Option A", "Option B", "Option C"];
  
  return (
    <div className="flex flex-col gap-2 p-3 rounded-xl glass">
      {options.map((option, i) => (
        <label 
          key={i}
          onClick={() => setSelected(i)}
          className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-muted/30 transition-all duration-200"
        >
          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            selected === i 
              ? 'border-primary' 
              : 'border-muted-foreground/50'
          }`}>
            {selected === i && (
              <div className="w-2 h-2 rounded-full bg-primary shadow-glow" />
            )}
          </div>
          <span className="text-sm text-foreground">{option}</span>
        </label>
      ))}
    </div>
  );
};

export const GlassSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select option");
  const options = ["React", "Vue", "Angular", "Svelte"];
  
  return (
    <div className="relative w-48">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 rounded-xl glass text-sm text-foreground hover:bg-primary/5 transition-all duration-200"
      >
        <span className={selected === "Select option" ? "text-muted-foreground" : "text-foreground"}>
          {selected}
        </span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 p-1.5 rounded-xl bg-popover/95 backdrop-blur-xl border border-border shadow-elevated animate-fade-in z-50">
          {options.map((option, i) => (
            <button
              key={i}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className={`flex items-center w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                selected === option 
                  ? 'bg-primary/20 text-primary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {option}
              {selected === option && <Check className="w-4 h-4 ml-auto" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const GlassDatePicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-3 rounded-xl glass text-sm text-foreground hover:bg-primary/5 transition-all duration-200"
      >
        <CalendarIcon className="w-4 h-4 text-muted-foreground" />
        <span className={selectedDate ? "text-foreground" : "text-muted-foreground"}>
          {selectedDate 
            ? `${today.toLocaleString('default', { month: 'short' })} ${selectedDate}, ${today.getFullYear()}`
            : "Pick a date"
          }
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 p-4 rounded-xl bg-popover/95 backdrop-blur-xl border border-border shadow-elevated animate-scale-in z-50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">
              {today.toLocaleString('default', { month: 'long' })} {today.getFullYear()}
            </span>
            <div className="flex gap-1">
              <button className="p-1 rounded-lg hover:bg-muted transition-colors">
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              </button>
              <button className="p-1 rounded-lg hover:bg-muted transition-colors">
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className="w-8 h-8 flex items-center justify-center text-[10px] text-muted-foreground font-medium">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="w-8 h-8" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => {
                  setSelectedDate(i + 1);
                  setIsOpen(false);
                }}
                className={`w-8 h-8 rounded-lg text-xs transition-all duration-150 ${
                  selectedDate === i + 1
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : i + 1 === today.getDate()
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const GlassSwitch = () => {
  const [isOn, setIsOn] = useState(false);
  
  return (
    <label className="flex items-center gap-3 px-4 py-3 rounded-xl glass cursor-pointer">
      <button 
        onClick={() => setIsOn(!isOn)}
        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
          isOn ? 'bg-primary shadow-glow' : 'bg-muted'
        }`}
      >
        <div 
          className={`absolute top-1 w-4 h-4 rounded-full bg-foreground transition-all duration-300 ${
            isOn ? 'left-7' : 'left-1'
          }`}
        />
      </button>
      <span className="text-sm text-foreground">Glass Switch</span>
    </label>
  );
};

export const GlassTextarea = () => {
  return (
    <textarea
      placeholder="Enter your message..."
      rows={3}
      className="w-48 px-4 py-3 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all duration-200"
    />
  );
};

export const GlassNumberInput = () => {
  const [value, setValue] = useState(5);
  
  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={() => setValue(Math.max(0, value - 1))}
        className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200"
      >
        -
      </button>
      <div className="w-16 h-10 rounded-xl glass flex items-center justify-center text-sm font-medium text-foreground">
        {value}
      </div>
      <button 
        onClick={() => setValue(value + 1)}
        className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200"
      >
        +
      </button>
    </div>
  );
};

// Types for component data
export interface UIComponent {
  id: string;
  name: string;
  category: string;
  preview: ReactNode;
  code: string;
}

// Component library data
export const componentLibrary: UIComponent[] = [
  {
    id: "glass-button",
    name: "Glass Button",
    category: "Buttons",
    preview: <GlassButton />,
    code: `<button className="relative group px-6 py-3 rounded-xl glass overflow-hidden transition-all duration-200 hover:scale-105">
  <span className="relative z-10 font-medium text-sm">Glass Button</span>
  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
</button>`,
  },
  {
    id: "glow-button",
    name: "Glow Button",
    category: "Buttons",
    preview: <GlowButton />,
    code: `<button className="relative px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm overflow-hidden group transition-all duration-300 hover:shadow-glow">
  <span className="relative z-10">Glow Effect</span>
</button>`,
  },
  {
    id: "neon-border",
    name: "Neon Border",
    category: "Buttons",
    preview: <NeonBorderButton />,
    code: `<button className="relative px-6 py-3 rounded-xl bg-background border border-primary/50 font-medium text-sm text-primary hover:border-primary transition-all duration-300 hover:shadow-glow">
  Neon Border
</button>`,
  },
  {
    id: "pulse-button",
    name: "Pulse Button",
    category: "Buttons",
    preview: <PulseButton />,
    code: `<button className="relative px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm">
  <span className="relative z-10">Pulse</span>
  <div className="absolute inset-0 rounded-xl bg-primary animate-glow-pulse" />
</button>`,
  },
  {
    id: "gradient-border",
    name: "Gradient Border",
    category: "Buttons",
    preview: <GradientBorder />,
    code: `<div className="relative p-[1px] rounded-xl bg-gradient-to-r from-primary via-accent-purple to-accent-cyan overflow-hidden group">
  <div className="px-6 py-3 rounded-[11px] bg-background text-sm font-medium group-hover:bg-transparent transition-colors duration-300">
    Gradient Border
  </div>
</div>`,
  },
  {
    id: "icon-button",
    name: "Icon Button",
    category: "Buttons",
    preview: <IconButton />,
    code: `<button className="p-3 rounded-xl glass group hover:bg-primary/10 transition-all duration-200">
  <PlusIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
</button>`,
  },
  {
    id: "glass-card",
    name: "Glass Card",
    category: "Cards",
    preview: <GlassCard />,
    code: `<div className="w-48 p-4 rounded-xl glass group hover:scale-[1.02] transition-all duration-200">
  <div className="w-full h-20 rounded-lg bg-gradient-to-br from-primary/20 to-accent-purple/20 mb-3" />
  <div className="h-3 w-3/4 rounded bg-muted mb-2" />
  <div className="h-2 w-1/2 rounded bg-muted/50" />
</div>`,
  },
  {
    id: "floating-card",
    name: "Floating Card",
    category: "Cards",
    preview: <FloatingCard />,
    code: `<div className="w-40 p-4 rounded-xl glass float">
  <div className="flex items-center gap-2 mb-2">
    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent-indigo to-accent-cyan" />
    <span className="text-xs font-medium">Floating</span>
  </div>
  <div className="h-2 w-full rounded bg-muted/50" />
</div>`,
  },
  {
    id: "shimmer-card",
    name: "Shimmer Card",
    category: "Cards",
    preview: <ShimmerCard />,
    code: `<div className="w-48 p-4 rounded-xl glass">
  <div className="w-full h-16 rounded-lg shimmer mb-3" />
  <div className="h-3 w-3/4 rounded shimmer mb-2" />
  <div className="h-2 w-1/2 rounded shimmer" />
</div>`,
  },
  {
    id: "glass-notification",
    name: "Notification",
    category: "Cards",
    preview: <GlassNotification />,
    code: `<div className="flex items-start gap-3 w-64 p-4 rounded-xl glass animate-fade-in">
  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center">
    <Zap className="w-5 h-5 text-primary-foreground" />
  </div>
  <div className="flex-1">
    <p className="text-sm font-medium">New Update</p>
    <p className="text-xs text-muted-foreground">Your component has been updated.</p>
  </div>
</div>`,
  },
  {
    id: "glass-avatar",
    name: "Avatar Card",
    category: "Cards",
    preview: <GlassAvatar />,
    code: `<div className="flex items-center gap-3 px-4 py-3 rounded-xl glass group hover:scale-[1.02] transition-all">
  <div className="relative">
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent-cyan" />
    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-accent-green border-2 border-background" />
  </div>
  <div>
    <p className="text-sm font-medium">Alex Chen</p>
    <p className="text-xs text-muted-foreground">Online</p>
  </div>
</div>`,
  },
  {
    id: "glass-input",
    name: "Glass Input",
    category: "Inputs",
    preview: <GlassInput />,
    code: `<input
  type="text"
  placeholder="Glass Input..."
  className="w-48 px-4 py-3 rounded-xl glass text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
/>`,
  },
  {
    id: "animated-toggle",
    name: "Animated Toggle",
    category: "Inputs",
    preview: <AnimatedToggle />,
    code: `<button className="relative w-14 h-8 rounded-full bg-muted p-1 group">
  <div className="absolute left-1 top-1 w-6 h-6 rounded-full bg-primary shadow-glow transition-transform duration-300 group-hover:translate-x-6" />
</button>`,
  },
  {
    id: "glass-progress",
    name: "Progress Bar",
    category: "Inputs",
    preview: <GlassProgress />,
    code: `<div className="w-48 space-y-2">
  <div className="flex justify-between text-xs">
    <span className="text-muted-foreground">Progress</span>
    <span className="font-medium">75%</span>
  </div>
  <div className="h-2 rounded-full glass overflow-hidden">
    <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent-cyan" style={{ width: '75%' }} />
  </div>
</div>`,
  },
  {
    id: "glass-slider",
    name: "Slider",
    category: "Inputs",
    preview: <GlassSlider />,
    code: `<div className="w-48 space-y-3">
  <div className="flex justify-between text-xs">
    <span className="text-muted-foreground">Volume</span>
    <span className="font-medium">80%</span>
  </div>
  <div className="relative h-2 rounded-full glass">
    <div className="absolute left-0 h-full rounded-full bg-primary" style={{ width: '80%' }} />
    <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary shadow-glow" style={{ left: 'calc(80% - 8px)' }} />
  </div>
</div>`,
  },
  {
    id: "glass-badge",
    name: "Glass Badge",
    category: "Badges",
    preview: <GlassBadge />,
    code: `<span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium">
  <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
  Active
</span>`,
  },
  {
    id: "glass-modal",
    name: "Glass Modal",
    category: "Modals",
    preview: <GlassModal />,
    code: `<div className="w-56 p-4 rounded-xl bg-popover/95 backdrop-blur-xl border border-border shadow-elevated animate-scale-in">
  <div className="flex items-center justify-between mb-3">
    <span className="font-medium text-sm">Glass Modal</span>
    <button className="p-1 rounded-lg hover:bg-muted"><X className="w-3 h-3" /></button>
  </div>
  <p className="text-xs text-muted-foreground mb-3">A beautiful modal with glass effect.</p>
  <div className="flex gap-2">
    <button className="flex-1 px-3 py-1.5 rounded-lg bg-muted text-xs">Cancel</button>
    <button className="flex-1 px-3 py-1.5 rounded-lg bg-primary text-xs text-primary-foreground">Confirm</button>
  </div>
</div>`,
  },
  {
    id: "glass-tooltip",
    name: "Glass Tooltip",
    category: "Tooltips",
    preview: <GlassTooltip />,
    code: `<div className="relative group">
  <button className="px-4 py-2 rounded-xl glass text-sm font-medium">Hover Me</button>
  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg bg-popover/95 backdrop-blur-xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
    <span className="text-xs">Glass Tooltip</span>
  </div>
</div>`,
  },
  {
    id: "glass-dropdown",
    name: "Dropdown Menu",
    category: "Dropdowns",
    preview: <GlassDropdown />,
    code: `<div className="relative">
  <button className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm font-medium">
    Dropdown <ChevronDown className="w-4 h-4" />
  </button>
  <div className="absolute top-full left-0 mt-2 w-48 p-2 rounded-xl bg-popover/95 backdrop-blur-xl border border-border shadow-elevated">
    <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm hover:bg-muted/50">
      <Home className="w-4 h-4" /> Dashboard
    </button>
  </div>
</div>`,
  },
  {
    id: "glass-context-menu",
    name: "Context Menu",
    category: "Dropdowns",
    preview: <GlassContextMenu />,
    code: `<div className="w-44 p-1.5 rounded-xl bg-popover/95 backdrop-blur-xl border border-border shadow-elevated">
  <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm hover:bg-muted/50">
    <Star className="w-4 h-4" /> Add to favorites
  </button>
  <div className="my-1 h-px bg-border" />
  <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10">
    <X className="w-4 h-4" /> Delete
  </button>
</div>`,
  },
  {
    id: "glass-navbar",
    name: "Icon Navbar",
    category: "Navigation",
    preview: <GlassNavbar />,
    code: `<nav className="flex items-center gap-1 p-1.5 rounded-xl glass">
  <button className="p-2.5 rounded-lg bg-primary/20 text-primary shadow-glow">
    <Home className="w-4 h-4" />
  </button>
  <button className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50">
    <Search className="w-4 h-4" />
  </button>
</nav>`,
  },
  {
    id: "glass-tabs",
    name: "Glass Tabs",
    category: "Navigation",
    preview: <GlassTabs />,
    code: `<div className="flex items-center gap-1 p-1 rounded-xl glass">
  <button className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground shadow-glow">
    Overview
  </button>
  <button className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30">
    Features
  </button>
</div>`,
  },
  {
    id: "glass-breadcrumb",
    name: "Breadcrumb",
    category: "Navigation",
    preview: <GlassBreadcrumb />,
    code: `<div className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm">
  <a href="#" className="text-muted-foreground hover:text-primary">Home</a>
  <span className="text-muted-foreground/50">/</span>
  <a href="#" className="text-muted-foreground hover:text-primary">Products</a>
  <span className="text-muted-foreground/50">/</span>
  <span className="text-foreground font-medium">Details</span>
</div>`,
  },
  {
    id: "glass-sidebar",
    name: "Sidebar Menu",
    category: "Navigation",
    preview: <GlassSidebar />,
    code: `<div className="flex flex-col gap-1 w-48 p-2 rounded-xl glass">
  <button className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm bg-primary/20 text-primary">
    <span className="flex items-center gap-3"><Home className="w-4 h-4" /> Dashboard</span>
  </button>
  <button className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted/30">
    <span className="flex items-center gap-3"><MessageCircle className="w-4 h-4" /> Messages</span>
    <span className="px-1.5 py-0.5 rounded-full bg-primary text-[10px] text-primary-foreground">3</span>
  </button>
</div>`,
  },
  {
    id: "glass-command",
    name: "Command Palette",
    category: "Navigation",
    preview: <GlassCommandPalette />,
    code: `<div className="w-72 rounded-xl bg-popover/95 backdrop-blur-xl border border-border shadow-elevated overflow-hidden">
  <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
    <Search className="w-4 h-4 text-muted-foreground" />
    <input placeholder="Search commands..." className="flex-1 bg-transparent text-sm focus:outline-none" />
    <span className="px-1.5 py-0.5 rounded text-[10px] bg-muted">ESC</span>
  </div>
  <div className="p-2">
    <button className="flex items-center justify-between w-full px-2 py-2 rounded-lg text-sm hover:bg-muted/50">
      <span className="flex items-center gap-3"><Home className="w-4 h-4" /> Go to Dashboard</span>
      <span className="text-xs text-muted-foreground">⌘D</span>
    </button>
  </div>
</div>`,
  },
  {
    id: "glass-accordion",
    name: "Accordion",
    category: "Navigation",
    preview: <GlassAccordion />,
    code: `<div className="w-56 rounded-xl glass overflow-hidden">
  <button className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium hover:bg-muted/30">
    <span className="flex items-center gap-2"><Layers className="w-4 h-4 text-primary" /> Accordion Item</span>
    <ChevronDown className="w-4 h-4" />
  </button>
  <div className="px-4 pb-3 text-xs text-muted-foreground">
    This is the accordion content with glass morphism styling.
  </div>
</div>`,
  },
  // ============ LOADING COMPONENTS ============
  {
    id: "glass-spinner",
    name: "Glass Spinner",
    category: "Loaders",
    preview: <GlassSpinner />,
    code: `<div className="flex items-center justify-center p-4 rounded-xl glass">
  <div className="relative">
    <Loader2 className="w-8 h-8 text-primary animate-spin" />
    <div className="absolute inset-0 w-8 h-8 rounded-full bg-primary/20 blur-md animate-pulse" />
  </div>
</div>`,
  },
  {
    id: "glass-pulse-loader",
    name: "Pulse Loader",
    category: "Loaders",
    preview: <GlassPulseLoader />,
    code: `<div className="flex items-center gap-2 p-4 rounded-xl glass">
  {[0, 1, 2].map((i) => (
    <div key={i} className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: \`\${i * 0.15}s\` }} />
  ))}
</div>`,
  },
  {
    id: "glass-ring-loader",
    name: "Ring Loader",
    category: "Loaders",
    preview: <GlassRingLoader />,
    code: `<div className="flex items-center justify-center p-4 rounded-xl glass">
  <div className="relative w-10 h-10">
    <div className="absolute inset-0 rounded-full border-2 border-muted" />
    <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    <div className="absolute inset-1 rounded-full border-2 border-accent-cyan border-b-transparent animate-spin" style={{ animationDirection: 'reverse' }} />
  </div>
</div>`,
  },
  {
    id: "glass-skeleton-card",
    name: "Skeleton Card",
    category: "Loaders",
    preview: <GlassSkeletonCard />,
    code: `<div className="w-48 p-4 rounded-xl glass">
  <div className="w-full h-20 rounded-lg bg-muted/50 animate-pulse mb-3" />
  <div className="space-y-2">
    <div className="h-3 w-3/4 rounded bg-muted/50 animate-pulse" />
    <div className="h-2 w-1/2 rounded bg-muted/30 animate-pulse" />
  </div>
</div>`,
  },
  {
    id: "glass-skeleton-list",
    name: "Skeleton List",
    category: "Loaders",
    preview: <GlassSkeletonList />,
    code: `<div className="w-56 space-y-2 p-3 rounded-xl glass">
  {[0, 1, 2].map((i) => (
    <div key={i} className="flex items-center gap-3 p-2 rounded-lg">
      <div className="w-8 h-8 rounded-full bg-muted/50 animate-pulse" />
      <div className="flex-1 space-y-1.5">
        <div className="h-2.5 w-3/4 rounded bg-muted/50 animate-pulse" />
        <div className="h-2 w-1/2 rounded bg-muted/30 animate-pulse" />
      </div>
    </div>
  ))}
</div>`,
  },
  {
    id: "glass-progress-bar",
    name: "Animated Progress",
    category: "Loaders",
    preview: <GlassProgressBar />,
    code: `<div className="w-48 space-y-2">
  <div className="flex justify-between text-xs">
    <span className="text-muted-foreground">Loading...</span>
    <span className="font-medium">75%</span>
  </div>
  <div className="h-2 rounded-full glass overflow-hidden">
    <div className="h-full rounded-full bg-gradient-to-r from-primary via-accent-cyan to-primary bg-[length:200%_100%] animate-shimmer" style={{ width: '75%' }} />
  </div>
</div>`,
  },
  {
    id: "glass-spinner-dots",
    name: "Dot Spinner",
    category: "Loaders",
    preview: <GlassSpinnerDots />,
    code: `<div className="flex items-center gap-1 p-4 rounded-xl glass">
  {[0, 1, 2, 3].map((i) => (
    <div key={i} className="w-2 h-2 rounded-full bg-primary" style={{ animation: 'pulse 1s infinite', animationDelay: \`\${i * 0.15}s\` }} />
  ))}
</div>`,
  },
  // ============ FORM COMPONENTS ============
  {
    id: "glass-checkbox",
    name: "Glass Checkbox",
    category: "Forms",
    preview: <GlassCheckbox />,
    code: `<label className="flex items-center gap-3 px-4 py-3 rounded-xl glass cursor-pointer group">
  <div className="w-5 h-5 rounded-md border-2 border-primary bg-primary flex items-center justify-center shadow-glow">
    <Check className="w-3 h-3 text-primary-foreground" />
  </div>
  <span className="text-sm">Glass Checkbox</span>
</label>`,
  },
  {
    id: "glass-radio-group",
    name: "Radio Group",
    category: "Forms",
    preview: <GlassRadioGroup />,
    code: `<div className="flex flex-col gap-2 p-3 rounded-xl glass">
  <label className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-muted/30">
    <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
      <div className="w-2 h-2 rounded-full bg-primary shadow-glow" />
    </div>
    <span className="text-sm">Option A</span>
  </label>
</div>`,
  },
  {
    id: "glass-select",
    name: "Select Dropdown",
    category: "Forms",
    preview: <GlassSelect />,
    code: `<div className="relative w-48">
  <button className="flex items-center justify-between w-full px-4 py-3 rounded-xl glass text-sm">
    <span>Select option</span>
    <ChevronDown className="w-4 h-4" />
  </button>
  <div className="absolute top-full left-0 right-0 mt-2 p-1.5 rounded-xl bg-popover/95 backdrop-blur-xl border border-border shadow-elevated">
    <button className="flex items-center w-full px-3 py-2 rounded-lg text-sm hover:bg-muted/50">React</button>
  </div>
</div>`,
  },
  {
    id: "glass-datepicker",
    name: "Date Picker",
    category: "Forms",
    preview: <GlassDatePicker />,
    code: `<button className="flex items-center gap-3 px-4 py-3 rounded-xl glass text-sm">
  <CalendarIcon className="w-4 h-4 text-muted-foreground" />
  <span>Pick a date</span>
</button>`,
  },
  {
    id: "glass-switch",
    name: "Glass Switch",
    category: "Forms",
    preview: <GlassSwitch />,
    code: `<label className="flex items-center gap-3 px-4 py-3 rounded-xl glass cursor-pointer">
  <button className="relative w-12 h-6 rounded-full bg-primary shadow-glow">
    <div className="absolute top-1 left-7 w-4 h-4 rounded-full bg-foreground" />
  </button>
  <span className="text-sm">Glass Switch</span>
</label>`,
  },
  {
    id: "glass-textarea",
    name: "Glass Textarea",
    category: "Forms",
    preview: <GlassTextarea />,
    code: `<textarea
  placeholder="Enter your message..."
  rows={3}
  className="w-48 px-4 py-3 rounded-xl glass text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
/>`,
  },
  {
    id: "glass-number-input",
    name: "Number Input",
    category: "Forms",
    preview: <GlassNumberInput />,
    code: `<div className="flex items-center gap-2">
  <button className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-primary/10">-</button>
  <div className="w-16 h-10 rounded-xl glass flex items-center justify-center text-sm font-medium">5</div>
  <button className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-primary/10">+</button>
</div>`,
  },
];

export const categories = ["All", "Buttons", "Cards", "Inputs", "Badges", "Modals", "Tooltips", "Dropdowns", "Navigation", "Loaders", "Forms"];
