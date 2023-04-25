'use client'

import { usePathname } from 'next/navigation'

import useSWR from 'swr'

import Product from '@/components/product/product'
import Loading from '@/components/loading'

export default function ProductPage() {
	const pathname = usePathname()
	const productTitle = pathname.slice(pathname.lastIndexOf('/') + 1)

	const fetcher = (url: string) => fetch(url).then((res) => res.json())
	const { isLoading, data } = useSWR(`/api/items/${productTitle}`, fetcher)

	if (isLoading) {
		return <Loading />
	}

	return !data.message ? <Product item={data} /> : <p>Product not found!</p>
}
