import React, { useRef, useState } from 'react'
import { Typography, Button, CircularProgress } from '@mui/material'
import { Grid2 } from '@mui/material'
import Webcam from 'react-webcam'

const LicensePlateReader = () => {
	const webcamRef = useRef<Webcam>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [successMessage, setSuccessMessage] = useState('')

	const capturePhoto = async () => {
		setLoading(true)
		setError('')
		setSuccessMessage('')
		try {
			const screenshot = webcamRef.current?.getScreenshot()
			if (!screenshot) {
				setError('Errore durante la cattura della foto. Riprova.')
				return
			}
			console.log('Foto catturata:', screenshot)
			setSuccessMessage('Foto catturata con successo!')
		} catch (e) {
			setError('Si è verificato un errore. Riprova.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Grid2
			container
			direction="column"
			spacing={8}
			sx={{
				minHeight: '100vh',
				alignItems: 'center',
				justifyContent: 'center',
				textAlign: 'center',
				padding: 2
			}}>
			{/* Titolo */}
			<Grid2 component="span">Homepage</Grid2>

			<Grid2>
				<Typography variant="h1" mt={4}>
					Scansiona la Patente
				</Typography>
			</Grid2>

			{/* Webcam */}
			<Grid2>
				<div
					style={{
						width: '100%',
						aspectRatio: '4 / 3',
						overflow: 'hidden',
						borderRadius: '8px',
						border: '2px solid #000'
					}}>
					<Webcam
						ref={webcamRef}
						audio={false}
						screenshotFormat="image/jpeg"
						style={{
							width: '100%',
							height: '100%'
						}}
					/>
				</div>
			</Grid2>

			{/* Bottone */}
			<Grid2>
				<Button variant="contained" color="primary" onClick={capturePhoto} disabled={loading}>
					{loading ? <CircularProgress size={24} color="inherit" /> : 'Scatta Foto'}
				</Button>
			</Grid2>

			{/* Messaggi di errore o successo */}
			<Grid2>
				{error && (
					<Typography variant="body1" color="error">
						{error}
					</Typography>
				)}
				{successMessage && (
					<Typography variant="body1" color="success.main">
						{successMessage}
					</Typography>
				)}
			</Grid2>
		</Grid2>
	)
}

export default LicensePlateReader
