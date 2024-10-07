import PropTypes from 'prop-types'

const HamburgerMenu = (props) => {
  const { viewBox, style, width, height, stroke } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <g id="Hamburger Menu">
        <path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.75 7C20.75 7.41421 20.4142 7.75 20 7.75L4 7.75C3.58579 7.75 3.25 7.41421 3.25 7C3.25 6.58579 3.58579 6.25 4 6.25L20 6.25C20.4142 6.25 20.75 6.58579 20.75 7Z"
          fill="black"
        />
        <path
          id="Vector_2"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.75 12C20.75 12.4142 20.4142 12.75 20 12.75L4 12.75C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25L20 11.25C20.4142 11.25 20.75 11.5858 20.75 12Z"
          fill="black"
        />
        <path
          id="Vector_3"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.75 17C20.75 17.4142 20.4142 17.75 20 17.75L4 17.75C3.58579 17.75 3.25 17.4142 3.25 17C3.25 16.5858 3.58579 16.25 4 16.25L20 16.25C20.4142 16.25 20.75 16.5858 20.75 17Z"
          fill="black"
        />
      </g>
    </svg>
  )
}

HamburgerMenu.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

HamburgerMenu.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  stroke: '#666666',
  style: {}
}

export default HamburgerMenu
