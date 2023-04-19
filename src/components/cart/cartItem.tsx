import Image from 'next/image'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'

import clsx from 'clsx'

import { store } from '@/store'
import { updateAmount, removeItemFromCart } from '@/store/cartSlice'

import { cloudinaryLoader } from '../loader/cloudinaryLoader'

export default function CartItem({
	item,
	theme,
	isBreakpoint
}: {
	item: ItemCart
	theme: string | undefined
	isBreakpoint: boolean
}) {
	const handleAddItem = () => {
		store.dispatch(updateAmount({ title: item.title, sign: '+', amount: 1 }))
	}
	const handleRemoveItem = () => {
		store.dispatch(updateAmount({ title: item.title, sign: '-', amount: 1 }))
	}
	const handleClearItem = () => {
		store.dispatch(removeItemFromCart(item.title))
	}

	return (
		<div
			key={item.title}
			className='border-neutral-200 dark:border-neutral-600 flex items-center p-2 border-b'
		>
			<div className='flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12'>
				<Image
					src={item.image}
					alt={item.title}
					height={400}
					width={400}
					loader={cloudinaryLoader}
				/>
			</div>
			<div className='w-full flex flex-col gap-4 ml-4'>
				<div className={clsx('flex', isBreakpoint ? 'justify-between' : '')}>
					<p className={clsx(isBreakpoint ? '' : 'basis-1/2')}>{item.title}</p>
					<button
						className={clsx(isBreakpoint ? '' : 'basis-1/2 flex justify-end')}
						onClick={handleClearItem}
					>
						<DeleteForeverIcon
							fontSize='medium'
							sx={{ color: theme === 'dark' ? '#fff' : '#000' }}
						/>
					</button>
				</div>
				<div className={clsx('flex', isBreakpoint ? 'flex-col gap-4' : '')}>
					<p className='basis-1/2'>
						${Math.round(item.price * item.amount * 100) / 100}{' '}
					</p>
					<div
						className={clsx(
							'flex items-center gap-2',
							isBreakpoint ? 'justify-start' : 'basis-1/2 justify-end'
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
	)
}
