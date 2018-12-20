export const styles = (theme) => {
	return {
		form: {
			display: 'flex'
		},
		buttonWraper: {
			alignSelf: 'center'
		},
		button: {
			display: 'block',
			paddingLeft: 10,
			color: 'white',
			'&:focus': {
				color: 'white'
			},
			backgroundColor: '#F44336'
		},
		dropdownStyle: {
			'& ul': {
				display: 'grid',
				gridTemplateColumns: 'repeat(4, 1fr)',
				'& li': {
					display: 'flex',
					justifyContent: 'center'
				}
			}
		},
		label: {
			color: 'white'
		},
		formControl: {
			margin: theme.spacing.unit,
			minWidth: 200,
			color: 'white',
			borderRadius: 10
		},
		selectForm: {
			padding: 10,
			color: 'white !important',
			borderBottom: '3px solid #F44336',
			'& svg': {
				color: 'white'
			}
		}
	};
};
