import React from 'react';
import './Dish.css';
import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../app/hooks';
import {fetchDeleteDish, fetchDishes} from '../../store/adminThunks';
import {setDeletingDish} from '../../store/adminSlice';

interface Props {
  id: string;
  title: string;
  price: number;
  image: string;
  isDeleting?: boolean;
  isShowButtons?: boolean;
}

const MemoDish: React.FC<Props> = React.memo(function Dish({title, price, image, id, isDeleting, isShowButtons}) {
  const dispatch = useAppDispatch();
  const path = `/admin/edit/${id}`;

  const getDeleting = async () => {
    dispatch(setDeletingDish(id));
    await dispatch(fetchDeleteDish(id));
    dispatch(fetchDishes());
  };

  let buttons = isShowButtons && (
    <div className="d-flex gap-2 align-self-center buttons">
      <button
        onClick={getDeleting}
        disabled={isDeleting}
        className="btn btn-outline-danger"
      >Delete
      </button>
      {isDeleting ? null :
        <Link
          className="btn btn-outline-primary"
          to={path}
        >Edit</Link>
      }
    </div>
  );

  return (
    <div className="Dish d-flex flex-wrap gap-1 justify-content-between align-items-center p-2 border border-2 rounded">
      <div className="d-flex gap-3 align-items-center">
        <img
          src={image}
          alt={title}
        />
        <span className="title">{title}</span>
      </div>
      <span className="price">{price} KGS</span>
      {buttons}
    </div>
  );
});

export default MemoDish;