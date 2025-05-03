import { Form } from './common/Form';
import { OrderData, UserData } from '../types';
import { IEvents } from './base/Events';
import { ensureElement } from '../utils/utils';

export class OrderDataForm extends Form<OrderData> {
	protected _cardButton: HTMLButtonElement;
	protected _cashButton: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._cardButton = ensureElement<HTMLButtonElement>(
			'[name="card"]',
			container
		);
		this._cashButton = ensureElement<HTMLButtonElement>(
			'[name="cash"]',
			container
		);

		const paymentMethod = (event: Event) => {
			const targetElement = event.target as HTMLButtonElement;
			const selectedMethod = targetElement.name;
			events.emit(`order.payment:${selectedMethod}`);
		};
		this._cardButton.addEventListener('click', paymentMethod);
		this._cashButton.addEventListener('click', paymentMethod);
	}

	set payment(value: string) {
		this.toggleClass(
			this._cardButton,
			'button_alt-active',
			this._cardButton.name === value
		);
		this.toggleClass(
			this._cashButton,
			'button_alt-active',
			this._cashButton.name === value
		);
	}

	set adress(value: string) {
		(this.container.elements.namedItem('adress') as HTMLInputElement).value =
			value;
	}
}

export class UserDataForm extends Form<UserData> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}
}
