'use client'

import { useState } from 'react'

export default function SearchBox() {
	const [searchQuery, setSearchQuery] = useState('')

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value)
	}

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<form className='bg-neutral-100 dark:bg-neutral-900 flex gap-0 sm:gap-2 2xl:gap-4 pt-3 sm:pt-4 2xl:pt-5 pb-6 sm:pb-8 2xl:pb-10 sticky top-16 z-10'>
			<input
				className='min-w-0 flex-grow rounded-md border-2 sm:border-3 2xl:border-4 border-gunmetal-gray p-2 focus:outline-none focus:border-amber-500'
				type='text'
				value={searchQuery}
				onChange={handleSearch}
				placeholder='Search for title like "Chainsaw Man" or use # to search for tags, e.g. #action'
			/>
			<input
				className='bg-teal-500 rounded-md border-2 sm:border-3 2xl:border-4 border-teal-500 p-2 text-white disabled:opacity-50 enabled:hover:border-teal-700 enabled:hover:bg-teal-700 cursor-pointer'
				type='submit'
				disabled={searchQuery === ''}
				value='Search'
			/>
		</form>
	)
}
