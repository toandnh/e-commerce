'use client'

import { useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import { Popover } from '@headlessui/react'

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'

import { RootState } from '@/store'

import CartItem from './cartItem'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default function CartPopper({ theme }: { theme: string | undefined }) {
	const cartItems = useAppSelector((state) => state.cart)

	let cart: React.ReactNode

	if (cartItems.length === 0) {
		cart = (
			<div className='flex justify-center items-center text-lg'>
				Your shopping cart is empty!
			</div>
		)
	} else {
		cart = (
			<>
				<div className='h-[70vh] relative grid gap-8 p-7 overflow-y-auto'>
					{cartItems.map((item) => (
						<CartItem key={item.title} item={item} theme={theme} />
					))}
				</div>
				<div className='p-4'>
					<input
						type='button'
						className='bg-orange-400 w-full h-full rounded-md p-2 hover:cursor-pointer hover:bg-orange-500'
						value='Check out'
					/>
				</div>
			</>
		)
	}

	return (
		<>
			<Popover className='relative'>
				{({ open }) => (
					<>
						<Popover.Button>
							<ShoppingBagOutlinedIcon
								fontSize='large'
								sx={{ color: theme === 'dark' ? '#fff' : '#000' }}
							/>
						</Popover.Button>
						<Popover.Panel className='absolute left-1/2 w-screen max-w-sm lg:max-w-lg -translate-x-2/3 lg:-translate-x-3/4 transform px-4 sm:px-0 mt-3 z-10'>
							<div className='bg-white dark:bg-neutral-700 rounded shadow-lg overflow-hidden'>
								{cart}
							</div>
						</Popover.Panel>
					</>
				)}
			</Popover>
		</>
	)
}
