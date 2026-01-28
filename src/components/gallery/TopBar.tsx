import { cn } from "@/lib/utils";
import { Sparkles, Search, Plus, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";

interface TopBarProps {
  className?: string;
  onSearchClick?: () => void;
  onLoginClick?: () => void;
  onCreateClick?: () => void;
}

export const TopBar = ({ className, onSearchClick, onLoginClick, onCreateClick }: TopBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, logout } = useAdmin();

  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick();
    } else {
      // Trigger ⌘K shortcut programmatically
      const event = new KeyboardEvent("keydown", {
        key: "k",
        metaKey: true,
        bubbles: true,
      });
      document.dispatchEvent(event);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "px-6 py-4",
        className
      )}
    >
      <nav className="max-w-7xl mx-auto">
        <div className="px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => navigate("/")} className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-primary/50 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            </div>
            <span className="font-semibold text-lg">
              <span className="text-foreground">UI</span>
              <span className="gradient-text">Blocks</span>
            </span>
          </button>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <NavItem 
              onClick={() => navigate("/")} 
              active={location.pathname === "/"}
            >
              Home
            </NavItem>
            <NavItem 
              onClick={() => navigate("/components")} 
              active={location.pathname === "/components"}
            >
              Components
            </NavItem>
            {!isAdmin ? (
              <NavItem onClick={onLoginClick}>
                Login
              </NavItem>
            ) : (
              <NavItem onClick={logout}>
                <LogOut className="w-3.5 h-3.5 mr-1 inline" />
                Logout
              </NavItem>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {onCreateClick && (
              <button
                onClick={onCreateClick}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-all duration-200 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Create</span>
              </button>
            )}
            <button 
              onClick={handleSearchClick}
              className="pill-glass flex items-center gap-2 hover:bg-primary/10 transition-all duration-200"
            >
              <Search className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-muted-foreground text-sm hidden sm:inline">Search...</span>
              <span className="text-muted-foreground text-xs font-mono">⌘K</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

interface NavItemProps {
  onClick: () => void;
  children: React.ReactNode;
  active?: boolean;
}

const NavItem = ({ onClick, children, active }: NavItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
        active
          ? "text-primary bg-primary/10"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
      )}
    >
      {children}
    </button>
  );
};
