# UIblocks - Database Setup

## Setup Instructions

1. **Initialize the Database**
   ```bash
   node server/init-db.js
   ```

2. **Start the Backend Server**
   ```bash
   npm run server
   ```

3. **Start the Frontend (in a separate terminal)**
   ```bash
   npm run dev
   ```

4. **Or Run Both Together**
   ```bash
   npm run dev:all
   ```
   (Note: You may need to install `concurrently` first: `npm install -D concurrently`)

## Database Schema

The `components` table has the following structure:
- `id` - Serial primary key
- `name` - Component name (VARCHAR 255)
- `category` - Component category (VARCHAR 100)
- `code` - Component source code (TEXT)
- `preview` - Preview component name (TEXT)
- `created_at` - Timestamp (auto-generated)
- `created_by` - Creator name (VARCHAR 255)
- `tags` - Array of tags (TEXT[])

## API Endpoints

- `GET /api/components` - Get all components (optional ?category=CategoryName)
- `GET /api/categories` - Get all available categories
- `POST /api/components` - Create a new component
- `GET /api/components/search?q=query` - Search components

## Environment Variables

Make sure `.env` file exists with:
```
DATABASE_URL=your_neon_database_url
PORT=3001
```
