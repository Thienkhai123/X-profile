import React from 'react'
import PropTypes from 'prop-types'

const AddressIcon = (props) => {
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
        d="M11.9994 8.00696C11.9994 9.11153 11.104 10.007 9.99941 10.007C8.89484 10.007 7.99941 9.11153 7.99941 8.00696C7.99941 6.90239 8.89484 6.00696 9.99941 6.00696C11.104 6.00696 11.9994 6.90239 11.9994 8.00696Z"
        stroke="#333333"
        strokeLinejoin="round"
      />
    </svg>
  )
}

AddressIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}
AddressIcon.defaultProps = {
  viewBox: '0 0 20 20',
  width: '20',
  height: '20',
  style: {}
}

export default AddressIcon
