import Image from 'next/image'

import clsx from 'clsx'

import { useMediaQuery } from '@/hooks/useMediaQuery'

import { cloudinaryLoader } from '@/components/loader/cloudinaryLoader'

export default function OrderItem({ item }: { item: any }) {
	const isBreakpoint = useMediaQuery(768)

	return (
		<div className='w-full flex items-center'>
			<div className='flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12'>
				<Image
					src={item.image}
					alt={item.title}
					width='0'
					height='0'
					sizes='100vw'
					className='w-full h-auto'
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
					<p>Quantity: {item.amount}</p>
				</div>
			</div>
		</div>
	)
}
