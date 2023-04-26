import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type Orders = {
	orders: number[]
}

const initialState: Orders = {
	orders: []
}

const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		addToOrders: (state, action: PayloadAction<number>) => {
			state.orders = [...state.orders, action.payload]
		},
		emptyOrders: (state) => {
			state.orders = []
		}
	}
})

export const { addToOrders, emptyOrders } = ordersSlice.actions
export default ordersSlice.reducer
