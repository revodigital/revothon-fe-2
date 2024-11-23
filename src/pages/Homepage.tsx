import { Grid2 } from '@mui/material'
import { Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { SupervisedUserCircle, Star } from '@mui/icons-material' // Icone MUI

export default function Homepage() {
	const navigate = useNavigate()

	return (
		<Grid2
			container
			direction="column"
			alignItems="center"
			justifyContent="center"
			spacing={4}
			style={{
				height: '100vh',
				textAlign: 'center',
				backgroundColor: '#20232a', // Sfondo scuro
				color: '#fff', // Testo bianco per contrasto
				fontFamily: 'Comic Sans MS, cursive, sans-serif' // Font "divertente"
			}}>
			{/* Titolo */}
			<Grid2>
				<Typography
					variant="h1"
					component="h1"
					style={{
						fontSize: '4rem',
						fontWeight: 'bold',
						color: '#f39c12', // Colore arancio per un effetto da supereroe
						textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)' // Ombra per effetto 3D
					}}>
					Scegli la tua lingua, Supereroe!
				</Typography>
			</Grid2>

			{/* Opzioni di lingua */}
			<Grid2>
				<Grid2 container spacing={2} justifyContent="center">
					<Grid2>
						<Button
							variant="contained"
							color="primary"
							startIcon={<SupervisedUserCircle />}
							style={{
								fontSize: '1.2rem',
								backgroundColor: '#e74c3c', // Rosso per il tema eroico
								boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
								padding: '15px 30px',
								borderRadius: '8px',
								fontWeight: 'bold'
							}}>
							Italiano
						</Button>
					</Grid2>
					<Grid2>
						<Button
							variant="contained"
							color="secondary"
							startIcon={<Star />}
							style={{
								fontSize: '1.2rem',
								backgroundColor: '#8e44ad', // Viola per il tema supereroe
								boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
								padding: '15px 30px',
								borderRadius: '8px',
								fontWeight: 'bold'
							}}>
							English
						</Button>
					</Grid2>
				</Grid2>
			</Grid2>

			{/* Bottone di navigazione */}
			<Grid2>
				<Button
					variant="contained"
					color="primary"
					onClick={() => navigate('/license')}
					style={{
						fontSize: '1.5rem',
						backgroundColor: '#f39c12', // Colore arancio brillante
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
						padding: '20px 50px',
						fontWeight: 'bold',
						borderRadius: '12px'
					}}>
					Avanti, Supereroe!
				</Button>
			</Grid2>
		</Grid2>
	)
}
