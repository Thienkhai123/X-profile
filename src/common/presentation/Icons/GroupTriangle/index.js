import React from 'react'
import PropTypes from 'prop-types'

const Triangle = (props) => {
  const { viewBox, style, width, height } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      style={style}
      fill="none"
    >
      <path
        d="M11.7188 11.719H-0.000263214L5.85924 0L11.7188 11.719Z"
        fill="#ECB14E"
      />
      <path
        d="M5.85924 31.7188L11.7188 43.4378H-0.000263214L5.85924 31.7188Z"
        fill="#ECB14E"
      />
      <path d="M37.578 0L43.4375 11.719H31.7185L37.578 0Z" fill="#ECB14E" />
      <path
        d="M31.7185 43.4378L37.578 31.7188L43.4375 43.4378H31.7185Z"
        fill="#ECB14E"
      />
      <path d="M69.2967 0L75.1562 11.719H63.4372L69.2967 0Z" fill="#ECB14E" />
      <path
        d="M63.4372 43.4378L69.2967 31.7188L75.1562 43.4378H63.4372Z"
        fill="#ECB14E"
      />
      <path d="M101.015 0L106.875 11.719H95.156L101.015 0Z" fill="#ECB14E" />
      <path
        d="M95.156 43.4378L101.015 31.7188L106.875 43.4378H95.156Z"
        fill="#ECB14E"
      />
      <path
        d="M95.3435 75.157L101.203 63.438L107.062 75.157H95.3435Z"
        fill="#ECB14E"
      />
      <path
        d="M63.6247 75.157L69.4842 63.438L75.3438 75.157H63.6247Z"
        fill="#ECB14E"
      />
      <path
        d="M31.906 75.157L37.7655 63.438L43.625 75.157H31.906Z"
        fill="#ECB14E"
      />
      <path
        d="M0.187237 75.157L6.04674 63.438L11.9062 75.157H0.187237Z"
        fill="#ECB14E"
      />
      <path
        d="M95.3435 106.876L101.203 95.1572L107.062 106.876H95.3435Z"
        fill="#ECB14E"
      />
      <path
        d="M63.6247 106.876L69.4842 95.1572L75.3438 106.876H63.6247Z"
        fill="#ECB14E"
      />
      <path
        d="M31.906 106.876L37.7655 95.1572L43.625 106.876H31.906Z"
        fill="#ECB14E"
      />
      <path
        d="M0.187237 106.876L6.04674 95.1572L11.9062 106.876H0.187237Z"
        fill="#ECB14E"
      />
      <path
        d="M95.3435 138.595L101.203 126.876L107.062 138.595H95.3435Z"
        fill="#ECB14E"
      />
      <path
        d="M63.6247 138.595L69.4842 126.876L75.3438 138.595H63.6247Z"
        fill="#ECB14E"
      />
      <path
        d="M31.906 138.595L37.7655 126.876L43.625 138.595H31.906Z"
        fill="#ECB14E"
      />
      <path
        d="M0.187237 138.595L6.04674 126.876L11.9062 138.595H0.187237Z"
        fill="#ECB14E"
      />
      <path d="M132.734 0L138.594 11.719H126.875L132.734 0Z" fill="#ECB14E" />
      <path
        d="M126.875 43.4378L132.734 31.7188L138.594 43.4378H126.875Z"
        fill="#ECB14E"
      />
      <path
        d="M127.062 75.157L132.922 63.438L138.781 75.157H127.062Z"
        fill="#ECB14E"
      />
      <path
        d="M127.062 106.876L132.922 95.1572L138.781 106.876H127.062Z"
        fill="#ECB14E"
      />
      <path
        d="M127.062 138.595L132.922 126.876L138.781 138.595H127.062Z"
        fill="#ECB14E"
      />
    </svg>
  )
}

Triangle.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

Triangle.defaultProps = {
  viewBox: '0 0 139 139',
  width: '139',
  height: '139',
  style: {}
}

export default Triangle
