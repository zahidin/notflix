export const styles = (theme) => ({
	backgroundLinear: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		zIndex: '2',
		backgroundImage: 'linear-gradient(to top,rgba(0,0,0, 1), rgba(0,0,0, 1),  rgba(0,0,0, 0.7), rgba(0,0,0, 0.1))'
	},
	roots: {
		height: 'calc(100vh - 50px)'
	}
});

export const styled = {
	root: (movie) => ({
		position: 'relative',
		backgroundImage: `url(${movie && movie.image})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	})
};
