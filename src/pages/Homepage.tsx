import { Grid2 } from '@mui/material'
import { Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Homepage() {
	const navigate = useNavigate()

	return (
		<Grid2
			container
			direction="column"
			alignItems="center"
			justifyContent="center"
			spacing={4}
			style={{ height: '100vh', textAlign: 'center' }} // Centrato verticalmente e orizzontalmente
		>
			{/* Titolo */}
			<Grid2>
				<Typography variant="h1" component="h1" gutterBottom>
					Scegli la lingua
				</Typography>
			</Grid2>

			{/* Opzioni di lingua */}
			<Grid2>
				<Grid2 container spacing={2} justifyContent="center">
					<Grid2>
						<Button variant="contained" color="primary">
							Italiano
						</Button>
					</Grid2>
					<Grid2>
						<Button variant="contained" color="secondary">
							English
						</Button>
					</Grid2>
				</Grid2>
			</Grid2>
			<Grid2>
				<Button variant="contained" color="primary" onClick={() => navigate('/license')}>
					Avanti
				</Button>
			</Grid2>
		</Grid2>
	)
}
