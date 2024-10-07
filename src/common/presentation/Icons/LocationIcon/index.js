import React from 'react'
import PropTypes from 'prop-types'

const LocationIconCard = (props) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.16663 6.7622C2.16663 3.49618 4.76997 0.833336 7.99996 0.833336C11.23 0.833336 13.8333 3.49618 13.8333 6.7622C13.8333 8.33893 13.3839 10.0319 12.5896 11.4946C11.7962 12.9554 10.637 14.2248 9.18697 14.9026C8.43367 15.2547 7.56625 15.2547 6.81295 14.9026C5.36287 14.2248 4.2037 12.9554 3.41033 11.4946C2.61598 10.0319 2.16663 8.33893 2.16663 6.7622ZM7.99996 1.83334C5.33891 1.83334 3.16663 4.03166 3.16663 6.7622C3.16663 8.16025 3.56838 9.69028 4.2891 11.0173C5.01079 12.3462 6.03064 13.4331 7.23639 13.9967C7.72133 14.2233 8.27859 14.2233 8.76353 13.9967C9.96928 13.4331 10.9891 12.3462 11.7108 11.0173C12.4315 9.69028 12.8333 8.16025 12.8333 6.7622C12.8333 4.03166 10.661 1.83334 7.99996 1.83334ZM7.99996 5.16667C7.17153 5.16667 6.49996 5.83824 6.49996 6.66667C6.49996 7.4951 7.17153 8.16667 7.99996 8.16667C8.82839 8.16667 9.49996 7.4951 9.49996 6.66667C9.49996 5.83824 8.82839 5.16667 7.99996 5.16667ZM5.49996 6.66667C5.49996 5.28596 6.61925 4.16667 7.99996 4.16667C9.38067 4.16667 10.5 5.28596 10.5 6.66667C10.5 8.04738 9.38067 9.16667 7.99996 9.16667C6.61925 9.16667 5.49996 8.04738 5.49996 6.66667Z"
        fill="#666666"
      />
    </svg>
  )
}

LocationIconCard.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}
LocationIconCard.defaultProps = {
  viewBox: '0 0 16 16',
  width: '16',
  height: '16',
  style: {}
}

export default LocationIconCard
