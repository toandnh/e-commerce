'use client'

import Link from 'next/link'

import { signIn, signOut } from 'next-auth/react'

import { Popover } from '@headlessui/react'

import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'

import useSWR from 'swr'

export default function AccountPopover({
	theme
}: {
	theme: string | undefined
}) {
	const fetcher = (url: string) => fetch(url).then((res) => res.json())
	const { data: session } = useSWR('/api/account', fetcher)

	let content: React.ReactNode
	if (session?.user) {
		content = (
			<div className='w-full flex flex-col items-center p-4'>
				<Popover.Button
					as={Link}
					href='/account'
					className='w-full h-full flex justify-center p-4 rounded-md hover:cursor-pointer hover:bg-neutral-200 hover:dark:bg-neutral-800'
				>
					Orders
				</Popover.Button>
				<input
					type='button'
					onClick={() => signOut()}
					className='w-full h-full p-4 rounded-md hover:cursor-pointer hover:bg-neutral-200 hover:dark:bg-neutral-800'
					value='Sign out'
				/>
			</div>
		)
	} else {
		content = (
			<div className='w-full flex items-center p-4'>
				<input
					type='button'
					onClick={() => signIn()}
					className='w-full h-full p-4 rounded-md hover:cursor-pointer hover:bg-neutral-200 hover:dark:bg-neutral-800'
					value='Sign In'
				/>
			</div>
		)
	}

	return (
		<Popover className='relative'>
			{({ open }) => (
				<>
					<Popover.Button>
						<AccountBoxOutlinedIcon
							fontSize='large'
							sx={{ color: theme === 'dark' ? '#fff' : '#000' }}
						/>
					</Popover.Button>
					{open && (
						<Popover.Panel className='absolute left-full w-screen max-w-xs -translate-x-full transform px-4 sm:px-0 mt-3'>
							<div className='bg-white dark:bg-neutral-700 flex flex-col justify-center items-center rounded-md overflow-hidden'>
								{content}
							</div>
						</Popover.Panel>
					)}
				</>
			)}
		</Popover>
	)
}
