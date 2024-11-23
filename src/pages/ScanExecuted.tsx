import { Grid2, Typography, Button, Link } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import { useNavigate, useLocation } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export default function ScanExecuted() {
	const navigate = useNavigate()
	const location = useLocation()
	const licenseData = location.state?.licenseData // Dati passati dalla navigazione

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
				<CheckCircleIcon color="success" style={{ fontSize: 100 }} />
			</Grid2>

			{/* Attention Text */}
			<Grid2>
				<Typography variant="h1" color="error">
					Scansione Eseguita
				</Typography>
			</Grid2>

			{/* Dettagli della patente */}
			{licenseData ? (
				<Grid2>
					<Typography variant="body1">
						<strong>Nome:</strong> {licenseData.name}
					</Typography>
					<Typography variant="body1">
						<strong>Numero Patente:</strong> {licenseData.number}
					</Typography>
					<Typography variant="body1">
						<strong>Data di Nascita:</strong> {licenseData.dob}
					</Typography>
				</Grid2>
			) : (
				<Typography variant="body1" color="error">
					Dati non disponibili.
				</Typography>
			)}

			{/* Button */}

			<Grid2>
				<Link href="/" underline="hover">
					<Button variant="contained" color="primary" onClick={() => navigate('/license')}>
						Avanti
					</Button>
				</Link>
			</Grid2>
		</Grid2>
	)
}
