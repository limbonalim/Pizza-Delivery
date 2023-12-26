import React from 'react';
import './Dish.css'
import {Link} from 'react-router-dom';

interface Props {
  id: string;
  title: string;
  price: number;
  image: string;
  isShowButtons: boolean
}

const Dish: React.FC<Props> = ({title, price, image, id, isShowButtons}) => {
  const path = id? `/edit/${id}` : '/';



  let buttons = isShowButtons &&(
    <div>
      <button className="btn btn-outline-danger me-2">Delete</button>
      <Link className="btn btn-outline-primary" to={path}>Edit</Link>
    </div>
  )

  return (
    <div className="Dish d-flex justify-content-between align-items-center p-2 border border-2 rounded">
      <div className="d-flex gap-3 align-items-center">
        <img
          src={image}
          alt={title}
        />
        <span>{title}</span>
      </div>
      <span>{price} KGS</span>
      {buttons}
    </div>
  );
};

export default Dish;