import { Box, Button, Grid2, Typography, CircularProgress } from '@mui/material'
import Webcam from 'react-webcam'
import React, { useState } from 'react'
import AWS from 'aws-sdk'
import { slsTextractOcrDevGetDocumentByFileName } from '../../api-read-license/client'
import { directusClient } from 'App'
import { i } from 'vite/dist/node/types.d-aGj9QkWt'
import { createItem, readItems } from '@directus/sdk'
import { useNavigate } from 'react-router-dom'

AWS.config.update({
	credentials: {
		accessKeyId: 'AKIASOF4WL5ZYOZA7JJY',
		secretAccessKey: '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'
	}
})

const buk = new AWS.S3({
	params: { Bucket: 'ocr-documents-revo-eni' },
	region: 'eu-west-1'
})

const LicensePlateReader = () => {
	const [loading, setLoading] = useState(false)
	const jonny = React.useRef<any>(null)
	console.log(setLoading)
	function urlFile(dataurl: any, filename: string) {
		var arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[arr.length - 1]),
			n = bstr.length,
			u8arr = new Uint8Array(n)
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n)
		}
		return new File([u8arr], filename, { type: mime })
	}

	const capture = React.useCallback(async () => {
		console.log('start test')
		const varA = jonny.current?.getScreenshot()
		if (varA) {
			const date = new Date().getTime()
			const varB = urlFile(varA, `img-${date}.jpeg`)
			try {
				const params = {
					Body: varB,
					Bucket: 'ocr-documents-revo-eni',
					Key: 'input/' + varB.name
				}
				buk.putObject(params).send((err, data) => {
					if (err) console.log(err)
					if (data) console.log(data)
				})
				return varB
			} catch (error) {
				console.log('Error A')
			}
		} else {
			return undefined
		}
	}, [jonny])

	const getFileWithRetry = async (key: any, maxRetries = 5, attempt = 1): Promise<any | undefined> => {
		try {
			if (attempt === 1) await new Promise((resolve) => setTimeout(resolve, 4))
			let ocrResponse = await slsTextractOcrDevGetDocumentByFileName({ path: { file: key } })
			if (!ocrResponse.data?.input) {
				if (attempt < maxRetries) {
					await new Promise((resolve) => setTimeout(resolve, 1000 * attempt)) // Attende prima di riprovare, aumentando l'attesa ogni tentativo
					return getFileWithRetry(key, maxRetries, attempt + 1)
				} else {
					return undefined
				}
			} else {
				return ocrResponse
			}
		} catch (e: any) {
			if (attempt < maxRetries) {
				await new Promise((resolve) => setTimeout(resolve, 1000 * attempt)) // Attende prima di riprovare, aumentando l'attesa ogni tentativo
				return getFileWithRetry(key, maxRetries, attempt + 1.5)
			} else {
				return undefined
			}
		}
	}

	const navigate = useNavigate()

	const handleClick = async () => {
		setLoading(true)
		let test = await capture()
		if (test) {
			const sn = test?.name.split('.')
			const res = await getFileWithRetry(sn[0])
			if (res) {
				/* Chiamata api */
				const driver = await directusClient.request(
					readItems('Drivers', {
						filter: {
							documentNumber: {
								_eq: res?.data.document_number
							}
						}
					})
				)

				if (driver.length > 0) {
					// qui l'autista esiste già, devi solo creare il log
					console.log(driver)
					const newLog = await directusClient.request(
						createItem('Log', {
							status: 'draft',
							driver: driver[0].driverId
						})
					)

					localStorage.setItem('driver', JSON.stringify(driver[0]))
					localStorage.setItem('log', JSON.stringify(newLog))

					navigate('/scan-executed', { state: { driver: driver[0], log: newLog } })
				} else {
					const newDriver = await directusClient.request(
						createItem('Drivers', {
							driverName: res.data.first_name,
							driverSurname: res.data.last_name,
							isBlacklist: false,
							documentNumber: res.data.document_number
						})
					)

					const newLog = await directusClient.request(
						createItem('Log', {
							status: 'draft',
							driver: newDriver[0].driverId
						})
					)

					localStorage.setItem('driver', JSON.stringify(newDriver))
					localStorage.setItem('log', JSON.stringify(newLog))
					navigate('/scan-executed', { state: { driver: newDriver[0], log: newLog } })
				}
				console.log(res)
			} else {
				/* Errore */
				console.log('Patente non valida o errore nella scansione.')
				navigate('/Read') // Reindirizza alla pagina NotRead
			}
		} else {
			setTimeout(() => {
				console.log('Scansione completata!')
				setLoading(false) // Nasconde il loader alla fine
			}, 3000) // Ritardo simulato di 3 secondi
		}
		setLoading(false)
	}
	console.log('-------------')
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
			<Grid2>
				<Typography variant="h1" mt={4}>
					Scansiona la Patente
				</Typography>
			</Grid2>
			<Box
				style={{
					aspectRatio: '4 / 3',
					overflow: 'hidden',
					borderRadius: '8px',
					border: '2px solid #000',
					display: loading ? 'none' : 'block'
				}}>
				<Webcam
					audio={false}
					ref={jonny}
					screenshotFormat="image/jpeg"
					style={{
						width: '100%',
						height: '100%'
					}}
				/>
			</Box>

			{/* Loader durante il caricamento */}
			{loading && <CircularProgress color="primary" />}

			{/* Bottone per avviare la scansione */}
			<Button onClick={handleClick} variant="contained" color="primary" disabled={loading}>
				{loading ? 'Scansione in corso...' : 'Scansiona la patente'}
			</Button>
		</Grid2>
	)
}

export default LicensePlateReader
