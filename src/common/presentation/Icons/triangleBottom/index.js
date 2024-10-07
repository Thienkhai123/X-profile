import React from 'react'
import PropTypes from 'prop-types'

const TriangleBottom = (props) => {
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
        d="M92.0674 91.5683H85.0237L88.5455 84.5247L92.0674 91.5683Z"
        fill="#ECB14E"
      />
      <path
        d="M88.5455 63.3936L92.0674 70.4372H85.0237L88.5455 63.3936Z"
        fill="#ECB14E"
      />
      <path
        d="M67.4147 84.5244L70.9365 91.5681H63.8928L67.4147 84.5244Z"
        fill="#ECB14E"
      />
      <path
        d="M63.8928 70.4372L67.4147 63.3936L70.9365 70.4372H63.8928Z"
        fill="#ECB14E"
      />
      <path
        d="M46.2828 84.5244L49.8047 91.5681H42.761L46.2828 84.5244Z"
        fill="#ECB14E"
      />
      <path
        d="M42.761 70.4372L46.2828 63.3936L49.8047 70.4372H42.761Z"
        fill="#ECB14E"
      />
      <path
        d="M25.151 84.5244L28.6729 91.5681H21.6292L25.151 84.5244Z"
        fill="#ECB14E"
      />
      <path
        d="M21.6292 70.4372L25.151 63.3936L28.6729 70.4372H21.6292Z"
        fill="#ECB14E"
      />
      <path
        d="M21.6292 49.3064L25.151 42.2627L28.6729 49.3064H21.6292Z"
        fill="#ECB14E"
      />
      <path
        d="M21.6292 28.1745L25.151 21.1309L28.6729 28.1745H21.6292Z"
        fill="#ECB14E"
      />
      <path
        d="M21.6292 7.04369L25.151 0L28.6729 7.04369H21.6292Z"
        fill="#ECB14E"
      />
      <path
        d="M4.02113 84.5244L7.54297 91.5681H0.49928L4.02113 84.5244Z"
        fill="#ECB14E"
      />
      <path
        d="M0.49928 70.4372L4.02113 63.3936L7.54297 70.4372H0.49928Z"
        fill="#ECB14E"
      />
      <path
        d="M0.49928 49.3064L4.02113 42.2627L7.54297 49.3064H0.49928Z"
        fill="#ECB14E"
      />
      <path
        d="M0.49928 28.1745L4.02113 21.1309L7.54297 28.1745H0.49928Z"
        fill="#ECB14E"
      />
      <path
        d="M0.49928 7.04393L4.02113 0.000244141L7.54297 7.04393H0.49928Z"
        fill="#ECB14E"
      />
    </svg>
  )
}

TriangleBottom.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

TriangleBottom.defaultProps = {
  viewBox: '0 0 93 92',
  width: '93',
  height: '92',
  style: {}
}

export default TriangleBottom
