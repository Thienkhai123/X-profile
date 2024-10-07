import React from 'react'
import PropTypes from 'prop-types'

const UploadFile = (props) => {
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
        d="M11.25 1.83422C10.7896 1.75598 10.162 1.75005 9.02979 1.75005C7.11311 1.75005 5.75075 1.75163 4.71785 1.88987C3.70596 2.0253 3.12453 2.27933 2.7019 2.70195C2.27869 3.12516 2.02502 3.70481 1.88976 4.7109C1.75159 5.73856 1.75 7.09323 1.75 9.00005V13.0001C1.75 14.9069 1.75159 16.2615 1.88976 17.2892C2.02502 18.2953 2.27869 18.8749 2.7019 19.2981C3.12511 19.7214 3.70476 19.975 4.71085 20.1103C5.73851 20.2485 7.09318 20.2501 9 20.2501H13C14.9068 20.2501 16.2615 20.2485 17.2892 20.1103C18.2952 19.975 18.8749 19.7214 19.2981 19.2981C19.7213 18.8749 19.975 18.2953 20.1102 17.2892C20.2484 16.2615 20.25 14.9069 20.25 13.0001V12.5629C20.25 11.0269 20.2392 10.2988 20.0762 9.75005H16.9463C15.8135 9.75008 14.8877 9.7501 14.1569 9.65183C13.3929 9.54912 12.7306 9.32684 12.2019 8.79815C11.6732 8.26945 11.4509 7.60712 11.3482 6.84317C11.25 6.1123 11.25 5.18657 11.25 4.05374V1.83422ZM12.75 2.6095V4.00005C12.75 5.19976 12.7516 6.0241 12.8348 6.64329C12.9152 7.24091 13.059 7.53395 13.2626 7.73749C13.4661 7.94103 13.7591 8.08486 14.3568 8.16521C14.976 8.24846 15.8003 8.25005 17 8.25005H19.0195C18.723 7.9625 18.3432 7.61797 17.85 7.17407L13.8912 3.61117C13.4058 3.17433 13.0446 2.85187 12.75 2.6095ZM9.17546 0.250025C10.5601 0.249655 11.4546 0.249416 12.2779 0.565354C13.1012 0.881288 13.7632 1.47735 14.7873 2.39955C14.8226 2.43139 14.8584 2.46361 14.8947 2.49623L18.8534 6.05912C18.8956 6.09705 18.9372 6.1345 18.9783 6.17149C20.162 7.23614 20.9274 7.92458 21.3391 8.84902C21.7508 9.77345 21.7505 10.8029 21.75 12.3949C21.75 12.4502 21.75 12.5062 21.75 12.5629V13.0565C21.75 14.8942 21.75 16.3499 21.5969 17.4891C21.4392 18.6615 21.1071 19.6104 20.3588 20.3588C19.6104 21.1072 18.6614 21.4393 17.489 21.5969C16.3498 21.7501 14.8942 21.7501 13.0564 21.7501H8.94359C7.10583 21.7501 5.65019 21.7501 4.51098 21.5969C3.33856 21.4393 2.38961 21.1072 1.64124 20.3588C0.89288 19.6104 0.560763 18.6615 0.403135 17.4891C0.249972 16.3499 0.249984 14.8942 0.25 13.0565V8.94363C0.249984 7.10587 0.249972 5.65024 0.403135 4.51103C0.560763 3.33861 0.89288 2.38966 1.64124 1.64129C2.39019 0.892346 3.34232 0.560591 4.51887 0.403125C5.66283 0.250022 7.1257 0.250035 8.97352 0.25005L9.02979 0.250051C9.07895 0.250051 9.1275 0.250038 9.17546 0.250025Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.01296 11.9529C7.72446 11.6824 7.27554 11.6824 6.98704 11.9529L4.98704 13.8279C4.68486 14.1112 4.66955 14.5858 4.95285 14.888C5.23615 15.1902 5.71077 15.2055 6.01296 14.9222L6.75 14.2312L6.75 17.5001C6.75 17.9143 7.08579 18.2501 7.5 18.2501C7.91421 18.2501 8.25 17.9143 8.25 17.5001L8.25 14.2312L8.98704 14.9222C9.28923 15.2055 9.76386 15.1902 10.0472 14.888C10.3305 14.5858 10.3151 14.1112 10.013 13.8279L8.01296 11.9529Z"
        fill={fill}
      />
    </svg>
  )
}

UploadFile.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}
UploadFile.defaultProps = {
  viewBox: '0 0 22 22',
  width: '22',
  height: '22',
  fill: '#666666',
  stroke: '',
  style: {}
}

export default UploadFile
