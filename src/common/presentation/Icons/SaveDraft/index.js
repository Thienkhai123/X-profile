import PropTypes from 'prop-types'

const SaveDraftcon = (props) => {
  const { viewBox, style, width, height, fill, stroke } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 9.09752V14.0909C18 17.1875 18 18.7358 17.2659 19.4123C16.9158 19.735 16.4739 19.9377 16.0031 19.9915C15.016 20.1045 13.8633 19.0849 11.5578 17.0458C10.5388 16.1445 10.0292 15.6938 9.43972 15.5751C9.14943 15.5166 8.85057 15.5166 8.56028 15.5751C7.97075 15.6938 7.46122 16.1445 6.44216 17.0458C4.13673 19.0849 2.98402 20.1045 1.99692 19.9915C1.52615 19.9377 1.08421 19.735 0.734106 19.4123C0 18.7358 0 17.1875 0 14.0909V9.09752C0 4.80891 0 2.6646 1.31802 1.3323C2.63604 0 4.75736 0 9 0C13.2426 0 15.364 0 16.682 1.3323C18 2.6646 18 4.80891 18 9.09752ZM5.25 4C5.25 3.58579 5.58579 3.25 6 3.25H12C12.4142 3.25 12.75 3.58579 12.75 4C12.75 4.41421 12.4142 4.75 12 4.75H6C5.58579 4.75 5.25 4.41421 5.25 4Z"
        fill={stroke}
      />
    </svg>
  )
}

SaveDraftcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

SaveDraftcon.defaultProps = {
  viewBox: '0 0 18 20',
  width: '18',
  height: '20',
  fill: '',
  style: {},
  stroke: '#F6BB3A'
}

export default SaveDraftcon
