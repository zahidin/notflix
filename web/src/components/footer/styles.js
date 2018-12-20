export const styles = (theme) => ({
	image: {
		height: 150,
		width: 100
	},
	footerLeft: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
		paddingRight: 20,
		background: '#101010'
	},
	footerRight: {
		background: '#232426'
	},
	footerRightContent: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',

		padding: 20,
		':& button': {
			height: 50
		}
	}
});
