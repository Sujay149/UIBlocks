import { cn } from "@/lib/utils";
import { X, Copy, Check, Code, Sliders, Info } from "lucide-react";
import { useState, ReactNode } from "react";

interface ComponentModalProps {
  isOpen: boolean;
  onClose: () => void;
  component: {
    name: string;
    category: string;
    preview: ReactNode;
    code: string;
  } | null;
}

export const ComponentModal = ({
  isOpen,
  onClose,
  component,
}: ComponentModalProps) => {
  const [activeTab, setActiveTab] = useState<"code" | "customize" | "info">("code");
  const [copied, setCopied] = useState(false);

  if (!isOpen || !component) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(component.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl animate-fade-in" />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative w-full max-w-4xl max-h-[90vh] overflow-hidden",
          "glass-heavy rounded-2xl shadow-elevated",
          "animate-scale-in"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{component.name}</h2>
            <span className="text-sm text-muted-foreground">{component.category}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Preview Section */}
        <div className="relative h-64 flex items-center justify-center bg-gradient-to-br from-surface-dark to-background">
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                               linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />
          <div className="relative z-10 scale-125">
            {component.preview}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 p-4 border-b border-border/50">
          <TabButton
            active={activeTab === "code"}
            onClick={() => setActiveTab("code")}
            icon={<Code className="w-4 h-4" />}
          >
            Code
          </TabButton>
          <TabButton
            active={activeTab === "customize"}
            onClick={() => setActiveTab("customize")}
            icon={<Sliders className="w-4 h-4" />}
          >
            Customize
          </TabButton>
          <TabButton
            active={activeTab === "info"}
            onClick={() => setActiveTab("info")}
            icon={<Info className="w-4 h-4" />}
          >
            Info
          </TabButton>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-64 overflow-auto scrollbar-glass">
          {activeTab === "code" && (
            <div className="relative">
              <button
                onClick={handleCopy}
                className={cn(
                  "absolute top-3 right-3 p-2 rounded-lg",
                  "glass hover:bg-primary/10 transition-all duration-200",
                  copied && "text-accent-green copy-success"
                )}
                aria-label="Copy code"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
              <pre className="glass rounded-xl p-4 overflow-x-auto font-mono text-sm">
                <code className="text-muted-foreground">{component.code}</code>
              </pre>
            </div>
          )}

          {activeTab === "customize" && (
            <div className="space-y-6">
              <CustomizeControl label="Accent Color">
                <div className="flex gap-2">
                  {["indigo", "cyan", "purple", "green"].map((color) => (
                    <button
                      key={color}
                      className={cn(
                        "w-8 h-8 rounded-lg transition-all duration-200 hover:scale-110",
                        color === "indigo" && "bg-accent-indigo ring-2 ring-primary/50",
                        color === "cyan" && "bg-accent-cyan",
                        color === "purple" && "bg-accent-purple",
                        color === "green" && "bg-accent-green"
                      )}
                      aria-label={`Select ${color}`}
                    />
                  ))}
                </div>
              </CustomizeControl>

              <CustomizeControl label="Animation Speed">
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  defaultValue="1"
                  className="w-full accent-primary"
                />
              </CustomizeControl>

              <CustomizeControl label="Border Radius">
                <div className="flex gap-2">
                  {["sm", "md", "lg", "full"].map((radius) => (
                    <button
                      key={radius}
                      className={cn(
                        "px-3 py-1.5 text-sm glass rounded-lg transition-all duration-200",
                        radius === "lg" && "bg-primary/20 text-primary"
                      )}
                    >
                      {radius}
                    </button>
                  ))}
                </div>
              </CustomizeControl>
            </div>
          )}

          {activeTab === "info" && (
            <div className="space-y-4 text-muted-foreground">
              <p>A beautiful, glass-styled component with smooth animations and hover effects.</p>
              <div className="flex flex-wrap gap-2">
                <span className="pill-glass text-xs">React</span>
                <span className="pill-glass text-xs">Tailwind CSS</span>
                <span className="pill-glass text-xs">Glassmorphism</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface TabButtonProps {
  children: ReactNode;
  icon: ReactNode;
  active: boolean;
  onClick: () => void;
}

const TabButton = ({ children, icon, active, onClick }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
      active
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
    )}
  >
    {icon}
    {children}
  </button>
);

interface CustomizeControlProps {
  label: string;
  children: ReactNode;
}

const CustomizeControl = ({ label, children }: CustomizeControlProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-foreground">{label}</label>
    {children}
  </div>
);
