 type ApiPaymentMethod = 'online' | 'offline';
 type ApiCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

 interface ApiProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: ApiCategory;
  price: number | null;
}

 interface ApiProductListResponse {
  total: number;
  items: ApiProduct[];
}

 interface ApiOrderRequest {
  payment: ApiPaymentMethod;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

 interface ApiOrderResponse {
  id: string;
  total: number;
}

 interface ApiErrorResponse {
  error: string;
}

 interface DisplayCategory {
    apiValue: ApiCategory;
    displayValue: string;
    cssClass: string;
  }
  
   interface DisplayProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: DisplayCategory;
    price: string;
    priceValue: number | null;
    isInCart: boolean;
  }
  
  interface DisplayOrder {
    id: string;
    total: number;
    items: DisplayProduct[];
    payment: ApiPaymentMethod;
    email: string;
    phone: string;
    address: string;
  }

 interface BacketLot {
  title: string;
  price: number | null;
 }

  interface Backet {
  items: BacketLot[];
  total: number | null;
  }