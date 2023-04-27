'use client'

import { useState } from 'react'

import { useDispatch } from 'react-redux'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import useSWR from 'swr'

import { useTheme } from 'next-themes'

import { AppDispatch } from '@/store'

import { addToOrders } from '@/store/ordersSlice'

import OrderItem from './orderItem'

export const useAppDispatch: () => AppDispatch = useDispatch

export default function Order({
	orderId,
	isLoggedIn
}: {
	orderId: number
	isLoggedIn: boolean
}) {
	const { theme } = useTheme()

	const pathname = usePathname()
	const isAccount = pathname === '/account'

	const [show, setShow] = useState(false)

	const dispatch = useDispatch()

	const fetcher = (url: string) => fetch(url).then((res) => res.json())
	const { isLoading: isOrderLoading, data: order } = useSWR(
		`/api/orders/${orderId}`,
		fetcher
	)
	const { isLoading: isItemLoading, data: orderItems } = useSWR(
		`/api/orderItems/${orderId}`,
		fetcher
	)

	if (isItemLoading || isOrderLoading) return <></>

	if (!isLoggedIn) dispatch(addToOrders(orderId))

	const date = order.createdAt.split('T')[0]
	const status = order.status.charAt(0).toUpperCase() + order.status.slice(1)
	const total = '$' + order.total

	const toggleShow = () => {
		setShow(!show)
	}

	return (
		<div className='w-full h-fit bg-neutral-200 dark:bg-neutral-600 flex flex-col justify-start gap-6 p-4 rounded-md'>
			<p className='font-semibold text-xl'>Order Reference: {order.id}</p>
			<p>Date: {date}</p>
			<div className='flex items-center gap-2'>
				Status: <p className='bg-orange-500 py-1 px-2 rounded-md'>{status}</p>
			</div>
			<p>Total: {total}</p>
			<button className='flex items-center' onClick={toggleShow}>
				{show ? 'Hide Details' : 'Show Details'}
				<KeyboardArrowDownIcon
					fontSize='small'
					sx={{ color: theme === 'dark' ? '#fff' : '#000' }}
				/>
			</button>
			{show && (
				<div className='flex flex-col gap-4'>
					{orderItems.map((item: any) => (
						<OrderItem key={item.title} item={item} />
					))}
				</div>
			)}
			{!isAccount && (
				<Link href='/' className='py-4'>
					<input
						type='button'
						className=' bg-orange-400 dark:bg-orange-600 p-2 rounded-md hover:bg-orange-500 dark:hover:bg-orange-700 hover:cursor-pointer disabled:bg-orange-400/40 disabled:dark:bg-orange-600/40'
						value='Continue Shopping'
					/>
				</Link>
			)}
		</div>
	)
}
