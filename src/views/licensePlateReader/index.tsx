import { Box, Button } from '@mui/material'
import { Grid2, Typography } from '@mui/material'
import Webcam from 'react-webcam'
import React, { useState } from 'react'
import AWS from 'aws-sdk'
import { slsTextractOcrDevGetDocumentByFileName } from '../../api-read-license/client'
import { directusClient } from 'App'
import { i } from 'vite/dist/node/types.d-aGj9QkWt'
import { readItems } from '@directus/sdk'

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
							_eq: res?.data.document_number
						}
					})
				)

				// TODO: occhio che dopo che crei il log in entrambi i casi te lo devi salvare in localStorage come id
				if (driver.length > 0) {
					// qui l'autista esiste già, devi solo creare il log
				} else {
					// qui l'autista non esiste, devi creare sia autista che poi log
				}
				console.log(res)
			} else {
				/* Errore */
			}
		} else {
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
					border: '2px solid #000'
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
			<Button onClick={handleClick} variant="contained" color="primary">
				Scansiona la patente
			</Button>
		</Grid2>
	)
}

export default LicensePlateReader
