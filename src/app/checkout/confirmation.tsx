import Order from '@/components/order/order'

import yetAnotherGreatFind from '../../../public/yetAnotherGreatFind.jpg'

export default function Confirmation({ orderId }: { orderId: string }) {
	return (
		<div className='w-3/4 flex flex-col gap-4'>
			<img
				src={yetAnotherGreatFind.src}
				alt='yet-another-great-find'
				className='aspect-[3/4]'
			/>
			<div className='w-full'>
				<Order orderId={orderId} />
			</div>
		</div>
	)
}
