import prisma from '@/prisma/client'

import ProductPreview from '@/components/product/productPreview'

async function getItemByQuery(query: string) {
	const item = await prisma.item.findMany({
		where: {
			title: {
				search: query,
				mode: 'insensitive'
			}
		}
	})
	return item
}

export default async function Product({
	searchParams
}: {
	searchParams: { query: string }
}) {
	const items = await getItemByQuery(searchParams.query)

	return (
		<main className='p-4 sm:p-6 2xl:p-8 border border-neutral-200 dark:border-neutral-700 rounded-md'>
			<p className='font-semibold text-xl pb-4 sm:pb-6 2xl:pb-8 pl-4 sm:pl-6 2xl:pl-8'>
				Result for <i>{searchParams.query}</i>
			</p>
			<div className='flex flex-wrap justify-center gap-4 py-4 sm:py-6 2xl:py-8'>
				{items &&
					items.map((item: Item) => (
						<ProductPreview key={item.title} item={item} />
					))}
			</div>
		</main>
	)
}
