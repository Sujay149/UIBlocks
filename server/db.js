import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL);

export const db = sql;

// Initialize database tables
export async function initDatabase() {
  try {
    // Create components table
    await sql`
      CREATE TABLE IF NOT EXISTS components (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        code TEXT NOT NULL,
        preview TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_by VARCHAR(255),
        tags TEXT[]
      )
    `;

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Component queries
export async function getAllComponents(category = 'All') {
  try {
    if (category === 'All') {
      return await sql`
        SELECT * FROM components 
        ORDER BY created_at DESC
      `;
    } else {
      return await sql`
        SELECT * FROM components 
        WHERE category = ${category}
        ORDER BY created_at DESC
      `;
    }
  } catch (error) {
    console.error('Error fetching components:', error);
    throw error;
  }
}

export async function getCategories() {
  try {
    const result = await sql`
      SELECT DISTINCT category FROM components
      ORDER BY category
    `;
    return ['All', ...result.map(r => r.category)];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return ['All'];
  }
}

export async function createComponent(component) {
  try {
    const result = await sql`
      INSERT INTO components (name, category, code, preview, created_by, tags)
      VALUES (
        ${component.name},
        ${component.category},
        ${component.code},
        ${component.preview},
        ${component.createdBy || 'Anonymous'},
        ${component.tags || []}
      )
      RETURNING *
    `;
    return result[0];
  } catch (error) {
    console.error('Error creating component:', error);
    throw error;
  }
}

export async function searchComponents(query) {
  try {
    return await sql`
      SELECT * FROM components
      WHERE 
        name ILIKE ${`%${query}%`} OR
        category ILIKE ${`%${query}%`} OR
        ${query} = ANY(tags)
      ORDER BY created_at DESC
    `;
  } catch (error) {
    console.error('Error searching components:', error);
    throw error;
  }
}

export async function updateComponent(id, updates) {
  try {
    const result = await sql`
      UPDATE components
      SET 
        name = ${updates.name},
        category = ${updates.category},
        code = ${updates.code},
        preview = ${updates.preview},
        tags = ${updates.tags || []}
      WHERE id = ${id}
      RETURNING *
    `;
    return result[0];
  } catch (error) {
    console.error('Error updating component:', error);
    throw error;
  }
}

export async function deleteComponent(id) {
  try {
    const result = await sql`
      DELETE FROM components
      WHERE id = ${id}
      RETURNING *
    `;
    return result[0];
  } catch (error) {
    console.error('Error deleting component:', error);
    throw error;
  }
}
