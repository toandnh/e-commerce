'use client'

import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import { AppDispatch, RootState } from '@/store'

import { emptyOrders } from '@/store/ordersSlice'

import Order from './order'

import sasuke from '../../../public/sasuke.gif'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

type User = {
	name?: string | null
	email?: string | null
	image?: string | null
}

export default function OrderList({ user }: { user: User }) {
	const tempOrders = useAppSelector((state) => state.orders.orders)

	const dispatch = useAppDispatch()

	if (tempOrders.length !== 0) {
		const fetcher = async (
			url: string,
			{ arg }: { arg: { email: string; orderId: number } }
		) =>
			fetch(url, {
				method: 'PATCH',
				body: JSON.stringify(arg)
			}).then((res) => res.json())
		const { trigger } = useSWRMutation('/api/orders', fetcher, {
			revalidate: true
		})

		tempOrders.forEach((orderId) => {
			trigger({ email: user.email!, orderId })
		})

		dispatch(emptyOrders())
	}

	const fetcher = (url: string) => fetch(url).then((res) => res.json())
	const { isLoading, data: orders } = useSWR(
		`/api/orders/user?email=${user.email}`,
		fetcher
	)

	if (isLoading) return <p className='text-xl'>Loading orders...</p>

	const hasOrder = orders && orders.length !== 0

	return (
		<>
			{hasOrder && (
				<div className='flex flex-col justify-center items-center gap-8'>
					{orders.map((order: Order) => (
						<Order key={order.id} orderId={order.id} isLoggedIn={true} />
					))}
				</div>
			)}
			{!hasOrder && (
				<div className='relative h-full min-h-[80vh] w-full'>
					<div className='absolute h-full w-full flex justify-center items-center'>
						<img
							src={sasuke.src}
							alt='sasuke-nothing-interesting-here'
							className='h-2/3 aspect-[3/2]'
						/>
					</div>
				</div>
			)}
		</>
	)
}
