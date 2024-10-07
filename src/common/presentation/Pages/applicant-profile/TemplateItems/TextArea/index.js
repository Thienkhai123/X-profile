import PropTypes from 'prop-types'

export const TextArea = (props) => {
  const { refElement, setTemplateStates, value, editMode, group, color } = props
  if (editMode) {
    return (
      <textarea
        ref={refElement}
        onChange={(e) => setTemplateStates(e.target.value, group)}
        value={value}
        className="block w-full h-[145px] text-p16 resize-none overflow-auto outline-0"
        style={{
          color: color
        }}
        autoFocus
      />
    )
  } else {
    return (
      <div
        className=" text-p16 min-h-[145px]"
        style={{
          color: color
        }}
      >
        {value}
      </div>
    )
  }
}

TextArea.propTypes = {
  refElement: PropTypes.any,
  setValue: PropTypes.func,
  setTemplateStates: PropTypes.any,
  editMode: PropTypes.bool,
  group: PropTypes.string,
  color: PropTypes.string
}

TextArea.defaultProps = {
  refElement: null,
  setTemplateStates: () => {},
  value: '',
  editMode: false,
  group: '0',
  color: '#666666'
}
