'use client'

import Link from 'next/link'

import { useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import { Popover } from '@headlessui/react'

import Badge from '@mui/material/Badge'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'

import { RootState } from '@/store'

import CartItemList from './cartItemList'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default function CartPopper({ theme }: { theme: string | undefined }) {
	const cartLength = useAppSelector((state) => state.length)

	let cart: React.ReactNode

	if (cartLength === 0) {
		cart = <p className='text-lg'>Your shopping cart is empty!</p>
	} else {
		cart = (
			<div className='w-full h-full grid grid-rows-[1fr_8fr_1fr]'>
				<p className='text-lg font-bold p-4 md:p-6'>
					Items in cart: {cartLength}
				</p>
				<CartItemList />
				<Popover.Button
					as={Link}
					href='/checkout'
					className='w-full p-4 md:p-6'
				>
					<input
						type='button'
						className='bg-orange-400 dark:bg-orange-600  w-full h-full font-bold rounded-md p-2 hover:bg-orange-500 dark:hover:bg-orange-700 hover:cursor-pointer'
						value='Check out'
					/>
				</Popover.Button>
			</div>
		)
	}

	return (
		<>
			<Popover className='relative'>
				{({ open }) => (
					<>
						<Popover.Button>
							<Badge
								invisible={cartLength === 0}
								badgeContent={cartLength}
								color='warning'
							>
								<ShoppingBagOutlinedIcon
									fontSize='large'
									sx={{ color: theme === 'dark' ? '#fff' : '#000' }}
								/>
							</Badge>
						</Popover.Button>
						{open && (
							<Popover.Panel className='absolute left-1/2 w-screen max-w-xs sm:max-w-sm lg:max-w-lg -translate-x-2/3 lg:-translate-x-3/4 transform px-4 sm:px-0 mt-3'>
								<div className='h-[80vh] bg-white dark:bg-neutral-700 flex flex-col justify-center items-center rounded-md overflow-hidden'>
									{cart}
								</div>
							</Popover.Panel>
						)}
					</>
				)}
			</Popover>
		</>
	)
}
