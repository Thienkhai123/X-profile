
import PropTypes from 'prop-types'

const CheckCourseIcon = (props) => {
  const { viewBox, style, width, height, fill, stroke } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >

      <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M24.6578 9.2467C25.0739 9.60991 25.1167 10.2416 24.7535 10.6577L14.2773 22.6577C14.0874 22.8752 13.8127 23 13.524 23C13.2352 23 12.9606 22.8752 12.7707 22.6577L8.58019 17.8577C8.21698 17.4416 8.25981 16.8099 8.67585 16.4467C9.0919 16.0835 9.72361 16.1263 10.0868 16.5424L13.524 20.4795L23.2469 9.34236C23.6101 8.92631 24.2418 8.88348 24.6578 9.2467Z" fill="#378711"/>

    </svg>
  )
}

CheckCourseIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}
  
CheckCourseIcon.defaultProps = {
  viewBox: "0 0 32 32",
  width: "32",
  height: "32",
  fill: "black",
  stroke: "black",
  style: {}
}

export default CheckCourseIcon
