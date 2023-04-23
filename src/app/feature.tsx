import prisma from '@/prisma/client'

import ProductPreview from '@/components/product/productPreview'

async function getLastestItems() {
	const items = await prisma.item.findMany({
		orderBy: { createdAt: 'desc' },
		take: 6
	})
	return items
}

export default async function Feature() {
	const items = await getLastestItems()

	return (
		<>
			<p className='font-semibold text-lg'>Featured</p>
			<div className={`bg-[url(/kuroko.jpg)]`}>
				<div className='flex flex-wrap gap-4'>
					{items.map((item) => (
						<div className='bg-neutral-300/50 dark:bg-neutral-800/50 grid grid-cols-fluid gap-4 p-10'>
							<p className='font-semibold text-xl'>{item.title}</p>
							<ProductPreview key={item.title} item={item} />
						</div>
					))}
				</div>
			</div>
		</>
	)
}
