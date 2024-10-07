import PropTypes from 'prop-types'

const ArrowDownIcon = (props) => {
  const { viewBox, style, width, height, stroke = '#666666' } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <path
        d="M1 1.00586L7 7.00586L13 1.00586"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

ArrowDownIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

ArrowDownIcon.defaultProps = {
  viewBox: '0 0 14 8',
  width: '14',
  height: '8',
  style: {}
}

export default ArrowDownIcon
