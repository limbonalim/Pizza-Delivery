export interface ApiDishes {
  [id: string]: ApiDish;
}

export interface ApiOrders {
  [id: string]: ApiOrder;
}

export interface Cart {
  [id: string]: number;
}

export interface Contact {
  name: string;
  address: string;
  phone: string;
}

export interface ApiOrder {
  id: string;
  order: Cart;
  client: Contact;
}

export type FormApiOrder = Omit<ApiOrder, 'id'>

export interface Dish {
  id: string;
  title: string;
  price: number;
  image: string;
  isDeleting: boolean;
}

export type ApiDish = Omit<Dish, 'id', 'isDeleting'>

export interface EditDish {
  id: string;
  dish: ApiDish;
}

export interface Order {
  id: string;
  client: Contact;
  dishes: OrderDish[];
}

export interface OrderDish {
  price: number;
  quantity: number;
  title: string;
}