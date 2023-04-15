'use client'

import { useState } from 'react'

import { Modal } from '@mui/material'

import { CldImage } from 'next-cloudinary'

import Product from './product'

export default function ProductModal({ item }: any) {
	const [open, setOpen] = useState(false)
	const handleOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}

	return (
		<div className='flex-none pr-4'>
			<button onClick={handleOpen}>
				<CldImage
					height='200'
					width='200'
					src={item.image.replace('%20', ' ')} //prevent double encoding.
					alt={item.title}
				/>
			</button>
			<Modal
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					'& .MuiModal-backdrop': {
						backgroundColor: 'rgba(64, 64, 64, 0.7)'
					}
				}}
				open={open}
				onClose={handleClose}
			>
				<div className='h-4/5 w-3/5 flex justify-center items-center'>
					<Product item={item} />
				</div>
			</Modal>
		</div>
	)
}
