import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		cart: [{}]
	},
	reducers: {
		setCart: (state, action: PayloadAction<Object[]>) => {
			state.cart = [...state.cart, action.payload]
		}
	}
})

export const { setCart } = cartSlice.actions
export default cartSlice.reducer
