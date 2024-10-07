import XProfileIcon from 'common/presentation/Icons'
import PropTypes from 'prop-types'

const Validation = (props) => {
  const { text, active } = props

  return (
    <div className="flex items-center gap-[8px]">
      <XProfileIcon name={active ? 'check' : 'information'} />
      <p className="text-grey-1 text-[14px]">{text}</p>
    </div>
  )
}

Validation.propTypes = {
  text: PropTypes.string,
  active: PropTypes.bool
}

Validation.defaultProps = {
  text: '',
  active: false
}

export default Validation
