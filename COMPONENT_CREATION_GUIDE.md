# Component Creation Guide

## How to Add a New Component to UIBlocksX

Follow these steps to properly add a component that will show previews correctly.

---

## Step 1: Create the Preview Component

First, add your component to `src/components/gallery/SampleComponents.tsx`:

```tsx
export const YourComponentName = () => {
  return (
    <div className="w-48 p-4 rounded-xl glass">
      {/* Your component JSX here */}
      <h3 className="text-sm font-semibold">Your Component</h3>
    </div>
  );
};
```

**Important:** The export name (e.g., `YourComponentName`) will be used as the preview field in the database.

---

## Step 2: Add to Database

When creating a component through the UI or directly in the database, use this exact format:

### Required Fields:

1. **name**: Display name (e.g., "My Glass Card")
2. **category**: One of: buttons, cards, inputs, badges, modals, navigation, alerts, forms, other
3. **code**: The actual code users will copy (JSX/TSX)
4. **preview**: **MUST match the export name from SampleComponents.tsx** (e.g., "YourComponentName")
5. **tags**: Array of searchable tags (e.g., ["glass", "modern", "animated"])
6. **created_by**: Creator email (optional)

### Example Database Entry:

```json
{
  "name": "Sujay Glass Card",
  "category": "cards",
  "preview": "GlassCard",
  "tags": ["glass", "card", "modern"],
  "created_by": "sujayss149@gmail.com",
  "code": "<div className=\"w-48 p-4 rounded-xl glass group hover:scale-[1.02] transition-all duration-200\">\n  <div className=\"w-full h-20 rounded-lg bg-gradient-to-br from-primary/20 to-accent-purple/20 mb-3\" />\n  <div className=\"h-3 w-3/4 rounded bg-muted mb-2\" />\n  <div className=\"h-2 w-1/2 rounded bg-muted/50\" />\n</div>"
}
```

---

## Step 3: Available Preview Components

Use one of these exact names in the `preview` field:

### Buttons:
- `GlassButton`
- `GlowButton`
- `NeonBorderButton`
- `PulseButton`
- `IconButton`
- `GradientBorder`

### Cards:
- `GlassCard`
- `FloatingCard`
- `ShimmerCard`
- `GradientCard`

### Inputs:
- `GlassInput`

### Badges:
- `GlassBadge`

### Toggles:
- `AnimatedToggle`

### Alerts:
- `GlassAlert`

---

## Step 4: Create Component via UI

1. **Login as admin** (sujayss149@gmail.com)
2. Click **"+ Create"** button on /components page
3. Fill in the form:
   - **Name**: User-friendly name
   - **Category**: Select from dropdown
   - **Code**: Paste your component code
   - **Preview**: Type exact export name from SampleComponents.tsx
   - **Tags**: Comma-separated (glass, modern, animated)
4. Click **Create Component**

---

## Step 5: Fix Your Current Components

Your components don't show previews because the `preview` field doesn't match any exports. Here's how to fix them:

### Option A: Use Existing Previews

Edit your components and change the preview field to match existing components:

- **"Sujay cardsss"** → Change preview to `GlassCard`
- **"Sujay card"** → Change preview to `FloatingCard`
- **"Sujay btn"** → Change preview to `GlassButton`

### Option B: Create Custom Previews

1. Add your custom preview components to `SampleComponents.tsx`:

```tsx
export const SujayCardsss = () => {
  return (
    <div className="w-48 p-6 rounded-2xl glass border border-primary/30">
      <div className="space-y-3">
        <div className="h-4 w-3/4 rounded bg-gradient-to-r from-primary to-accent-purple" />
        <div className="h-3 w-1/2 rounded bg-muted" />
        <div className="h-2 w-full rounded bg-muted/50" />
      </div>
    </div>
  );
};

export const SujayCard = () => {
  return (
    <div className="w-40 p-4 rounded-xl glass">
      <div className="w-8 h-8 rounded-lg bg-primary/20 mb-3" />
      <h4 className="text-xs font-semibold mb-1">Sujay Card</h4>
      <p className="text-[10px] text-muted-foreground">Custom preview</p>
    </div>
  );
};

export const SujayBtn = () => {
  return (
    <button className="px-6 py-3 rounded-xl glass hover:scale-105 transition-all">
      <span className="text-sm font-medium gradient-text">Sujay Button</span>
    </button>
  );
};
```

2. Update your database entries to use `preview: "SujayCardsss"`, `preview: "SujayCard"`, `preview: "SujayBtn"`

---

## Common Mistakes

❌ **Wrong:** `preview: "my-card"` (kebab-case)
✅ **Correct:** `preview: "MyCard"` (PascalCase)

❌ **Wrong:** `preview: "glassCard"` (camelCase)
✅ **Correct:** `preview: "GlassCard"` (PascalCase)

❌ **Wrong:** Preview name doesn't exist in SampleComponents.tsx
✅ **Correct:** Preview name exactly matches an export from SampleComponents.tsx

---

## Quick Template

Copy this template for new components:

```tsx
// 1. Add to SampleComponents.tsx
export const MyNewComponent = () => {
  return (
    <div className="w-48 p-4 rounded-xl glass">
      {/* Your preview design */}
    </div>
  );
};

// 2. Database/UI Form
{
  "name": "My New Component",
  "category": "cards",
  "preview": "MyNewComponent",  // ← Must match export name above
  "tags": ["glass", "modern"],
  "code": "Your actual component code here",
  "created_by": "your@email.com"
}
```

---

## Testing

After creating a component:

1. Go to /components page
2. Find your component in the grid
3. You should see the preview rendering (not "Preview" text)
4. Click to view full code
5. Click copy button to test code copying

---

## Need Help?

- Preview not showing? Check that `preview` field exactly matches export name in SampleComponents.tsx
- Component not appearing? Refresh the page or check browser console for errors
- Edit/Delete not working? Make sure you're logged in as admin (sujayss149@gmail.com)
