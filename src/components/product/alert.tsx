'use client'

import { Alert as MuiAlert } from '@mui/material'
import { default as MuiCheckIcon } from '@mui/icons-material/Check'

export default function Alert({ title }: { title: string }) {
	return (
		<MuiAlert
			icon={<MuiCheckIcon fontSize='inherit' />}
			severity='success'
			color='info'
			sx={{
				borderRadius: '6px'
			}}
		>
			{title} added to cart!
		</MuiAlert>
	)
}
