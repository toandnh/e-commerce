'use client'

import { useState } from 'react'

import Link from 'next/link'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import useSWR from 'swr'

import Loading from '@/components/loading'

import OrderItem from './orderItem'

export default function Order({ orderId }: { orderId: string }) {
	const [show, setShow] = useState(false)

	const fetcher = (url: string) => fetch(url).then((res) => res.json())
	const { isLoading: isOrderLoading, data: order } = useSWR(
		`/api/orders/${orderId}`,
		fetcher
	)
	const { isLoading: isItemLoading, data: orderItems } = useSWR(
		`/api/orderItems/${orderId}`,
		fetcher
	)

	if (isItemLoading || isOrderLoading) return <Loading />

	const date = order.createdAt.split('T')[0]
	const status = order.status.charAt(0).toUpperCase() + order.status.slice(1)
	const total = '$' + order.total

	const toggleShow = () => {
		setShow(!show)
	}

	return (
		<div className='w-full h-fit bg-neutral-200 dark:bg-neutral-600 flex flex-col justify-start gap-4 p-4 rounded-md'>
			<h2>Order Reference: {order.id}</h2>
			<h4>Date: {date}</h4>
			<h4>Status: {status}</h4>
			<h4>Total: {total}</h4>
			<button className='flex items-center' onClick={toggleShow}>
				{show ? 'Hide Details' : 'Show Details'}
				<KeyboardArrowDownIcon fontSize='small' sx={{ color: '#fff' }} />
			</button>
			{show && (
				<div className='flex flex-col gap-4'>
					{orderItems.map((item: any) => (
						<OrderItem key={item.title} item={item} />
					))}
				</div>
			)}
			<Link href='/' className='py-4'>
				<input
					type='button'
					className=' bg-orange-400 dark:bg-orange-600 p-2 rounded-md hover:bg-orange-500 dark:hover:bg-orange-700 hover:cursor-pointer disabled:bg-orange-400/40 disabled:dark:bg-orange-600/40'
					value='Continue Shopping'
				/>
			</Link>
		</div>
	)
}
