import { createContext, useReducer } from "react";
import { createAction } from '../utils/reducer/reducer';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
  if(existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
      {...cartItem, quantity: cartItem.quantity + 1}
      : cartItem
    );
  }

  return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

  if(existingCartItem.quantity === 1){
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? 
      {...cartItem, quantity: cartItem.quantity - 1}
      : cartItem
    );
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
	isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
	setCartIsOpen: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {}
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_IS_OPEN: "SET_CART_IS_OPEN"
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type){
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      };
    case CART_ACTION_TYPES.SET_CART_IS_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
}

export const CartProvider = ({ children }) => {
  const [ {cartItems, isCartOpen, cartCount, cartTotal}, dispatch ] = useReducer(cartReducer, INITIAL_STATE); 

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal
      })
    );
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  }  

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  }

  const clearItemFromCart = (cartItemToRemove) => {
    const newCartItems = clearCartItem(cartItems, cartItemToRemove) ;
    updateCartItemsReducer(newCartItems);
  }

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, bool));
  }

	const value  = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearItemFromCart, cartTotal };

	return <CartContext.Provider value={value} >{children}</CartContext.Provider>
}