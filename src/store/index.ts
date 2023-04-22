import { configureStore } from '@reduxjs/toolkit'

import { persistReducer, persistStore } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

import thunk from 'redux-thunk'

import cartReducer from './cartSlice'

const createNoopStorage = () => {
	return {
		getItem(_key: any): Promise<null> {
			return Promise.resolve(null)
		},
		setItem(_key: any, value: any): Promise<null> {
			return Promise.resolve(value)
		},
		removeItem(_key: any): Promise<void> {
			return Promise.resolve()
		}
	}
}

const storage =
	typeof window !== 'undefined'
		? createWebStorage('local')
		: createNoopStorage()

const persistConfig = {
	key: 'root',
	storage
}

const persistedReducer = persistReducer(persistConfig, cartReducer)

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: [thunk]
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
