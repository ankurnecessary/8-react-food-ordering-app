import React from 'react';
import logoImg from '../assets/logo.jpg';

export default function Header() {
	return <header id='main-header'>
		<div id='title'>
			<img src={logoImg} alt='React food restaurant' />
			<h1>ReactFood</h1>
		</div>
		<nav>
			<button>Cart (0)</button>
		</nav>
	</header>;
}