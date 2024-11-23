import { useState, useEffect } from 'react'
import { Grid2, Typography, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, CircularProgress } from '@mui/material'
import Radio from '@mui/material/Radio'
import { directusClient } from 'App'
import { readItems, updateItem } from '@directus/sdk'
import { log } from 'console'
import { useNavigate } from 'react-router-dom'

export default function Questions() {
	const navigate = useNavigate()

	const [currentStep, setCurrentStep] = useState(1) // Current question index
	const [selectedValue, setSelectedValue] = useState('')
	const [questions, setQuestions] = useState<any[]>([]) // State to store fetched questions
	const [totalQuestions, setTotalQuestions] = useState(0) // Total number of questions
	const [value, setValue] = useState('')

	// Fetch questions from Directus
	useEffect(() => {
		const fetchQuestions = async () => {
			const questions = await directusClient.request(
				readItems('Questions', {
					limit: 3
				})
			)
			setQuestions(questions)
			setTotalQuestions(questions.length)
		}
		setTimeout(fetchQuestions, 1000)
	}, [])

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedValue((event.target as HTMLInputElement).value)
	}

	const handleNext = async () => {
		const currentQuestion = questions[currentStep - 1]

		console.log(currentQuestion.correctAnswer)
		console.log(selectedValue)
		console.log(selectedValue == currentQuestion.correctAnswer)

		if (selectedValue == currentQuestion.correctAnswer) {
			setValue('Correct!')

			// Move to the next question
			if (currentStep < totalQuestions) {
				setCurrentStep(currentStep + 1)
				setSelectedValue('')
			} else {
				navigate('/Complete')
				const log = JSON.parse(localStorage.getItem('log') || '{}')
				if (!log) alert('cannot retrieve any log')
				try {
					// Update the log table for the driver status to 'draft'
					const updateLog = await directusClient.request(
						updateItem('Log', log.id, {
							status: 'completed'
						})
					)
					console.log('Log updated successfully:', updateLog)
				} catch (error) {
					console.error('Error updating log:', error)
				}
			}
		} else {
			alert('Incorrect. Please try again.')
		}
	}

	if (questions.length === 0) {
		return <Typography>Loading questions...</Typography>
	}

	const currentQuestion = questions[currentStep - 1]

	return (
		<Grid2
			container
			direction="column"
			alignItems="center"
			justifyContent="center"
			spacing={2}
			style={{ height: '80vh', textAlign: 'center' }}>
			{/* Step Counter */}
			<Grid2>
				<Typography variant="h4">
					Step {currentStep} / {totalQuestions}
				</Typography>
			</Grid2>

			{/* Question */}
			<Grid2>
				<FormControl>
					<FormLabel style={{ fontSize: '50px', padding: '10px', color: 'black' }}>{currentQuestion.question}</FormLabel>
					<RadioGroup value={selectedValue} onChange={handleChange}>
						<FormControlLabel value={1} control={<Radio />} label={currentQuestion.answer1} />
						<FormControlLabel value={2} control={<Radio />} label={currentQuestion.answer2} />
						<FormControlLabel value={3} control={<Radio />} label={currentQuestion.answer3} />
					</RadioGroup>
				</FormControl>
			</Grid2>

			{/* Next Button */}
			<Grid2>
				<Button variant="contained" color="primary" style={{ marginTop: '30px' }} onClick={handleNext} disabled={!selectedValue}>
					Next
				</Button>
			</Grid2>
		</Grid2>
	)
}
