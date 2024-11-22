// third-party
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch as useAppDispatch, useSelector as useAppSelector, TypedUseSelectorHook } from 'react-redux'

import { persistReducer, persistStore } from 'redux-persist'

import storage from 'redux-persist/lib/storage'
// project imports
import rootReducer from './reducer'

// ==============================|| REDUX - MAIN STORE ||============================== //

const persistConfig = {
	key: 'root',
	storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

const { dispatch } = store

const useDispatch = () => useAppDispatch<AppDispatch>()
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector

export { store, dispatch, useSelector, useDispatch }
