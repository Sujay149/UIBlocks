import { cn } from "@/lib/utils";

interface CategoryPillsProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
  className?: string;
}

export const CategoryPills = ({
  categories,
  activeCategory,
  onSelect,
  className,
}: CategoryPillsProps) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            "pill-glass",
            activeCategory === category && "pill-active"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
