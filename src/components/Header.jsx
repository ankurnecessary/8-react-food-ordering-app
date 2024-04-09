import React, {useContext} from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button.jsx';
import CartContext from '../store/cartContext.jsx';

export default function Header() {
	const cartCtx = useContext(CartContext);
	const totalCartItems = cartCtx.items.reduce((totalNoOfItems, item) => totalNoOfItems + item.quantity, 0);

	return (
		<header id='main-header'>
			<div id='title'>
				<img src={logoImg} alt='React food restaurant' />
				<h1>ReactFood</h1>
			</div>
			<nav>
				<Button textOnly>{`Cart (${totalCartItems})`}</Button>
			</nav>
		</header>
	);
}
