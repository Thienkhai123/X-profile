import PropTypes from 'prop-types'

const Text = (props) => {
  const { setTemplateStates, value, editMode, group, metadata } = props
  if (editMode) {
    return (
      <input
        onChange={(e) => setTemplateStates(e.target.value, group)}
        value={value}
        className="block w-full outline-0"
        style={{ ...metadata }}
      />
    )
  } else {
    return (
      <p className=" text-p16 text-grey-1" style={{ ...metadata }}>
        {value}
      </p>
    )
  }
}

Text.propTypes = {
  refElement: PropTypes.any,
  setValue: PropTypes.func,
  setTemplateStates: PropTypes.any,
  editMode: PropTypes.bool,
  group: PropTypes.string,
  metadata: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.string,
    fontWeight: PropTypes.number
  })
}

Text.defaultProps = {
  refElement: null,
  setTemplateStates: () => {},
  value: '',
  editMode: false,
  group: '0',
  metadata: {
    color: '#333333',
    fontSize: '16px',
    fontWeight: 700
  }
}

export default Text
