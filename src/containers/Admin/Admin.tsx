import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import Dish from '../../components/Dish/Dish';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectDishes} from '../../store/adminSlice';
import {fetchDishes} from '../../store/adminThunks';

const Admin = () => {
  const dishes = useAppSelector(selectDishes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDishes());
  }, []);
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h1>Dishes:</h1>
        <Link className="btn btn-outline-primary" to="/admin/new-dish">Add new Dish</Link>
      </div>
      <div className="d-flex flex-column gap-2">
        {dishes.map((item) => (
          <Dish
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
            isShowButtons
          />
        ))}
      </div>
    </>
  );
};

export default Admin;