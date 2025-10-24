export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const productCategories: ProductCategory[] = [
  {
    id: 'football',
    name: 'Bóng đá',
    description: 'Giày đá bóng, quần áo bóng đá, phụ kiện bóng đá',
    icon: '⚽'
  },
  {
    id: 'basketball',
    name: 'Bóng rổ',
    description: 'Giày bóng rổ, quần áo bóng rổ, bóng rổ',
    icon: '🏀'
  },
  {
    id: 'running',
    name: 'Chạy bộ',
    description: 'Giày chạy bộ, quần áo thể thao, phụ kiện chạy bộ',
    icon: '🏃‍♂️'
  },
  {
    id: 'gym',
    name: 'Gym & Fitness',
    description: 'Quần áo gym, giày tập gym, phụ kiện fitness',
    icon: '💪'
  },
  {
    id: 'tennis',
    name: 'Tennis',
    description: 'Giày tennis, vợt tennis, quần áo tennis',
    icon: '🎾'
  },
  {
    id: 'badminton',
    name: 'Cầu lông',
    description: 'Vợt cầu lông, giày cầu lông, quần áo cầu lông',
    icon: '🏸'
  },
  {
    id: 'swimming',
    name: 'Bơi lội',
    description: 'Đồ bơi, kính bơi, mũ bơi, phụ kiện bơi lội',
    icon: '🏊‍♂️'
  },
  {
    id: 'cycling',
    name: 'Đạp xe',
    description: 'Quần áo đạp xe, giày đạp xe, phụ kiện đạp xe',
    icon: '🚴‍♂️'
  },
  {
    id: 'yoga',
    name: 'Yoga',
    description: 'Thảm yoga, quần áo yoga, phụ kiện yoga',
    icon: '🧘‍♀️'
  },
  {
    id: 'outdoor',
    name: 'Thể thao ngoài trời',
    description: 'Quần áo outdoor, giày leo núi, phụ kiện outdoor',
    icon: '🏔️'
  },
  {
    id: 'winter',
    name: 'Thể thao mùa đông',
    description: 'Quần áo trượt tuyết, giày trượt băng, phụ kiện mùa đông',
    icon: '⛷️'
  },
  {
    id: 'accessories',
    name: 'Phụ kiện thể thao',
    description: 'Túi thể thao, bình nước, khăn thể thao, phụ kiện khác',
    icon: '🎒'
  }
];

// Hàm lấy danh sách thể loại
export const getCategories = (): ProductCategory[] => {
  return productCategories;
};

// Hàm lấy thể loại theo ID
export const getCategoryById = (id: string): ProductCategory | undefined => {
  return productCategories.find(category => category.id === id);
};

// Hàm lấy tên thể loại theo ID
export const getCategoryName = (id: string): string => {
  const category = getCategoryById(id);
  return category ? category.name : 'Không xác định';
};
