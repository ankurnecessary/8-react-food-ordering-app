import React from 'react';
import Header from './components/Header';
import Meals from './components/Meals';
import {CartContextProvider} from './store/CartContext.jsx';
import {UserProgressContextProvider} from './store/UserProgressContext.jsx';

function App() {
	return (
		<UserProgressContextProvider>
		<CartContextProvider>
			<Header />
			<Meals />
		</CartContextProvider>
		</UserProgressContextProvider>
	);
}

export default App;
