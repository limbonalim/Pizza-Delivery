import {Modal} from 'react-bootstrap';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  closeCheckoutModal,
  selectIsShowCheckForm,
  selectIsShowCheckoutModal,
} from '../../store/clientSlice/clientSlice';
import CheckForm from './CheckForm';
import CheckTotal from './CheckTotal';

const CheckModal = () => {
  const dispatch = useAppDispatch();
  const isShowCheckForm = useAppSelector(selectIsShowCheckForm);
  const show = useAppSelector(selectIsShowCheckoutModal);

  const handleClose = () => {
    dispatch(closeCheckoutModal());
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isShowCheckForm ? 'Your Contact data:' : 'Your Order:'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isShowCheckForm ? <CheckForm/> : <CheckTotal/>}
      </Modal.Body>
    </Modal>
  );
};

export default CheckModal;