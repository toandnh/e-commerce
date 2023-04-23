import prisma from '@/prisma/client'

import ProductPreview from '@/components/product/productPreview'

async function getItemByQuery(query: string) {
	const item = await prisma.item.findMany({
		where: {
			title: {
				contains: query,
				mode: 'insensitive'
			}
		}
	})
	return item
}

async function getItemsByTag(tag: string) {
	const tagId = await prisma.tag.findUnique({
		where: { name: tag },
		select: { id: true }
	})
	if (!tagId) return

	const itemIdsObj = await prisma.itemsTags.findMany({
		where: { tagId: tagId.id },
		select: { itemId: true }
	})
	if (!itemIdsObj) return

	const itemIds: number[] = []
	if (itemIdsObj instanceof Array) {
		itemIdsObj.map((id) => itemIds.push(id.itemId))
	}

	const items = await prisma.item.findMany({ where: { id: { in: itemIds } } })
	return items
}

export default async function Product({
	searchParams
}: {
	searchParams: { query: string | null; tag: string | null }
}) {
	let items
	if (searchParams?.query) {
		items = await getItemByQuery(searchParams.query)
	} else if (searchParams?.tag) {
		items = await getItemsByTag(searchParams.tag)
	}

	return (
		<main className='h-full min-h-[80vh] w-full p-4 sm:p-6 2xl:p-8 border border-neutral-200 dark:border-neutral-700 rounded-md'>
			<p className='font-semibold text-xl pb-4 sm:pb-6 2xl:pb-8 pl-4 sm:pl-6 2xl:pl-8'>
				Result for <i>{searchParams.query ?? searchParams.tag}</i>
			</p>
			<div className='flex flex-wrap gap-4 p-4 sm:p-6 2xl:p-8'>
				{items &&
					items.map((item: Item) => (
						<ProductPreview key={item.title} item={item} />
					))}
			</div>
		</main>
	)
}
