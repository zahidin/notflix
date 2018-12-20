export const styles = (theme) => {
	return {
		images: {
			height: '580px',
			objectFit: 'fill',
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0
		},
		container: {
			width: '100%',
			height: '580px',
			overflow: 'hidden',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',

			[theme.breakpoints.down('xs')]: {
				width: '410px',
				margin: 'auto'
			}
		},
		content: {
			width: '100%',
			position: 'relative',
			zIndex: 100,
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: theme.spacing.unit,
			margin: 'auto'
		},
		buttonWraper: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			'& > div': {
				marginRight: 10
			}
		},
		title: {
			color: 'white'
		},

		typograhpy: {
			marginRight: 20
		},
		chip: {
			margin: theme.spacing.unit,
			backgroundColor: '#E0E0E022',
			color: 'white'
		},
		p: {
			color: 'white',
			fontSize: 30
		},
		button: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			margin: theme.spacing.unit
		},
		leftIcon: {
			marginRight: theme.spacing.unit
		},
		rightIcon: {
			marginLeft: theme.spacing.unit
		},
		middleIcon: {
			alignSelf: 'center',
			display: 'flex',
			width: '100%',
			justifyContent: 'center',
			color: ' #FFFFFF'
		},
		iconSmall: {
			fontSize: 20
		},
		BottomIcon: {
			display: 'grid',
			textAlign: 'center',
			justifyContent: 'center',
			alignItems: 'center',
			width: 100
		}
	};
};
