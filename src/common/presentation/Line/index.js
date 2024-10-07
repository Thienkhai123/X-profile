import PropTypes from 'prop-types'

export const Line = (props) => {
  const { className } = props
  return <div className={className}></div>
}

Line.propTypes = {
  className: PropTypes.string
}

Line.defaultProps = {
  className: 'h-[10px] w-[20px] bg-button rounded-[12px]'
}
