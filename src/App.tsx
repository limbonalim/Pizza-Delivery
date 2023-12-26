import {Route, Routes} from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import Home from './containers/Home/Home';
import NotFound from './containers/NotFound/NotFound';
import Admin from "./containers/Admin/Admin";
import Orders from "./containers/Orders/Orders";
import DishForm from "./containers/DishForm/DishForm";

const App = () => {

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={(<Home/>)}/>
          <Route path="/admin" element={(<Admin/>)}/>
          <Route path="/admin/dishes" element={(<Admin/>)}/>
          <Route path="/admin/orders" element={(<Orders/>)}/>
          <Route path="/admin/new-dish" element={(<DishForm/>)}/>
          <Route path="/admin/edit/:id" element={(<DishForm/>)}/>
          <Route path="*" element={(<NotFound/>)}/>
        </Routes>
      </Layout>
      {/*<Dish*/}
      {/*  id="someId"*/}
      {/*  isShowButtons={true}*/}
      {/*  title="Some Dish"*/}
      {/*  price={320}*/}
      {/*  image="https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSVhJ46pOBVylg5_ZnYilSr14xSgJwSZ386f8C6hRKrA0MRiCpn2ozG-Bfcxa3bSdJ-"*/}
      {/*></Dish>*/}
    </>
  );
};

export default App;
