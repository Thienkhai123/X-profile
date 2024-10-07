import PropTypes from 'prop-types'

export const Divider = (props) => {
  const { height } = props
  return <div className={`flex w-full ${height} border border-[#ECEEF0]`} />
}

Divider.propTypes = {
  height: PropTypes.string
}

Divider.defaultProps = {
  height: ''
}
