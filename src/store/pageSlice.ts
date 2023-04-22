import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		page: ''
	},
	reducers: {
		setPage: (state, action: PayloadAction<string>) => {
			state.page = action.payload
		}
	}
})

export const { setPage } = cartSlice.actions
export default cartSlice.reducer
