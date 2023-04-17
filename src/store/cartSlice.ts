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
			let inCart = false
			for (let item of state.cart) {
				if (item.title === action.payload.title) {
					inCart = true
					break
				}
			}

			if (inCart) {
				const updatePayload = {
					title: action.payload.title,
					sign: '+',
					amount: action.payload.amount
				}
				const updateAction: PayloadAction<{
					title: string
					sign: string
					amount: number
				}> = {
					payload: updatePayload,
					type: 'string'
				}
				cartSlice.caseReducers.updateAmount(state, updateAction)
			} else {
				state.cart = [...state.cart, action.payload]
			}
		},
		removeItemFromCart: (state, action: PayloadAction<string>) => {
			state.cart = state.cart.filter((item) => item.title !== action.payload)
		},
		updateAmount: (
			state,
			action: PayloadAction<{ title: string; sign: string; amount: number }>
		) => {
			let clear = false
			state.cart = state.cart.map((item) => {
				if (item.title !== action.payload.title) return item

				//check invalid amount.
				if (item.amount <= 1 && action.payload.sign === '-') clear = true

				const updatedAmount =
					action.payload.sign === '-'
						? item.amount - action.payload.amount
						: item.amount + action.payload.amount

				const updatedItem = {
					title: item.title,
					image: item.image,
					price: item.price,
					amount: updatedAmount
				}

				return updatedItem
			})

			const removeAction: PayloadAction<string> = {
				payload: action.payload.title,
				type: 'string'
			}
			if (clear) cartSlice.caseReducers.removeItemFromCart(state, removeAction)
		},
		emptyCart: (state) => {
			state.cart = []
		}
	}
})

export const { addToCart, removeItemFromCart, updateAmount, emptyCart } =
	cartSlice.actions
export default cartSlice.reducer
