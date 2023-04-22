import ProductPage from '@/app/product/[productId]/productPage'

export const metadata = {
	title: 'Product | Another E Commerce Site',
	description: 'Generated by create next app'
}

export default function Product() {
	return (
		<main className='h-full flex justify-center items-center pt-4 sm:pt-6 2xl:pt-8'>
			<div className='w-full p-4 sm:p-6 2xl:p-8 border border-neutral-200 dark:border-neutral-700'>
				<ProductPage />
			</div>
		</main>
	)
}
