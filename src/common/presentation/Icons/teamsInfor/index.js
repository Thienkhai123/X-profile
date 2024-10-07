import React from 'react'
import PropTypes from 'prop-types'

const TeamsInfor = (props) => {
  const { viewBox, style, width, height, fill } = props

  return (
    <svg viewBox={viewBox} width={width} height={height} fill="none">
      <path
        d="M4.99967 1.6665H11.6663L16.6663 6.6665V16.6665C16.6663 17.1085 16.4907 17.5325 16.1782 17.845C15.8656 18.1576 15.4417 18.3332 14.9997 18.3332H4.99967C4.55765 18.3332 4.13372 18.1576 3.82116 17.845C3.5086 17.5325 3.33301 17.1085 3.33301 16.6665V3.33317C3.33301 2.89114 3.5086 2.46722 3.82116 2.15466C4.13372 1.8421 4.55765 1.6665 4.99967 1.6665Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.667 1.6665V6.6665H16.667"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3337 10.8335H6.66699"
        stroke="#294F9B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3337 14.1665H6.66699"
        stroke="#294F9B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.33366 7.5H7.50033H6.66699"
        stroke="#294F9B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

TeamsInfor.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}
TeamsInfor.defaultProps = {
  viewBox: '0 0 20 20',
  width: '20',
  height: '20',
  style: {}
}

export default TeamsInfor
