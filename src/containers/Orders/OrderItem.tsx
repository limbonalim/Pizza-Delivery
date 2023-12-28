import React, {useMemo, useState} from 'react';
import {Order} from '../../types';
import {DELIVERY} from '../../constants';
import './OrderItem.css';
import {useAppDispatch} from '../../app/hooks';
import {fetchDeleteOrder, fetchOrders} from '../../store/adminSlice/adminThunks';
import {setDeletingOrder} from '../../store/adminSlice/adminSlice';


interface Props {
  order: Order;
}

const MemoOrderItem: React.FC<Props> = React.memo(function OrderItem({order}) {
  const [total, setTotal] = useState<number>(0);
  const [isShowInfo, setIsShowInfo] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  let info;

  useMemo(() => {
    setTotal(order.dishes.reduce((acc, dish) => {
      return acc + (dish.price * dish.quantity);
    }, 0));
  }, [order.id]);

  const editPhone = (phone: string) => {
    const edit = phone.split('');
    return `+996 (${edit[0]}${edit[1]}${edit[2]}) ${edit[3]}${edit[4]}-${edit[5]}${edit[6]}-${edit[7]}${edit[8]}`;
  };

  const handleComplete = async () => {
    dispatch(setDeletingOrder(order.id));
    await dispatch(fetchDeleteOrder(order.id));
    dispatch(fetchOrders());
  };

  if (isShowInfo) {
    info = (
      <div className="my-2 border-top border-bottom border-info text-nowrap">
        <p>Name: {order.client.name}</p>
        <p>Address: {order.client.address}</p>
        <p>Phone: {editPhone(order.client.phone)}</p>
      </div>
    );
  }

  return (
    <div className="d-flex gap-3 justify-content-between border-primary border p-2 OrderItem">
      <div className="flex-grow-1">
        {order.dishes.map((item, index) => (
          <div key={index} className="d-flex align-items-center justify-content-between gap-5 mb-2 border-bottom">
            <span className={item.title === 'ERROR!' ? 'text-bg-danger' : ''}>{item.quantity}X {item.title}</span>
            <span className="text-nowrap">{item.price * item.quantity} KGS</span>
          </div>
        ))}
        <div className="d-flex align-items-center justify-content-between gap-5 mb-2 border-bottom">
          <span>Delivery</span>
          <span className="text-nowrap">{DELIVERY} KGS</span>
        </div>
        {info}
      </div>
      <div>
        <p className="text-secondary">Order total: <span className="d-block">{total + DELIVERY} KGS</span></p>
        <div className="d-flex gap-2 flex-column">
          <button
            onClick={() => setIsShowInfo(prevState => !prevState)}
            className="btn btn-outline-info text-nowrap"
          >{isShowInfo ? 'Close' : 'Show'} info
          </button>
          <button
            disabled={order.isDeleting}
            onClick={handleComplete}
            className="btn btn-outline-success"
          >Complete
          </button>
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return (prevProps.order.id === nextProps.order.id) && (prevProps.order.client.name === nextProps.order.client.name) && (prevProps.order.isDeleting === nextProps.order.isDeleting);
});

export default MemoOrderItem;