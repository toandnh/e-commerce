'use client'

import { useState } from 'react'

import Header from './header'

export default function Topbar() {
	const [searchQuery, setSearchQuery] = useState('')

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value)
	}

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<div className='bg-neutral-100 dark:bg-neutral-900 w-full flex flex-col pb-4 sm:pb-6 2xl:pb-8 sticky top-0 z-10'>
			<Header />

			<form className='flex gap-0 sm:gap-2 2xl:gap-4 py-3 sm:py-4 2xl:py-5'>
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
			</form>
		</div>
	)
}
