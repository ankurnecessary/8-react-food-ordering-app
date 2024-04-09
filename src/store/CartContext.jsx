import React, {createContext, useReducer} from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext({
	items: [],
	// eslint-disable-next-line no-unused-vars
	addItem(item) {},
	// eslint-disable-next-line no-unused-vars
	removeItem(id) {},
});

function cartReducer(state, action) {
	if (action.type === 'ADD_ITEM') {
		const existingCartItemIndex = state.items.findIndex(
			item => item.id === action.item.id,
		);

		const updatedItems = [...state.items];

		if (existingCartItemIndex > -1) {
			const existingItem = state.items[existingCartItemIndex];
			const updatedItem = {
				...existingItem,
				quantity: existingItem.quantity + 1,
			};
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			updatedItems.push({...action.item, quantity: 1});
		}

		return {...state, items: updatedItems};
	}

	if (action.type === 'REMOVE_ITEM') {
		const existingCartItemIndex = state.items.findIndex(
			item => item.id === action.id,
		);

		const updatedItems = [...state.items];

		if (updatedItems[existingCartItemIndex].quantity === 1) {
			updatedItems.splice(existingCartItemIndex, 1);
		} else {
			const updatedItem = {
				...updatedItems[existingCartItemIndex],
				quantity: updatedItems[existingCartItemIndex].quantity - 1,
			};
			updatedItems[existingCartItemIndex] = updatedItem;
		}

		return {...state.items, items: updatedItems};
	}
}

export function CartContextProvider({children}) {
	const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []});

	function addItem(item) {
		dispatchCartAction({type: 'ADD_ITEM', item});
	}

	function removeItem(id) {
		dispatchCartAction({type: 'REMOVE_ITEM', id});
	}

	const cartContext = {
		items: cart.items,
		addItem,
		removeItem,
	};

	console.log(cartContext);

	return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}

CartContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default CartContext;