import { getServerSession } from 'next-auth/next'

import { authOptions } from '../api/auth/[...nextauth]/route'

import OrderList from '@/components/order/orderList'

import gunPointing from '../../../public/gunPointing.jpg'

export default async function Account() {
	const session = await getServerSession(authOptions)

	let content: React.ReactNode
	if (!session?.user) {
		content = (
			<div className='absolute h-full w-full flex flex-col justify-center items-center'>
				<img
					src={gunPointing.src}
					alt='young-girl-pointing-gun'
					className='h-2/3 aspect-[3/4]'
				/>
				<p className='font-semibold text-2xl p-8'>Sign in first!</p>
			</div>
		)
	} else {
		content = (
			<div className='min-h-[80vh] w-full'>
				<OrderList user={session.user} />
			</div>
		)
	}

	return (
		<main className='w-full flex justify-center items-center p-4 sm:p-6 2xl:p-8 border border-neutral-200 dark:border-neutral-700 rounded-md'>
			{content}
		</main>
	)
}
