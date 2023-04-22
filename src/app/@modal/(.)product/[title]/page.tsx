import prisma from '@/prisma/client'

import Modal from '@/components/modal/modal'
import Product from '@/components/product/product'

async function getItem(title: string) {
	const item = await prisma.item.findUnique({
		where: { title }
	})
	return item
}

export default async function ProductModal({
	params
}: {
	params: { title: string }
}) {
	const item = await getItem(params.title.replaceAll('%20', ' '))

	return item ? (
		<Modal>
			<Product item={item} />
		</Modal>
	) : (
		<p>Product not found!</p>
	)
}
