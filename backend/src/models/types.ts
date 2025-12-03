// Database model types

export interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
  date_of_birth?: Date;
  bio?: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  icon?: string;
  display_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Venue {
  id: number;
  name: string;
  slug: string;
  description?: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  website?: string;
  image_url?: string;
  capacity?: number;
  category_id?: number;
  rating: number;
  total_reviews: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Event {
  id: number;
  title: string;
  slug: string;
  description?: string;
  short_description?: string;
  image_url?: string;
  venue_id?: number;
  category_id?: number;
  event_date: Date;
  start_time: string;
  end_time?: string;
  price_min: number;
  price_max?: number;
  currency: string;
  capacity?: number;
  tickets_available?: number;
  is_featured: boolean;
  is_active: boolean;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  created_by?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Offer {
  id: number;
  title: string;
  description?: string;
  discount_percentage?: number;
  discount_amount?: number;
  original_price: number;
  final_price: number;
  currency: string;
  image_url?: string;
  venue_id?: number;
  category_id?: number;
  valid_from: Date;
  valid_until?: Date;
  terms_conditions?: string;
  max_redemptions?: number;
  current_redemptions: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface EventAttendee {
  id: number;
  event_id: number;
  user_id: string;
  status: 'going' | 'interested' | 'not_going';
  checked_in: boolean;
  checked_in_at?: Date;
  created_at: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
