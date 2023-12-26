interface ApiAnswer {
  [id: string]: ApiDish;
}

interface Dish {
  id: string;
  title: string;
  price: number;
  image: string;
  isDeleting: boolean;
}

type ApiDish = Omit<Dish, 'id', 'isDeleting'>

export interface EditDish {
  id: string;
  dish: ApiDish;
}