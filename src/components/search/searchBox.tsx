'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import useSWR from 'swr'

import SearchPopover from './searchPopover'

export default function SearchBox() {
	const router = useRouter()

	const [searchQuery, setSearchQuery] = useState('')

	const shouldFetch = searchQuery !== ''

	const fetcher = async (url: string) =>
		fetch(url, {
			method: 'POST'
		}).then((res) => res.json())

	const { data: items } = useSWR(
		shouldFetch ? `/api/items/${searchQuery}` : null,
		fetcher,
		{ refreshInterval: 300 }
	)

	const firstFiveItems = items && items.slice(0, 5)

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		setSearchQuery(e.target.value)
	}

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		router.push(`/product?query=${searchQuery}`)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='sticky top-16 sm:top-20 2xl:top-24 z-10'
		>
			<div className='bg-neutral-100 dark:bg-neutral-900 flex gap-0 sm:gap-2 2xl:gap-4 pt-3 sm:pt-4 2xl:pt-5 pb-6 sm:pb-8 2xl:pb-10'>
				<input
					className='min-w-0 flex-grow rounded-md border-2 sm:border-3 2xl:border-4 border-gunmetal-gray p-2 focus:outline-none focus:border-amber-500'
					type='text'
					value={searchQuery}
					onChange={handleSearch}
					placeholder='Search...'
				/>
				<input
					className='bg-teal-500 rounded-md border-2 sm:border-3 2xl:border-4 border-teal-500 p-2 text-white disabled:opacity-50 enabled:hover:border-teal-700 enabled:hover:bg-teal-700 cursor-pointer'
					type='submit'
					disabled={searchQuery === ''}
					value='Search'
				/>
			</div>
			{shouldFetch && <SearchPopover items={firstFiveItems} />}
		</form>
	)
}
