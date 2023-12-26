import React, {useEffect, useMemo, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import MemoDish from '../../components/Dish/Dish';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectDishes} from '../../store/adminSlice/adminSlice';
import {fetchDishes} from '../../store/adminSlice/adminThunks';
import {selectCart} from '../../store/clientSlice/clientSlice';
import Check from '../../components/Check/Check';
import './Home.css';

const Home = () => {
  const [total, setTotal] = useState(0);
  const dishes = useAppSelector(selectDishes);
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const {pathname} = useLocation();

  useMemo(() => {
    let sum = dishes.reduce((acc, item) => {
      if (Object.keys(cart).includes(item.id)) {
        return acc + item.price * cart[item.id];
      }
      return acc;
    }, 0);
    setTotal(sum);
  }, [cart]);


  useEffect(() => {
    dispatch(fetchDishes());
  }, []);

  let show = true;
  let addNewLink: React.JSX.Element | null = (
    <Link className="btn btn-outline-primary" to="/admin/new-dish">Add new Dish</Link>
  );
  if (pathname === '/') {
    show = false;
    addNewLink = null;
  }

  const checkout = () => {
    console.log(total, cart);
  };

  let sumBlock: React.JSX.Element | null = (
    <div
      className="text-nowrap position-fixed d-flex align-items-center bottom-0 start-50 translate-middle-x bg-primary text-light p-3 border-top border-end border-start border-3 border-secondary rounded-top total"
    >
      Order Total: {total} KGS
      <button
        onClick={checkout}
        className="btn btn-outline-light ms-5"
      >Checkout</button>
    </div>
  );
  if (!total) {
    sumBlock = null;
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h1>Dishes:</h1>
        {addNewLink}
      </div>
      <div className="d-flex flex-column gap-2 mb-5">
        {dishes.map((item) => (
          <MemoDish
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
            isDeleting={item.isDeleting}
            isShowButtons={show}
          />
        ))}
      </div>
      {sumBlock}
      <Check/>
    </>
  );
};

export default Home;