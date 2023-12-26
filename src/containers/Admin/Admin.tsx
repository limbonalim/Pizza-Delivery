import {Link} from 'react-router-dom';
import Dish from '../../components/Dish/Dish';

const Admin = () => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h1>Dishes:</h1>
        <Link className="btn btn-outline-primary" to="/admin/new-dish">Add new Dish</Link>
      </div>
      <div className="d-flex flex-column gap-2">
        <Dish
          id="someId"
          isShowButtons={true}
          title="Some Dish"
          price={320}
          image="https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSVhJ46pOBVylg5_ZnYilSr14xSgJwSZ386f8C6hRKrA0MRiCpn2ozG-Bfcxa3bSdJ-"
        ></Dish>
      </div>
    </>
  );
};

export default Admin;