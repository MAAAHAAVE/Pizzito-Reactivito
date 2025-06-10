import React from 'react';
import imageUrl from '../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';

const CartEmpty = () => {
  return (
    <div class="cart cart--empty">
      <h2>
        Корзина пустая <icon>😕</icon>
      </h2>
      <p>
        Вероятней всего, вы не заказывали ещё питсу.
        <br />
        Для того, чтобы заказать питсу, перейдите на главную страницу.
      </p>
      <img src={imageUrl} alt="Empty cart" />
      <Link to="/" class="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
