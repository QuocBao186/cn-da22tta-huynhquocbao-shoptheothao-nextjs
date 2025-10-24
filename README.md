# SportStore - Trang web bán dụng cụ thể thao

Một trang web thương mại điện tử hiện đại được xây dựng bằng Next.js 14, TypeScript và Tailwind CSS, chuyên bán dụng cụ thể thao chất lượng cao.

## 🚀 Tính năng chính

### 🏠 Trang chủ
- Hero section với thống kê ấn tượng
- Danh mục sản phẩm đa dạng
- Sản phẩm nổi bật với đánh giá
- Lý do chọn SportStore

### 🛍️ Sản phẩm
- **Danh sách sản phẩm** với bộ lọc thông minh
- **Chi tiết sản phẩm** với gallery ảnh
- **Tìm kiếm** theo danh mục, thương hiệu, giá
- **Sắp xếp** theo độ phổ biến, giá, đánh giá
- **Xem dạng lưới/danh sách**

### 🛒 Giỏ hàng & Thanh toán
- **Giỏ hàng** với quản lý số lượng
- **Thanh toán** với form đầy đủ
- **Tính phí vận chuyển** tự động
- **Xác nhận đơn hàng** thành công

### 📱 Responsive Design
- **Mobile-first** approach
- **Tablet** và **Desktop** tối ưu
- **Navigation** thân thiện mobile

## 🛠️ Công nghệ sử dụng

- **Next.js 14** - React framework với App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Headless UI** - Accessible UI components

## 📦 Cài đặt

1. **Clone repository:**
```bash
git clone <repository-url>
cd sports-store
```

2. **Cài đặt dependencies:**
```bash
npm install
```

3. **Chạy development server:**
```bash
npm run dev
```

4. **Mở trình duyệt:**
```
http://localhost:3000
```

## 🏗️ Cấu trúc dự án

```
src/
├── app/                    # App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── products/          # Products pages
│   │   ├── page.tsx       # Products list
│   │   └── [id]/          # Product detail
│   │       └── page.tsx
│   ├── cart/              # Shopping cart
│   │   └── page.tsx
│   └── checkout/          # Checkout process
│       └── page.tsx
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── HeroSection.tsx    # Homepage hero
│   ├── Categories.tsx     # Product categories
│   ├── FeaturedProducts.tsx # Featured products
│   ├── WhyChooseUs.tsx    # Why choose us section
│   ├── ProductCard.tsx    # Product card component
│   ├── ProductFilters.tsx # Product filters
│   ├── ProductGallery.tsx # Product image gallery
│   ├── ProductTabs.tsx    # Product detail tabs
│   └── RelatedProducts.tsx # Related products
└── globals.css            # Global styles
```

## 🎨 Thiết kế

### Màu sắc chính
- **Primary:** Blue (#2563eb)
- **Secondary:** Yellow (#eab308)
- **Success:** Green (#16a34a)
- **Warning:** Orange (#ea580c)
- **Error:** Red (#dc2626)

### Typography
- **Font:** Geist Sans (Google Fonts)
- **Headings:** Bold, responsive sizing
- **Body:** Regular weight, readable line-height

## 📱 Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

## 🚀 Scripts có sẵn

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 📄 Trang chính

- **/** - Trang chủ
- **/products** - Danh sách sản phẩm
- **/products/[id]** - Chi tiết sản phẩm
- **/cart** - Giỏ hàng
- **/checkout** - Thanh toán

## 🔧 Tùy chỉnh

### Thêm sản phẩm mới
Chỉnh sửa dữ liệu mock trong các file:
- `src/app/products/page.tsx`
- `src/components/FeaturedProducts.tsx`

### Thay đổi màu sắc
Cập nhật Tailwind classes trong các component hoặc tùy chỉnh `tailwind.config.js`

### Thêm trang mới
Tạo thư mục mới trong `src/app/` với file `page.tsx`

## 📈 Performance

- **Lighthouse Score:** 90+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals:** Optimized
- **Image Optimization:** Next.js Image component
- **Code Splitting:** Automatic với App Router

## 🔒 Bảo mật

- **TypeScript** cho type safety
- **ESLint** cho code quality
- **Form validation** client-side
- **Sanitized inputs** (cần implement server-side)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Liên hệ

- **Email:** info@sportstore.vn
- **Phone:** (028) 1234-5678
- **Address:** 123 Đường ABC, Quận 1, TP.HCM

---

**SportStore** - Nâng cao hiệu suất thể thao của bạn! 🏃‍♂️⚽🏀🎾