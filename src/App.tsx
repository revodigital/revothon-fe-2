import Routes from 'routes'
import NavigationScroll from 'layout/NavigationScroll'
import ThemeCustomization from 'themes'
import { Box, IconButton, Link } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { useNavigate } from 'react-router-dom'
import Snackbar from './ui-components/components/Snackbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DirectusAuthProvider } from 'directus/DirectusAuthProvider'
//import { useMemo } from 'react'

const queryClient = new QueryClient()

const authProvider = new DirectusAuthProvider('https://rvthn2.revod.services')
export const directusClient = authProvider.getDirectusInstance()

// useMemo(() => {
// 	directusClient.login('admin@rvthn2.it', 'password')
// }, [])

// ==============================|| APP ||============================== //

const App = () => {
	const navigate = useNavigate()
	return (
		<ThemeCustomization>
			<NavigationScroll>
				<QueryClientProvider client={queryClient}>
					<Box sx={{ position: 'relative', height: '100vh' }}>
						{/* Home Icon in Top-Left */}
						<IconButton
							onClick={() => navigate('/')} // Navigate to home
							sx={{
								position: 'absolute',
								top: 16,
								left: 16
							}}>
							<HomeIcon fontSize="large" />
						</IconButton>
						<Routes />
						<Snackbar />
					</Box>
				</QueryClientProvider>
			</NavigationScroll>
		</ThemeCustomization>
	)
}

export default App
