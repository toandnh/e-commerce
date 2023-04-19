import ProductPage from '@/app/product/[productId]/productPage'

export default function Product() {
	return (
		<main className='flex justify-center border border-neutral-200 dark:border-neutral-700'>
			<div className='w-3/4'>
				<ProductPage />
			</div>
		</main>
	)
}
