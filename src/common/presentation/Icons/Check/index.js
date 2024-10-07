import PropTypes from 'prop-types'

const CheckIcon = (props) => {
  const { viewBox, style, width, height, fill } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <g clipPath="url(#clip0_1177_3597)">
        <path
          d="M7.99945 16.3778C12.0755 16.3778 15.3798 13.0735 15.3798 8.9975C15.3798 4.92147 12.0755 1.61719 7.99945 1.61719C3.92342 1.61719 0.619141 4.92147 0.619141 8.9975C0.619141 13.0735 3.92342 16.3778 7.99945 16.3778Z"
          fill={fill}
        />
        <path
          d="M8 16.998C3.58916 16.998 0 13.4095 0 8.99805C0 4.5872 3.58916 0.998047 8 0.998047C12.4115 0.998047 16 4.5872 16 8.99805C16 13.4095 12.4115 16.998 8 16.998ZM8 2.23739C4.27203 2.23739 1.23934 5.27008 1.23934 8.99805C1.23934 12.726 4.27203 15.7587 8 15.7587C11.728 15.7587 14.7607 12.7254 14.7607 8.99805C14.7607 5.27008 11.728 2.23739 8 2.23739Z"
          fill={fill}
        />
        <path
          d="M7.03318 11.9411C6.86712 11.9411 6.70846 11.8748 6.59134 11.7558L4.30474 9.43206C4.06493 9.1879 4.06803 8.79628 4.31218 8.55584C4.55634 8.31665 4.94859 8.31912 5.1884 8.56328L7.01521 10.4198L10.7946 6.25747C11.0257 6.00403 11.4174 5.98606 11.6696 6.21535C11.923 6.44525 11.9416 6.83688 11.7117 7.09094L7.49174 11.7385C7.37712 11.8649 7.21599 11.938 7.04559 11.9417C7.04124 11.9411 7.03753 11.9411 7.03318 11.9411Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_1177_3597">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0 0.998047)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

CheckIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

CheckIcon.defaultProps = {
  viewBox: '0 0 16 17',
  width: '16',
  height: '17',
  fill: '#378711',
  style: {}
}

export default CheckIcon
