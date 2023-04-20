'use client'

import Link from 'next/link'

import { useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import { Popover } from '@headlessui/react'

import Badge from '@mui/material/Badge'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'

import { useMediaQuery } from '@/hooks/useMediaQuery'

import { RootState } from '@/store'

import CartItem from './cartItem'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default function CartPopper({ theme }: { theme: string | undefined }) {
	const cartItems = useAppSelector((state) => state.cart)

	const isBreakpoint = useMediaQuery(768)

	let cart: React.ReactNode

	if (cartItems.length === 0) {
		cart = <p className='text-lg'>Your shopping cart is empty!</p>
	} else {
		cart = (
			<div className='w-full h-full grid grid-rows-[1fr_8fr_1fr]'>
				<p className='text-lg font-bold p-4 md:p-6'>
					Items in cart: {cartItems.length}
				</p>
				<div className='w-full relative grid gap-6 p-2 md:p-4 overflow-y-auto'>
					{cartItems.map((item) => (
						<CartItem
							key={item.title}
							item={item}
							theme={theme}
							isBreakpoint={isBreakpoint}
						/>
					))}
				</div>
				<Popover.Button
					as={Link}
					href='/checkout'
					className='w-full p-4 md:p-6'
				>
					<input
						type='button'
						className='bg-orange-400 w-full h-full font-bold rounded-md p-2 hover:cursor-pointer hover:bg-orange-500'
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
								invisible={cartItems.length === 0}
								badgeContent={cartItems.length}
								color='warning'
							>
								<ShoppingBagOutlinedIcon
									fontSize='large'
									sx={{ color: theme === 'dark' ? '#fff' : '#000' }}
								/>
							</Badge>
						</Popover.Button>
						{open && (
							<Popover.Panel className='absolute left-1/2 w-screen max-w-xs lg:max-w-lg -translate-x-2/3 lg:-translate-x-3/4 transform px-4 sm:px-0 mt-3 z-10'>
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
