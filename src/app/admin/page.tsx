'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Package, ShoppingCart, Users, TrendingUp, Eye } from 'lucide-react';
import AdminGuard from '@/components/AdminGuard';
import { getCategories, ProductCategory, getCategoryName } from '@/data/product-categories';
import { getProductTypesByCategory, ProductType, getProductTypeName, getAllProductTypes } from '@/data/product-types';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  product_type: string;
  stock: number;
  slug: string;
  created_at: string;
}

interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  user_name: string;
  user_email: string;
  shipping_address: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'stock'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    product_type: '',
    stock: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [filteredProductTypes, setFilteredProductTypes] = useState<ProductType[]>([]);

  useEffect(() => {
    fetchData();
    setCategories(getCategories());
    setProductTypes(getAllProductTypes());
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchProducts(),
        fetchOrders()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders');
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Khi thay đổi category, filter productTypes và reset product_type
    if (name === 'category') {
      const filtered = getProductTypesByCategory(value);
      setFilteredProductTypes(filtered);
      setFormData(prev => ({
        ...prev,
        [name]: value,
        product_type: '' // Reset product_type khi thay đổi category
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Lỗi khi upload ảnh');
    }

    const data = await response.json();
    return data.imageUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setUploading(true);
      
      let imageUrl = formData.image;
      
      // Nếu có file ảnh được chọn, upload ảnh
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      
      const productData = {
        ...formData,
        image: imageUrl,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      };

      if (editingProduct) {
        // Cập nhật sản phẩm
        const response = await fetch(`/api/admin/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });

        if (response.ok) {
          await fetchProducts();
          setEditingProduct(null);
          resetForm();
        } else {
          const error = await response.json();
          alert(error.error || 'Lỗi cập nhật sản phẩm');
        }
      } else {
        // Thêm sản phẩm mới
        const response = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });

        if (response.ok) {
          await fetchProducts();
          setShowAddForm(false);
          resetForm();
        } else {
          const error = await response.json();
          alert(error.error || 'Lỗi thêm sản phẩm');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Lỗi kết nối');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      product_type: product.product_type || '',
      stock: product.stock.toString()
    });
    setImageFile(null);
    setImagePreview('');
    
    // Filter product types based on selected category
    if (product.category) {
      const filtered = getProductTypesByCategory(product.category);
      setFilteredProductTypes(filtered);
    }
    
    setShowAddForm(true);
  };

  const handleDelete = async (productId: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchProducts();
      } else {
        const error = await response.json();
        alert(error.error || 'Lỗi xóa sản phẩm');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Lỗi kết nối');
    }
  };

  const handleUpdateOrderStatus = async (orderId: number, status: string) => {
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status })
      });

      if (response.ok) {
        await fetchOrders();
        alert('Cập nhật trạng thái đơn hàng thành công');
      } else {
        const error = await response.json();
        alert(error.error || 'Lỗi cập nhật đơn hàng');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Lỗi kết nối');
    }
  };

  const handleViewOrder = async (order: Order) => {
    try {
      const response = await fetch(`/api/admin/orders/${order.id}`);
      const data = await response.json();
      setSelectedOrder(data.order);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      category: '',
      product_type: '',
      stock: ''
    });
    setImageFile(null);
    setImagePreview('');
    setFilteredProductTypes([]);
    setEditingProduct(null);
    setShowAddForm(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatAddress = (shippingAddress: string | null | undefined) => {
    if (!shippingAddress) {
      return 'Không có địa chỉ';
    }
    
    try {
      const address = JSON.parse(shippingAddress);
      const parts = [];
      
      // Thêm tên khách hàng
      if (address.firstName || address.lastName) {
        parts.push(`${address.firstName || ''} ${address.lastName || ''}`.trim());
      }
      
      // Thêm địa chỉ chi tiết
      if (address.address) {
        parts.push(address.address);
      }
      
      // Thêm phường/xã
      if (address.ward) {
        parts.push(address.ward);
      }
      
      // Thêm quận/huyện
      if (address.district) {
        parts.push(address.district);
      }
      
      // Thêm tỉnh/thành phố
      if (address.city) {
        parts.push(address.city);
      }
      
      // Thêm số điện thoại
      if (address.phone) {
        parts.push(`📞 ${address.phone}`);
      }
      
      return parts.join(', ');
    } catch (error) {
      return shippingAddress || 'Không có địa chỉ';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ xác nhận';
      case 'confirmed': return 'Đã xác nhận';
      case 'shipped': return 'Đã gửi hàng';
      case 'delivered': return 'Đã giao hàng';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-900">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Bảng điều khiển Admin</h1>
            <p className="text-gray-900 mt-2">Quản lý sản phẩm, đơn hàng và kho hàng</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Tổng sản phẩm</p>
                  <p className="text-2xl font-semibold text-gray-900">{products.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Tổng đơn hàng</p>
                  <p className="text-2xl font-semibold text-gray-900">{orders.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Đơn chờ xác nhận</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {orders.filter(o => o.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Sản phẩm hết hàng</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {products.filter(p => p.stock === 0).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'products'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-900 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Quản lý sản phẩm
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'orders'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-900 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Quản lý đơn hàng
                </button>
                <button
                  onClick={() => setActiveTab('stock')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'stock'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-900 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Quản lý kho hàng
                </button>
              </nav>
            </div>

            <div className="p-6">
              {/* Products Tab */}
              {activeTab === 'products' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Danh sách sản phẩm</h3>
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      title="Thêm sản phẩm mới"
                    >
                      <Plus className="h-5 w-5" />
                      <span>Thêm sản phẩm</span>
                    </button>
                  </div>

                  {/* Add/Edit Form */}
                  {showAddForm && (
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="text-xl font-semibold">
                          {editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
                        </h4>
                        <button
                          onClick={resetForm}
                          className="text-gray-900 hover:text-gray-700"
                          title="Đóng form"
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>

                      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Tên sản phẩm *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Nhập tên sản phẩm"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Thể loại sản phẩm *
                          </label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                            title="Chọn thể loại sản phẩm"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                          >
                            <option value="">Chọn thể loại sản phẩm</option>
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.icon} {category.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Loại sản phẩm *
                          </label>
                          <select
                            name="product_type"
                            value={formData.product_type}
                            onChange={handleInputChange}
                            required
                            title="Chọn loại sản phẩm cụ thể"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            disabled={!formData.category}
                          >
                            <option value="">
                              {formData.category ? 'Chọn loại sản phẩm' : 'Chọn thể loại trước'}
                            </option>
                            {filteredProductTypes.map((type) => (
                              <option key={type.id} value={type.id}>
                                {type.icon} {type.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Giá (USD) *
                          </label>
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                            step="0.01"
                            min="0"
                            placeholder="Nhập giá sản phẩm"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Số lượng *
                          </label>
                          <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleInputChange}
                            required
                            min="0"
                            placeholder="Nhập số lượng"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Mô tả
                          </label>
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="Nhập mô tả sản phẩm"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Hình ảnh sản phẩm
                          </label>
                          
                          {/* Upload file input */}
                          <div className="mb-4">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              title="Chọn ảnh từ máy tính"
                              className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            <p className="text-xs text-gray-900 mt-1">
                              Chọn ảnh từ máy tính (JPG, PNG, GIF - tối đa 5MB)
                            </p>
                          </div>

                          {/* Image preview */}
                          {(imagePreview || formData.image) && (
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-900 mb-2">
                                Xem trước ảnh:
                              </label>
                              <div className="relative inline-block">
                                <img
                                  src={imagePreview || formData.image}
                                  alt="Preview"
                                  className="h-32 w-32 object-cover rounded-lg border border-gray-300"
                                />
                                {imagePreview && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setImageFile(null);
                                      setImagePreview('');
                                    }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                  >
                                    ×
                                  </button>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Fallback URL input */}
                          <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                              Hoặc nhập URL hình ảnh:
                            </label>
                            <input
                              type="url"
                              name="image"
                              value={formData.image}
                              onChange={handleInputChange}
                              placeholder="Nhập URL hình ảnh"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            />
                          </div>
                        </div>

                        <div className="md:col-span-2 flex justify-end space-x-4">
                          <button
                            type="button"
                            onClick={resetForm}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            Hủy
                          </button>
                          <button
                            type="submit"
                            disabled={uploading}
                            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Save className="h-4 w-4" />
                            <span>
                              {uploading ? 'Đang xử lý...' : (editingProduct ? 'Cập nhật' : 'Thêm sản phẩm')}
                            </span>
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Products List */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                            Sản phẩm
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                            Danh mục
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                            Giá
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                            Tồn kho
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                            Thao tác
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                          <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-12 w-12">
                                  {product.image ? (
                                    <img
                                      className="h-12 w-12 rounded-lg object-cover"
                                      src={product.image}
                                      alt={product.name}
                                    />
                                  ) : (
                                    <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                      <span className="text-gray-400">🏃</span>
                                    </div>
                                  )}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {product.name}
                                  </div>
                                  <div className="text-sm text-gray-900 truncate max-w-xs">
                                    {product.description}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="space-y-1">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                  {getCategoryName(product.category)}
                                </span>
                                {product.product_type && (
                                  <div className="text-xs text-gray-900">
                                    {getProductTypeName(product.product_type)}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatPrice(product.price)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                product.stock > 50 ? 'bg-green-100 text-green-800' :
                                product.stock > 20 ? 'bg-yellow-100 text-yellow-800' :
                                product.stock > 0 ? 'bg-orange-100 text-orange-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {product.stock}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleEdit(product)}
                                  className="text-blue-600 hover:text-blue-900"
                                  title="Sửa"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(product.id)}
                                  className="text-red-600 hover:text-red-900"
                                  title="Xóa"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h3 className="text-lg font-semibold mb-6">Danh sách đơn hàng</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                            ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                            Khách hàng
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                            Tổng tiền
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                            Địa chỉ giao hàng
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                            Trạng thái
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                            Ngày tạo
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                            Thao tác
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              #{order.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {order.user_name}
                                </div>
                                <div className="text-sm text-gray-900">
                                  {order.user_email}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatPrice(order.total_amount)}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                              <div className="space-y-1">
                                <div className="font-medium text-gray-800">
                                  {(() => {
                                    try {
                                      const address = JSON.parse(order.shipping_address);
                                      return `${address.firstName || ''} ${address.lastName || ''}`.trim();
                                    } catch {
                                      return 'Khách hàng';
                                    }
                                  })()}
                                </div>
                                <div className="text-gray-600 text-xs">
                                  {(() => {
                                    try {
                                      const address = JSON.parse(order.shipping_address);
                                      const parts = [];
                                      if (address.address) parts.push(address.address);
                                      if (address.ward) parts.push(address.ward);
                                      if (address.district) parts.push(address.district);
                                      if (address.city) parts.push(address.city);
                                      return parts.join(', ');
                                    } catch {
                                      return 'Không có địa chỉ';
                                    }
                                  })()}
                                </div>
                                {(() => {
                                  try {
                                    const address = JSON.parse(order.shipping_address);
                                    return address.phone ? (
                                      <div className="text-blue-600 text-xs flex items-center">
                                        📞 {address.phone}
                                      </div>
                                    ) : null;
                                  } catch {
                                    return null;
                                  }
                                })()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatDate(order.created_at)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleViewOrder(order)}
                                  className="text-blue-600 hover:text-blue-900"
                                  title="Xem chi tiết"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                                {order.status === 'pending' && (
                                  <button
                                    onClick={() => handleUpdateOrderStatus(order.id, 'confirmed')}
                                    className="text-green-600 hover:text-green-900"
                                    title="Xác nhận đơn hàng"
                                  >
                                    ✓
                                  </button>
                                )}
                                {order.status === 'confirmed' && (
                                  <button
                                    onClick={() => handleUpdateOrderStatus(order.id, 'shipped')}
                                    className="text-purple-600 hover:text-purple-900"
                                    title="Đánh dấu đã gửi hàng"
                                  >
                                    🚚
                                  </button>
                                )}
                                {order.status === 'shipped' && (
                                  <button
                                    onClick={() => handleUpdateOrderStatus(order.id, 'delivered')}
                                    className="text-green-600 hover:text-green-900"
                                    title="Đánh dấu đã giao hàng"
                                  >
                                    ✓
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Stock Tab */}
              {activeTab === 'stock' && (
                <div>
                  <h3 className="text-lg font-semibold mb-6">Quản lý kho hàng</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                            Sản phẩm
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                            Tồn kho hiện tại
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                            Trạng thái
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                            Thao tác
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                          <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-12 w-12">
                                  {product.image ? (
                                    <img
                                      className="h-12 w-12 rounded-lg object-cover"
                                      src={product.image}
                                      alt={product.name}
                                    />
                                  ) : (
                                    <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                      <span className="text-gray-400">🏃</span>
                                    </div>
                                  )}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {product.name}
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    {getCategoryName(product.category)}
                                    {product.product_type && (
                                      <span className="ml-2 text-xs">
                                        • {getProductTypeName(product.product_type)}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {product.stock}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                product.stock > 50 ? 'bg-green-100 text-green-800' :
                                product.stock > 20 ? 'bg-yellow-100 text-yellow-800' :
                                product.stock > 0 ? 'bg-orange-100 text-orange-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {product.stock > 50 ? 'Còn nhiều' :
                                 product.stock > 20 ? 'Còn ít' :
                                 product.stock > 0 ? 'Sắp hết' :
                                 'Hết hàng'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleEdit(product)}
                                className="text-blue-600 hover:text-blue-900"
                                title="Cập nhật số lượng"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}