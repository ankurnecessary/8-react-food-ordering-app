import React, {useContext} from 'react';
import Modal from './UI/Modal';
import CartContext from '../store/CartContext';
import {currencyFormatter} from '../utils/formatting';
import UserProgressContext from '../store/UserProgressContext';
import Button from './UI/Button';
import CartItem from './CartItem';

export default function Cart() {
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);
  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + (item.quantity * item.price),
    0,
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }

  function handleEscPress() {
    if (userProgressCtx.progress === 'cart') {
      handleCloseCart();
    }
  }

  return (
    <Modal
      className='cart'
      open={userProgressCtx.progress === 'cart'}
      onClose={handleEscPress}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map(item => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => {
              cartCtx.addItem(item);
            }}
            onDecrease={() => {
              cartCtx.removeItem(item.id);
            }}
          />
        ))}
      </ul>
      <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
      <p className='modal-actions'>
        <Button onClick={handleCloseCart} textOnly>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
