import PropTypes from 'prop-types'

const DropdownChapterIcon = (props) => {
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
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.43045 8.51192C4.70002 8.19743 5.17349 8.161 5.48799 8.43057L11.9999 14.0122L18.5118 8.43057C18.8263 8.16101 19.2998 8.19743 19.5693 8.51192C19.8389 8.82642 19.8025 9.29989 19.488 9.56946L12.488 15.5695C12.2071 15.8102 11.7927 15.8102 11.5118 15.5695L4.5118 9.56946C4.1973 9.29989 4.16088 8.82641 4.43045 8.51192Z"
        fill="black"
      />
    </svg>
  )
}

DropdownChapterIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}

DropdownChapterIcon.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  fill: 'black',
  stroke: 'black',
  style: {}
}

export default DropdownChapterIcon
