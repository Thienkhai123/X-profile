import PropTypes from 'prop-types'

const StopwatchUnderstandIcon = (props) => {
	const { viewBox, style, width, height, fill, stroke } = props
	return (
		<svg
			viewBox={viewBox}
			style={style}
			width={width}
			height={height}
			fill='none'>
			<path
				xmlns='http://www.w3.org/2000/svg'
				fillRule='evenodd'
				clipRule='evenodd'
				d='M7.70833 1.66667C7.70833 1.32149 7.98816 1.04167 8.33333 1.04167H11.6667C12.0118 1.04167 12.2917 1.32149 12.2917 1.66667C12.2917 2.01185 12.0118 2.29167 11.6667 2.29167H8.33333C7.98816 2.29167 7.70833 2.01185 7.70833 1.66667ZM10 3.95834C6.20304 3.95834 3.125 7.03638 3.125 10.8333C3.125 14.6303 6.20304 17.7083 10 17.7083C13.797 17.7083 16.875 14.6303 16.875 10.8333C16.875 7.03638 13.797 3.95834 10 3.95834ZM1.875 10.8333C1.875 6.34602 5.51269 2.70834 10 2.70834C14.4873 2.70834 18.125 6.34602 18.125 10.8333C18.125 15.3207 14.4873 18.9583 10 18.9583C5.51269 18.9583 1.875 15.3207 1.875 10.8333ZM10 6.87501C10.3452 6.87501 10.625 7.15483 10.625 7.50001V10.8333C10.625 11.1785 10.3452 11.4583 10 11.4583C9.65482 11.4583 9.375 11.1785 9.375 10.8333V7.50001C9.375 7.15483 9.65482 6.87501 10 6.87501Z'
				fill='#666666'
			/>
		</svg>
	)
}

StopwatchUnderstandIcon.propTypes = {
	viewBox: PropTypes.string,
	width: PropTypes.string,
	height: PropTypes.string,
	stroke: PropTypes.string,
	style: PropTypes.object,
}

StopwatchUnderstandIcon.defaultProps = {
	viewBox: '0 0 20 20',
	width: '20',
	height: '20',
	fill: 'black',
	stroke: 'black',
	style: {},
}

export default StopwatchUnderstandIcon
