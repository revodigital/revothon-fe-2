import { Grid2, Typography, Button, Link } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ShieldIcon from '@mui/icons-material/Security'
import { useNavigate, useLocation } from 'react-router-dom'
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

	const handleNavigate = () => {
		if (licenseData?.isBlacklist) {
			navigate('/scan-error')
		} else {
			navigate('/Questions')
		}
	}

	return (
		<Grid2
			container
			direction="column"
			alignItems="center"
			justifyContent="center"
			spacing={2}
			style={{
				height: '100vh',
				textAlign: 'center',
				backgroundColor: '#20232a',
				backgroundSize: 'cover',
				color: '#FFF'
			}}>
			{/* Icona Epica */}
			<Grid2>
				<ShieldIcon color="primary" style={{ fontSize: 120 }} />
			</Grid2>

			{/* Titolo Tematico */}
			<Grid2>
				<Typography variant="h1" style={{ color: '#FFD700', fontWeight: 'bold' }}>
					Scansione Completata!
				</Typography>
				<Typography variant="subtitle1" style={{ fontStyle: 'italic', color: '#FFF' }}>
					"L’identità di un eroe è confermata!"
				</Typography>
			</Grid2>

			{/* Dettagli della patente */}
			{licenseData ? (
				<Grid2>
					<Typography variant="body1" style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#FFF' }}>
						<strong>Nome Supereroe:</strong> {licenseData.driverName} {licenseData.driverSurname}
					</Typography>
					<Typography variant="body1" style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#FFF' }}>
						<strong>Codice Segreto:</strong> {licenseData.documentNumber}
					</Typography>
				</Grid2>
			) : (
				<Typography variant="body1" color="error">
					Dati non disponibili. Contatta il quartier generale.
				</Typography>
			)}

			{/* Bottone Tematico */}
			<Grid2>
				<Button
					variant="contained"
					color="secondary"
					style={{
						backgroundColor: '#FF4500',
						fontWeight: 'bold',
						textTransform: 'uppercase'
					}}
					onClick={handleNavigate}>
					{licenseData?.isBlacklist ? 'Errore: Supercriminale!' : 'Continua la Missione'}
				</Button>
			</Grid2>
		</Grid2>
	)
}
