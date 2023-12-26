interface ApiAnswer {
  [id: string]: ApiDish;
}

interface Dish {
  id: string;
  title: string;
  price: number;
  image: string;
}

type ApiDish = Omit<Dish, 'id'>

export interface EditDish {
  id: string;
  dish: ApiDish;
}