import { Grid2 } from '@mui/material';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SupervisedUserCircle, Star } from '@mui/icons-material'; // Icone MUI
import React, { useState } from 'react';

export default function Homepage() {
	const navigate = useNavigate();
	const [clickCount, setClickCount] = useState({
		topLeft: 0,
		topRight: 0,
		bottomLeft: 0,
		bottomRight: 0,
	});

	const easterEggs = {
		topLeft: () => alert('Easter Egg 1: SuperRomina salva la città! 🪙'),
		topRight: () => alert('Easter Egg 2: SuperJomar is back in town! 💥'),
		bottomLeft: () => alert('Easter Egg 3: SuperJoel is powering our night! 🚀'),
		bottomRight: () => alert('Easter Egg 4: Hai trovato un Easter Egg prima di Natale! 🎮'),
	};

	const handleClick = (corner) => {
		setClickCount((prev) => {
			const newCount = { ...prev, [corner]: prev[corner] + 1 };
			if (newCount[corner] === 5) {
				easterEggs[corner]();
				newCount[corner] = 0; // Reset del contatore
			}
			return newCount;
		});
	};

	return (
		<div
			style={{
				position: 'relative',
				height: '100vh',
				overflow: 'hidden',
				backgroundColor: '#20232a', // Sfondo scuro
				color: '#fff', // Testo bianco per contrasto
				fontFamily: 'Comic Sans MS, cursive, sans-serif', // Font "divertente"
			}}
		>
			{/* Aree cliccabili invisibili per gli easter egg */}
			<div
				style={{ position: 'absolute', top: 0, left: 0, width: '50px', height: '50px', cursor: 'pointer' }}
				onClick={() => handleClick('topLeft')}
			></div>
			<div
				style={{ position: 'absolute', top: 0, right: 0, width: '50px', height: '50px', cursor: 'pointer' }}
				onClick={() => handleClick('topRight')}
			></div>
			<div
				style={{ position: 'absolute', bottom: 0, left: 0, width: '50px', height: '50px', cursor: 'pointer' }}
				onClick={() => handleClick('bottomLeft')}
			></div>
			<div
				style={{ position: 'absolute', bottom: 0, right: 0, width: '50px', height: '50px', cursor: 'pointer' }}
				onClick={() => handleClick('bottomRight')}
			></div>

			{/* Contenuto principale */}
			<Grid2
				container
				direction="column"
				alignItems="center"
				justifyContent="center"
				spacing={4}
				style={{
					height: '100vh',
					textAlign: 'center',
				}}
			>
				{/* Titolo */}
				<Grid2>
					<Typography
						variant="h1"
						component="h1"
						style={{
							fontSize: '4rem',
							fontWeight: 'bold',
							color: '#f39c12', // Colore arancio per un effetto da supereroe
							textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)', // Ombra per effetto 3D
						}}
					>
						Scegli la tua lingua, Supereroe!
					</Typography>
				</Grid2>

				{/* Opzioni di lingua */}
				<Grid2>
					<Grid2 container spacing={2} justifyContent="center">
						<Grid2>
							<Button
								variant="contained"
								color="primary"
								startIcon={<SupervisedUserCircle />}
								style={{
									fontSize: '1.2rem',
									backgroundColor: '#e74c3c', // Rosso per il tema eroico
									boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
									padding: '15px 30px',
									borderRadius: '8px',
									fontWeight: 'bold',
								}}
							>
								Italiano
							</Button>
						</Grid2>
						<Grid2>
							<Button
								variant="contained"
								color="secondary"
								startIcon={<Star />}
								style={{
									fontSize: '1.2rem',
									backgroundColor: '#8e44ad', // Viola per il tema supereroe
									boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
									padding: '15px 30px',
									borderRadius: '8px',
									fontWeight: 'bold',
								}}
							>
								English
							</Button>
						</Grid2>
					</Grid2>
				</Grid2>

				{/* Bottone di navigazione */}
				<Grid2>
					<Button
						variant="contained"
						color="primary"
						onClick={() => navigate('/license')}
						style={{
							fontSize: '1.5rem',
							backgroundColor: '#f39c12', // Colore arancio brillante
							boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
							padding: '20px 50px',
							fontWeight: 'bold',
							borderRadius: '12px',
						}}
					>
						Avanti, Supereroe!
					</Button>
				</Grid2>
			</Grid2>
		</div>
	);
}
