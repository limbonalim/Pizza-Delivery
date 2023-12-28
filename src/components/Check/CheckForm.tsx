import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  clearChart,
  selectCart,
  closeCheckForm,
  closeCheckoutModal,
  selectIsCreateOrder,
} from '../../store/clientSlice/clientSlice';
import {FormApiOrder, Contact} from '../../types';
import {createOrder} from '../../store/clientSlice/clientThunks';

const CheckForm = () => {
  const [client, setClient] = useState<Contact>({
    name: '',
    address: '',
    phone: ''
  });
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const isCreateOrder = useAppSelector(selectIsCreateOrder);
  const [disabled, setDisabled] = useState<boolean>(true);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setClient((prevState => {
      return {
        ...prevState,
        [name]: value
      };
    }));
  };

  useEffect(() => {
    if (client.name.length && client.address.length && client.phone.length) {
      console.log('r')
      setDisabled(false)
    }
  }, [client.name, client.address, client.phone]);

  const handleCansel = () => {
    dispatch(clearChart());
    dispatch(closeCheckForm());
    dispatch(closeCheckoutModal());
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data: FormApiOrder = {
      order: cart,
      client
    };
    dispatch(createOrder(data));
    handleCansel();
  };

  return (
    <>
      <button
        onClick={() => dispatch(closeCheckForm())}
        className="btn mb-2"
      >Back
      </button>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            onChange={onChange}
            value={client.name}
            type="text"
            className="form-control"
            name="name"
            id="name"
            placeholder="Jhone Smith"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address:</label>
          <input
            onChange={onChange}
            value={client.address}
            type="text"
            className="form-control"
            name="address"
            id="address"
            placeholder="MYStreet Name, 3 hous, 21 aprt"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone:</label>
          <input
            onChange={onChange}
            value={client.phone}
            type="tel"
            className="form-control"
            name="phone"
            id="phone"
            placeholder="(888) 88 88 88"
            pattern="[0-9]{9}"
            required
          />
        </div>
        <div className="d-flex gap-3">
          <button
            onClick={handleCansel}
            type="button"
            className="btn btn-outline-secondary"
          >Cancel
          </button>
          <button
            disabled={disabled || isCreateOrder}
            className="btn btn-outline-success"
            type="submit"
          >Order
          </button>
        </div>
      </form>
    </>
  );
};

export default CheckForm;