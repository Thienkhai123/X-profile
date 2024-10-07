import React from 'react'
import PropTypes from 'prop-types'

const BubbleMessage = (props) => {
  const { viewBox, style, width, height, fill } = props

  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.49482 12.0554C0.943829 10.9646 0.658298 9.75899 0.661486 8.53689V8.07393C0.76796 6.14398 1.58256 4.32111 2.94932 2.95436C4.31607 1.5876 6.13893 0.773004 8.06888 0.66653H8.53184C9.75394 0.663344 10.9595 0.948874 12.0504 1.49986C13.3575 2.15316 14.457 3.1575 15.2256 4.40037C15.9942 5.64324 16.4016 7.07556 16.4022 8.53689C16.4054 9.75899 16.1199 10.9646 15.5689 12.0554L17.3281 17.3332L12.0504 15.5739C10.9595 16.1249 9.75394 16.4104 8.53184 16.4072C7.07051 16.4067 5.63819 15.9993 4.39532 15.2307C3.15245 14.462 2.14812 13.3626 1.49482 12.0554Z"
        stroke="#666666"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.29688 8.53711H11.7783"
        stroke="#666666"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.29688 5.75928H11.7783"
        stroke="#666666"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.29688 11.3149H11.7783"
        stroke="#666666"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

BubbleMessage.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}
BubbleMessage.defaultProps = {
  viewBox: '0 0 18 18',
  width: '18',
  height: '18',
  style: {},
  fill: '#E6E6E6'
}

export default BubbleMessage
