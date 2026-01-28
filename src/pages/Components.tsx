import { useState, useEffect, useCallback } from "react";
import { TopBar } from "@/components/gallery/TopBar";
import { CategorySidebar } from "@/components/gallery/CategorySidebar";
import { ComponentPreviewCard } from "@/components/gallery/GlassCard";
import { ComponentModal } from "@/components/gallery/ComponentModal";
import { SearchCommandPalette } from "@/components/gallery/SearchCommandPalette";
import { LoginModal } from "@/components/gallery/LoginModal";
import { CreateComponentModal } from "@/components/gallery/CreateComponentModal";
import { BulkImportModal } from "@/components/gallery/BulkImportModal";
import { EditComponentModal } from "@/components/gallery/EditComponentModal";
import { useComponentsList, useCategories } from "@/hooks/useComponents";
import { UIComponentWithPreview } from "@/lib/api/types";
import { Loader2, Upload } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";

const Components = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedComponent, setSelectedComponent] = useState<UIComponentWithPreview | null>(null);
  const [editingComponent, setEditingComponent] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [bulkImportOpen, setBulkImportOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { isAdmin } = useAdmin();

  // Fetch components and categories from API
  const { data: components = [], isLoading: componentsLoading, refetch } = useComponentsList(activeCategory);
  const { data: categories = ["All"] } = useCategories();

  // ⌘K keyboard shortcut
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setSearchOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleViewComponent = (component: UIComponentWithPreview) => {
    setSelectedComponent(component);
    setModalOpen(true);
  };

  const handleCopyCode = (component: UIComponentWithPreview) => {
    navigator.clipboard.writeText(component.code);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedComponent(null), 200);
  };

  const handleSearchSelect = (component: UIComponentWithPreview) => {
    setSelectedComponent(component);
    setModalOpen(true);
    setSearchOpen(false);
  };

  const handleEdit = (component: any) => {
    setEditingComponent(component);
    setEditOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this component?')) return;
    
    try {
      const response = await fetch(`http://localhost:3001/api/components/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        refetch(); // Refresh component list
      }
    } catch (error) {
      console.error('Failed to delete component:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar 
        onLoginClick={() => setLoginOpen(true)}
        onCreateClick={() => setCreateOpen(true)}
      />

      <main className="relative pt-24 pb-20">
        <div className="flex gap-0">
          {/* Sidebar - Hidden on mobile, visible on lg and up */}
          <CategorySidebar
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
            className="hidden lg:block"
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0 px-6">
            {/* Bulk Import Button (Visible on Desktop) */}
            {isAdmin && (
              <div className="mb-6 flex justify-end">
                <Button 
                  onClick={() => setBulkImportOpen(true)}
                  variant="outline"
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Bulk Import
                </Button>
              </div>
            )}
            
            {/* Component Grid */}
            {componentsLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    <p className="text-muted-foreground">Loading components...</p>
                  </div>
                </div>
              ) : (
                <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {components.map((component) => (
                    <ComponentPreviewCard
                      key={component.id}
                      name={component.name}
                      category={component.category}
                      preview={component.preview}
                      onView={() => handleViewComponent(component)}
                      onCopy={() => handleCopyCode(component)}
                      onEdit={() => handleEdit(component)}
                      onDelete={() => handleDelete(component.id)}
                    />
                  ))}
                </section>
              )}

              {/* Empty State */}
              {!componentsLoading && components.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">No components found in this category.</p>
                </div>
              )}
          </div>
        </div>
      </main>

      {/* Component Modal */}
      <ComponentModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        component={selectedComponent}
      />

      {/* Search Command Palette */}
      <SearchCommandPalette
        components={components}
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectComponent={handleSearchSelect}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
      />

      {/* Create Component Modal */}
      <CreateComponentModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onSuccess={() => refetch()}
      />

      {/* Edit Component Modal */}
      <EditComponentModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        onSuccess={() => refetch()}
        component={editingComponent}
      />

      {/* Bulk Import Modal */}
      <BulkImportModal
        open={bulkImportOpen}
        onOpenChange={setBulkImportOpen}
        onSuccess={() => refetch()}
      />
    </div>
  );
};

export default Components;
