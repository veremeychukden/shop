import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom'
import { ReactComponent as ShopLogo } from '../../assets/logo.svg';
import CartIcon from '../../components/cart-icon/cart-icon';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown';

import './navigation.scss';
import { CartContext } from '../../contexts/cart.context';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  
  return(
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to='/'>
          <ShopLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to='/shop'>
            Shop
          </Link>
          {
            currentUser ? (
              <span className="nav-link" onClick={signOutUser}>Sign Out</span>)
              : 
              (<Link className="nav-link" to='/auth'>Sign In</Link>)
          }
          <CartIcon />
        </div>
          { isCartOpen && <CartDropdown /> }
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;