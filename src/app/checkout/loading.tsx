'use client'

import {CircularProgress} from '@mui/material'

export default function Loading() {
	return (
		<div className='h-full w-full flex justify-center items-center'>
			<CircularProgress />
		</div>
	)
}
