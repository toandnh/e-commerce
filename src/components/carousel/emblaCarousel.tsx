'use client'

import { useCallback } from 'react'

import Link from 'next/link'

import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'

import useEmblaCarousel from 'embla-carousel-react'

import ProductPreview from '@/components/product/productPreview'

export default function EmblaCarousel({
	category,
	items
}: {
	category: string
	items: any[]
}) {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: 'start',
		loop: true,
		skipSnaps: true,
		inViewThreshold: 0.7
	})

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev()
	}, [emblaApi])

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext()
	}, [emblaApi])

	return (
		<div className='flex flex-col'>
			<Link
				href={`/product?tag=${category}`}
				className='w-fit text-lg font-semibold pb-4'
			>
				{category}
				<KeyboardDoubleArrowRightIcon />
			</Link>
			<div className='relative'>
				<div className='flex flex-col gap-4 overflow-hidden' ref={emblaRef}>
					<div className='flex'>
						{items.map((item, index) => {
							return <ProductPreview key={index} item={item} />
						})}
					</div>
				</div>

				<button
					className='absolute top-0 bottom-0 left-3 active:bg-transparent'
					onClick={scrollPrev}
				>
					<ArrowBackIosOutlinedIcon sx={{ color: 'black' }} />
				</button>

				<button
					className='absolute top-0 bottom-0 right-3 active:bg-transparent'
					onClick={scrollNext}
				>
					<ArrowForwardIosOutlinedIcon sx={{ color: 'black' }} />
				</button>
			</div>
		</div>
	)
}
