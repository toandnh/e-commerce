'use client'

import useSWR from 'swr'

import OrderItem from './orderItem'

import sasuke from '../../../public/sasuke.gif'

type User = {
	name?: string | null | undefined
	email?: string | null | undefined
	image?: string | null | undefined
}

export default function OrderList({ user }: { user: User }) {
	const fetcher = (url: string) => fetch(url).then((res) => res.json())
	const { data: orders } = useSWR(
		`/api/orders/user?email=${user.email}`,
		fetcher
	)

	const hasOrder = orders && orders.length !== 0

	return (
		<>
			{hasOrder && (
				<div className='flex flex-col justify-center items-center gap-4'>
					{orders.map((item: ItemCart) => (
						<OrderItem key={item.title} item={item} />
					))}
				</div>
			)}
			{!hasOrder && (
				<div className='absolute h-full w-full flex justify-center items-center'>
					<img
						src={sasuke.src}
						alt='sasuke-nothing-interesting-here'
						className='h-2/3 aspect-[3/2]'
					/>
				</div>
			)}
		</>
	)
}
