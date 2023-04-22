import Link from 'next/link'
import Image from 'next/image'

import { cloudinaryLoader } from '@/components/loader/cloudinaryLoader'

export default function SearchResult({ item }: { item: Item }) {
	return (
		<Link
			href={`/product/${item.title}`}
			className='w-full flex items-center gap-4 p-2 sm:p-4 2xl:p-6'
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
			<p>{item.title}</p>
		</Link>
	)
}
