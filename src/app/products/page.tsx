'use client';

import { useState, useEffect } from 'react';
import { Grid, List, SlidersHorizontal, RefreshCw } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import { getCategories, getCategoryName, ProductCategory } from '@/data/product-categories';
import { getProductTypesByCategory, getProductTypeName, ProductType, getAllProductTypes } from '@/data/product-types';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  product_type: string;
  stock: number;
  slug: string;
  created_at: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProductType, setSelectedProductType] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [filteredProductTypes, setFilteredProductTypes] = useState<ProductType[]>([]);

  useEffect(() => {
    fetchProducts();
    setCategories(getCategories());
    setProductTypes(getAllProductTypes());
  }, []);

  // Auto refresh every 30 seconds to get new products
  useEffect(() => {
    const interval = setInterval(() => {
      fetchProducts();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Tạo danh sách categories với số lượng sản phẩm
  const categoriesWithCount = [
    { name: 'Tất cả', value: 'all', count: products.length },
    ...categories.map(cat => ({
      name: cat.name,
      value: cat.id,
      count: products.filter(p => p.category === cat.id).length
    }))
  ];

  const brands = ['Nike', 'Adidas', 'Puma', 'Wilson', 'Spalding', 'Jordan', 'Yonex', 'Speedo'];

  const filteredProducts = products.filter(product => {
    const searchMatch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const productTypeMatch = selectedProductType === 'all' || product.product_type === selectedProductType;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return searchMatch && categoryMatch && productTypeMatch && priceMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      default:
        return b.id - a.id; // popular
    }
  });

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      setFilteredProductTypes([]);
      setSelectedProductType('all');
    } else {
      const filtered = getProductTypesByCategory(categoryId);
      setFilteredProductTypes(filtered);
      setSelectedProductType('all');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price * 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sản phẩm</h1>
          <p className="text-gray-600">
            Tìm kiếm dụng cụ thể thao phù hợp với nhu cầu của bạn
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64">
            <div className="lg:block hidden">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bộ lọc</h3>
                
                {/* Thể loại */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Thể loại</h4>
                  <div className="space-y-2">
                    {categoriesWithCount.map((category) => (
                      <label key={category.value} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category.value}
                          checked={selectedCategory === category.value}
                          onChange={(e) => handleCategoryChange(e.target.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {category.name} ({category.count})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Loại sản phẩm */}
                {selectedCategory !== 'all' && filteredProductTypes.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Loại sản phẩm</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="productType"
                          value="all"
                          checked={selectedProductType === 'all'}
                          onChange={(e) => setSelectedProductType(e.target.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Tất cả</span>
                      </label>
                      {filteredProductTypes.map((type) => (
                        <label key={type.id} className="flex items-center">
                          <input
                            type="radio"
                            name="productType"
                            value={type.id}
                            checked={selectedProductType === type.id}
                            onChange={(e) => setSelectedProductType(e.target.value)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {type.icon} {type.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Khoảng giá */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Khoảng giá</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Từ"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Đến"
                      />
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Hiển thị {sortedProducts.length} sản phẩm
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    title="Sắp xếp sản phẩm"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="popular">Phổ biến</option>
                    <option value="newest">Mới nhất</option>
                    <option value="price-low">Giá thấp đến cao</option>
                    <option value="price-high">Giá cao đến thấp</option>
                  </select>

                  <div className="flex border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                      title="Xem dạng lưới"
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                      title="Xem dạng danh sách"
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>Bộ lọc</span>
                  </button>

                  <button
                    onClick={fetchProducts}
                    disabled={loading}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    title="Làm mới danh sách sản phẩm"
                  >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    <span>Làm mới</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden mb-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Bộ lọc</h3>
                  
                  {/* Thể loại */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Thể loại</h4>
                    <div className="space-y-2">
                      {categoriesWithCount.map((category) => (
                        <label key={category.value} className="flex items-center">
                          <input
                            type="radio"
                            name="category-mobile"
                            value={category.value}
                            checked={selectedCategory === category.value}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {category.name} ({category.count})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Loại sản phẩm */}
                  {selectedCategory !== 'all' && filteredProductTypes.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Loại sản phẩm</h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="productType-mobile"
                            value="all"
                            checked={selectedProductType === 'all'}
                            onChange={(e) => setSelectedProductType(e.target.value)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">Tất cả</span>
                        </label>
                        {filteredProductTypes.map((type) => (
                          <label key={type.id} className="flex items-center">
                            <input
                              type="radio"
                              name="productType-mobile"
                              value={type.id}
                              checked={selectedProductType === type.id}
                              onChange={(e) => setSelectedProductType(e.target.value)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              {type.icon} {type.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Khoảng giá */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Khoảng giá</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          placeholder="Từ"
                        />
                        <span className="text-gray-500">-</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          placeholder="Đến"
                        />
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    viewMode={viewMode}
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      originalPrice: product.price * 1.2, // Mock original price
                      image: product.image || '/api/placeholder/300/300',
                      rating: 4.5, // Mock rating
                      reviews: Math.floor(Math.random() * 100) + 50, // Mock reviews
                      category: product.category.toLowerCase(),
                      brand: 'Nike', // Mock brand
                      inStock: product.stock > 0,
                      stock: product.stock,
                      description: product.description
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}