export const styles = (theme) => {
	return {
		root: {
			display: 'flex',
			flexWrap: 'nowrap',
			width: '100vw',
			justifyContent: 'space-around',
			backgroundColor: theme.palette.background.paper
		},
		item: {
			display: 'flex',
			flexDirection: 'row',
			width: 'calc(100vw - 17px - 100px - 40px)',
			margin: 'auto',
			justifyContent: 'center',
			alignItems: 'center',
			// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
			'& button': {
				display: 'flex'
			}
		},
		gridList: {
			flexWrap: 'nowrap',
			// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
			transform: 'translateZ(0)'
		},
		arrow: {
			opacity: 0.1,
			width: 50,
			backgroundColor: '#0A0B0A44',
			zIndex: 200,
			height: '200px',
			borderRadius: 0,
			alignSelf: 'center',

			'&:focus': {
				opacity: 1
			},
			'&:hover': {
				opacity: 0.5
			}
		}
	};
};
