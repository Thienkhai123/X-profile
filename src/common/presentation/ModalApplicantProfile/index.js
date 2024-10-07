import React, { Fragment, useRef } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from '../Icons'

const ModalApplicantProfile = (props) => {
  const {
    title = '',
    children,
    toggleModal = () => {},
    handleCancel = () => {},
    open = false,
    modalStyle,
    childStyle,
    styleTitle = 'text-neutral text-h3'
  } = props

  if (!open) {
    return <Fragment></Fragment>
  }

  return (
    <div className={modalStyle}>
      <div className={childStyle}>
        <div className="relative py-2 flex justify-center items-center">
          <div onClick={() => handleCancel()} className="absolute left-0">
            <XProfileIcon name="cross" stroke="#000000" />
          </div>
          <p className="text-p18-bold">{title}</p>
        </div>
        {children}
      </div>
    </div>
  )
}

ModalApplicantProfile.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

ModalApplicantProfile.defaultProps = {
  title: '',
  modalStyle:
    'bg-white h-screen z-[300] w-screen overflow-x-hidden fixed  left-0 top-0  ',
  childStyle: 'p-6 h-full'
}
export default ModalApplicantProfile
