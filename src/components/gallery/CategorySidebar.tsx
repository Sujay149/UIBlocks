import { cn } from "@/lib/utils";
import { 
  Sparkles, 
  MousePointerClick, 
  CreditCard, 
  Type, 
  Tag, 
  Box, 
  Navigation, 
  AlertCircle, 
  FormInput, 
  Table2, 
  Layout, 
  Image as ImageIcon,
  Loader2Icon,
  BarChart3,
  Calendar,
  Clock,
  FileText,
  Grid3x3,
  MapPin,
  Menu,
  ChevronRight,
  Users,
  Trophy,
  DollarSign,
  TrendingUp,
  Search,
  Upload,
  Settings,
  ToggleLeft,
  Radio,
  CheckSquare,
  List,
  Circle,
  Square,
  Layers,
  PanelLeftClose,
  MessageSquare,
  Bell,
  CircleDot,
  SlidersHorizontal,
  Info,
  Heart
} from "lucide-react";

interface CategorySidebarProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
  className?: string;
}

// Map categories to icons
const getCategoryIcon = (category: string) => {
  const normalizedCategory = category.toLowerCase();
  
  const iconMap: Record<string, any> = {
    all: Sparkles,
    buttons: MousePointerClick,
    cards: CreditCard,
    inputs: FormInput,
    badges: Tag,
    modals: Box,
    navigation: Navigation,
    alerts: AlertCircle,
    forms: FileText,
    tables: Table2,
    layouts: Layout,
    typography: Type,
    carousel: Image,
    toast: Bell,
    loaders: Loader2Icon,
    spinners: CircleDot,
    "progress-bars": BarChart3,
    tabs: Grid3x3,
    accordions: ChevronRight,
    tooltips: Info,
    popover: MessageSquare,
    dropdown: Menu,
    menus: List,
    breadcrumbs: ChevronRight,
    pagination: CircleDot,
    sliders: SlidersHorizontal,
    toggle: ToggleLeft,
    switch: ToggleLeft,
    radio: Radio,
    checkbox: CheckSquare,
    select: List,
    avatars: Users,
    skeletons: Circle,
    dialogs: Box,
    drawers: PanelLeftClose,
    sidebars: PanelLeftClose,
    headers: Layout,
    footers: Layout,
    "hero-sections": Trophy,
    cta: Heart,
    testimonials: Users,
    pricing: DollarSign,
    stats: TrendingUp,
    features: Sparkles,
    timeline: Clock,
    calendar: Calendar,
    "date-picker": Calendar,
    "file-upload": Upload,
    search: Search,
    charts: BarChart3,
    graphs: BarChart3,
    maps: MapPin,
    other: Settings
  };

  return iconMap[normalizedCategory] || Box;
};

export const CategorySidebar = ({
  categories,
  activeCategory,
  onSelect,
  className,
}: CategorySidebarProps) => {
  return (
    <aside className={cn("w-56 flex-shrink-0", className)}>
      <div className="sticky top-20 bg-[#0a0a0a] border-r border-border/50 h-[calc(100vh-5rem)] p-3">
        <nav className="space-y-1 h-full overflow-y-auto custom-scrollbar">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category);
            const isActive = activeCategory === category;
            
            return (
              <button
                key={category}
                onClick={() => onSelect(category)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-[#1a1a1a] text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-[#151515]"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1 text-left">{category}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
