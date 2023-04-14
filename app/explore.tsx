import prisma from '@/prisma/client'

import Carousel from './carousel'

async function getTags() {
	const tags = await prisma.tag.findMany()
	return tags
}

export default async function Explore() {
	const tags = await getTags()

	return (
		<div className='flex flex-col gap-4 overflow-y-auto'>
			{tags.map((tag) => (
				<>
					{/* @ts-expect-error Async Server Component */}
					<Carousel key={tag.id} tag={tag.name} />
				</>
			))}
		</div>
	)
}
