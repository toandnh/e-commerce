'use client'

import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import { useRouter } from 'next/navigation'

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import { RootState } from '@/store'

import Confirmation from './confirmation'
import Form from './form'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default function Checkout() {
	const router = useRouter()

	const items = useAppSelector((state) => state.cart.cart)

	const [show, setShow] = useState(false)
	const [fulfilled, setFulfilled] = useState(false)

	const { data: session } = useSWR('/api/account', (url: string) =>
		fetch(url).then((res) => res.json())
	)

	const fetcher = async (
		url: string,
		{ arg }: { arg: { items: ItemCart[]; total: number } }
	) =>
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(arg)
		}).then((res) => res.json())
	const { data, trigger } = useSWRMutation('/api/orders', fetcher, {
		revalidate: true
	})

	const isLoggedIn: boolean = session?.user

	const nerdFee = 7.99
	const shipping = 0.0
	let subtotal = 0

	items.forEach((item) => {
		subtotal += item.price * item.amount
	})

	subtotal = Math.round(subtotal * 100) / 100

	const taxes =
		Math.round((((subtotal + shipping + nerdFee) * 13) / 100) * 100) / 100
	const total = Math.round((subtotal + taxes + shipping + nerdFee) * 100) / 100

	const fees = {
		nerdFee: nerdFee,
		taxes: taxes,
		shipping: shipping,
		subtotal: subtotal,
		total: total
	}

	useEffect(() => {
		if (items.length === 0) router.push('/')
		setShow(true)
	}, [])

	useEffect(() => {
		if (show) setFulfilled(true)
	}, [data])

	return fulfilled ? (
		<Confirmation orderId={data.orderId} isLoggedIn={isLoggedIn} />
	) : (
		<Form items={items} fees={fees} trigger={trigger} />
	)
}
