import PropTypes from 'prop-types'

export const NextArrow = (props) => {
  const { nextRef, className, hasShadow, action, stylePrev, stroke } = props
  return (
    <div ref={nextRef} className={className}>
      <button
        aria-label="next-button"
        className={`rounded-full ${hasShadow && 'shadow-md'}   ${stylePrev}`}
        onClick={action}
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
            stroke={stroke}
          />
        </svg>
      </button>
    </div>
  )
}

NextArrow.propTypes = {
  nextRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  stylePrev: PropTypes.string,
  stroke: PropTypes.string,
  className: PropTypes.string,
  hasShadow: PropTypes.bool,
  action: PropTypes.func
}

NextArrow.defaultProps = {
  nextRef: null,
  className: 'absolute z-50 -right-[50px] top-1/2 -translate-y-1/2',
  hasShadow: true,
  action: () => {},
  stylePrev: 'bg-white p-2',
  stroke: 'black'
}
