import React, {useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import MemoDish from '../../components/Dish/Dish';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectDishes, selectIsDishesLoading} from '../../store/adminSlice/adminSlice';
import {fetchDishes} from '../../store/adminSlice/adminThunks';
import {getTotal, selectCart, selectTotal, showCheckoutModal} from '../../store/clientSlice/clientSlice';
import CheckModal from '../../components/Check/CheckModal';
import './Home.css';
import Loading from '../../components/Loading/Loading';

const Home = () => {
  const total = useAppSelector(selectTotal);
  const dishes = useAppSelector(selectDishes);
  const cart = useAppSelector(selectCart);
  const loading = useAppSelector(selectIsDishesLoading);
  const dispatch = useAppDispatch();
  const {pathname} = useLocation();

  useEffect(() => {
    let sum = dishes.reduce((acc, item) => {
      if (Object.keys(cart).includes(item.id)) {
        return acc + item.price * cart[item.id];
      }
      return acc;
    }, 0);
    dispatch(getTotal(sum));
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
    dispatch(showCheckoutModal());
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

  return loading ? <Loading/> : (
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
      <CheckModal/>
    </>
  );
};

export default Home;