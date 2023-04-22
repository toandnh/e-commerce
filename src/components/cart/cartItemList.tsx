'use client'

import { useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import { RootState } from '@/store'

import CartItem from './cartItem'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default function CartItemList() {
	const items = useAppSelector((state) => state.cart)
	return (
		<div className='relative flex flex-col gap-4 p-2 md:p-4 overflow-x-hidden overflow-y-auto'>
			{items.map((item) => (
				<CartItem key={item.title} item={item} />
			))}
		</div>
	)
}
