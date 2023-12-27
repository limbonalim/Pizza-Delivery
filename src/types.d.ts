export interface ApiAnswer {
  [id: string]: ApiDish;
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
  order: Cart;
  client: Contact;
}

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