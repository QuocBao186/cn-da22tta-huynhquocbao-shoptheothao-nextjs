import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Bóng đá',
    href: '/products?category=football',
    icon: '⚽',
    description: 'Giày đá bóng, bóng, quần áo',
    color: 'from-green-500 to-green-600',
    count: '200+ sản phẩm'
  },
  {
    name: 'Bóng rổ',
    href: '/products?category=basketball',
    icon: '🏀',
    description: 'Giày bóng rổ, bóng, áo đấu',
    color: 'from-orange-500 to-orange-600',
    count: '150+ sản phẩm'
  },
  {
    name: 'Tennis',
    href: '/products?category=tennis',
    icon: '🎾',
    description: 'Vợt tennis, bóng, giày',
    color: 'from-yellow-500 to-yellow-600',
    count: '100+ sản phẩm'
  },
  {
    name: 'Gym & Fitness',
    href: '/products?category=gym',
    icon: '💪',
    description: 'Dụng cụ gym, quần áo tập',
    color: 'from-purple-500 to-purple-600',
    count: '300+ sản phẩm'
  },
  {
    name: 'Bơi lội',
    href: '/products?category=swimming',
    icon: '🏊',
    description: 'Đồ bơi, kính bơi, phao',
    color: 'from-blue-500 to-blue-600',
    count: '80+ sản phẩm'
  },
  {
    name: 'Chạy bộ',
    href: '/products?category=running',
    icon: '🏃',
    description: 'Giày chạy, quần áo thể thao',
    color: 'from-red-500 to-red-600',
    count: '120+ sản phẩm'
  }
];

export default function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Danh mục sản phẩm
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá đa dạng các loại dụng cụ thể thao cho mọi môn thể thao yêu thích
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`}></div>
              <div className="relative p-8 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{category.icon}</div>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-white/90 mb-4">{category.description}</p>
                <div className="text-sm font-medium text-white/80">
                  {category.count}
                </div>
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Xem tất cả sản phẩm
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
