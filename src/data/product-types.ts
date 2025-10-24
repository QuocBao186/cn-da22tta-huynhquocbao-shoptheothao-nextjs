export interface ProductType {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string; // Liên kết với category từ product-categories.ts
}

export const productTypes: ProductType[] = [
  // Bóng đá
  {
    id: 'football-shoes',
    name: 'Giày đá bóng',
    description: 'Giày bóng đá chuyên nghiệp',
    icon: '⚽👟',
    category: 'football'
  },
  {
    id: 'football-jersey',
    name: 'Áo bóng đá',
    description: 'Áo đấu bóng đá',
    icon: '⚽👕',
    category: 'football'
  },
  {
    id: 'football-shorts',
    name: 'Quần đùi bóng đá',
    description: 'Quần đùi bóng đá',
    icon: '⚽🩳',
    category: 'football'
  },
  {
    id: 'football-socks',
    name: 'Tất bóng đá',
    description: 'Tất dài bóng đá',
    icon: '⚽🧦',
    category: 'football'
  },
  {
    id: 'football-ball',
    name: 'Bóng đá',
    description: 'Bóng đá chính thức',
    icon: '⚽',
    category: 'football'
  },
  {
    id: 'football-accessories',
    name: 'Phụ kiện bóng đá',
    description: 'Băng tay, băng đầu gối, găng tay thủ môn',
    icon: '⚽🧤',
    category: 'football'
  },

  // Bóng rổ
  {
    id: 'basketball-shoes',
    name: 'Giày bóng rổ',
    description: 'Giày bóng rổ chuyên nghiệp',
    icon: '🏀👟',
    category: 'basketball'
  },
  {
    id: 'basketball-jersey',
    name: 'Áo bóng rổ',
    description: 'Áo đấu bóng rổ',
    icon: '🏀👕',
    category: 'basketball'
  },
  {
    id: 'basketball-shorts',
    name: 'Quần đùi bóng rổ',
    description: 'Quần đùi bóng rổ',
    icon: '🏀🩳',
    category: 'basketball'
  },
  {
    id: 'basketball-ball',
    name: 'Bóng rổ',
    description: 'Bóng rổ chính thức',
    icon: '🏀',
    category: 'basketball'
  },
  {
    id: 'basketball-accessories',
    name: 'Phụ kiện bóng rổ',
    description: 'Băng tay, băng đầu gối, băng cổ tay',
    icon: '🏀🧤',
    category: 'basketball'
  },

  // Chạy bộ
  {
    id: 'running-shoes',
    name: 'Giày chạy bộ',
    description: 'Giày chạy bộ chuyên nghiệp',
    icon: '🏃‍♂️👟',
    category: 'running'
  },
  {
    id: 'running-shirt',
    name: 'Áo chạy bộ',
    description: 'Áo thun chạy bộ',
    icon: '🏃‍♂️👕',
    category: 'running'
  },
  {
    id: 'running-shorts',
    name: 'Quần đùi chạy bộ',
    description: 'Quần đùi chạy bộ',
    icon: '🏃‍♂️🩳',
    category: 'running'
  },
  {
    id: 'running-tights',
    name: 'Quần bó chạy bộ',
    description: 'Quần bó chạy bộ',
    icon: '🏃‍♂️👖',
    category: 'running'
  },
  {
    id: 'running-accessories',
    name: 'Phụ kiện chạy bộ',
    description: 'Băng tay, băng đầu, túi đựng nước',
    icon: '🏃‍♂️🎒',
    category: 'running'
  },

  // Gym & Fitness
  {
    id: 'gym-shoes',
    name: 'Giày tập gym',
    description: 'Giày tập gym chuyên nghiệp',
    icon: '💪👟',
    category: 'gym'
  },
  {
    id: 'gym-shirt',
    name: 'Áo tập gym',
    description: 'Áo thun tập gym',
    icon: '💪👕',
    category: 'gym'
  },
  {
    id: 'gym-shorts',
    name: 'Quần đùi tập gym',
    description: 'Quần đùi tập gym',
    icon: '💪🩳',
    category: 'gym'
  },
  {
    id: 'gym-leggings',
    name: 'Quần bó tập gym',
    description: 'Quần bó tập gym',
    icon: '💪👖',
    category: 'gym'
  },
  {
    id: 'gym-accessories',
    name: 'Phụ kiện gym',
    description: 'Găng tay tập, băng tay, khăn lau mồ hôi',
    icon: '💪🧤',
    category: 'gym'
  },

  // Tennis
  {
    id: 'tennis-shoes',
    name: 'Giày tennis',
    description: 'Giày tennis chuyên nghiệp',
    icon: '🎾👟',
    category: 'tennis'
  },
  {
    id: 'tennis-shirt',
    name: 'Áo tennis',
    description: 'Áo polo tennis',
    icon: '🎾👕',
    category: 'tennis'
  },
  {
    id: 'tennis-shorts',
    name: 'Quần đùi tennis',
    description: 'Quần đùi tennis',
    icon: '🎾🩳',
    category: 'tennis'
  },
  {
    id: 'tennis-racket',
    name: 'Vợt tennis',
    description: 'Vợt tennis chuyên nghiệp',
    icon: '🎾',
    category: 'tennis'
  },
  {
    id: 'tennis-balls',
    name: 'Bóng tennis',
    description: 'Bóng tennis chính thức',
    icon: '🎾',
    category: 'tennis'
  },
  {
    id: 'tennis-accessories',
    name: 'Phụ kiện tennis',
    description: 'Băng tay, băng đầu gối, túi vợt',
    icon: '🎾🎒',
    category: 'tennis'
  },

  // Cầu lông
  {
    id: 'badminton-shoes',
    name: 'Giày cầu lông',
    description: 'Giày cầu lông chuyên nghiệp',
    icon: '🏸👟',
    category: 'badminton'
  },
  {
    id: 'badminton-shirt',
    name: 'Áo cầu lông',
    description: 'Áo cầu lông',
    icon: '🏸👕',
    category: 'badminton'
  },
  {
    id: 'badminton-shorts',
    name: 'Quần đùi cầu lông',
    description: 'Quần đùi cầu lông',
    icon: '🏸🩳',
    category: 'badminton'
  },
  {
    id: 'badminton-racket',
    name: 'Vợt cầu lông',
    description: 'Vợt cầu lông chuyên nghiệp',
    icon: '🏸',
    category: 'badminton'
  },
  {
    id: 'badminton-shuttlecock',
    name: 'Cầu lông',
    description: 'Cầu lông chính thức',
    icon: '🏸',
    category: 'badminton'
  },
  {
    id: 'badminton-accessories',
    name: 'Phụ kiện cầu lông',
    description: 'Băng tay, băng đầu gối, túi vợt',
    icon: '🏸🎒',
    category: 'badminton'
  },

  // Bơi lội
  {
    id: 'swimming-suit',
    name: 'Đồ bơi',
    description: 'Đồ bơi chuyên nghiệp',
    icon: '🏊‍♂️👙',
    category: 'swimming'
  },
  {
    id: 'swimming-goggles',
    name: 'Kính bơi',
    description: 'Kính bơi chống nước',
    icon: '🏊‍♂️🥽',
    category: 'swimming'
  },
  {
    id: 'swimming-cap',
    name: 'Mũ bơi',
    description: 'Mũ bơi chống nước',
    icon: '🏊‍♂️🧢',
    category: 'swimming'
  },
  {
    id: 'swimming-accessories',
    name: 'Phụ kiện bơi lội',
    description: 'Bịt tai, kẹp mũi, phao bơi',
    icon: '🏊‍♂️🩱',
    category: 'swimming'
  },

  // Đạp xe
  {
    id: 'cycling-jersey',
    name: 'Áo đạp xe',
    description: 'Áo đạp xe chuyên nghiệp',
    icon: '🚴‍♂️👕',
    category: 'cycling'
  },
  {
    id: 'cycling-shorts',
    name: 'Quần đạp xe',
    description: 'Quần đạp xe có đệm',
    icon: '🚴‍♂️🩳',
    category: 'cycling'
  },
  {
    id: 'cycling-shoes',
    name: 'Giày đạp xe',
    description: 'Giày đạp xe chuyên nghiệp',
    icon: '🚴‍♂️👟',
    category: 'cycling'
  },
  {
    id: 'cycling-helmet',
    name: 'Mũ bảo hiểm',
    description: 'Mũ bảo hiểm đạp xe',
    icon: '🚴‍♂️⛑️',
    category: 'cycling'
  },
  {
    id: 'cycling-accessories',
    name: 'Phụ kiện đạp xe',
    description: 'Găng tay, kính, túi đựng nước',
    icon: '🚴‍♂️🧤',
    category: 'cycling'
  },

  // Yoga
  {
    id: 'yoga-mat',
    name: 'Thảm yoga',
    description: 'Thảm tập yoga',
    icon: '🧘‍♀️🧘‍♂️',
    category: 'yoga'
  },
  {
    id: 'yoga-clothes',
    name: 'Quần áo yoga',
    description: 'Quần áo tập yoga',
    icon: '🧘‍♀️👕',
    category: 'yoga'
  },
  {
    id: 'yoga-blocks',
    name: 'Gạch yoga',
    description: 'Gạch hỗ trợ yoga',
    icon: '🧘‍♀️🧱',
    category: 'yoga'
  },
  {
    id: 'yoga-accessories',
    name: 'Phụ kiện yoga',
    description: 'Dây yoga, gối yoga, khăn yoga',
    icon: '🧘‍♀️🧘‍♂️',
    category: 'yoga'
  },

  // Thể thao ngoài trời
  {
    id: 'outdoor-clothes',
    name: 'Quần áo outdoor',
    description: 'Quần áo thể thao ngoài trời',
    icon: '🏔️👕',
    category: 'outdoor'
  },
  {
    id: 'outdoor-shoes',
    name: 'Giày leo núi',
    description: 'Giày leo núi chuyên nghiệp',
    icon: '🏔️👟',
    category: 'outdoor'
  },
  {
    id: 'outdoor-backpack',
    name: 'Ba lô outdoor',
    description: 'Ba lô thể thao ngoài trời',
    icon: '🏔️🎒',
    category: 'outdoor'
  },
  {
    id: 'outdoor-accessories',
    name: 'Phụ kiện outdoor',
    description: 'Mũ, kính, găng tay outdoor',
    icon: '🏔️🧤',
    category: 'outdoor'
  },

  // Thể thao mùa đông
  {
    id: 'winter-clothes',
    name: 'Quần áo trượt tuyết',
    description: 'Quần áo thể thao mùa đông',
    icon: '⛷️👕',
    category: 'winter'
  },
  {
    id: 'winter-shoes',
    name: 'Giày trượt băng',
    description: 'Giày trượt băng chuyên nghiệp',
    icon: '⛷️👟',
    category: 'winter'
  },
  {
    id: 'winter-accessories',
    name: 'Phụ kiện mùa đông',
    description: 'Mũ, găng tay, khăn quàng mùa đông',
    icon: '⛷️🧤',
    category: 'winter'
  },

  // Phụ kiện thể thao chung
  {
    id: 'sports-bag',
    name: 'Túi thể thao',
    description: 'Túi đựng đồ thể thao',
    icon: '🎒',
    category: 'accessories'
  },
  {
    id: 'water-bottle',
    name: 'Bình nước',
    description: 'Bình nước thể thao',
    icon: '💧',
    category: 'accessories'
  },
  {
    id: 'sports-towel',
    name: 'Khăn thể thao',
    description: 'Khăn lau mồ hôi',
    icon: '🧻',
    category: 'accessories'
  },
  {
    id: 'sports-watch',
    name: 'Đồng hồ thể thao',
    description: 'Đồng hồ thể thao thông minh',
    icon: '⌚',
    category: 'accessories'
  },
  {
    id: 'sports-headphones',
    name: 'Tai nghe thể thao',
    description: 'Tai nghe chống nước',
    icon: '🎧',
    category: 'accessories'
  }
];

// Hàm lấy danh sách loại sản phẩm theo thể loại
export const getProductTypesByCategory = (categoryId: string): ProductType[] => {
  return productTypes.filter(type => type.category === categoryId);
};

// Hàm lấy tất cả loại sản phẩm
export const getAllProductTypes = (): ProductType[] => {
  return productTypes;
};

// Hàm lấy loại sản phẩm theo ID
export const getProductTypeById = (id: string): ProductType | undefined => {
  return productTypes.find(type => type.id === id);
};

// Hàm lấy tên loại sản phẩm theo ID
export const getProductTypeName = (id: string): string => {
  const type = getProductTypeById(id);
  return type ? type.name : 'Không xác định';
};
