import { initializeDatabase } from './database';

// Khởi tạo database khi server start
export async function initDatabase() {
  try {
    await initializeDatabase();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
}
