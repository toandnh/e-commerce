'use client'

import { Drawer } from '@mui/material'

const drawerWidth = 350

export default function CartDrawer() {
	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					backgroundColor: 'rgb(64, 64, 64)',
					borderColor: 'rgb(82, 82, 82)',
					borderLeftWidth: '1px',
					borderLeftRadius: '4px',
					width: drawerWidth
				}
			}}
			variant='persistent'
			anchor='right'
			open={true}
		>
			<div className='flex justify-center text-white text-xl font-bold p-4'>
				Your shopping cart!
			</div>
		</Drawer>
	)
}
