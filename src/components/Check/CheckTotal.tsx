import {DELIVERY} from '../../constants';
import {Button} from 'react-bootstrap';
import CheckItem from './CheckItem';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectDishes} from '../../store/adminSlice/adminSlice';
import {
  clearChart,
  closeCheckoutModal,
  selectCart,
  selectTotal,
  showCheckForm
} from '../../store/clientSlice/clientSlice';

interface CheckItemType {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

const CheckTotal = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const cart = useAppSelector(selectCart);
  const total = useAppSelector(selectTotal);

  let test: CheckItemType[] = [];

  if (dishes && cart) {
    const keys = Object.keys(cart);
    test = keys.map((id) => {
      const index = dishes.findIndex((dish) => dish.id === id);
      return {
        id,
        title: dishes[index].title,
        price: dishes[index].price,
        quantity: cart[id],
      };
    });
  }

  const handleOrder = () => {
    dispatch(showCheckForm());
  };

  const handleCancel = () => {
    dispatch(clearChart());
    dispatch(closeCheckoutModal());
  };

  const inner = test.length > 0 ? test.map((item) => (
    <CheckItem
      key={item.id}
      id={item.id}
      title={item.title}
      price={item.price}
      quantity={item.quantity}
    />
  )) : null;

  if (Object.keys(cart).length === 0) {
    dispatch(closeCheckoutModal());
  }

  return (
    <>
      <div className="d-flex flex-column gap-2 mb-3">
        {inner}
      </div>
      <div className="pb-3 justfy-center">
        <div className="d-flex flex-column text-center gap-2">
          <span>Total: {total + DELIVERY} KGS</span>
          <span className="text-secondary">Delivery: {DELIVERY} KGS</span>
          <div>
            <Button variant="secondary" className="me-2" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleOrder}>
              Order
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckTotal;