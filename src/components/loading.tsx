'use client'

import { CircularProgress } from '@mui/material'

export default function Loading() {
	return (
		<div className='h-screen w-screen flex justify-center items-center'>
			<CircularProgress />
		</div>
	)
}
