import { useState, useEffect, useCallback } from "react";
import { Search, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { UIComponentWithPreview } from "@/lib/api/types";

interface SearchCommandPaletteProps {
  components: UIComponentWithPreview[];
  isOpen: boolean;
  onClose: () => void;
  onSelectComponent: (component: UIComponentWithPreview) => void;
}

export const SearchCommandPalette = ({
  components,
  isOpen,
  onClose,
  onSelectComponent,
}: SearchCommandPaletteProps) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredComponents = components.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredComponents.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredComponents.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (filteredComponents[selectedIndex]) {
            onSelectComponent(filteredComponents[selectedIndex]);
            onClose();
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    },
    [isOpen, filteredComponents, selectedIndex, onSelectComponent, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Command Palette */}
      <div className="relative w-full max-w-lg mx-4 rounded-2xl bg-popover/95 backdrop-blur-xl border border-border shadow-elevated animate-scale-in overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search components..."
            className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
            autoFocus
          />
          <div className="flex items-center gap-1.5">
            <kbd className="px-2 py-1 rounded-md bg-muted text-[11px] text-muted-foreground font-mono">
              ESC
            </kbd>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto p-2">
          {filteredComponents.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No components found for "{query}"
            </div>
          ) : (
            <>
              <div className="px-2 py-1.5 text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                Components ({filteredComponents.length})
              </div>
              {filteredComponents.map((component, index) => (
                <button
                  key={component.id}
                  onClick={() => {
                    onSelectComponent(component);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-150",
                    selectedIndex === index
                      ? "bg-primary/20 text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                      <Command className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{component.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {component.category}
                      </div>
                    </div>
                  </span>
                  <span className="text-xs text-muted-foreground">↵</span>
                </button>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">↵</kbd>
              <span>Select</span>
            </span>
          </div>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">⌘</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">K</kbd>
            <span>Toggle</span>
          </span>
        </div>
      </div>
    </div>
  );
};
