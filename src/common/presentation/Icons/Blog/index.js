import React from 'react'
import PropTypes from 'prop-types'

const Blog = (props) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.333313 2.54216V14.2088C0.333313 15.5895 1.4526 16.7088 2.83331 16.7088H11.1666C12.5474 16.7088 13.6666 15.5895 13.6666 14.2088V5.87549C13.6666 4.49478 12.5474 3.37549 11.1666 3.37549H1.16665C0.706409 3.37549 0.333313 3.00239 0.333313 2.54216ZM3.04165 8.37549C3.04165 8.03031 3.32147 7.75049 3.66665 7.75049H10.3333C10.6785 7.75049 10.9583 8.03031 10.9583 8.37549C10.9583 8.72067 10.6785 9.00049 10.3333 9.00049H3.66665C3.32147 9.00049 3.04165 8.72067 3.04165 8.37549ZM3.04165 11.2922C3.04165 10.947 3.32147 10.6672 3.66665 10.6672H8.24998C8.59516 10.6672 8.87498 10.947 8.87498 11.2922C8.87498 11.6373 8.59516 11.9172 8.24998 11.9172H3.66665C3.32147 11.9172 3.04165 11.6373 3.04165 11.2922Z"
        fill={fill}
      />
      <path
        d="M0.673967 1.7814C0.964369 1.91164 1.16665 2.20328 1.16665 2.54216H11.1666C11.4544 2.54216 11.7336 2.57862 12 2.64717V1.96385C12 0.949606 11.1017 0.170503 10.0976 0.313939L1.09964 1.59936C0.939247 1.62228 0.793901 1.68694 0.673967 1.7814Z"
        fill={fill}
      />
    </svg>
  )
}

Blog.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}
Blog.defaultProps = {
  viewBox: '0 0 14 17',
  width: '14',
  height: '17',
  fill: 'black',
  stroke: '',
  style: {}
}

export default Blog
