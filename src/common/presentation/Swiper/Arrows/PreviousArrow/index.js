import PropTypes from 'prop-types'

export const PreviousArrow = (props) => {
  const { prevRef, className, hasShadow, action, stylePrev, stroke } = props
  return (
    <div ref={prevRef} className={className}>
      <button
        aria-label="prev-button"
        className={`rounded-full ${hasShadow && 'shadow-md'}  ${stylePrev}`}
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
            d="M15.75 19.5L8.25 12l7.5-7.5"
            stroke={stroke}
          />
        </svg>
      </button>
    </div>
  )
}

PreviousArrow.propTypes = {
  prevRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  stylePrev: PropTypes.string,
  stroke: PropTypes.string,
  className: PropTypes.string,
  hasShadow: PropTypes.bool,
  action: PropTypes.func
}

PreviousArrow.defaultProps = {
  prevRef: null,
  className: 'absolute z-50 -left-[50px] top-1/2 -translate-y-1/2',
  hasShadow: true,
  action: () => {},
  stylePrev: 'bg-white p-2',
  stroke: 'black'
}
