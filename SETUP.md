# Hướng dẫn cài đặt Sports Store với MySQL XAMPP

## Yêu cầu hệ thống
- Node.js (phiên bản 18 trở lên)
- XAMPP (để chạy MySQL)
- Git

## Cài đặt

### 1. Khởi động XAMPP
1. Mở XAMPP Control Panel
2. Khởi động Apache và MySQL
3. Đảm bảo MySQL đang chạy trên port 3306

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Khởi tạo database
```bash
npm run init-db
```

Script này sẽ:
- Tạo database `sports_store`
- Tạo các bảng: `users`, `products`, `cart`
- Thêm dữ liệu mẫu cho products

### 4. Chạy ứng dụng
```bash
npm run dev
```

Ứng dụng sẽ chạy tại http://localhost:3000

## Tính năng

### Đăng ký/Đăng nhập
- Người dùng có thể đăng ký tài khoản mới
- Đăng nhập với email và password
- JWT token được sử dụng để xác thực

### Quản lý giỏ hàng
- Thêm sản phẩm vào giỏ hàng
- Cập nhật số lượng sản phẩm
- Xóa sản phẩm khỏi giỏ hàng
- Xem tổng tiền và số lượng sản phẩm

### Cơ sở dữ liệu
- **users**: Lưu thông tin người dùng
- **products**: Lưu thông tin sản phẩm
- **cart**: Lưu giỏ hàng của người dùng

## Cấu trúc API

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập

### Cart
- `GET /api/cart` - Lấy giỏ hàng
- `POST /api/cart` - Thêm vào giỏ hàng
- `PUT /api/cart` - Cập nhật số lượng
- `DELETE /api/cart` - Xóa khỏi giỏ hàng

### Products
- `GET /api/products` - Lấy danh sách sản phẩm

## Troubleshooting

### Lỗi kết nối database
- Đảm bảo XAMPP MySQL đang chạy
- Kiểm tra port 3306 có bị chiếm dụng không
- Kiểm tra username/password trong config

### Lỗi JWT
- Kiểm tra JWT_SECRET trong file config
- Đảm bảo token được gửi đúng format: `Bearer <token>`

## Cấu hình

Các cấu hình database có thể được thay đổi trong file `src/lib/config.ts`:

```typescript
export const config = {
  JWT_SECRET: 'your-secret-key',
  DATABASE: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sports_store',
    port: 3306,
  }
};
```
