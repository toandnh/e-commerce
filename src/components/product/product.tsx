'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

import { Listbox } from '@headlessui/react'
import {
	CheckIcon as HuiCheckIcon,
	ChevronUpDownIcon
} from '@heroicons/react/20/solid'

import { store } from '@/store'
import { addToCart } from '@/store/cartSlice'

import { cloudinaryLoader } from '../cloudinaryLoader'

import Alert from './alert'

const amount: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function Product({ item }: { item: Item }) {
	const [selected, setSelected] = useState(amount[0])
	const [added, setAdded] = useState(false)

	const itemInfo: ItemCart = {
		title: item.title,
		image: item.image,
		price: item.price,
		amount: selected
	}

	const handleSubmit = () => {
		store.dispatch(addToCart(itemInfo))
		setAdded(true)
	}

	useEffect(() => {
		setTimeout(() => {
			setAdded(false)
		}, 2000)
	}, [added])

	return (
		<div className='flex flex-col'>
			{added && <Alert title={item.title} />}
			<div className='h-full relative flex flex-col'>
				<div className='bg-neutral-100 dark:bg-neutral-900 h-[85vh] min-h-[550px] aspect-[4/3] grid grid-cols-[1fr_1fr] gap-2 rounded-lg p-2'>
					<div className='flex items-center'>
						<Image
							src={item.image}
							alt={item.title}
							height={400}
							width={400}
							loader={cloudinaryLoader}
						/>
					</div>
					<div className='flex flex-col gap-4 py-4 pr-4 overflow-hidden'>
						<div className='text-xl font-semibold'>{item.title}</div>
						<div className='flex'>
							<div className='basis-1/3 flex items-center'>
								${item.price * selected}
							</div>
							<div className='basis-2/3 flex gap-4 items-center justify-end'>
								<div className='basis-2/3 flex justify-end'>Amount</div>
								<Listbox value={selected} onChange={setSelected}>
									<div className='basis-1/3 relative w-full min-w-[90px] max-w-[90px] mt-1'>
										<Listbox.Button className='relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
											<span className='flex justify-end truncate text-gray-900'>
												{selected}
											</span>
											<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
												<ChevronUpDownIcon
													className='h-5 w-5 text-gray-400'
													aria-hidden='true'
												/>
											</span>
										</Listbox.Button>
										<Listbox.Options className='absolute mt-1 max-h-60 w-full rounded-md bg-white py-1 text-base focus:outline-none sm:text-sm overflow-y-auto'>
											{amount.map((number) => (
												<Listbox.Option
													key={number}
													className={({ active }) =>
														`relative cursor-default select-none py-2 pl-10 pr-4 ${
															active
																? 'bg-amber-100 text-amber-900'
																: 'text-gray-900'
														}`
													}
													value={number}
												>
													{({ selected }) => (
														<>
															<span
																className={`flex justify-center truncate ${
																	selected ? 'font-medium' : 'font-normal'
																} text-gray-900`}
															>
																{number}
															</span>
															{selected ? (
																<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
																	<HuiCheckIcon
																		className='h-5 w-5'
																		aria-hidden='true'
																	/>
																</span>
															) : null}
														</>
													)}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</div>
								</Listbox>
							</div>
						</div>
						<input
							type='button'
							onClick={handleSubmit}
							className='bg-orange-400 dark:bg-orange-600 h-10 rounded-md hover:bg-orange-500 dark:hover:bg-orange-700 hover:cursor-pointer'
							value='Add to cart'
						/>
						<div className='overflow-y-auto'>{item.description}</div>
					</div>
				</div>
			</div>
		</div>
	)
}
