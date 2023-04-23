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

export default async function PageItem({ query }: { query: string }) {
	const items = await getItemByQuery(query)

	return <main>PageItem</main>
}
