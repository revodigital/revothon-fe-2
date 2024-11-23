import { Grid2, Typography, Button, Link } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import { useNavigate, useLocation } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useEffect, useState } from 'react'

export default function ScanExecuted() {
	const navigate = useNavigate()
	const location = useLocation()
	const [licenseData, setLicenseData] = useState<any>() // Dati passati dalla navigazione

	useEffect(() => {
		const storedData = localStorage.getItem('driver')
		if (storedData) {
			try {
				const parsedData = JSON.parse(storedData)
				setLicenseData(parsedData)
			} catch (error) {
				console.error('Errore durante il parsing dei dati:', error)
			}
		}
	}, [])

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
						<strong>Nome:</strong> {licenseData.driverName} {licenseData.driverSurname}
					</Typography>
					<Typography variant="body1">
						<strong>Numero Patente:</strong> {licenseData.documentNumber}
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
