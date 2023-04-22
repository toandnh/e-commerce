'use client'

import Image from 'next/image'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'

import clsx from 'clsx'

import { useTheme } from 'next-themes'

import { useMediaQuery } from '@/hooks/useMediaQuery'

import { store } from '@/store'
import { updateAmount, removeItemFromCart } from '@/store/cartSlice'

import { cloudinaryLoader } from '../loader/cloudinaryLoader'

export default function CartItem({ item }: { item: ItemCart }) {
	const { theme } = useTheme()
	const isBreakpoint = useMediaQuery(1024)

	const handleAddItem = (e: React.MouseEvent) => {
		e.preventDefault()
		store.dispatch(updateAmount({ title: item.title, sign: '+', amount: 1 }))
	}
	const handleRemoveItem = (e: React.MouseEvent) => {
		e.preventDefault()
		store.dispatch(updateAmount({ title: item.title, sign: '-', amount: 1 }))
	}
	const handleClearItem = (e: React.MouseEvent) => {
		e.preventDefault()
		store.dispatch(removeItemFromCart(item.title))
	}

	return (
		<div className='border-neutral-200 dark:border-neutral-600 flex flex-col items-center p-2 border-b'>
			<button className='w-full flex justify-end' onClick={handleClearItem}>
				<DeleteForeverIcon
					fontSize='medium'
					sx={{ color: theme === 'dark' ? '#fff' : '#000' }}
				/>
			</button>
			<div className='w-full flex items-center'>
				<div className='flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12'>
					<Image
						src={item.image}
						alt={item.title}
						height={400}
						width={400}
						loader={cloudinaryLoader}
					/>
				</div>
				<div
					className={clsx(
						'w-full flex flex-col ml-4',
						isBreakpoint ? 'gap-2' : 'gap-4'
					)}
				>
					<p>{item.title}</p>
					<div className={clsx('flex gap-2', isBreakpoint ? 'flex-col' : '')}>
						<p className='basis-1/2'>
							${Math.round(item.price * item.amount * 100) / 100}
						</p>
						<div
							className={clsx(
								'flex justify-start items-center gap-2',
								isBreakpoint ? '' : 'basis-1/2'
							)}
						>
							<p>Quantity:</p>
							<button onClick={handleRemoveItem}>
								<RemoveCircleOutlineIcon
									fontSize='medium'
									sx={{ color: theme === 'dark' ? '#fff' : '#000' }}
								/>
							</button>
							<p>{item.amount}</p>
							<button onClick={handleAddItem}>
								<AddCircleOutlineIcon
									fontSize='medium'
									sx={{ color: theme === 'dark' ? '#fff' : '#000' }}
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
