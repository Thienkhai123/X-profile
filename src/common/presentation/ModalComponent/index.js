import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import useOnClickOutside from '../../hooks/useClickOutSide'

const ModalComponent = (props) => {
  const {
    title = 'Thông báo',
    toggleModal,
    component: Component,
    data,
    fnc
  } = props
  const wrapperRef = useRef(null)
  useOnClickOutside(wrapperRef, toggleModal)

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[100] left-[calc(0%)] top-[calc(0%)]">
      <div
        ref={wrapperRef}
        className="w-auto h-fit sm:w-[800px] mt-4 shadow-md p-4 bg-white rounded-lg"
      >
        <h1 className="text-lg font-semibold">{title}</h1>
        {/* <hr /> */}
        <Component data={data} fnc={fnc} toggleModal={toggleModal} />
      </div>
    </div>
  )
}

ModalComponent.propTypes = {
  title: PropTypes.string,
  toggleModal: PropTypes.func.isRequired,
  component: PropTypes.func.isRequired,
  data: PropTypes.object,
  fnc: PropTypes.func
}

ModalComponent.defaultProps = {
  title: '',
  component: () => <div></div>
}
export default ModalComponent
