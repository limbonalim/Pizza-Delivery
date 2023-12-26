import React from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';

const Toolbar = () => {
  const {pathname} = useLocation();
  let marker: React.JSX.Element | null = (<Link className="navbar-brand" to="/admin">Admin</Link>);
  let adminMenu: React.JSX.Element | null = (
    <div className="d-flex gap-2">
      <NavLink
        to="/admin/dishes"
        className="nav-link"
        aria-current="page"
      >Dishes</NavLink>
      |
      <NavLink
        to="/admin/orders"
        className="nav-link"
        aria-current="page"
      >Orders</NavLink>
    </div>
  );
  if (pathname === '/') {
    marker = null;
    adminMenu = null;
  }
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <div>
          <Link className="navbar-brand" to="/">Pizza Delivery</Link>
          {marker}
        </div>
        {adminMenu}
      </div>
    </nav>
  );
};

export default Toolbar;