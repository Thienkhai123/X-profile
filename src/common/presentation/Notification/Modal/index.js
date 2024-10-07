import PropTypes from 'prop-types'
import Modal from 'common/presentation/Modal'
import XProfileIcon from 'common/presentation/Icons'
import Button from 'common/presentation/Button'

export const NotificationModal = (props) => {
  const {
    onCloseModal,
    open,
    icon,
    onClick,
    onCancel,
    title,
    description,
    btnCancelTitle,
    btnClickTitle,
    hiddenClickButton = false
  } = props
  return (
    <Modal toggleModal={onCloseModal} open={open}>
      <div className="p-5">
        {/* <div className="flex justify-end mb-4">
          <div className="cursor-pointer" onClick={onCloseModal}>
            <XProfileIcon name="cross" stroke="#666666" />
          </div>
        </div> */}
        <div className="flex justify-center">
          <XProfileIcon name={icon} />
        </div>
        <p className="text-h2 text-center text-black mt-[52px]">{title}</p>
        <p className="text-p18 text-center text-grey-1 my-8 px-12">
          {description}
        </p>
        <div className="flex justify-center items-center gap-[20px]">
          {(onCancel || btnCancelTitle) && (
            <Button
              margin="mt-0 mx-auto"
              title={btnCancelTitle}
              width="min-w-[240px]"
              padding="py-2 px-10"
              onClick={onCancel}
              background="bg-grey-2"
              textWeight="text-p18-bold text-white"
              type="button"
            />
          )}
          {!hiddenClickButton && (
            <Button
              margin="mt-0 mx-auto"
              title={btnClickTitle}
              width="min-w-[240px]"
              padding="py-2 px-10"
              onClick={onClick}
              textWeight="text-p18-bold text-black"
              type="button"
            />
          )}
        </div>
      </div>
    </Modal>
  )
}

NotificationModal.propTypes = {
  icon: PropTypes.string,
  open: PropTypes.bool,
  onCloseModal: PropTypes.func,
  onClick: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  btnClickTitle: PropTypes.string,
  btnCancelTitle: PropTypes.string,
  onCancel: PropTypes.any
}

NotificationModal.defaultProps = {
  icon: '',
  title: '',
  description: '',
  btnClickTitle: '',
  btnCancelTitle: '',
  open: false,
  onCancel: null,
  onClick: () => {},
  onCloseModal: () => {}
}
