import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/Events';
import { AppState } from './components/AppData';
import { Page } from './components/Page';
import { OpenedCard, ItemsBasket, CatalogItem } from './components/Card';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Modal } from './components/common/Modal';
import { Basket } from './components/common/Basket';
import { ApiProduct, OrderData, OrderForm, UserData } from './types';
import { OrderDataForm, UserDataForm } from './components/Order';
import { Success } from './components/common/Success';
import { WebLarekAPI } from './components/WebLarekAPI';

const events = new EventEmitter();
const api = new WebLarekAPI(CDN_URL, API_URL);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

// Модель данных приложения
const appData = new AppState(events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
console.log(page);

// Переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new OrderDataForm(cloneTemplate(orderTemplate), events);
const constants = new UserDataForm(cloneTemplate(contactsTemplate), events);

// Дальше идет бизнес-логика
// Поймали событие, сделали что нужно

// Изменились элементы каталога
events.on('catalog:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new CatalogItem(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render(item);
	});

	page.counter = appData.getOrderedItems().length;
});

// Отправлена форма заказа
events.on('contacts:submit', () => {
	const order = {
		...appData.getOrder(),
		items: appData.getBasket(),
		total: appData.getTotal(),
	};
	api
		.orderResponse(order)
		.then(() => {
			appData.clearBasket();
			const success = new Success(cloneTemplate(successTemplate), {
				onClick: () => {
					modal.close();
				},
			});
			success.total = order.total;
			modal.render({
				content: success.render({}),
			});
			events.emit('success:open');
		})
		.catch((err) => {
			console.error(err);
		});
});

// Изменилось состояние валидации формы
events.on('formErrors:change', (errors: Partial<OrderForm>) => {
	const { email, phone } = errors;
	const { payment, address } = errors;
	constants.valid = !email && !phone;
	constants.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
	order.valid = !payment && !address;
	order.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
});

events.on('order.payment:cash', () => {
	order.payment = 'cash';
	appData.setOrderField('payment', 'cash');
});

events.on('order.payment:card', () => {
	order.payment = 'card';
	appData.setOrderField('payment', 'card');
});

// Изменилось одно из полей
events.on(
	/^order\..*:change/,
	(data: { field: keyof OrderData; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

events.on(
	/^contacts\..*:change/,
	(data: { field: keyof UserData; value: string }) => {
		appData.setUserField(data.field, data.value);
	}
);

// Открыть форму заказа
events.on('order:open', () => {
	appData.setOrderField('payment', '');
	appData.setOrderField('address', '');
	modal.render({
		content: order.render({
			payment: '',
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on('order:submit', () => {
	appData.setUserField('email', '');
	appData.setUserField('phone', '');
	modal.render({
		content: constants.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
	events.emit('constacts:open');
});

// Открыть карточку товара
events.on('card:select', (item: ApiProduct) => {
	appData.setPreview(item);
	console.log(item);
	events.emit('preview:open');
});

// Открыть выбранную карточку
events.on('preview:changed', (item: ApiProduct) => {
	const card = new OpenedCard(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			const isInBasket = appData.basket.find((Id) => Id === item.id);
			appData.toggleOrderedItem(item.id, !isInBasket);

			if (isInBasket) {
				card.setButtonText('Купить');
			} else {
				card.setButtonText('Убрать');
			}
		},
	});
	modal.render({ content: card.render(item) });
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
});

// Открытие корзины
events.on('basket:open', () => {
	modal.render({ content: basket.render() });
});

// Изменение товаров в корзине
events.on('basket:change', () => {
	basket.items = appData.getOrderedItems().map((item) => {
		const card = new ItemsBasket(cloneTemplate(cardBasketTemplate), {
			onClick: () => {
				events.emit('basket-item:remove');
				appData.toggleOrderedItem(item.id, false);
				basket.total = appData.getTotal();
			},
		});
		return card.render(item);
	});
	basket.total = appData.getTotal();
	page.counter = appData.basket.length;
});

// Получаем лоты с сервера
api
	.getItemList()
	.then((data) => {
		appData.setCatalog(data), console.log(data);
	})
	.catch((err) => {
		console.error(err);
	});
