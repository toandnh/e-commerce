'use client'

import { Fragment, useState } from 'react'

import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import { CldImage } from 'next-cloudinary'

import { store } from '@/store'
import { setCart } from '@/store/cartSlice'

const amount: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function Product({ item }: any) {
	const [selected, setSelected] = useState(amount[0])

	const handleSubmit = () => {
		store.dispatch(setCart(item))
	}

	return (
		<div className='bg-neutral-100 dark:bg-neutral-900 h-full min-h-[650px] w-full min-w-[850px] grid grid-cols-[1fr_1fr] rounded-lg p-2'>
			<div className='h-full w-full flex items-center'>
				<CldImage
					height='400'
					width='400'
					src={item.image.replace('%20', ' ')}
					alt={item.title}
				/>
			</div>
			<div className='flex flex-col gap-4 py-4 pr-4 overflow-hidden'>
				<div className='text-xl font-semibold'>{item.title}</div>
				<div className='flex'>
					<div className='basis-1/3 flex items-center'>
						${item.price * selected}
					</div>
					<div className='basis-2/3 flex flex-row gap-4 items-center justify-end'>
						<div className='basis-2/3 flex justify-end'>Amount</div>
						<Listbox value={selected} onChange={setSelected}>
							<div className='basis-1/3 relative w-full min-w-[90px] max-w-[90px] mt-1'>
								<Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
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
								<Transition
									as={Fragment}
									leave='transition ease-in duration-100'
									leaveFrom='opacity-100'
									leaveTo='opacity-0'
								>
									<Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-y-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
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
																<CheckIcon
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
								</Transition>
							</div>
						</Listbox>
					</div>
				</div>
				<input
					type='button'
					onClick={handleSubmit}
					className='bg-orange-400 dark:bg-orange-600 h-10 rounded-lg hover:bg-orange-500 dark:hover:bg-orange-700 hover:cursor-pointer'
					value='Add to cart'
				/>
				<div className='overflow-y-auto'>{item.description}</div>
			</div>
		</div>
	)
}
