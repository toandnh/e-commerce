'use client'

import { useState } from 'react'

import useSWR from 'swr'

import OrderItem from './orderItem'
import Loading from './loading'

export default function Confirmation({ orderId }: { orderId: string }) {
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
		<div className='bg-neutral-200 dark:bg-neutral-600 w-2/3 h-fit flex flex-col justify-start gap-4 p-4 rounded-md'>
			<h2>Order Reference: {order.id}</h2>
			<h4>Date: {date}</h4>
			<h4>Status: {status}</h4>
			<h4>Total: {total}</h4>
			<div>
				<input
					type='button'
					onClick={toggleShow}
					value={show ? 'Hide Details' : 'Show Details'}
				/>
			</div>
			{show && (
				<div className='flex flex-col gap-4'>
					{orderItems.map((item: any) => (
						<OrderItem item={item} />
					))}
				</div>
			)}
		</div>
	)
}
