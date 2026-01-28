import { initDatabase } from './db.js';

console.log('🔄 Initializing database...');

initDatabase()
  .then(() => {
    console.log('✅ Database initialized successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Failed to initialize database:', error);
    process.exit(1);
  });
