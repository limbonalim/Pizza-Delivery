import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import noImage from '../../assets/NoImage.png';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {createDish, fetchDish, fetchEditDish} from '../../store/adminThunks';
import {clearEditDish, selectEditDish} from '../../store/adminSlice';
import {ApiDish, EditDish} from '../../types';
import './DishForm.css';

interface FormDish {
  title: string;
  price: string;
  image: string;
}

const DishForm = () => {
  const [dish, setDish] = useState<FormDish>({
    title: '',
    price: '',
    image: ''
  });
  const dispatch = useAppDispatch();
  const editDish = useAppSelector(selectEditDish);
  const {id} = useParams();
  const navigate = useNavigate();

  let photo = (
    <img
      className="rounded border image"
      src={noImage}
      alt="No Photo"
    />
  );


  const getEditDish = async (id: string) => {
    await dispatch(fetchDish(id));
  };

  useEffect(() => {
    if (id) {
      void getEditDish(id);
    }
  }, [id]);

  useEffect(() => {
    if (editDish) {
      setDish({
        title: editDish.title,
        price: editDish.price.toString(),
        image: editDish.image
      });
      dispatch(clearEditDish());
    }
  }, [editDish]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setDish((prevState => {
      return {
        ...prevState,
        [name]: value
      };
    }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data: ApiDish = {
      title: dish.title,
      price: parseFloat(dish.price),
      image: dish.image,
    };

    if (id) {
      const editDish: EditDish = {
        id,
        dish: data
      };
      dispatch(fetchEditDish(editDish));
    } else {
      dispatch(createDish(data));
    }
    navigate('/admin');
  };

  if (dish.image) {
    photo = (
      <img
        className="rounded border image"
        src={dish.image}
        alt={dish.title ? dish.title : 'No title'}
      />
    );
  }
  return (
    <form onSubmit={onSubmit}>
      <h1 className="text-secondary">{id ? 'Edit dish' : 'Add new dish'}</h1>
      <div className="row mb-3">
        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title:</label>
            <input
              onChange={onChange}
              value={dish.title}
              type="text"
              className="form-control"
              name="title"
              id="title"
              placeholder="Pepperoni"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price:</label>
            <div className="input-group">
              <input
                onChange={onChange}
                value={dish.price}
                type="number"
                className="form-control"
                name="price"
                id="price"
                placeholder="123"
                required
              />
              <span className="input-group-text">KGS</span>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Image:</label>
            <input
              onChange={onChange}
              value={dish.image}
              type="text"
              className="form-control"
              name="image"
              id="image"
              placeholder="Add picture"
              required
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          {photo}
        </div>
      </div>
      <div className="d-flex gap-3">
        <button
          className="btn btn-outline-success"
          type="submit"
        >{id ? 'Edit' : 'Save'}</button>
        <Link
          to="/admin"
          className="btn btn-outline-primary"
        >Back to Admin panel</Link>
      </div>
    </form>
  );
};

export default DishForm;