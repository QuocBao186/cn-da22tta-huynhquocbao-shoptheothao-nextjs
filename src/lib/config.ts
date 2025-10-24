export const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
  DATABASE: {
    host: 'localhost',
    user: 'root',
    password: '', // Mặc định XAMPP không có password
    database: 'sports_store',
    port: 3306,
  }
};
