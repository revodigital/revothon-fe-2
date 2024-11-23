import Routes from 'routes'
import NavigationScroll from 'layout/NavigationScroll'
import ThemeCustomization from 'themes'
import Snackbar from './ui-components/components/Snackbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DirectusAuthProvider } from 'directus/DirectusAuthProvider'
import { useEffect, useMemo } from 'react'

const queryClient = new QueryClient()

const authProvider = new DirectusAuthProvider('https://rvthn2.revod.services')
export const directusClient = authProvider.getDirectusInstance()

// ==============================|| APP ||============================== //

const App = () => {
	useMemo(() => {
		directusClient.login('admin@rvthn2.it', 'password')
	}, [])

	return (
		<ThemeCustomization>
			<NavigationScroll>
				<QueryClientProvider client={queryClient}>
					<>
						<Routes />
						<Snackbar />
					</>
				</QueryClientProvider>
			</NavigationScroll>
		</ThemeCustomization>
	)
}

export default App
