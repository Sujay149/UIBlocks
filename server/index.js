import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { 
  initDatabase, 
  getAllComponents, 
  getCategories, 
  createComponent,
  searchComponents,
  updateComponent,
  deleteComponent
} from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize database
initDatabase().catch(console.error);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Get all components or by category
app.get('/api/components', async (req, res) => {
  try {
    const { category = 'All' } = req.query;
    const components = await getAllComponents(category);
    res.json({ components, total: components.length });
  } catch (error) {
    console.error('Error in GET /api/components:', error);
    res.status(500).json({ error: 'Failed to fetch components' });
  }
});

// Get categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await getCategories();
    res.json({ categories });
  } catch (error) {
    console.error('Error in GET /api/categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Create new component
app.post('/api/components', async (req, res) => {
  try {
    const component = req.body;
    
    // Validate required fields
    if (!component.name || !component.category || !component.code || !component.preview) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, category, code, preview' 
      });
    }

    const newComponent = await createComponent(component);
    res.status(201).json(newComponent);
  } catch (error) {
    console.error('Error in POST /api/components:', error);
    res.status(500).json({ error: 'Failed to create component' });
  }
});

// Search components
app.get('/api/components/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Search query required' });
    }
    const components = await searchComponents(q);
    res.json({ components, total: components.length });
  } catch (error) {
    console.error('Error in GET /api/components/search:', error);
    res.status(500).json({ error: 'Failed to search components' });
  }
});

// Update component (admin only)
app.put('/api/components/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Validate required fields
    if (!updates.name || !updates.category || !updates.code || !updates.preview) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, category, code, preview' 
      });
    }

    const updatedComponent = await updateComponent(id, updates);
    res.json(updatedComponent);
  } catch (error) {
    console.error('Error in PUT /api/components/:id:', error);
    res.status(500).json({ error: 'Failed to update component' });
  }
});

// Delete component (admin only)
app.delete('/api/components/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComponent = await deleteComponent(id);
    
    if (!deletedComponent) {
      return res.status(404).json({ error: 'Component not found' });
    }
    
    res.json({ message: 'Component deleted successfully', component: deletedComponent });
  } catch (error) {
    console.error('Error in DELETE /api/components/:id:', error);
    res.status(500).json({ error: 'Failed to delete component' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
});
