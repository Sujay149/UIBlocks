# Quick Start Guide - See Your Components! 🎨

## ✅ What's Done:

1. **Database is populated** with 12 sample components
2. **Backend server is running** on http://localhost:3001
3. **Components are sorted by date** (newest first)

## 🚀 To See Components:

### Step 1: Make sure backend is running
If not already running, in one terminal:
```bash
npm run server
```

### Step 2: Start the frontend
In another terminal:
```bash
npm run dev
```

### Step 3: View components
Open your browser and go to:
- **Landing Page**: http://localhost:8080 (shows 12 featured components)
- **All Components**: http://localhost:8080/components (shows all components)

## ➕ How to Add New Components:

### Option 1: Using the UI (Recommended)
1. Go to http://localhost:8080/components
2. Click the **"Create"** button (top right, + icon)
3. Fill out the form:
   - **Component Name**: e.g., "My Cool Button"
   - **Category**: e.g., "Buttons"
   - **Your Name**: (optional)
   - **Tags**: e.g., "button, animated, cool" (comma-separated)
   - **Preview Component Name**: The exported component name (e.g., "MyCoolButton")
   - **Component Code**: Your React component code
4. Click "Create Component"
5. Your component will appear immediately!

### Option 2: Using the API
```bash
curl -X POST http://localhost:3001/api/components \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Component",
    "category": "Buttons",
    "code": "export const MyComponent = () => { return <button>Click Me</button>; };",
    "preview": "MyComponent",
    "createdBy": "Your Name",
    "tags": ["button", "custom"]
  }'
```

## 🔍 Current Components in Database:

You now have these components:
1. Glass Button (Buttons)
2. Glow Button (Buttons)
3. Neon Border Button (Buttons)
4. Glass Card (Cards)
5. Floating Card (Cards)
6. Glass Input (Forms)
7. Glass Badge (Badges)
8. Animated Toggle (Forms)
9. Shimmer Card (Cards)
10. Gradient Card (Cards)
11. Pulse Button (Buttons)
12. Glass Alert (Alerts)

## ✨ Features:

- **Auto-sorted by date**: Newest components appear first
- **Category filtering**: Filter by Buttons, Cards, Forms, etc.
- **Search**: Press Cmd/Ctrl + K to search
- **Real-time updates**: New components appear immediately after creation

## 🐛 Troubleshooting:

**Still not seeing components?**
1. Check backend is running: `curl http://localhost:3001/api/health`
2. Check components exist: `curl http://localhost:3001/api/components`
3. Refresh your browser (Ctrl+Shift+R / Cmd+Shift+R)
4. Check browser console for errors (F12)

**Backend not running?**
```bash
# Make sure you're in the project directory
cd C:\Users\sujay\Desktop\UIblocks

# Start the server
npm run server
```

Enjoy your component library! 🎉
