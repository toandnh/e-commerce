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
					loader={cloudinaryLoader}
				/>
			</Link>
		</div>
	)
}
