import React from 'react'
import PropTypes from 'prop-types'

const DocumentVideo = (props) => {
  const { viewBox, style, width, height, fill, stroke } = props

  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.3335 10.763V3.33252C1.3335 2.60041 1.92436 2.00567 2.6551 2.05058C3.30601 2.09058 4.07582 2.16966 4.66683 2.32561C5.3663 2.51019 6.19757 2.90332 6.855 3.25096C7.05974 3.35922 7.27746 3.43431 7.50028 3.47663V13.5957C7.29828 13.5512 7.1012 13.4793 6.91511 13.3801C6.24879 13.025 5.3878 12.6131 4.66683 12.4229C4.08236 12.2687 3.32302 12.1896 2.67674 12.1492C1.93753 12.103 1.3335 11.5037 1.3335 10.763ZM3.45488 5.51558C3.18698 5.44861 2.91552 5.61149 2.84854 5.87938C2.78157 6.14728 2.94445 6.41875 3.21235 6.48572L5.87901 7.15239C6.14691 7.21936 6.41838 7.05648 6.48535 6.78859C6.55233 6.52069 6.38945 6.24922 6.12155 6.18225L3.45488 5.51558ZM3.45488 8.18225C3.18698 8.11527 2.91552 8.27815 2.84854 8.54605C2.78157 8.81395 2.94445 9.08541 3.21235 9.15239L5.87901 9.81906C6.14691 9.88603 6.41838 9.72315 6.48535 9.45525C6.55233 9.18736 6.38945 8.91589 6.12155 8.84891L3.45488 8.18225Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.50028 13.5957C8.7022 13.5511 8.89919 13.4793 9.08522 13.3801C9.75154 13.025 10.6125 12.6131 11.3335 12.4229C11.918 12.2687 12.6773 12.1896 13.3236 12.1492C14.0628 12.103 14.6668 11.5037 14.6668 10.763V3.28945C14.6668 2.57448 14.1027 1.98759 13.3881 2.01248C12.6358 2.03869 11.6981 2.11667 11.0002 2.32561C10.3951 2.50676 9.69037 2.87011 9.11606 3.20249C8.92177 3.31493 8.71412 3.39752 8.50028 3.4499V13.5957ZM12.7882 6.48572C13.0561 6.41875 13.219 6.14728 13.152 5.87938C13.085 5.61149 12.8136 5.44861 12.5457 5.51558L9.87901 6.18225C9.61112 6.24922 9.44824 6.52069 9.51521 6.78859C9.58218 7.05648 9.85365 7.21936 10.1215 7.15239L12.7882 6.48572ZM12.7882 9.15239C13.0561 9.08541 13.219 8.81395 13.152 8.54605C13.085 8.27815 12.8136 8.11527 12.5457 8.18225L9.87901 8.84891C9.61112 8.91589 9.44824 9.18736 9.51521 9.45525C9.58218 9.72315 9.85365 9.88603 10.1215 9.81906L12.7882 9.15239Z"
        fill={fill}
      />
    </svg>
  )
}

DocumentVideo.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}
DocumentVideo.defaultProps = {
  viewBox: '0 0 16 16',
  width: '16',
  height: '16',
  fill: '#666666',
  style: {}
}

export default DocumentVideo
