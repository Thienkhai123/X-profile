import React from 'react'
import PropTypes from 'prop-types'

const Play2Icon = (props) => {
  const { viewBox, style, width, height, fill } = props
  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.38287 5.80297C6.49716 5.28004 5.49967 5.99117 5.49967 6.93951V10.6553C5.49967 11.6036 6.49716 12.3148 7.38287 11.7918L10.5297 9.93394C11.3786 9.43274 11.3786 8.16206 10.5297 7.66087L7.38287 5.80297ZM6.49967 6.93951C6.49967 6.80719 6.56377 6.71463 6.63932 6.66739C6.71243 6.62168 6.79424 6.61673 6.87446 6.66409L10.0213 8.52198C10.1097 8.5742 10.1663 8.67394 10.1663 8.7974C10.1663 8.92087 10.1097 9.02061 10.0213 9.07283L6.87446 10.9307C6.79424 10.9781 6.71243 10.9731 6.63932 10.9274C6.56377 10.8802 6.49967 10.7876 6.49967 10.6553V6.93951Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.99967 1.63074C4.04163 1.63074 0.833008 4.83936 0.833008 8.7974C0.833008 12.7554 4.04163 15.9641 7.99967 15.9641C11.9577 15.9641 15.1663 12.7554 15.1663 8.7974C15.1663 4.83936 11.9577 1.63074 7.99967 1.63074ZM1.83301 8.7974C1.83301 5.39165 4.59392 2.63074 7.99967 2.63074C11.4054 2.63074 14.1663 5.39165 14.1663 8.7974C14.1663 12.2032 11.4054 14.9641 7.99967 14.9641C4.59392 14.9641 1.83301 12.2032 1.83301 8.7974Z"
        fill={fill}
      />
    </svg>
  )
}

Play2Icon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}
Play2Icon.defaultProps = {
  viewBox: '0 0 16 17',
  width: '16',
  height: '17',
  fill: '#666666',
  style: {}
}

export default Play2Icon
