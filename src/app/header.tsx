'use client'

import { useEffect } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'

import clsx from 'clsx'

import { useTheme } from 'next-themes'

import { Orbitron } from 'next/font/google'

import CartPopover from '@/components/cart/cartPopover'
import AccountPopover from '@/components/account/accountPopover'

const text = Orbitron({
	subsets: ['latin'],
	weight: ['400']
})

export default function Header() {
	const { theme, setTheme } = useTheme()

	const pathname = usePathname()
	const isCheckout = pathname === '/checkout'

	useEffect(() => {
		if (
			window.matchMedia &&
			window.matchMedia('(prefers-color-scheme: dark)').matches
		) {
			setTheme('dark')
		} else {
			setTheme('light')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const toggleTheme = () => {
		if (theme === 'light') {
			setTheme('dark')
		} else {
			setTheme('light')
		}
	}

	return (
		<div className='bg-neutral-100 dark:bg-neutral-900 flex justify-between py-3 sticky top-0 z-20'>
			<Link href='/' className='flex justify-start items-center'>
				<h1
					className={clsx(
						'text-3xl text-neutral-900 dark:text-white font-semibold',
						text.className
					)}
				>
					AECS
				</h1>
			</Link>
			{!isCheckout && (
				<div className='flex gap-2 sm:gap-3 2xl:gap-4 justify-end items-center'>
					<CartPopover theme={theme} />
					<button onClick={toggleTheme}>
						{theme === 'dark' ? (
							<DarkModeOutlinedIcon fontSize='large' sx={{ color: '#fff' }} />
						) : (
							<LightModeOutlinedIcon fontSize='large' sx={{ color: '#000' }} />
						)}
					</button>
					<AccountPopover theme={theme} />
				</div>
			)}
		</div>
	)
}
