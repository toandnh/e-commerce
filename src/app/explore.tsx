import prisma from '@/prisma/client'

import Carousel from '@/components/carousel/carousel'

async function getTags(): Promise<Tag[]> {
	const tags = await prisma.tag.findMany()
	return tags
}

export default async function Explore() {
	const tags = await getTags()

	return (
		<div className='flex flex-col gap-4 overflow-y-auto'>
			{tags.map((tag: Tag) => (
				<div key={tag.id}>
					{/* @ts-expect-error Async Server Component */}
					<Carousel tag={tag.name} />
				</div>
			))}
		</div>
	)
}
