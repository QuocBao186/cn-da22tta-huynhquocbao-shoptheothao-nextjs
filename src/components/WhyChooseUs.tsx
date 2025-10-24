import Link from 'next/link';
import { Shield, Truck, Headphones, Award, RefreshCw, CreditCard } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Chất lượng đảm bảo',
    description: 'Tất cả sản phẩm đều được kiểm tra kỹ lưỡng và đảm bảo chất lượng cao nhất'
  },
  {
    icon: Truck,
    title: 'Giao hàng nhanh chóng',
    description: 'Miễn phí giao hàng toàn quốc trong 24h với đơn hàng từ 500k'
  },
  {
    icon: Headphones,
    title: 'Hỗ trợ 24/7',
    description: 'Đội ngũ tư vấn chuyên nghiệp sẵn sàng hỗ trợ bạn mọi lúc'
  },
  {
    icon: Award,
    title: 'Sản phẩm chính hãng',
    description: '100% sản phẩm chính hãng từ các thương hiệu uy tín trên thế giới'
  },
  {
    icon: RefreshCw,
    title: 'Đổi trả dễ dàng',
    description: 'Chính sách đổi trả linh hoạt trong 30 ngày nếu không hài lòng'
  },
  {
    icon: CreditCard,
    title: 'Thanh toán an toàn',
    description: 'Hỗ trợ nhiều phương thức thanh toán an toàn và tiện lợi'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tại sao chọn SportStore?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất với chất lượng dịch vụ vượt trội
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-blue-600 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Khách hàng tin tưởng</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Sản phẩm đa dạng</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">99%</div>
              <div className="text-blue-100">Khách hàng hài lòng</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">5+</div>
              <div className="text-blue-100">Năm kinh nghiệm</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Sẵn sàng bắt đầu hành trình thể thao?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Tham gia cùng hàng nghìn khách hàng đã tin tưởng và lựa chọn SportStore 
              để nâng cao hiệu suất thể thao của mình.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Mua sắm ngay
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-lg transition-colors"
              >
                Liên hệ tư vấn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
