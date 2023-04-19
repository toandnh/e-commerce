'use client'

import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '@/store'

import ReactReduxProvider from '@/components/provider/reactReduxProvider'
import NextThemeProvider from '@/components/provider/nextThemeProvider'

export default function Wrapper({ content }: { content: React.ReactNode }) {
	return (
		<NextThemeProvider>
			<ReactReduxProvider>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						{content}
					</PersistGate>
				</Provider>
			</ReactReduxProvider>
		</NextThemeProvider>
	)
}
