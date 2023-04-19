'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { useTheme } from 'next-themes'

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'

import { Orbitron } from 'next/font/google'

import clsx from 'clsx'

import CartPopper from '@/components/cart/cartPopper'

const text = Orbitron({
	subsets: ['latin'],
	weight: ['400']
})

export default function Topbar() {
	const [searchQuery, setSearchQuery] = useState('')

	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	useEffect(() => {
		setMounted(true)
		if (
			window.matchMedia &&
			window.matchMedia('(prefers-color-scheme: dark)').matches
		) {
			setTheme('dark')
		} else {
			setTheme('light')
		}
	}, [])

	const toggleTheme = () => {
		if (theme === 'light') {
			setTheme('dark')
		} else {
			setTheme('light')
		}
	}

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value)
	}

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	if (!mounted) return null

	return (
		<div className='bg-neutral-100 dark:bg-neutral-900 w-full flex flex-col pb-4 sm:pb-6 2xl:pb-8 sticky top-0 z-10'>
			<div className='w-full flex py-3 sm:py-4 2xl:py-5'>
				<Link href='/' className='flex basis-1/2 justify-start items-center'>
					<h1
						className={clsx(
							'text-3xl text-neutral-900 dark:text-white font-semibold',
							text.className
						)}
					>
						AECS
					</h1>
				</Link>
				<div className='flex gap-2 sm:gap-3 2xl:gap-4 basis-1/2 justify-end items-center'>
					<CartPopper theme={theme} />
					<button onClick={toggleTheme}>
						{theme === 'dark' ? (
							<DarkModeOutlinedIcon fontSize='large' sx={{ color: '#fff' }} />
						) : (
							<LightModeOutlinedIcon fontSize='large' sx={{ color: '#000' }} />
						)}
					</button>
					<button>
						<AccountBoxOutlinedIcon
							fontSize='large'
							sx={{ color: theme === 'dark' ? '#fff' : '#000' }}
						/>
					</button>
				</div>
			</div>

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
