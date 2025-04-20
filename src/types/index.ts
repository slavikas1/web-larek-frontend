 type ApiPaymentMethod = 'online' | 'offline';
 type ApiCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';
 type ValidationData = Pick<DisplayOrder, 'email' | 'address' | 'phone'>;

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
    items: string;
    total: number;
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

  interface OrderData {
    payment: ApiPaymentMethod;
    address: string;
  }

  interface UserData {
    email: string;
    phone: string;
  }