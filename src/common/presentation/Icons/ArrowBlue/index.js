import PropTypes from 'prop-types'

const ArrowBlue = (props) => {
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
        d="M9.35355 4.35355C9.54882 4.15829 9.54882 3.84171 9.35355 3.64645L6.17157 0.464467C5.97631 0.269204 5.65973 0.269204 5.46447 0.464467C5.2692 0.659729 5.2692 0.976311 5.46447 1.17157L8.29289 4L5.46447 6.82843C5.2692 7.02369 5.2692 7.34027 5.46447 7.53553C5.65973 7.7308 5.97631 7.7308 6.17157 7.53553L9.35355 4.35355ZM-4.37113e-08 4.5L9 4.5L9 3.5L4.37113e-08 3.5L-4.37113e-08 4.5Z"
        fill="#294F9B"
      />
    </svg>
  )
}

ArrowBlue.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}

ArrowBlue.defaultProps = {
  viewBox: '0 0 10 8',
  width: '10',
  height: '8',
  fill: '',
  stroke: '#DB2E24',
  style: {}
}

export default ArrowBlue
