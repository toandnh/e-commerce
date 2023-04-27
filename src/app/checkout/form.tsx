'use client'

import { useState } from 'react'

import { useDispatch } from 'react-redux'

import clsx from 'clsx'

import { AppDispatch } from '@/store'

import { emptyCart } from '@/store/cartSlice'

import { useMediaQuery } from '@/hooks/useMediaQuery'

import OrderView from './orderView'

export const useAppDispatch: () => AppDispatch = useDispatch

type Fee = {
	nerdFee: number
	taxes: number
	shipping: number
	subtotal: number
	total: number
}

export default function Form({
	items,
	fees,
	trigger
}: {
	items: ItemCart[]
	fees: Fee
	trigger: Function
}) {
	const isBreakPoint = useMediaQuery(576)

	const dispatch = useAppDispatch()

	const [email, setEmail] = useState('')
	const [address, setAddress] = useState('')
	const [city, setCity] = useState('')
	const [country, setCountry] = useState('')
	const [zip, setZip] = useState('')

	{
		/*
		const isValid =
		email !== '' &&
		address !== '' &&
		city !== '' &&
		country !== '' &&
		zip !== ''
		*/
	}
	const isValid = true

	const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
	}
	const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAddress(e.target.value)
	}
	const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCity(e.target.value)
	}
	const handleCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCountry(e.target.value)
	}
	const handleZip = (e: React.ChangeEvent<HTMLInputElement>) => {
		setZip(e.target.value)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		await trigger({ items, total: fees.total })
		dispatch(emptyCart())
	}

	return (
		<form
			id='my-form'
			className={clsx(
				'min-h-[80vh] w-full max-w-4xl flex gap-4 p-4 sm:p-6 2xl:p-8',
				isBreakPoint ? 'flex-col' : ''
			)}
			onSubmit={handleSubmit}
		>
			<div>
				<div className='flex flex-col border-b border-neutral-700'>
					<p className='block uppercase tracking-wide text-sm font-bold mb-2 mr-1 pb-8'>
						Contact Information
					</p>
					<div className='flex flex-wrap -mx-3 mb-6'>
						<div className='w-full px-3'>
							<label className='block uppercase tracking-wide text-xs font-bold mb-2 mr-1'>
								Email
							</label>
							<input
								className='appearance-none block w-full border-2 border-gray-500 dark:border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-orange-500 focus:dark:border-orange-600'
								type='text'
								value={email}
								onChange={handleEmail}
								placeholder='sherlocked@gmail.com'
							/>
						</div>
					</div>
				</div>
				<div className='flex flex-col border-b border-neutral-700 py-8'>
					<p className='block uppercase tracking-wide text-sm font-bold mb-2 mr-1 pb-8'>
						Shipping Information
					</p>
					<div className='flex flex-wrap -mx-3 mb-6'>
						<div className='w-full px-3'>
							<label className='block uppercase tracking-wide text-xs font-bold mb-2 mr-1'>
								Address
							</label>
							<input
								className='appearance-none block w-full border-2 border-gray-500 dark:border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-orange-500 focus:dark:border-orange-600'
								type='text'
								value={address}
								onChange={handleAddress}
								placeholder='221B Baker Street'
							/>
						</div>
					</div>
					<div className='flex flex-wrap -mx-3 mb-2'>
						<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
							<label
								className='block uppercase tracking-wide text-xs font-bold mb-2 mr-1'
								htmlFor='grid-city'
							>
								City
							</label>
							<input
								className='appearance-none block w-full border-2 border-gray-500 dark:border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:border-orange-500 focus:dark:border-orange-600'
								type='text'
								value={city}
								onChange={handleCity}
								placeholder='London'
							/>
						</div>
						<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
							<label className='block uppercase tracking-wide text-xs font-bold mb-2 mr-1'>
								Country
							</label>
							<input
								className='appearance-none block w-full border-2 border-gray-500 dark:border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:border-orange-500 focus:dark:border-orange-600'
								type='text'
								value={country}
								onChange={handleCountry}
								placeholder='UK'
							/>
						</div>
						<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
							<label className='block uppercase tracking-wide text-xs font-bold mb-2 mr-1'>
								Zip
							</label>
							<input
								className='appearance-none block w-full border-2 border-gray-500 dark:border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:border-orange-500 focus:dark:border-orange-600'
								type='text'
								value={zip}
								onChange={handleZip}
								placeholder='NW1 6XE'
							/>
						</div>
					</div>
				</div>
				<div className='flex flex-col pt-8'>
					<p className='block uppercase tracking-wide text-sm font-bold mb-2 mr-1 pb-8'>
						Payment
					</p>
					<div className='flex flex-wrap -mx-3 mb-6'>
						<div className='w-full px-3'>
							<label className='block uppercase tracking-wide text-xs font-bold mb-2 mr-1'>
								Card Number
							</label>
							<input
								className='appearance-none block w-full border-2 border-gray-500 dark:border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-orange-500 focus:dark:border-orange-600'
								type='text'
								placeholder='0000 0000 0000 0000'
							/>
						</div>
					</div>
					<div className='flex flex-wrap -mx-3 mb-6'>
						<div className='w-full px-3'>
							<label className='block uppercase tracking-wide text-xs font-bold mb-2 mr-1'>
								Name On Card
							</label>
							<input
								className='appearance-none block w-full border-2 border-gray-500 dark:border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-orange-500 focus:dark:border-orange-600'
								type='text'
								placeholder='Sherlock Holmes'
							/>
						</div>
					</div>
					<div className='flex flex-wrap -mx-3 mb-2'>
						<div className='grow w-full md:w-1/3 px-3 mb-6 md:mb-0'>
							<label className='block uppercase tracking-wide text-xs font-bold mb-2 mr-1'>
								Expiry Date
							</label>
							<input
								className='appearance-none block w-full border-2 border-gray-500 dark:border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:border-orange-500 focus:dark:border-orange-600'
								type='text'
								placeholder='09/23'
							/>
						</div>
						<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
							<label className='block uppercase tracking-wide text-xs font-bold mb-2 mr-1'>
								CVC
							</label>
							<input
								className='appearance-none block w-full border-2 border-gray-500 dark:border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:border-orange-500 focus:dark:border-orange-600'
								type='text'
								placeholder='000'
							/>
						</div>
					</div>
				</div>
			</div>
			<OrderView fees={fees} valid={isValid} />
		</form>
	)
}
