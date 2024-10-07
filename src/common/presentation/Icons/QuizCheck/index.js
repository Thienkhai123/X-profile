import PropTypes from 'prop-types'

const QuizCheckIcon = (props) => {
  const { viewBox, style, width, height, fill, stroke } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill={fill}
    >
      <path
        d="M2.80144 9.06519L7.38429 13.5827L20.3115 0.793945L22.8083 3.26394L7.38429 18.5389L0.304688 11.5352L2.80144 9.06519Z"
        fill={fill}
      />
    </svg>
  )
}

QuizCheckIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}

QuizCheckIcon.defaultProps = {
  viewBox: '0 0 23 19',
  width: '23',
  height: '19',
  fill: '#333333',
  stroke: '',
  style: {}
}

export default QuizCheckIcon
