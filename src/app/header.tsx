'use client'

import { useEffect } from 'react'

import Link from 'next/link'

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'

import clsx from 'clsx'

import { useTheme } from 'next-themes'

import { Orbitron } from 'next/font/google'

import CartPopper from '@/components/cart/cartPopper'

const text = Orbitron({
	subsets: ['latin'],
	weight: ['400']
})

export default function Header() {
	const { theme, setTheme } = useTheme()

	useEffect(() => {
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

	return (
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
	)
}
