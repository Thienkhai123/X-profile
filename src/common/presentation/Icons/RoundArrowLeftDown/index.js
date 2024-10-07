import PropTypes from 'prop-types'

const RoundArrowLeftDownIcon = (props) => {
  const { viewBox, style, width, height, fill } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <g id="Round Arrow Left Down">
        <path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2.78516C6.47715 2.78516 2 7.27824 2 12.8207C2 18.3632 6.47715 22.8563 12 22.8563C17.5228 22.8563 22 18.3632 22 12.8207C22 7.27824 17.5228 2.78516 12 2.78516ZM14.25 15.8314C14.25 16.2471 13.9142 16.5841 13.5 16.5841H9C8.58579 16.5841 8.25 16.2471 8.25 15.8314V11.3154C8.25 10.8997 8.58579 10.5627 9 10.5627C9.41421 10.5627 9.75 10.8997 9.75 11.3154V14.0143L14.4697 9.27785C14.7626 8.98391 15.2374 8.98391 15.5303 9.27785C15.8232 9.57178 15.8232 10.0483 15.5303 10.3423L10.8107 15.0787H13.5C13.9142 15.0787 14.25 15.4157 14.25 15.8314Z"
          fill="#FC816E"
        />
      </g>
    </svg>
  )
}

RoundArrowLeftDownIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}

RoundArrowLeftDownIcon.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {},
  fill: '#999999'
}

export default RoundArrowLeftDownIcon
