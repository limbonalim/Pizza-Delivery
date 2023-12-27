import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchDishes, fetchOrders} from '../../store/adminSlice/adminThunks';
import {selectOrders} from '../../store/adminSlice/adminSlice';
import MemoOrderItem from './OrderItem';


const Orders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchDishes());
    dispatch(fetchOrders());
  }, []);

  return (
    <div className="d-flex flex-column gap-2">
      {orders.map((order) => (<MemoOrderItem key={order.id} order={order}/>))}
    </div>
  );
};

export default Orders;