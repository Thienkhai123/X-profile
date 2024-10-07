import React, { Fragment, useRef } from 'react'
import PropTypes from 'prop-types'
import useOnClickOutside from '../../hooks/useClickOutSide'
import XProfileIcon from '../Icons'

const Modal = (props) => {
  const {
    title = '',
    children,
    toggleModal = () => {},
    open = false,
    modalStyle,
    childStyle,
    hiddenCancel = false,
    useClickOutside = true,
    styleTitle = 'text-neutral text-h3'
  } = props
  const wrapperRef = useRef(null)
  const wrapperDisableRef = useRef(null)

  useOnClickOutside(wrapperRef, toggleModal)

  if (!open) {
    return <Fragment></Fragment>
  }

  return (
    <div className={modalStyle}>
      <div
        ref={useClickOutside ? wrapperRef : wrapperDisableRef}
        className={childStyle}
      >
        <div className="flex justify-between ">
          <p className={styleTitle} style={{ lineHeight: 1 }}>
            {title}
          </p>
          {!hiddenCancel && (
            <div onClick={() => toggleModal()} className="cursor-pointer ">
              <XProfileIcon name="cancel" width="14" height="14" />
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

Modal.defaultProps = {
  title: '',
  modalStyle:
    'w-[100vw] h-[100vh] p-2 flex justify-center items-center fixed bg-black/30 z-[10000] left-[calc(0%)] top-[calc(0%)]',
  childStyle:
    'w-screen h-fit sm:w-[800px] mt-4 p-[40px] bg-white rounded-[16px]'
}
export default Modal
