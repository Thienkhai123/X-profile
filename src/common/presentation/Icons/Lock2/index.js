import React from 'react'
import PropTypes from 'prop-types'

const Lock2Icon = (props) => {
  const { viewBox, style, width, height, fill } = props

  return (
    <div>
      <svg
        viewBox={viewBox}
        style={style}
        width={width}
        height={height}
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.24089 9.21838V7.6506C4.24089 4.806 6.63336 2.5 9.58463 2.5C12.5359 2.5 14.9284 4.806 14.9284 7.6506V9.21838C15.8109 9.2819 16.3856 9.44229 16.8057 9.84719C17.5013 10.5177 17.5013 11.5968 17.5013 13.755C17.5013 15.9133 17.5013 16.9924 16.8057 17.6629C16.1101 18.3333 14.9905 18.3333 12.7513 18.3333H6.41797C4.1788 18.3333 3.05921 18.3333 2.36359 17.6629C1.66797 16.9924 1.66797 15.9133 1.66797 13.755C1.66797 11.5968 1.66797 10.5177 2.36359 9.84719C2.78367 9.44229 3.35837 9.2819 4.24089 9.21838ZM5.42839 7.6506C5.42839 5.43814 7.2892 3.64458 9.58463 3.64458C11.8801 3.64458 13.7409 5.43814 13.7409 7.6506V9.17943C13.4377 9.17671 13.1087 9.17671 12.7513 9.17671H6.41797C6.06052 9.17671 5.7316 9.17671 5.42839 9.17943V7.6506Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}

Lock2Icon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}
Lock2Icon.defaultProps = {
  viewBox: '0 0 20 20',
  width: '20',
  height: '20',
  fill: 'black',
  style: {}
}

export default Lock2Icon
