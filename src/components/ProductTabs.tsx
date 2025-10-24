'use client';

import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

interface ProductTabsProps {
  specifications: Record<string, string>;
  features: string[];
  reviews: Array<{
    name: string;
    rating: number;
    date: string;
    comment: string;
    helpful: number;
  }>;
}

export default function ProductTabs({ specifications, features, reviews = [] }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Mô tả sản phẩm' },
    { id: 'specifications', label: 'Thông số kỹ thuật' },
    { id: 'reviews', label: 'Đánh giá' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'description' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mô tả chi tiết</h3>
              <p className="text-gray-600 leading-relaxed">
                Sản phẩm được thiết kế với công nghệ tiên tiến nhất, mang đến trải nghiệm sử dụng tuyệt vời. 
                Chất liệu cao cấp đảm bảo độ bền và tính thẩm mỹ vượt trội. Sản phẩm phù hợp cho mọi đối tượng 
                từ người mới bắt đầu đến các vận động viên chuyên nghiệp.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tính năng nổi bật</h3>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hướng dẫn sử dụng</h3>
              <ol className="space-y-2 text-gray-600">
                <li className="flex">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0">1</span>
                  <span>Kiểm tra kích thước phù hợp trước khi sử dụng</span>
                </li>
                <li className="flex">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0">2</span>
                  <span>Vệ sinh sản phẩm sau mỗi lần sử dụng</span>
                </li>
                <li className="flex">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0">3</span>
                  <span>Bảo quản ở nơi khô ráo, thoáng mát</span>
                </li>
                <li className="flex">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0">4</span>
                  <span>Tránh tiếp xúc trực tiếp với ánh nắng mặt trời</span>
                </li>
              </ol>
            </div>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Thông số kỹ thuật</h3>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries(specifications).map(([key, value], index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-1/3">
                        {key}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Review Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Đánh giá sản phẩm</h3>
                <div className="flex items-center">
                  <div className="flex items-center mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-gray-900">4.8</span>
                  <span className="text-gray-600 ml-2">(124 đánh giá)</span>
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <span className="text-sm text-gray-600 w-8">{rating}</span>
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-2" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full" 
                        style={{ width: `${rating === 5 ? 80 : rating === 4 ? 15 : rating === 3 ? 3 : rating === 2 ? 1 : 1}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">
                      {rating === 5 ? 80 : rating === 4 ? 15 : rating === 3 ? 3 : rating === 2 ? 1 : 1}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900">Đánh giá gần đây</h4>
              
              {/* Mock Reviews */}
              {[
                {
                  name: 'Nguyễn Văn A',
                  rating: 5,
                  date: '2 ngày trước',
                  comment: 'Sản phẩm rất tốt, chất lượng cao. Tôi rất hài lòng với việc mua sắm tại đây.',
                  helpful: 12
                },
                {
                  name: 'Trần Thị B',
                  rating: 4,
                  date: '1 tuần trước',
                  comment: 'Sản phẩm đúng như mô tả, giao hàng nhanh. Chỉ có một chút nhỏ về kích thước nhưng vẫn ổn.',
                  helpful: 8
                },
                {
                  name: 'Lê Văn C',
                  rating: 5,
                  date: '2 tuần trước',
                  comment: 'Tuyệt vời! Sẽ mua lại lần nữa. Dịch vụ khách hàng rất tốt.',
                  helpful: 15
                }
              ].map((review, index) => (
                <div key={index} className="border-b border-gray-200 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h5 className="font-semibold text-gray-900">{review.name}</h5>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mt-3 mb-4">{review.comment}</p>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Hữu ích?</span>
                    <button className="flex items-center ml-2 text-blue-600 hover:text-blue-700">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Có ({review.helpful})
                    </button>
                    <button className="flex items-center ml-4 text-gray-400 hover:text-gray-600">
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      Không
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Write Review Button */}
            <div className="text-center pt-6">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                Viết đánh giá
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
