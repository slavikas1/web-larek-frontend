export type ApiPaymentMethod = 'online' | 'offline';
export type ApiCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

export interface ApiProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: ApiCategory;
  price: number | null;
}

export interface ApiProductListResponse {
  total: number;
  items: ApiProduct[];
}

export interface ApiOrderRequest {
  payment: ApiPaymentMethod;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export interface ApiOrderResponse {
  id: string;
  total: number;
}

export interface ApiErrorResponse {
  error: string;
}

export interface DisplayCategory {
    apiValue: ApiCategory;
    displayValue: string;
    cssClass: string;
  }
  
  export interface DisplayProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: DisplayCategory;
    price: string;
    priceValue: number | null;
    isInCart: boolean;
  }
  
  export interface DisplayOrder {
    id: string;
    total: number;
    items: DisplayProduct[];
    payment: ApiPaymentMethod;
    email: string;
    phone: string;
    address: string;
  }