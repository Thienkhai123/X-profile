import React from 'react'
import PropTypes from 'prop-types'

const Save = (props) => {
  const { viewBox, style, width, height, fill } = props

  return (
    <svg
      viewBox={viewBox}
      // style={style}
      width={width}
      height={height}
      fill="none"
    >
      <path
        d="M6.60002 20.4004V15.0004C6.60002 14.3376 7.13728 13.8004 7.80002 13.8004H16.2C16.8628 13.8004 17.4 14.3376 17.4 15.0004V21.0004M17.4 3.60039V6.00039C17.4 6.66313 16.8628 7.20039 16.2 7.20039L7.80002 7.20039C7.13728 7.20039 6.60002 6.66313 6.60002 6.00039L6.60002 2.40039M20.9975 6.59786L17.4026 3.00292C17.0168 2.61713 16.4935 2.40039 15.9479 2.40039H4.45717C3.32102 2.40039 2.40002 3.32139 2.40002 4.45753V19.5432C2.40002 20.6794 3.32102 21.6004 4.45717 21.6004H19.5429C20.679 21.6004 21.6 20.6794 21.6 19.5432V8.05248C21.6 7.50689 21.3833 6.98365 20.9975 6.59786Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

Save.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}
Save.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {},
  fill: '#666666'
}

export default Save
