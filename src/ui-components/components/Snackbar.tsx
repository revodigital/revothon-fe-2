import { SyntheticEvent } from 'react'
import { Alert, Fade, Grow, IconButton, Slide, SlideProps } from '@mui/material'
import MuiSnackbar from '@mui/material/Snackbar'
import CloseIcon from '@mui/icons-material/Close'

import { KeyedObject } from 'types'
import { useDispatch, useSelector } from 'store'
import { closeSnackbar } from 'store/slices/snackbar'

// animation function
function TransitionSlideLeft(props: SlideProps) {
	return <Slide {...props} direction="left" />
}

function TransitionSlideUp(props: SlideProps) {
	return <Slide {...props} direction="up" />
}

function TransitionSlideRight(props: SlideProps) {
	return <Slide {...props} direction="right" />
}

function TransitionSlideDown(props: SlideProps) {
	return <Slide {...props} direction="down" />
}

function GrowTransition(props: SlideProps) {
	return <Grow {...props} />
}

// animation options
const animation: KeyedObject = {
	SlideLeft: TransitionSlideLeft,
	SlideUp: TransitionSlideUp,
	SlideRight: TransitionSlideRight,
	SlideDown: TransitionSlideDown,
	Grow: GrowTransition,
	Fade
}

// ==============================|| SNACKBAR ||============================== //

const Snackbar = () => {
	const dispatch = useDispatch()
	const snackbar = useSelector((state) => state.snackbar)
	const { anchorOrigin, alert, close, message, open, transition, variant } = snackbar

	const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}
		dispatch(closeSnackbar())
	}

	return (
		<>
			{variant === 'alert' && (
				<MuiSnackbar
					TransitionComponent={animation[transition]}
					anchorOrigin={anchorOrigin}
					open={open}
					autoHideDuration={6000}
					onClose={handleClose}>
					<Alert
						variant={alert.variant}
						color={alert.color}
						action={
							<>
								{close !== false && (
									<IconButton sx={{ color: 'background.paper' }} size="small" aria-label="close" onClick={handleClose}>
										<CloseIcon fontSize="small" />
									</IconButton>
								)}
							</>
						}
						sx={{
							...(alert.variant === 'outlined' && {
								bgcolor: 'background.paper'
							})
						}}>
						{message}
					</Alert>
				</MuiSnackbar>
			)}
		</>
	)
}

export default Snackbar
