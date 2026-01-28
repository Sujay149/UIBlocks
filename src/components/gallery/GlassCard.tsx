import { cn } from "@/lib/utils";
import { Copy, Check, Trash2, Edit } from "lucide-react";
import { useState, ReactNode } from "react";
import { useAdmin } from "@/contexts/AdminContext";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const GlassCard = ({
  children,
  className,
  onClick,
  hoverable = true,
}: GlassCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-xl glass noise",
        "transition-all duration-200 ease-out",
        hoverable && "cursor-pointer card-hover",
        className
      )}
    >
      {children}
    </div>
  );
};

interface ComponentPreviewCardProps {
  name: string;
  category: string;
  preview: ReactNode;
  onView: () => void;
  onCopy: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ComponentPreviewCard = ({
  name,
  category,
  preview,
  onView,
  onCopy,
  onEdit,
  onDelete,
}: ComponentPreviewCardProps) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { isAdmin } = useAdmin();

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <GlassCard
      onClick={onView}
      className={cn(
        "group",
        isHovered && "ring-1 ring-primary/30"
      )}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative"
      >
        {/* Preview Area */}
        <div className="relative h-48 flex items-center justify-center p-6 bg-gradient-to-br from-surface-dark to-background overflow-hidden">
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                               linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />
          
          {/* The preview component */}
          <div className={cn(
            "relative z-10 transition-transform duration-200",
            isHovered && "scale-105"
          )}>
            {preview}
          </div>

          {/* Glow effect on hover */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 transition-opacity duration-300",
            isHovered && "opacity-100"
          )} />
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-between p-4 border-t border-border/50">
          <div>
            <h3 className="font-medium text-sm text-foreground">{name}</h3>
            <span className="text-xs text-muted-foreground">{category}</span>
          </div>

          <div className="flex items-center gap-1">
            {isAdmin && onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="p-2 rounded-lg transition-all duration-200 hover:bg-blue-500/10 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                aria-label="Edit component"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
            {isAdmin && onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
                    onDelete();
                  }
                }}
                className="p-2 rounded-lg transition-all duration-200 hover:bg-red-500/10 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                aria-label="Delete component"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleCopy}
              className={cn(
                "p-2 rounded-lg transition-all duration-200",
                "hover:bg-primary/10 hover:text-primary",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                copied && "text-accent-green copy-success"
              )}
              aria-label={copied ? "Copied!" : "Copy code"}
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
