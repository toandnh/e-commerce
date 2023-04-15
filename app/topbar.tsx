'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { useTheme } from 'next-themes'

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'

import { Orbitron } from 'next/font/google'

import clsx from 'clsx'

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
		<div className='bg-neutral-100 dark:bg-neutral-900 flex flex-col pb-4 sm:pb-6 2xl:pb-8'>
			<div className='w-full flex flex-row py-4 sm:py-6 2xl:py-8'>
				<Link href='/' className='flex basis-1/2 justify-start items-center'>
					<h1
						className={clsx(
							'text-3xl text-neutral-900 dark:text-white font-semibold pl-2',
							text.className
						)}
					>
						AECS
					</h1>
				</Link>

				<div className='flex flex-row gap-2 sm:gap-3 2xl:gap-4 basis-1/2 justify-end items-center'>
					<button>
						<AccountBoxOutlinedIcon
							fontSize='large'
							sx={{ color: theme === 'dark' ? '#fff' : '#000' }}
						/>
					</button>
					<button onClick={toggleTheme}>
						{theme === 'dark' ? (
							<DarkModeOutlinedIcon fontSize='large' sx={{ color: '#fff' }} />
						) : (
							<LightModeOutlinedIcon fontSize='large' sx={{ color: '#000' }} />
						)}
					</button>
					<button>
						<ShoppingBagOutlinedIcon
							fontSize='large'
							sx={{ color: theme === 'dark' ? '#fff' : '#000' }}
						/>
					</button>
				</div>
			</div>

			<form className='flex flex-row gap-0 sm:gap-2 2xl:gap-4 py-4 sm:py-6 2xl:py-8'>
				<input
					className='flex-grow rounded-lg border-2 sm:border-3 2xl:border-4 border-gunmetal-gray p-2 focus:outline-none focus:border-amber-500'
					type='text'
					value={searchQuery}
					onChange={handleSearch}
					placeholder='Search...'
				/>
				<input
					className='bg-teal-500 rounded-lg border-2 sm:border-3 2xl:border-4 border-teal-500 p-2 text-white disabled:opacity-50 enabled:hover:border-teal-700 enabled:hover:bg-teal-700 cursor-pointer'
					type='submit'
					disabled={searchQuery === ''}
					value='Search'
				/>
			</form>
		</div>
	)
}
