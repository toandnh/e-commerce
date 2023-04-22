export const metadata = {
	title: 'Check out | Another E Commerce Site',
	description: 'Generated by create next app'
}

export default function CheckoutLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<section className='flex justify-center mt-4 sm:mt-6 2xl:mt-8'>
			{children}
		</section>
	)
}
