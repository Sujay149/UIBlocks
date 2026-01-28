import { useState, useEffect, useCallback } from "react";
import { TopBar } from "@/components/gallery/TopBar";
import { ComponentPreviewCard } from "@/components/gallery/GlassCard";
import { ComponentModal } from "@/components/gallery/ComponentModal";
import { SearchCommandPalette } from "@/components/gallery/SearchCommandPalette";
import { LoginModal } from "@/components/gallery/LoginModal";
import { EditComponentModal } from "@/components/gallery/EditComponentModal";
import { useComponentsList } from "@/hooks/useComponents";
import { UIComponentWithPreview } from "@/lib/api/types";
import { Sparkles, Loader2, ArrowRight, Zap, Copy, Palette, Github, Code2, Heart, Shield, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { motion } from "framer-motion";

const Index = () => {
  const [selectedComponent, setSelectedComponent] = useState<UIComponentWithPreview | null>(null);
  const [editingComponent, setEditingComponent] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch only first 12 components for landing page
  const { data: allComponents = [], isLoading: componentsLoading, refetch } = useComponentsList("All");
  const featuredComponents = allComponents.slice(0, 12);

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
      <TopBar onLoginClick={() => setLoginOpen(true)} />

      <main className="relative pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section with Background Paths */}
          <section className="relative -mt-20">
            <BackgroundPaths title="">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="max-w-4xl mx-auto"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Glassmorphic UI Components
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="inline-block text-foreground"
                  >
                    UI
                  </motion.span>
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="inline-block gradient-text ml-3"
                  >
                    Blocks
                  </motion.span>
                </h1>
                
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
                >
                  A collection of beautiful, animated UI components built with glassmorphism. 
                  Hover to preview, click to explore, copy to use.
                </motion.p>

                {/* Stats */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="flex items-center justify-center gap-8 text-sm mb-8"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">{allComponents.length}+</span>
                    <span className="text-muted-foreground">Components</span>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold gradient-text">Free</span>
                    <span className="text-muted-foreground">Forever</span>
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="flex items-center justify-center gap-4"
                >
                  <button
                    onClick={() => navigate("/components")}
                    className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm overflow-hidden group transition-all duration-300 hover:shadow-glow"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Browse All Components
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="px-6 py-3 rounded-xl glass font-medium text-sm hover:bg-primary/10 transition-all duration-200"
                  >
                    Search Components
                  </button>
                </motion.div>
              </motion.div>
            </BackgroundPaths>
          </section>

          <div className="px-6">
          {/* Featured Components Section */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  <span className="gradient-text">Featured</span> Components
                </h2>
                <p className="text-muted-foreground">
                  Handpicked selection of our best components
                </p>
              </div>
              <button
                onClick={() => navigate("/components")}
                className="pill-glass hover:bg-primary/10 transition-all duration-200 flex items-center gap-2"
              >
                <span className="text-sm font-medium">View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          {/* Component Grid */}
          {componentsLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-muted-foreground">Loading components...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredComponents.map((component) => (
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
            </div>
          )}
          </section>

          {/* Features Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">
                Why <span className="gradient-text">UIBlocks</span>?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to build stunning glassmorphic interfaces
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="glass rounded-2xl p-6 hover:bg-primary/5 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Copy className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Copy & Paste Ready</h3>
                <p className="text-sm text-muted-foreground">
                  One-click copy. Paste directly into your project. No configuration needed.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="glass rounded-2xl p-6 hover:bg-primary/5 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan to-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Palette className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Beautiful Design</h3>
                <p className="text-sm text-muted-foreground">
                  Stunning glassmorphism effects with smooth animations and modern aesthetics.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="glass rounded-2xl p-6 hover:bg-primary/5 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Production Ready</h3>
                <p className="text-sm text-muted-foreground">
                  Fully tested, accessible components ready for production use.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="glass rounded-2xl p-6 hover:bg-primary/5 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Code2 className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">TypeScript Support</h3>
                <p className="text-sm text-muted-foreground">
                  Built with TypeScript for type safety and better developer experience.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="glass rounded-2xl p-6 hover:bg-primary/5 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Open Source</h3>
                <p className="text-sm text-muted-foreground">
                  Free forever. MIT licensed. Use anywhere without restrictions.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="glass rounded-2xl p-6 hover:bg-primary/5 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-purple to-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Regular Updates</h3>
                <p className="text-sm text-muted-foreground">
                  New components added weekly. Community-driven development.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">
                Get Started in <span className="gradient-text">3 Steps</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Start building beautiful interfaces in minutes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="relative">
                <div className="glass rounded-2xl p-8 text-center hover:bg-primary/5 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center mb-4 text-2xl font-bold text-primary-foreground">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Browse Components</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore our collection of glassmorphic components. Use search or filter by category.
                  </p>
                </div>
                {/* Connector Line */}
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary to-transparent" />
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="glass rounded-2xl p-8 text-center hover:bg-primary/5 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-accent-cyan to-primary flex items-center justify-center mb-4 text-2xl font-bold text-primary-foreground">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Preview & Copy</h3>
                  <p className="text-sm text-muted-foreground">
                    See components in action. Click to view code and copy with one click.
                  </p>
                </div>
                {/* Connector Line */}
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary to-transparent" />
              </div>

              {/* Step 3 */}
              <div className="glass rounded-2xl p-8 text-center hover:bg-primary/5 transition-all duration-300">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center mb-4 text-2xl font-bold text-primary-foreground">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Paste & Customize</h3>
                <p className="text-sm text-muted-foreground">
                  Paste into your project and customize colors, sizes, or animations to match your design.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-16">
            <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent-purple/10" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-cyan/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Build Something <span className="gradient-text">Beautiful</span>?
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                  Join thousands of developers creating stunning interfaces with UIBlocks. Start for free today.
                </p>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => navigate("/components")}
                    className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium overflow-hidden group transition-all duration-300 hover:shadow-glow"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Explore Components
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </button>
                  <button
                    onClick={() => window.open("https://github.com/Sujay149/UIBlocks", "_blank")}
                    className="px-8 py-4 rounded-xl glass font-medium hover:bg-primary/10 transition-all duration-200 flex items-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    Star on GitHub
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Empty State */}
          {!componentsLoading && featuredComponents.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No components available.</p>
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
        components={allComponents}
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectComponent={handleSearchSelect}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
      />

      {/* Edit Component Modal */}
      <EditComponentModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        onSuccess={() => refetch()}
        component={editingComponent}
      />

      {/* Footer */}
      <footer className="relative border-t border-border/50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src="/uiblocks.png" alt="UIBlocks" className="w-6 h-6 rounded object-cover" />
                <span className="text-lg font-bold">
                  <span className="text-foreground">UIBlocks</span>
                  <span className="gradient-text">X</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 max-w-md">
                A beautiful collection of glassmorphic UI components built for modern web applications. 
                Copy, paste, and customize to create stunning interfaces.
              </p>
              <div className="flex items-center gap-3">
                <a 
                  href="https://github.com/Sujay149/UIBlocks" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-primary/10 transition-all duration-200"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-primary/10 transition-all duration-200"
                >
                  <Heart className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-primary/10 transition-all duration-200"
                >
                  <Code2 className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/components" className="hover:text-foreground transition-colors">Browse Components</a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">Categories</a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">Get Started</a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">Submit Component</a>
                </li>
                <li>
                  <a href="https://github.com/Sujay149/UIBlocks" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">Changelog</a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">License</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>for developers</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2026 UIBlocksGlass. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
