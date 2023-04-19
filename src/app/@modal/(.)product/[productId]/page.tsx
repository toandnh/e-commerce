'use client'

import { usePathname } from 'next/navigation'

import useSWR from 'swr'

import Modal from '@/components/modal'
import Product from '@/components/product/product'

export default function ProductPage() {
	const pathname = usePathname()
	const productTitle = pathname.slice(pathname.lastIndexOf('/') + 1)

	const fetcher = (url: string) => fetch(url).then((res) => res.json())
	const { isLoading, data } = useSWR(`/api/items/${productTitle}`, fetcher)

	if (isLoading) {
		return <>Loading...</>
	}

	return !data.message ? (
		<Modal>
			<Product item={data} />
		</Modal>
	) : (
		<p>Product not found!</p>
	)
}
