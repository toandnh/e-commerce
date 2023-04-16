import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type Cart = {
	cart: Item[]
}

const initialState: Cart = {
	cart: []
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<Item>) => {
			state.cart = [...state.cart, action.payload]
		},
		removeItemFromCart: (state, action: PayloadAction<string>) => {
			state.cart = state.cart.filter((item) => item.title === action.payload)
		},
		removeAmountFromCart: (
			state,
			action: PayloadAction<{ title: string; amount: number }>
		) => {
			state.cart = state.cart.map((item) => {
				if (item.title !== action.payload.title) return item

				//check invalid amount.
				if (item.amount - action.payload.amount <= 0) removeItemFromCart

				const updatedItem = {
					title: item.title,
					image: item.image,
					price: item.price,
					amount: item.amount - action.payload.amount
				}
				return updatedItem
			})
		},
		emptyCart: (state) => {
			state.cart = []
		}
	}
})

export const {
	addToCart,
	removeItemFromCart,
	removeAmountFromCart,
	emptyCart
} = cartSlice.actions
export default cartSlice.reducer
