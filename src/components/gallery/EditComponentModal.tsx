import { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditComponentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  component: {
    id: string | number;
    name: string;
    category: string;
    code: string;
    preview: string;
    tags?: string[];
  };
}

export const EditComponentModal = ({ isOpen, onClose, onSuccess, component }: EditComponentModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    code: "",
    preview: "",
    tags: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (component) {
      setFormData({
        name: component.name,
        category: component.category,
        code: component.code,
        preview: component.preview,
        tags: component.tags?.join(", ") || ""
      });
    }
  }, [component]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const tags = formData.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const updateData = {
        name: formData.name,
        category: formData.category,
        code: formData.code,
        preview: formData.preview,
        tags
      };

      const response = await fetch(`http://localhost:3001/api/components/${component.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update component");
      }

      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 overflow-y-auto py-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={cn(
        "relative w-full max-w-2xl my-auto",
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
            <Save className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-foreground">Edit Component</span>
          </h1>
          <p className="text-muted-foreground">Update component details</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Component Name */}
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
              className="w-full px-4 py-3 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium text-foreground">
              Category *
            </label>
            <input
              id="category"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
              required
            />
          </div>

          {/* Tags */}
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
              className="w-full px-4 py-3 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
            />
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
              className="w-full px-4 py-3 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
              required
            />
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
              rows={10}
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
            {isSubmitting ? "Updating..." : "Update Component"}
          </button>
        </form>
      </div>
    </div>
  );
};
