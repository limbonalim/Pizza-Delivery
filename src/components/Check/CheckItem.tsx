import React from 'react';
import {useAppDispatch} from '../../app/hooks';
import {deleteItemFromCart} from '../../store/clientSlice/clientSlice';
import './CheckItem.css';

interface Props {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

const MemoCheckItem: React.FC<Props> = React.memo(function CheckItem({id, title, price, quantity}) {
  const dispatch = useAppDispatch();

  return (
    <div className="d-flex justify-content-between align-items-center gap-2 border-bottom pb-1 CheckItem">
      <span className="title">{title}</span>
      <div className="d-flex align-items-center gap-1 info">
        <span className="text-nowrap text-secondary">X {quantity} |</span>
        <span className="text-nowrap">{price} KGS</span>
        <button
          onClick={() => dispatch(deleteItemFromCart(id))}
          className="btn btn-outline-danger"
        >Delete
        </button>
      </div>
    </div>
  );
});

export default MemoCheckItem;