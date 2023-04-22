import CartItemList from '@/components/cart/cartItemList'

export default function Order({
	fees,
	valid
}: {
	fees: {
		nerdFee: number
		taxes: number
		shipping: number
		subtotal: number
		total: number
	}
	valid: boolean
}) {
	return (
		<div className='h-[55%] max-w-lg flex flex-col'>
			<CartItemList />
			<div className='flex flex-col gap-4 p-4'>
				<div className='flex justify-between'>
					<p>Subtotal:</p>
					<div>${fees.subtotal}</div>
				</div>
				<div className='flex justify-between'>
					<p>Shipping:</p>
					<div>${fees.shipping}</div>
				</div>
				<div className='flex justify-between'>
					<p>Nerd Fee:</p>
					<div>${fees.nerdFee}</div>
				</div>
				<div className='flex justify-between'>
					<p>Taxes:</p>
					<div>${fees.taxes}</div>
				</div>
				<div className='flex justify-between border-t border-neutral-200 dark:border-neutral-600 py-4'>
					<p>Total:</p>
					<div>${fees.total}</div>
				</div>
			</div>
			<div className='p-4'>
				<input
					id='my-form'
					type='submit'
					className='w-full bg-orange-400 dark:bg-orange-600 h-10 rounded-md hover:bg-orange-500 dark:hover:bg-orange-700 hover:cursor-pointer disabled:bg-orange-400/40 disabled:dark:bg-orange-600/40'
					disabled={!valid}
					value='Confirm Order'
				/>
			</div>
		</div>
	)
}
