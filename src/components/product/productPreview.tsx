'use client'

import Image from 'next/image'
import Link from 'next/link'

import { cloudinaryLoader } from '../loader/cloudinaryLoader'

export default function ProductPreview({ item }: { item: Item }) {
	return (
		<div className='flex-none pr-4'>
			<Link href={`product/${item.title}`}>
				<Image
					src={item.image}
					alt={item.title}
					height={200}
					width={200}
					sizes='(min-width: 60em) 24vw,
                  (min-width: 28em) 45vw,
                  100vw'
					loader={cloudinaryLoader}
				/>
			</Link>
		</div>
	)
}
