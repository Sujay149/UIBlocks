import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { componentService } from "@/lib/api";

interface BulkImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface ComponentData {
  name: string;
  description?: string;
  code: string;
  category: string;
  preview: string;
  author?: string;
  tags?: string;
}

interface ImportResult {
  component: ComponentData;
  status: "success" | "error";
  message?: string;
}

export function BulkImportModal({
  open,
  onOpenChange,
  onSuccess,
}: BulkImportModalProps) {
  const [jsonInput, setJsonInput] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [results, setResults] = useState<ImportResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const validateComponent = (component: any): string | null => {
    if (!component.name || typeof component.name !== "string") {
      return "Missing or invalid 'name' field";
    }
    if (!component.code || typeof component.code !== "string") {
      return "Missing or invalid 'code' field";
    }
    if (!component.category || typeof component.category !== "string") {
      return "Missing or invalid 'category' field";
    }
    if (!component.preview || typeof component.preview !== "string") {
      return "Missing or invalid 'preview' field";
    }
    return null;
  };

  const handleImport = async () => {
    try {
      // Parse JSON
      const components = JSON.parse(jsonInput);

      if (!Array.isArray(components)) {
        toast({
          title: "Invalid JSON",
          description: "JSON must be an array of components",
          variant: "destructive",
        });
        return;
      }

      if (components.length === 0) {
        toast({
          title: "Empty Array",
          description: "Please provide at least one component",
          variant: "destructive",
        });
        return;
      }

      setIsImporting(true);
      setShowResults(false);
      const importResults: ImportResult[] = [];

      // Process each component
      for (const component of components) {
        const validationError = validateComponent(component);
        
        if (validationError) {
          importResults.push({
            component,
            status: "error",
            message: validationError,
          });
          continue;
        }

        try {
          // Convert tags to array if it's a string
          let tagsArray: string[] = [];
          if (component.tags) {
            if (Array.isArray(component.tags)) {
              tagsArray = component.tags;
            } else if (typeof component.tags === 'string') {
              tagsArray = component.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t);
            }
          }

          await componentService.create({
            name: component.name,
            code: component.code,
            category: component.category,
            preview: component.preview,
            createdBy: component.author || "Anonymous",
            tags: tagsArray,
          });

          importResults.push({
            component,
            status: "success",
          });
        } catch (error) {
          importResults.push({
            component,
            status: "error",
            message: error instanceof Error ? error.message : "Failed to create component",
          });
        }
      }

      setResults(importResults);
      setShowResults(true);

      const successCount = importResults.filter((r) => r.status === "success").length;
      const errorCount = importResults.filter((r) => r.status === "error").length;

      if (successCount > 0) {
        toast({
          title: "Import Complete",
          description: `Successfully imported ${successCount} component(s)${errorCount > 0 ? `, ${errorCount} failed` : ""}`,
        });
        
        if (onSuccess) {
          onSuccess();
        }
      }

      if (successCount === components.length) {
        // All succeeded, reset form
        setTimeout(() => {
          setJsonInput("");
          setShowResults(false);
          setResults([]);
          onOpenChange(false);
        }, 2000);
      }
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: error instanceof Error ? error.message : "Please check your JSON format",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  const exampleJSON = `[
  {
    "name": "Glassmorphic Button",
    "code": "<button class='glass-btn'>Click Me</button>",
    "category": "buttons",
    "preview": "GlassButton",
    "author": "John Doe",
    "tags": "glass, modern, interactive"
  },
  {
    "name": "Gradient Card",
    "code": "<div class='gradient-card'>Content</div>",
    "category": "cards",
    "preview": "GradientCard",
    "author": "Jane Smith",
    "tags": "gradient, colorful"
  }
]`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby="bulk-import-description">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Bulk Import Components (JSON)
          </DialogTitle>
        </DialogHeader>
        <p id="bulk-import-description" className="sr-only">
          Import multiple components at once using JSON format
        </p>

        <div className="space-y-4">
          {!showResults ? (
            <>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  JSON Input
                </label>
                <Textarea
                  placeholder={exampleJSON}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  className="min-h-[400px] font-mono text-xs"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Paste an array of component objects. Each component must have: name, code, category, preview.
                  Optional: author, tags, description.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-xs font-medium mb-2">Example Format:</p>
                <pre className="text-xs overflow-x-auto">
                  {exampleJSON}
                </pre>
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setJsonInput("");
                    setResults([]);
                    setShowResults(false);
                    onOpenChange(false);
                  }}
                  disabled={isImporting}
                >
                  Cancel
                </Button>
                <Button onClick={handleImport} disabled={isImporting || !jsonInput.trim()}>
                  {isImporting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Import Components
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Import Results</h3>
                <div className="max-h-[500px] overflow-y-auto space-y-2">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${
                        result.status === "success"
                          ? "border-green-500/50 bg-green-500/10"
                          : "border-red-500/50 bg-red-500/10"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {result.status === "success" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">
                            {result.component.name || "Unnamed Component"}
                          </p>
                          {result.status === "error" && result.message && (
                            <p className="text-xs text-red-500 mt-1">
                              {result.message}
                            </p>
                          )}
                          {result.status === "success" && (
                            <p className="text-xs text-green-500 mt-1">
                              Successfully created
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setJsonInput("");
                    setResults([]);
                    setShowResults(false);
                  }}
                >
                  Import More
                </Button>
                <Button
                  onClick={() => {
                    setJsonInput("");
                    setResults([]);
                    setShowResults(false);
                    onOpenChange(false);
                  }}
                >
                  Done
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
