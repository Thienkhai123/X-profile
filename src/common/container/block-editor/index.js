import useOnClickOutside from 'common/hooks/useClickOutSide'
import XProfileIcon from 'common/presentation/Icons'
import PropTypes from 'prop-types'
import { useRef } from 'react'

const renderIcons = (icons = [], key = 'key') => {
  return (
    <>
      {icons?.map((icon, ind) => {
        const { name = 'upload', action = () => {}, props } = icon || {}
        return (
          <div
            key={`extra-${key}-icon-${ind}`}
            className="cursor-pointer"
            onClick={() => action()}
          >
            <XProfileIcon name={name} {...props} />
          </div>
        )
      })}
    </>
  )
}

const BlockEditorContainer = (props) => {
  const {
    editmode,
    editState,
    viewState,
    extraStartIconsEditState,
    extraEndIconsEditState,
    extraStartIconsViewState,
    extraEndIconsViewState,
    onClickEdit,
    onClickSave,
    onClickCancel,
    onClickOutSide,
    showIcons,
    showBlock = true
  } = props

  const blockEditRef = useRef(null)

  const handleClickOutsideEditBlock = () => {
    if (editmode) {
      onClickOutSide()
    }
  }

  useOnClickOutside(blockEditRef, handleClickOutsideEditBlock)

  if (editmode) {
    return (
      <div ref={blockEditRef} className="py-9 px-10">
        {showIcons && (
          <div className="flex justify-end">
            <div className="flex gap-4 items-center">
              {renderIcons(extraStartIconsEditState, 'edit-start')}
              <div className="cursor-pointer" onClick={() => onClickSave()}>
                <XProfileIcon name="save" width="24" height="24" />
              </div>
              <div
                onClick={() => onClickCancel()}
                className="gap-2 rounded-lg cursor-pointer"
              >
                <p>Huỷ</p>
              </div>
              {renderIcons(extraEndIconsEditState, 'edit-end')}
            </div>
          </div>
        )}

        <div>{editState}</div>
      </div>
    )
  }

  if (showBlock) {
    return (
      <div className="py-9 px-10">
        <div className="flex justify-end">
          <div className="flex gap-4">
            {renderIcons(extraStartIconsViewState, 'view-start')}
            {showIcons && (
              <div className="cursor-pointer" onClick={() => onClickEdit()}>
                <XProfileIcon name="edit" width="24" height="24" />
              </div>
            )}

            {renderIcons(extraEndIconsViewState, 'view-end')}
          </div>
        </div>

        <div>{viewState}</div>
      </div>
    )
  }
}

BlockEditorContainer.propTypes = {
  editmode: PropTypes.bool,
  editState: PropTypes.node,
  viewState: PropTypes.node,
  extraStartIconsEditState: PropTypes.array,
  extraEndIconsEditState: PropTypes.array,
  extraStartIconsViewState: PropTypes.array,
  extraEndIconsViewState: PropTypes.array,
  onClickEdit: PropTypes.func,
  onClickSave: PropTypes.func,
  onClickCancel: PropTypes.func,
  onClickOutSide: PropTypes.func,
  showIcons: PropTypes.bool
}

BlockEditorContainer.defaultProps = {
  editmode: false,
  editState: () => <div></div>,
  viewState: () => <div></div>,
  extraStartIconsEditState: [],
  extraEndIconsEditState: [],
  extraStartIconsViewState: [],
  extraEndIconsViewState: [],
  onClickEdit: () => {},
  onClickSave: () => {},
  onClickCancel: () => {},
  onClickOutSide: () => {},
  showIcons: false
}

export default BlockEditorContainer
