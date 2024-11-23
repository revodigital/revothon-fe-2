import { Grid2, Typography, Button, Link } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import { useNavigate } from 'react-router-dom'

export default function ScanError() {
	const navigate = useNavigate()

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
				<Typography variant="h5">L' Autista non puo' acceoere al sito.</Typography>
			</Grid2>

			{/* Button */}
			<Grid2>
				<Button variant="contained" color="primary" onClick={() => navigate('/')} style={{ marginTop: 20, padding: 20 }}>
					Richeiedi Assistenza
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
