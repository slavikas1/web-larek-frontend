type ApiCategory =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';
export type ValidationData = Pick<DisplayOrder, 'email' | 'address' | 'phone'>;
export type FormErrors = Partial<Record<keyof DisplayOrder, string>>;

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
	payment: string;
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

export interface DisplayOrder {
	id: string;
	items: string;
	total: number;
	payment: string;
	email: string;
	phone: string;
	address: string;
}

export interface BacketLot {
	title: string;
	price: number | null;
}

export interface Backet {
	items: BacketLot[];
	total: number | null;
}

export interface OrderData {
	payment: string;
	address: string;
}

export interface OrderForm extends OrderData, UserData {}

export interface IAppState {
	catalog: ApiProduct[];
	basket: string[];
	preview: string | null;
	order: OrderForm | null;
}

export interface UserData {
	email: string;
	phone: string;
}

export interface IItemsBasket {
	id: string;
	title: string;
	price: number | null;
}
