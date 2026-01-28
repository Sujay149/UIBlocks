import { useState } from "react";
import { X, Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateComponentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const CreateComponentModal = ({ isOpen, onClose, onSuccess }: CreateComponentModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    code: "",
    preview: "",
    createdBy: "",
    tags: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  // Comprehensive list of all categories (using Set to ensure no duplicates)
  const categories = Array.from(new Set([
    "Alerts",
    "Avatars",
    "Accordions",
    "Badges", 
    "Breadcrumbs",
    "Buttons", 
    "Calendar",
    "Cards", 
    "Carousel",
    "Charts",
    "Checkbox",
    "CTA",
    "Date Picker",
    "Dialogs",
    "Drawers",
    "Dropdown",
    "Features",
    "File Upload",
    "Footers",
    "Forms", 
    "Graphs",
    "Headers",
    "Hero Sections",
    "Inputs", 
    "Layouts", 
    "Loaders",
    "Maps",
    "Menus",
    "Modals", 
    "Navigation", 
    "Pagination",
    "Popover",
    "Pricing",
    "Progress Bars",
    "Radio",
    "Search",
    "Select",
    "Sidebars",
    "Skeletons",
    "Sliders",
    "Spinners",
    "Stats",
    "Switch",
    "Tables", 
    "Tabs",
    "Timeline",
    "Toast",
    "Toggle",
    "Tooltips",
    "Typography",
    "Other"
  ])).sort();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Convert tags string to array
      const tags = formData.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const componentData = {
        name: formData.name,
        category: formData.category,
        code: formData.code,
        preview: formData.preview,
        createdBy: formData.createdBy || "Anonymous",
        tags
      };

      const response = await fetch("http://localhost:3001/api/components", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(componentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create component");
      }

      // Reset form
      setFormData({
        name: "",
        category: "",
        code: "",
        preview: "",
        createdBy: "",
        tags: ""
      });

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }

      // Close modal
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 py-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={cn(
        "relative w-full max-w-2xl max-h-[90vh] overflow-y-auto",
        "glass rounded-3xl p-8 shadow-card",
        "animate-in fade-in-0 zoom-in-95 duration-200"
      )}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent-purple mb-4">
            <Plus className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-foreground">Create Component</span>
          </h1>
          <p className="text-muted-foreground">Share your component with the community</p>
        </div>

        {/* Instructions */}
        <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-2 text-sm">
              <p className="font-medium text-foreground">Quick Tips:</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• <strong>Preview Name</strong> must match an exported component from SampleComponents.tsx (e.g., GlassButton, GlassCard)</li>
                <li>• Use <strong>PascalCase</strong> for preview names (MyComponent, not my-component)</li>
                <li>• Available previews: GlassButton, GlowButton, GlassCard, FloatingCard, ShimmerCard, GradientCard, GlassInput, GlassBadge, and more</li>
                <li>• Your component code will be displayed when users click "View"</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Component Name & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Component Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Glass Button"
                className="w-full px-4 py-3 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium text-foreground">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl glass text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 bg-transparent"
                required
              >
                <option value="" className="bg-background text-foreground">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat.toLowerCase().replace(/\s+/g, '-')} className="bg-background text-foreground py-2">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Creator Name & Tags */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="createdBy" className="text-sm font-medium text-foreground">
                Your Name (optional)
              </label>
              <input
                id="createdBy"
                name="createdBy"
                type="text"
                value={formData.createdBy}
                onChange={handleChange}
                placeholder="Anonymous"
                className="w-full px-4 py-3 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium text-foreground">
                Tags (comma-separated)
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g., glass, animated, modern"
                className="w-full px-4 py-3 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
              />
            </div>
          </div>

          {/* Preview Component */}
          <div className="space-y-2">
            <label htmlFor="preview" className="text-sm font-medium text-foreground">
              Preview Component Name *
            </label>
            <input
              id="preview"
              name="preview"
              type="text"
              value={formData.preview}
              onChange={handleChange}
              placeholder="e.g., GlassButton, GlassCard, FloatingCard"
              className="w-full px-4 py-3 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
              required
            />
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                ⚠️ Must exactly match an exported component name from SampleComponents.tsx (PascalCase)
              </p>
              <details className="text-xs">
                <summary className="text-primary cursor-pointer hover:underline">Available preview components</summary>
                <div className="mt-2 p-3 rounded-lg bg-background/50 space-y-1 text-muted-foreground">
                  <p><strong>Buttons:</strong> GlassButton, GlowButton, NeonBorderButton, PulseButton, IconButton, GradientBorder</p>
                  <p><strong>Cards:</strong> GlassCard, FloatingCard, ShimmerCard, GradientCard</p>
                  <p><strong>Inputs:</strong> GlassInput</p>
                  <p><strong>Badges:</strong> GlassBadge</p>
                  <p><strong>Other:</strong> AnimatedToggle, GlassAlert</p>
                </div>
              </details>
            </div>
          </div>

          {/* Code */}
          <div className="space-y-2">
            <label htmlFor="code" className="text-sm font-medium text-foreground">
              Component Code *
            </label>
            <textarea
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Paste your React component code here..."
              rows={6}
              className="w-full px-4 py-3 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 font-mono resize-y"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create Component"}
          </button>
        </form>
      </div>
    </div>
  );
};
