'use client'

import { useCallback } from 'react'

import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'

import useEmblaCarousel from 'embla-carousel-react'

import { CldImage } from 'next-cloudinary'

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

	const images: string[] = []
	items.map((item) => {
		images.push(item.image.replace('%20', ' ')) //prevent double encoding.
	})

	return (
		<div className='relative'>
			<div className='overflow-hidden' ref={emblaRef}>
				<div className='flex'>
					{images.map((image, index) => {
						return (
							<div className='flex-none pr-4' key={index}>
								<CldImage
									height='200'
									width='200'
									src={image}
									alt='thumbnail'
								/>
							</div>
						)
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
	)
}
