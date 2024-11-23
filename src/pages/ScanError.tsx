import { Grid2, Typography, Button, Link } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import { useNavigate } from 'react-router-dom'

export default function ScanError() {
	const navigate = useNavigate()

	const handleRequestAssistance = async () => {
		try {
			const response = await fetch('https://rvthn2.revod.services/flows/trigger/c6612cca-f1d5-480c-896f-e453b3f35837', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3OWI1M2VhLWUwYWUtNGE5ZC1iOWUxLTgxZjliZTk1YzBlYyIsInJvbGUiOiI3NzBiNTk3My1lYjg5LTQ3ZmQtODAwZC04YTRmMTEyZWRkMGYiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOnRydWUsImlhdCI6MTczMjM2MDgxOCwiZXhwIjoxNzMyNDA0MDE4LCJpc3MiOiJkaXJlY3R1cyJ9.dgw_3mADbwWIiLwk2O6zrq9yS2rssemB7vGI0W2HHus' // Sostituisci con il token corretto, se necessario
				}
			})





			if (response.status != 204) {
				throw new Error(`Errore: ${response.status} ${response.statusText}`)
			}
			alert("You will be reached soon!")
			// Eventuale navigazione o feedback per l'utente
			navigate('/') // Sostituisci con il percorso corretto

		} catch (error) {

		}
	}

	return (
		<Grid2
			container
			direction="column"
			alignItems="center"
			justifyContent="center"
			spacing={2}
			style={{ height: '100vh', textAlign: 'center' }}>
			{/* Cross Icon */}
			<Grid2>
				<CancelIcon color="error" style={{ fontSize: 100 }} />
			</Grid2>

			{/* Attention Text */}
			<Grid2>
				<Typography variant="h1" color="error">
					Attenzione!
				</Typography>
			</Grid2>
			<Grid2>
				<Typography variant="h5">L' Autista non puo' accedere al sito.</Typography>
			</Grid2>

			{/* Button */}
			<Grid2>
				<Button variant="contained" color="primary" onClick={handleRequestAssistance} style={{ marginTop: 20, padding: 20 }}>
					Richiedi Assistenza
				</Button>
			</Grid2>
			<Grid2>
				<Link href="/" underline="hover">
					<Typography variant="h5" style={{ marginTop: 20, padding: 20 }}>
						Torna alla home
					</Typography>
				</Link>
			</Grid2>
		</Grid2>
	)
}
