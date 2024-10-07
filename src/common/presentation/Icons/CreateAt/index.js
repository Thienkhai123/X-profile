import PropTypes from 'prop-types'

const CreateAtIcon = (props) => {
  const { viewBox, style, width, height } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <path
        d="M4.42857 6.25H13.5M3.80952 1.25V2.75018M14 1.25V2.75M17 5.75L17 15.7501C17 17.4069 15.6569 18.7501 14 18.7501H4C2.34315 18.7501 1 17.4069 1 15.7501V5.75C1 4.09315 2.34315 2.75 4 2.75H14C15.6569 2.75 17 4.09315 17 5.75Z"
        stroke="#999999"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

CreateAtIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

CreateAtIcon.defaultProps = {
  viewBox: '0 0 18 20',
  width: '18',
  height: '20',
  style: {}
}

export default CreateAtIcon
