import { useState, useEffect } from 'react'
import { Grid2, Typography, Button, FormControl, FormLabel, RadioGroup, FormControlLabel } from '@mui/material'
import Radio from '@mui/material/Radio'
import { directusClient } from 'App'
import { readItems } from '@directus/sdk'
import { log } from 'console'

export default function Questions() {
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

	// Handle answer change
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedValue((event.target as HTMLInputElement).value)
	}

	// Handle next question
	const handleNext = () => {
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
				alert('Questions completed!')
			}
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
			style={{ height: '50vh', textAlign: 'center' }}>
			{/* Step Counter */}
			<Grid2>
				<Typography variant="h4">
					Step {currentStep} / {totalQuestions}
				</Typography>
			</Grid2>

			{/* Question */}
			<Grid2>
				<FormControl>
					<FormLabel>{currentQuestion.question}</FormLabel>
					<RadioGroup value={selectedValue} onChange={handleChange}>
						<FormControlLabel value={1} control={<Radio />} label={currentQuestion.answer1} />
						<FormControlLabel value={2} control={<Radio />} label={currentQuestion.answer2} />
						<FormControlLabel value={3} control={<Radio />} label={currentQuestion.answer3} />
					</RadioGroup>
				</FormControl>
			</Grid2>

			{/* Next Button */}
			<Grid2>
				<Button variant="contained" color="primary" onClick={handleNext} disabled={!selectedValue}>
					Next
				</Button>
			</Grid2>
		</Grid2>
	)
}
