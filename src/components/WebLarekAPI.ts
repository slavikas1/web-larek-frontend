import { Api, ApiListResponse } from './base/Api';
import { OrderForm, ApiOrderResponse, ApiProduct } from '../types';

export interface IWebLarekAPI {
	getItemList: () => Promise<ApiProduct[]>;
	getItem: (id: string) => Promise<ApiProduct>;
	orderResponse: (order: OrderForm) => Promise<ApiOrderResponse>;
}

export class WebLarekAPI extends Api implements IWebLarekAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getItem(id: string): Promise<ApiProduct> {
		return this.get(`/product/${id}`).then((item: ApiProduct) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	getItemList(): Promise<ApiProduct[]> {
		return this.get('/product').then((data: ApiListResponse<ApiProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	orderResponse(order: OrderForm): Promise<ApiOrderResponse> {
		return this.post('/order', order).then((data: ApiOrderResponse) => data);
	}
}
