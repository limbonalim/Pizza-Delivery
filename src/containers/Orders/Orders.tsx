import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchOrders} from '../../store/adminSlice/adminThunks';
import {selectIsDishesLoading, selectIsOrdersLoading, selectOrders} from '../../store/adminSlice/adminSlice';
import MemoOrderItem from './OrderItem';
import Loading from '../../components/Loading/Loading';


const Orders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const isOrdersLoading = useAppSelector(selectIsOrdersLoading);
  const isDishesLoading = useAppSelector(selectIsDishesLoading);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (isOrdersLoading || isDishesLoading) ? <Loading/> : (
    <div className="d-flex flex-column gap-2">
      {orders.map((order) => (<MemoOrderItem key={order.id} order={order}/>))}
    </div>
  );
};

export default Orders;