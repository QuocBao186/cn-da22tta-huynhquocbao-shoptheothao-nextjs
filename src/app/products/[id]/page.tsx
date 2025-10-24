'use client';

import { useState } from 'react';
import { Star, Heart, Share2, Truck, Shield, RefreshCw, Minus, Plus, ShoppingCart } from 'lucide-react';
import ProductGallery from '@/components/ProductGallery';
import ProductTabs from '@/components/ProductTabs';
import RelatedProducts from '@/components/RelatedProducts';

// Mock product data
const product = {
  id: 1,
  name: 'Giày đá bóng Nike Mercurial Vapor 14',
  price: 2500000,
  originalPrice: 3000000,
  images: [
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
    '/api/placeholder/600/600'
  ],
  rating: 4.8,
  reviews: 124,
  category: 'football',
  brand: 'Nike',
  inStock: true,
  stock: 12,
  description: 'Giày đá bóng Nike Mercurial Vapor 14 được thiết kế với công nghệ tiên tiến nhất, mang đến trải nghiệm chơi bóng tuyệt vời. Với chất liệu Flyknit siêu nhẹ và đế giày có độ bám cao, đôi giày này sẽ giúp bạn di chuyển nhanh chóng và chính xác trên sân cỏ.',
  features: [
    'Chất liệu Flyknit siêu nhẹ',
    'Đế giày có độ bám cao',
    'Thiết kế ôm chân chắc chắn',
    'Công nghệ Zoom Air',
    'Dễ dàng vệ sinh'
  ],
  specifications: {
    'Chất liệu': 'Flyknit + Da tổng hợp',
    'Màu sắc': 'Trắng/Đen',
    'Kích thước': '39-45',
    'Trọng lượng': '180g',
    'Xuất xứ': 'Việt Nam',
    'Bảo hành': '6 tháng'
  },
  sizes: [39, 40, 41, 42, 43, 44, 45],
  colors: [
    { name: 'Trắng/Đen', value: 'white-black', image: '/api/placeholder/60/60' },
    { name: 'Xanh/Trắng', value: 'blue-white', image: '/api/placeholder/60/60' },
    { name: 'Đỏ/Đen', value: 'red-black', image: '/api/placeholder/60/60' }
  ]
};

const relatedProducts = [
  {
    id: 2,
    name: 'Giày đá bóng Adidas Predator Edge',
    price: 2200000,
    originalPrice: 2800000,
    image: '/api/placeholder/300/300',
    rating: 4.7,
    reviews: 89,
    category: 'football',
    brand: 'Adidas',
    stock: 15
  },
  {
    id: 3,
    name: 'Giày đá bóng Puma Future Z',
    price: 1800000,
    originalPrice: 2200000,
    image: '/api/placeholder/300/300',
    rating: 4.6,
    reviews: 67,
    category: 'football',
    brand: 'Puma',
    stock: 8
  },
  {
    id: 4,
    name: 'Giày đá bóng Mizuno Morelia',
    price: 1600000,
    originalPrice: 2000000,
    image: '/api/placeholder/300/300',
    rating: 4.8,
    reviews: 45,
    category: 'football',
    brand: 'Mizuno',
    stock: 0
  }
];

export default function ProductDetailPage() {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState('white-black');
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const discountPercentage = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={product.images} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-600">
              <span>Trang chủ</span> / <span>Sản phẩm</span> / <span className="text-gray-900">{product.name}</span>
            </nav>

            {/* Product Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} đánh giá)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              <span className="text-xl text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-semibold">
                -{discountPercentage}%
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
            
            {/* Stock Information */}
            <div className="flex items-center space-x-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                product.stock > 50 ? 'bg-green-100 text-green-800' :
                product.stock > 20 ? 'bg-yellow-100 text-yellow-800' :
                product.stock > 0 ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {product.stock > 0 ? `Còn ${product.stock} sản phẩm trong kho` : 'Hết hàng'}
              </span>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tính năng nổi bật</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Màu sắc</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`p-2 rounded-lg border-2 ${
                      selectedColor === color.value
                        ? 'border-blue-500'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                    <span className="text-xs mt-1 block">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Kích thước</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedSize === size
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Số lượng</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  title="Giảm số lượng"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 border border-gray-300 rounded-lg min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  title="Tăng số lượng"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <button 
                  className="flex-1 flex items-center justify-center space-x-2 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                  title="Thêm vào giỏ hàng"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Thêm vào giỏ hàng</span>
                </button>
                <button 
                  className="px-6 py-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  title={isLiked ? 'Bỏ yêu thích' : 'Yêu thích'}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                </button>
                <button 
                  className="px-6 py-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  title="Chia sẻ"
                >
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <button 
                className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                title="Mua ngay"
              >
                Mua ngay
              </button>
            </div>

            {/* Shipping Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Truck className="h-4 w-4 mr-2" />
                <span>Miễn phí giao hàng cho đơn từ 500k</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="h-4 w-4 mr-2" />
                <span>Bảo hành chính hãng 6 tháng</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <RefreshCw className="h-4 w-4 mr-2" />
                <span>Đổi trả trong 30 ngày</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <ProductTabs 
            specifications={product.specifications}
            features={product.features}
            reviews={[]}
          />
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </div>
  );
}
