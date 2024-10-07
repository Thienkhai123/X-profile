import React from 'react'
import PropTypes from 'prop-types'

const UserGroupIcon = (props) => {
  const { viewBox, style, width, height, fill, stroke } = props

  return (
    <div>
      <svg
        viewBox={viewBox}
        style={style}
        width={width}
        height={height}
        fill="none"
      >
        <ellipse
          cx="7.5013"
          cy="4.99935"
          rx="3.33333"
          ry="3.33333"
          fill={fill}
        />
        <ellipse
          cx="7.5013"
          cy="14.1673"
          rx="5.83333"
          ry="3.33333"
          fill={fill}
        />
        <path
          d="M17.5016 14.1664C17.5016 15.5471 15.8053 16.6664 13.7342 16.6664C14.3444 15.9995 14.7639 15.1623 14.7639 14.1676C14.7639 13.1717 14.3434 12.3338 13.7321 11.6665C15.8031 11.6665 17.5016 12.7857 17.5016 14.1664Z"
          fill={fill}
        />
        <path
          d="M15.0016 5C15.0016 6.38071 13.8823 7.5 12.5016 7.5C12.2005 7.5 11.9118 7.44678 11.6445 7.34923C12.0388 6.65582 12.2639 5.85374 12.2639 4.99907C12.2639 4.14503 12.0391 3.3435 11.6454 2.65045C11.9125 2.5531 12.2008 2.5 12.5016 2.5C13.8823 2.5 15.0016 3.61929 15.0016 5Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}

UserGroupIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}
UserGroupIcon.defaultProps = {
  viewBox: '0 0 20 20',
  width: '20',
  height: '20',
  fill: '#294F9B',
  style: {}
}

export default UserGroupIcon
