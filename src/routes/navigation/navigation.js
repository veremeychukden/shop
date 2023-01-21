import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom'
import { ReactComponent as ShopLogo } from '../../assets/logo.svg';
import CartIcon from '../../components/cart-icon/cart-icon';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown';

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';
import { CartContext } from '../../contexts/cart.context';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  
  return(
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <ShopLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            Shop
          </NavLink>
          {
            currentUser ? (
              <NavLink as={"span"} onClick={signOutUser}>Sign Out</NavLink>)
              : 
              (<NavLink to='/auth'>Sign In</NavLink>)
          }
          <CartIcon />
        </NavLinks>
          { isCartOpen && <CartDropdown /> }
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;