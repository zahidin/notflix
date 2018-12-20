export const styles = (theme) => {
	return {
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
		arrow: {
			opacity: 0.1,
			backgroundColor: '#0A0B0A44',
			zIndex: 200,
			width: 50,
			height: '200px',
			borderRadius: 0,
			alignSelf: 'center'
		}
	};
};
