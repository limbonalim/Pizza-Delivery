import {Route, Routes} from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import NotFound from './containers/NotFound/NotFound';
import Home from './containers/Home/Home';
import Orders from './containers/Orders/Orders';
import DishForm from './containers/DishForm/DishForm';

const App = () => {

  return (
    <>
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
