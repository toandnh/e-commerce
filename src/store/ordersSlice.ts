import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type Orders = {
	orders: Order[]
}

const initialState: Orders = {
	orders: []
}

const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		addToOrders: (state, action: PayloadAction<Order>) => {
			let included = false
			for (let order of state.orders) {
				if (order.id === action.payload.id) {
					included = true
					break
				}
			}
			if (!included) state.orders = [...state.orders, action.payload]
		},
		emptyOrders: (state) => {
			state.orders = []
		}
	}
})

export const { addToOrders, emptyOrders } = ordersSlice.actions
export default ordersSlice.reducer
