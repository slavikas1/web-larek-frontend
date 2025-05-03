import { Component } from './base/Component';
import { ApiProduct, IItemsBasket } from '../types';
import { ensureElement } from '../utils/utils';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export interface ICard<T> {
	title: string;
	image: string;
}

export class Card<T> extends Component<ICard<T>> {
	protected _title: HTMLElement;
	protected _id: string;
	protected _price: HTMLElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);

		this._title = ensureElement<HTMLElement>(`.card__title`, container);
		this._price = ensureElement<HTMLElement>(`.card__price`, container);
	}

	set id(value: string) {
		this._id = value;
	}

	get id(): string {
		return this._id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set price(value: number) {
		if (value === null) {
			this.setText(this._price, `Бесценно`);
		} else {
			this.setText(this._price, `${value} синапсов`);
		}
	}
}

export class CatalogItem extends Card<ApiProduct> {
	protected _category: HTMLElement;
	protected _image: HTMLImageElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container, actions);
		this._category = ensureElement<HTMLElement>(`.card__category`, container);
		this.container.addEventListener('click', actions.onClick);
		this._image = ensureElement<HTMLImageElement>(`.card__image`, container);
	}

	set image(value: string) {
		this.setImage(this._image, value);
	}

	set category(value: string) {
		this.setText(this._category, value);
	}
}

export class OpenedCard extends Card<ApiProduct> {
	protected _category: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _image: HTMLImageElement;
	protected _description: HTMLElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container, actions);
		this._button = ensureElement<HTMLButtonElement>(`.card__button`, container);
		this._category = ensureElement<HTMLElement>(`.card__category`, container);
		this._image = ensureElement<HTMLImageElement>(`.card__image`, container);
		this._description = ensureElement<HTMLElement>(`.card__text`, container);
		this._button.addEventListener('click', actions.onClick);
	}

	set category(value: string) {
		this.setText(this._category, value);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set image(value: string) {
		this.setText(this._image, value);
	}

	setButtonText(value: string) {
		this.setText(this._button, value);
	}
}

export class ItemsBasket extends Card<IItemsBasket> {
	protected _index: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container, actions);
		this._button = ensureElement<HTMLButtonElement>(
			`.basket__item-delete`,
			container
		);
		this._index = ensureElement<HTMLElement>(`.basket__item-index`, container);
		this._button.addEventListener('click', actions.onClick);
	}

	setIndex(value: number) {
		this.setText(this._index, value);
	}
}
