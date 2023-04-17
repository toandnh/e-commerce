'use client'

import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '@/store'

import QueryWrapper from '../components/queryWrapper'

import { ReactReduxProvider } from '@/components/reactReduxProvider'
import { NextThemeProvider } from '@/components/nextThemeProvider'

export default function Wrapper({ content }: { content: React.ReactNode }) {
	return (
		<QueryWrapper>
			<NextThemeProvider>
				<ReactReduxProvider>
					<Provider store={store}>
						<PersistGate loading={null} persistor={persistor}>
							{content}
						</PersistGate>
					</Provider>
				</ReactReduxProvider>
			</NextThemeProvider>
		</QueryWrapper>
	)
}
