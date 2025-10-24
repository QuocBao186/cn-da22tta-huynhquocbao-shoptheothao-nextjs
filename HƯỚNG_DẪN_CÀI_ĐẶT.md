# 🏃‍♂️ Hướng dẫn cài đặt Sports Store với MySQL XAMPP

## 📋 Yêu cầu hệ thống
- **Node.js** (phiên bản 18 trở lên) - [Tải về](https://nodejs.org/)
- **XAMPP** - [Tải về](https://www.apachefriends.org/)
- **Git** (tùy chọn)

## 🚀 Các bước cài đặt

### Bước 1: Cài đặt XAMPP và khởi động MySQL
1. **Tải và cài đặt XAMPP** từ [apachefriends.org](https://www.apachefriends.org/)
2. **Mở XAMPP Control Panel**
3. **Khởi động Apache và MySQL** bằng cách click "Start" cho cả hai service
4. **Đảm bảo MySQL đang chạy** trên port 3306 (màu xanh lá)

### Bước 2: Cài đặt dependencies
```bash
npm install
```

### Bước 3: Khởi tạo database
```bash
npm run init-db
```

**Lưu ý:** Nếu gặp lỗi `ECONNREFUSED`, hãy đảm bảo XAMPP MySQL đang chạy và thử lại.

### Bước 4: Chạy ứng dụng
```bash
npm run dev
```

Ứng dụng sẽ chạy tại **http://localhost:3000**

## ✨ Tính năng đã được tích hợp

### 🔐 Hệ thống đăng nhập/đăng ký
- **Đăng ký tài khoản mới** với email, password và tên
- **Đăng nhập** với email và password
- **JWT token** để xác thực người dùng
- **Đăng xuất** an toàn

### 🛒 Quản lý giỏ hàng
- **Thêm sản phẩm** vào giỏ hàng
- **Cập nhật số lượng** sản phẩm
- **Xóa sản phẩm** khỏi giỏ hàng
- **Hiển thị tổng tiền** và số lượng sản phẩm
- **Lưu trữ giỏ hàng** theo từng người dùng

### 🗄️ Cơ sở dữ liệu MySQL
- **Bảng users**: Lưu thông tin người dùng
- **Bảng products**: Lưu thông tin sản phẩm
- **Bảng cart**: Lưu giỏ hàng của người dùng
- **Dữ liệu mẫu** được tự động tạo

## 🔧 Cấu trúc API

### Authentication
- `POST /api/auth/register` - Đăng ký tài khoản
- `POST /api/auth/login` - Đăng nhập

### Cart Management
- `GET /api/cart` - Lấy giỏ hàng của user
- `POST /api/cart` - Thêm sản phẩm vào giỏ hàng
- `PUT /api/cart` - Cập nhật số lượng sản phẩm
- `DELETE /api/cart` - Xóa sản phẩm khỏi giỏ hàng

### Products
- `GET /api/products` - Lấy danh sách sản phẩm

## 🐛 Xử lý lỗi thường gặp

### Lỗi kết nối database (ECONNREFUSED)
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Giải pháp:**
1. Mở XAMPP Control Panel
2. Khởi động MySQL service
3. Đảm bảo port 3306 không bị chiếm dụng
4. Chạy lại `npm run init-db`

### Lỗi JWT token
```
Error: jwt malformed
```
**Giải pháp:**
1. Xóa localStorage trong browser
2. Đăng nhập lại
3. Kiểm tra JWT_SECRET trong config

### Lỗi CORS
**Giải pháp:**
- Đảm bảo frontend và backend chạy trên cùng domain
- Kiểm tra cấu hình Next.js

## ⚙️ Cấu hình

### Thay đổi cấu hình database
Chỉnh sửa file `src/lib/config.ts`:

```typescript
export const config = {
  JWT_SECRET: 'your-super-secret-key',
  DATABASE: {
    host: 'localhost',
    user: 'root',
    password: '', // Mật khẩu MySQL (mặc định XAMPP là rỗng)
    database: 'sports_store',
    port: 3306,
  }
};
```

### Thay đổi JWT Secret
Tạo file `.env.local`:
```
JWT_SECRET=your-super-secret-jwt-key-here
```

## 📁 Cấu trúc dự án

```
sports-store/
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── cart/          # Trang giỏ hàng
│   │   └── products/      # Trang sản phẩm
│   ├── components/        # React components
│   ├── contexts/          # React contexts (Auth, Cart)
│   └── lib/              # Utilities và config
├── scripts/              # Scripts khởi tạo database
└── public/               # Static files
```

## 🎯 Cách sử dụng

1. **Truy cập trang chủ** tại http://localhost:3000
2. **Đăng ký tài khoản** bằng cách click vào icon user
3. **Duyệt sản phẩm** và click "Thêm vào giỏ"
4. **Xem giỏ hàng** bằng cách click vào icon giỏ hàng
5. **Quản lý giỏ hàng** (thay đổi số lượng, xóa sản phẩm)

## 🔒 Bảo mật

- **Mật khẩu** được mã hóa bằng bcrypt
- **JWT token** có thời hạn 7 ngày
- **SQL injection** được ngăn chặn bằng prepared statements
- **CORS** được cấu hình đúng cách

## 📞 Hỗ trợ

Nếu gặp vấn đề, hãy kiểm tra:
1. XAMPP MySQL có đang chạy không
2. Port 3306 có bị chiếm dụng không
3. Node.js version có đúng không
4. Dependencies đã được cài đặt đầy đủ chưa

---

**Chúc bạn sử dụng ứng dụng vui vẻ! 🎉**
