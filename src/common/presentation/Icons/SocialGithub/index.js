import PropTypes from 'prop-types'

const SocialGithubIcon = (props) => {
  const { viewBox, style, width, height, fill, scale = 1, margin = 0 } = props
  return (
    <svg
      viewBox={viewBox}
      style={{
        margin: margin
      }}
      width={width}
      height={height}
      fill="none"
    >
      <g id="Github" clipPath="url(#clip0_4453_120543)">
        <path
          id="vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.3261 0C5.59794 0 0.148438 5.37 0.148438 12C0.148438 17.31 3.63429 21.795 8.47491 23.385C9.08379 23.49 9.31213 23.13 9.31213 22.815C9.31213 22.53 9.2969 21.585 9.2969 20.58C6.23727 21.135 5.44572 19.845 5.20217 19.17C5.06517 18.825 4.47151 17.76 3.95396 17.475C3.52774 17.25 2.91885 16.695 3.93873 16.68C4.89772 16.665 5.58272 17.55 5.81105 17.91C6.90704 19.725 8.65758 19.215 9.35779 18.9C9.46435 18.12 9.78401 17.595 10.1341 17.295C7.42459 16.995 4.59328 15.96 4.59328 11.37C4.59328 10.065 5.06517 8.985 5.84149 8.145C5.71972 7.845 5.2935 6.615 5.96327 4.965C5.96327 4.965 6.98315 4.65 9.31213 6.195C10.2863 5.925 11.3214 5.79 12.3565 5.79C13.3916 5.79 14.4267 5.925 15.401 6.195C17.7299 4.635 18.7498 4.965 18.7498 4.965C19.4196 6.615 18.9934 7.845 18.8716 8.145C19.6479 8.985 20.1198 10.05 20.1198 11.37C20.1198 15.975 17.2733 16.995 14.5637 17.295C15.0052 17.67 15.3857 18.39 15.3857 19.515C15.3857 21.12 15.3705 22.41 15.3705 22.815C15.3705 23.13 15.5988 23.505 16.2077 23.385C18.6252 22.5808 20.7259 21.0498 22.2141 19.0074C23.7023 16.9651 24.5031 14.5143 24.5038 12C24.5038 5.37 19.0543 0 12.3261 0Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_4453_120543">
          <rect
            width="24.3553"
            height="24"
            fill="white"
            transform="translate(0.148438)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

SocialGithubIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.any,
  fill: PropTypes.string
}

SocialGithubIcon.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {},
  fill: '#666666'
}

export default SocialGithubIcon
