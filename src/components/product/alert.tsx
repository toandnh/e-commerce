'use client'

import { useEffect, useState } from 'react'

import { Alert as MuiAlert } from '@mui/material'
import { default as MuiCheckIcon } from '@mui/icons-material/Check'

export default function Alert({ title }: { title: string }) {
	const [alert, setAlert] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			setAlert(false)
		}, 1000)
	}, [])

	return (
		<div>
			{alert && (
				<MuiAlert
					icon={<MuiCheckIcon fontSize='inherit' />}
					severity='success'
					color='info'
					sx={{
						position: 'fixed',
						inset: '0 0 auto 0',
						borderRadius: '6px'
					}}
				>
					{title} added to cart!
				</MuiAlert>
			)}
		</div>
	)
}
