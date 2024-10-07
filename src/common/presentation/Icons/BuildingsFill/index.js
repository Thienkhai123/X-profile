import PropTypes from 'prop-types'

const BuildingsFillIcon = (props) => {
  const { viewBox, style, width, height, fill, scale, margin = '' } = props
  return (
    <svg
      viewBox={viewBox}
      style={{
        margin: margin
      }}
      width={width}
      height={height}
      fill="none"
    >
      <g id="Buildings">
        <path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15 2H17C18.8856 2 19.8284 2 20.4142 2.58579C21 3.17157 21 4.11438 21 6V21.25H22C22.4142 21.25 22.75 21.5858 22.75 22C22.75 22.4142 22.4142 22.75 22 22.75H2C1.58579 22.75 1.25 22.4142 1.25 22C1.25 21.5858 1.58579 21.25 2 21.25H3V9C3 7.11438 3 6.17157 3.58579 5.58579C4.17157 5 5.11438 5 7 5H11C12.8856 5 13.8284 5 14.4142 5.58579C15 6.17157 15 7.11438 15 9V21.25H16.5V9L16.5 8.91051C16.5001 8.04488 16.5002 7.25121 16.4134 6.60559C16.3178 5.89462 16.0929 5.14317 15.4749 4.52513C14.8568 3.90708 14.1054 3.68219 13.3944 3.5866C12.7579 3.50102 11.9774 3.49991 11.126 3.49999C11.2103 3.11275 11.351 2.82059 11.5858 2.58579C12.1716 2 13.1144 2 15 2ZM5.25 8C5.25 7.58579 5.58579 7.25 6 7.25H12C12.4142 7.25 12.75 7.58579 12.75 8C12.75 8.41421 12.4142 8.75 12 8.75H6C5.58579 8.75 5.25 8.41421 5.25 8ZM5.25 11C5.25 10.5858 5.58579 10.25 6 10.25H12C12.4142 10.25 12.75 10.5858 12.75 11C12.75 11.4142 12.4142 11.75 12 11.75H6C5.58579 11.75 5.25 11.4142 5.25 11ZM5.25 14C5.25 13.5858 5.58579 13.25 6 13.25H12C12.4142 13.25 12.75 13.5858 12.75 14C12.75 14.4142 12.4142 14.75 12 14.75H6C5.58579 14.75 5.25 14.4142 5.25 14ZM9 18.25C9.41421 18.25 9.75 18.5858 9.75 19V21.25H8.25V19C8.25 18.5858 8.58579 18.25 9 18.25Z"
          fill={fill}
        />
      </g>
    </svg>
  )
}

BuildingsFillIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}

BuildingsFillIcon.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {},
  fill: '#999999'
}

export default BuildingsFillIcon
