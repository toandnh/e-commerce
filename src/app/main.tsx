'use client'

import { styled } from '@mui/material/styles'

const drawerWidth = 350

export const Main = styled('main', {
	shouldForwardProp: (prop) => prop !== 'open'
})<{
	open?: boolean
}>(({ theme, open }) => ({
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.easeIn,
		duration: theme.transitions.duration.leavingScreen
	}),
	marginRight: -drawerWidth,
	...(open && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginRight: 0
	})
}))
