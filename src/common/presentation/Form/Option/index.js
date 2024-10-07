import PropTypes from 'prop-types'

const Option = (props) => {
  const { value, name } = props

  return <option value={value}>{name}</option>
}

Option.propTypes = {
  value: PropTypes.any,
  name: PropTypes.string
}

Option.defaultProps = {
  value: '',
  name: ''
}

export default Option
