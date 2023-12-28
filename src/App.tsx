import {Route, Routes, useLocation} from 'react-router-dom';
import {Alert} from 'react-bootstrap';
import Layout from './containers/Layout/Layout';
import NotFound from './containers/NotFound/NotFound';
import Home from './containers/Home/Home';
import Orders from './containers/Orders/Orders';
import DishForm from './containers/DishForm/DishForm';
import {useAppDispatch, useAppSelector} from './app/hooks';
import {
  adminCloseAlert,
  selectAdminMessageAlert,
  selectIsAdminShowAlert
} from './store/adminSlice/adminSlice';
import {closeAlert, selectIsShowAlert, selectMessageAlert} from './store/clientSlice/clientSlice';

const App = () => {
  const isAdminShow = useAppSelector(selectIsAdminShowAlert);
  const adminMessage = useAppSelector(selectAdminMessageAlert);
  const isShow = useAppSelector(selectIsShowAlert);
  const message = useAppSelector(selectMessageAlert);
  const dispatch = useAppDispatch();
  const {pathname} = useLocation();

  const handleClose = () => {
    dispatch(closeAlert());
  };

  const handleAdminClose = () => {
    dispatch(adminCloseAlert());
  };

  let alert = (
    <Alert show={isAdminShow} variant="danger" onClose={handleAdminClose} dismissible>
      <p>
        {adminMessage}
      </p>
    </Alert>
  );

  if (pathname === '/') {
    alert = (
      <Alert show={isShow} variant="danger" onClose={handleClose} dismissible>
        <p>
          {message}
        </p>
      </Alert>
    );
  }

  return (
    <>
      {alert}
      <Layout>
        <Routes>
          <Route path="/" element={(<Home/>)}/>
          <Route path="/admin" element={(<Home/>)}/>
          <Route path="/admin/dishes" element={(<Home/>)}/>
          <Route path="/admin/orders" element={(<Orders/>)}/>
          <Route path="/admin/new-dish" element={(<DishForm/>)}/>
          <Route path="/admin/edit/:id" element={(<DishForm/>)}/>
          <Route path="*" element={(<NotFound/>)}/>
        </Routes>
      </Layout>
    </>
  );
};

export default App;
