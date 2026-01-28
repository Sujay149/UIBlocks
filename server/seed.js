import { createComponent } from './db.js';
import 'dotenv/config';

const sampleComponents = [
  {
    name: "Glass Button",
    category: "Buttons",
    code: `export const GlassButton = () => {
  return (
    <button className="relative group px-6 py-3 rounded-xl glass overflow-hidden transition-all duration-200 hover:scale-105">
      <span className="relative z-10 font-medium text-sm text-foreground group-hover:text-primary transition-colors">
        Glass Button
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    </button>
  );
};`,
    preview: "GlassButton",
    createdBy: "Admin",
    tags: ["glass", "button", "animated"]
  },
  {
    name: "Glow Button",
    category: "Buttons",
    code: `export const GlowButton = () => {
  return (
    <button className="relative px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm overflow-hidden group transition-all duration-300 hover:shadow-glow">
      <span className="relative z-10">Glow Effect</span>
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent-purple to-primary bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite] opacity-0 group-hover:opacity-30" />
    </button>
  );
};`,
    preview: "GlowButton",
    createdBy: "Admin",
    tags: ["glow", "button", "shimmer"]
  },
  {
    name: "Neon Border Button",
    category: "Buttons",
    code: `export const NeonBorderButton = () => {
  return (
    <button className="relative px-6 py-3 rounded-xl bg-background border border-primary/50 font-medium text-sm text-primary overflow-hidden group hover:border-primary transition-all duration-300 hover:shadow-glow">
      Neon Border
    </button>
  );
};`,
    preview: "NeonBorderButton",
    createdBy: "Admin",
    tags: ["neon", "border", "button"]
  },
  {
    name: "Glass Card",
    category: "Cards",
    code: `export const GlassCard = () => {
  return (
    <div className="w-48 p-4 rounded-xl glass group hover:scale-[1.02] transition-all duration-200">
      <div className="w-full h-20 rounded-lg bg-gradient-to-br from-primary/20 to-accent-purple/20 mb-3" />
      <div className="h-3 w-3/4 rounded bg-muted mb-2" />
      <div className="h-2 w-1/2 rounded bg-muted/50" />
    </div>
  );
};`,
    preview: "GlassCard",
    createdBy: "Admin",
    tags: ["glass", "card", "hover"]
  },
  {
    name: "Floating Card",
    category: "Cards",
    code: `export const FloatingCard = () => {
  return (
    <div className="w-40 p-4 rounded-xl glass float">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent-indigo to-accent-cyan" />
        <span className="text-xs font-medium text-foreground">Floating</span>
      </div>
      <div className="h-2 w-full rounded bg-muted/50" />
    </div>
  );
};`,
    preview: "FloatingCard",
    createdBy: "Admin",
    tags: ["float", "card", "animated"]
  },
  {
    name: "Glass Input",
    category: "Forms",
    code: `export const GlassInput = () => {
  return (
    <div className="relative group">
      <input
        type="text"
        placeholder="Glass Input..."
        className="w-48 px-4 py-3 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
      />
    </div>
  );
};`,
    preview: "GlassInput",
    createdBy: "Admin",
    tags: ["glass", "input", "form"]
  },
  {
    name: "Glass Badge",
    category: "Badges",
    code: `export const GlassBadge = () => {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-foreground group hover:scale-105 transition-all duration-200 cursor-pointer">
      <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
      Active
    </span>
  );
};`,
    preview: "GlassBadge",
    createdBy: "Admin",
    tags: ["badge", "glass", "status"]
  },
  {
    name: "Animated Toggle",
    category: "Forms",
    code: `export const AnimatedToggle = () => {
  return (
    <button className="relative w-14 h-8 rounded-full bg-muted p-1 group">
      <div className="absolute left-1 top-1 w-6 h-6 rounded-full bg-primary shadow-glow transition-transform duration-300 group-hover:translate-x-6" />
    </button>
  );
};`,
    preview: "AnimatedToggle",
    createdBy: "Admin",
    tags: ["toggle", "animated", "switch"]
  },
  {
    name: "Shimmer Card",
    category: "Cards",
    code: `export const ShimmerCard = () => {
  return (
    <div className="w-48 p-4 rounded-xl glass">
      <div className="w-full h-16 rounded-lg shimmer mb-3" />
      <div className="h-3 w-3/4 rounded shimmer mb-2" />
      <div className="h-2 w-1/2 rounded shimmer" />
    </div>
  );
};`,
    preview: "ShimmerCard",
    createdBy: "Admin",
    tags: ["shimmer", "loading", "card"]
  },
  {
    name: "Gradient Card",
    category: "Cards",
    code: `export const GradientCard = () => {
  return (
    <div className="w-48 p-4 rounded-xl glass overflow-hidden group">
      <div className="w-full h-20 rounded-lg bg-gradient-to-br from-accent-indigo via-accent-purple to-accent-pink mb-3 group-hover:scale-105 transition-transform duration-300" />
      <div className="h-3 w-3/4 rounded bg-muted mb-2" />
      <div className="h-2 w-1/2 rounded bg-muted/50" />
    </div>
  );
};`,
    preview: "GradientCard",
    createdBy: "Admin",
    tags: ["gradient", "card", "colorful"]
  },
  {
    name: "Pulse Button",
    category: "Buttons",
    code: `export const PulseButton = () => {
  return (
    <button className="relative px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm">
      <span className="relative z-10">Pulse</span>
      <div className="absolute inset-0 rounded-xl bg-primary animate-glow-pulse" />
    </button>
  );
};`,
    preview: "PulseButton",
    createdBy: "Admin",
    tags: ["pulse", "button", "animated"]
  },
  {
    name: "Glass Alert",
    category: "Alerts",
    code: `export const GlassAlert = () => {
  return (
    <div className="w-64 p-4 rounded-xl glass border border-primary/30">
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-foreground mb-1">Alert Title</h4>
          <p className="text-xs text-muted-foreground">This is a glass alert message.</p>
        </div>
      </div>
    </div>
  );
};`,
    preview: "GlassAlert",
    createdBy: "Admin",
    tags: ["alert", "glass", "notification"]
  }
];

async function seedDatabase() {
  console.log('🌱 Seeding database with sample components...\n');

  try {
    for (const component of sampleComponents) {
      console.log(`  Adding: ${component.name} (${component.category})`);
      await createComponent(component);
    }

    console.log(`\n✅ Successfully added ${sampleComponents.length} components to the database!`);
    console.log('\n🎉 Your database is now populated with sample components.');
    console.log('👉 Start the server with: npm run server');
    console.log('👉 Start the frontend with: npm run dev');
    
  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    throw error;
  }
}

seedDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
