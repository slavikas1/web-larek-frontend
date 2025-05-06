import {
	FormErrors,
	IAppState,
	ApiProduct,
	OrderForm,
	OrderData,
	UserData,
} from '../types';
import { IEvents } from './base/Events';

export type CatalogChangeEvent = {
	catalog: ApiProduct[];
};

export class AppState implements IAppState {
	events: IEvents;
	basket: string[] = [];
	catalog: ApiProduct[];
	order: OrderForm = {
		email: '',
		phone: '',
		payment: '',
		address: '',
	};
	preview: string | null;
	formErrors: FormErrors = {};

	constructor(events: IEvents) {
		this.events = events;
	}

	getOrder() {
		return this.order;
	}

	getBasket() {
		return this.basket;
	}

	toggleOrderedItem(id: string, isIncluded: boolean) {
		const item = this.catalog.find((it) => it.id === id);
		if (!item || item.price === null) {
			return;
		}
		if (isIncluded) {
			this.basket.push(id);
		} else {
			this.basket = this.basket.filter((compareId) => compareId !== id);
		}
		this.events.emit('basket:change');
	}

	clearBasket() {
		this.basket = [];
		this.events.emit('basket:change');
	}

	getTotal() {
		return this.basket.reduce(
			(a, c) => a + this.catalog.find((it) => it.id === c).price,
			0
		);
	}

	setCatalog(items: ApiProduct[]) {
		this.catalog = items;
		this.events.emit('catalog:changed', { catalog: this.catalog });
	}

	setPreview(item: ApiProduct) {
		this.preview = item.id;
		this.events.emit('preview:changed', item);
	}

	getOrderedItems(): ApiProduct[] {
		return this.catalog.filter((item) => this.basket.includes(item.id));
	}

	setOrderField(field: keyof OrderData, value: string) {
		this.order[field] = value;
		this.validateOrder();
	}

	setUserField(field: keyof UserData, value: string) {
		this.order[field] = value;
		this.validateUser();
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		if (!this.order.payment) {
			errors.payment = 'Необходимо указать способ оплаты';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	validateUser() {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}
