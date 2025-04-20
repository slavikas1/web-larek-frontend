# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Описание классов и компонентов
Для данной проектной работы был выбран паттерн MVP, который делится на:
- Слой данных (Model): под Моделью, обычно понимается часть содержащая в себе функциональную бизнес-логику приложения;
- Слой отображения (View): в обязанности Представления входит отображение данных полученных от Модели;
- Слой взаимодействия (Presenter): слой, который связывает Model и View.

Слой Model

class ProductDate {  - этот класс служит для работы с данными приложения
 Поля:
 products: ApiProduct[]; - описание товаров с сервера
 backet: Backet; - описание корзины
 order: DisplayOrder; - описание заказа
 Методы: 
 constructor(eventEmitter: EventEmitter);
 getProducts(): ApiProduct[]; - метод получения данных о продуктах
 getBacket(): Backet; - метод получения данных корзины
 makeOrder(orderData: OrderData, userData: UserData, backet: Backet): DisplayOrder; - метод создания заказа
 addProductToBacket(product: ApiProduct): void; - метод добавления товара в корзину
 deleteProductFromBacket(product: ApiProduct): void; - метод удаления товара из корзины
 openProduct(): ApiProduct; - метод открытия карточки товара
 checkValidation(data: Record<keyof ValidationData, string>): boolean; - метод валидации данных заказа   
}

Слой View

class BacketButton { - класс кнопки корзины
Поля:
backetButton: HTMLButtonElement; - кнопка корзины
backetCounter: number; - счетчик корзины
Методы:
openBacket(): void; - метод открытия корзины
backetItemsCount(): number; - метод подсчета товаров в корзине
renderBacketButton(): HTMLElement;
}

class ProductList { - этот класс служит для отображения массива товаров
Поля: 
products: ApiProduct[]; - описание товаров с сервера
Методы:
constructor(products: ApiProduct[]);
renderProducts(): HTMLElement;
}

class Product { - этот класс служит для отображения карточки товара
Поля:
product: ApiProduct; - описание товара
Методы:
constructor(product: ApiProduct);
renderProduct(): HTMLElement;
}

class Backet { - этот класс служит для отображения корзины
Поля:
backetLotContainer: HTMLElement; - список товаров
Методы:
constructor(backet: BacketLot[]);
renderBacket(): HTMLElement;
}

class OrderDataDelivery { - этот класс служит для отображения попапа заполнения способа оплаты и адреса доставки
Поля:
paymentMethod: ApiPaymentMethod; - выбор способа оплаты
adress: HTMLInputElement; - поле адреса
nextButton: HTMLButtonElement; - кнопка "Далее"
Методы:
constructor(paymentMethod: ApiPaymentMethod, adress: HTMLInputElement, nextButton: HTMLButtonElement);
renderModal(): HTMLElement;
}

class OrderData { - этот класс служит для отображения попапа заполнения электронной почты и телефона
Поля:
email: HTMLInputElement; - поле электронной почты
phone: HTMLInputElement; - поле телефона
payButton: HTMLButtonElement; - кнопка "Оплатить"
Методы:
constructor(email: HTMLInputElement, phone: HTMLInputElement, payButton: HTMLButtonElement);
renderModal(): HTMLElement;
}

class OrderDone { - этот класс служит для отображения попапа оформленного заказа
Поля:
total: number; - общая сумма списанных единиц 
doneButton: HTMLButtonElement; - кнопка "За новыми покупками!"
Методы:
constructor(total: number, doneButton: HTMLButtonElement);
renderModal(): HTMLElement;
}

class Popup { - класс общих элементов попапов
Поля:
modalContainer: HTMLElement; - контейнер для отображения контента
Методы:
constructor(modalContainer: HTMLElement);
openModal(): void; - открытие попапа
closeModal(): void; - закрытие попапа
renderModal(): void; - метод отображения попапа
}

Слой Presenter

class EventEmitter { - этот класс обеспечивает работу событий
Поля:
 _events: Map<EventName, Set<Subscriber>>; - хранит события и обработчики
 Методы:  
 constructor();
 on(eventName: EventName, callback: (event: T) => void) - устанавливает обработчик на событие
 off(eventName: EventName, callback: Subscriber) - снимает обработчик с события
 emit(eventName: string, data?: T) - инициирует событие с данными
 onAll(callback: (event: EmitterEvent) => void) - слушает все события
 offAll() - сбрасывает все обработчики
 trigger(eventName: string, context?: Partial<T>) - делает коллбек триггер, генерирующий событие при вызове
}

class Api { - устраняет дублирование кода и обеспечивает единообразие работы с сервером
Поля:
 baseUrl: string; - хранит базовый Url
 options: RequestInit; - хранит настройку для запросов
Методы:
 constructor(baseUrl: string, options: RequestInit = {});
 handleResponse(response: Response): Promise<object>; - обработчик ответа
 get(uri: string); - отправление get-запроса
post(uri: string, data: object, method: ApiPostMethods = 'POST'); - отправление post-запроса
}

Список событий
- событие товаров: открытие/закрытие карточки товара, добавление/удаление товаров из корзины.
- событе корзины: открытие/закрытие корзины, изменение представления списка товаров в корзине.
- событие заказа: открытие/закрытие формы заказа, переход в форму заполнения пользовательских данных, выбор способа оплаты, оформление заказа.
- событие на главной странице: отрисовка витрины с продуктами, отрисовка кнопки корзины, подсчет товаров в корзине.