import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case 'ADD':
			return [
				...state,
				{
					id: action.id,
					fName: action.fName,
					price: action.price,
					qty: action.qty,
					size: action.size,
					img: action.img,
				},
			];
		case 'REMOVE':
			let newArr = [...state];
			newArr.splice(action.index, 1);
			return newArr;
		case 'UPDATE':
			let arr = [...state];
			arr.find((food, index) => {
				console.log(index);
				arr[index] = {
					...food,
					qty: action.qty + food.qty,
					price: action.price + food.price,
				};
				return arr;
			});
			return arr;
		case 'DROP':
			let emptyArray = [];
			return emptyArray;
		default:
			console.log('Error in reducer');
	}
};

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, []);
	return (
		<CartDispatchContext.Provider value={dispatch}>
			<CartStateContext.Provider value={state}>
				{children}
			</CartStateContext.Provider>
		</CartDispatchContext.Provider>
	);
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
