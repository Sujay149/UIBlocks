import { useState, useEffect, useCallback } from "react";
import { TopBar } from "@/components/gallery/TopBar";
import { CategoryPills } from "@/components/gallery/CategoryPills";
import { ComponentPreviewCard } from "@/components/gallery/GlassCard";
import { ComponentModal } from "@/components/gallery/ComponentModal";
import { SearchCommandPalette } from "@/components/gallery/SearchCommandPalette";
import { LoginModal } from "@/components/gallery/LoginModal";
import { CreateComponentModal } from "@/components/gallery/CreateComponentModal";
import { EditComponentModal } from "@/components/gallery/EditComponentModal";
import { useComponentsList, useCategories } from "@/hooks/useComponents";
import { UIComponentWithPreview } from "@/lib/api/types";
import { Loader2 } from "lucide-react";

const Components = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedComponent, setSelectedComponent] = useState<UIComponentWithPreview | null>(null);
  const [editingComponent, setEditingComponent] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

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
      {/* Background Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent-purple/10 blur-[150px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-accent-cyan/5 blur-[100px]" />
      </div>

      <TopBar 
        onLoginClick={() => setLoginOpen(true)}
        onCreateClick={() => setCreateOpen(true)}
      />

      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <section className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">All </span>
              <span className="gradient-text">Components</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Browse our entire collection of {components.length} glassmorphic UI components. 
              Filter by category, search, and copy the code you need.
            </p>
          </section>

          {/* Category Pills */}
          <section className="flex justify-center mb-12">
            <CategoryPills
              categories={categories}
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
            />
          </section>

          {/* Component Grid */}
          {componentsLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-muted-foreground">Loading components...</p>
              </div>
            </div>
          ) : (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    </div>
  );
};

export default Components;
