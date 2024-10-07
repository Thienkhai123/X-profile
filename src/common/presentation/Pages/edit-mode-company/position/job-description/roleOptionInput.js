import useOnClickOutside from 'common/hooks/useClickOutSide'
import BreadCrumbs from 'common/presentation/breadCrumbs'
import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { Fragment, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateDepartmentBannerEdit } from 'store/app/edit-mode-company/department/bannerSlice'
import { updatePositionBannerEdit } from 'store/app/edit-mode-company/position/bannerSlice'

const RoleOptionInput = (props) => {
  const {
    value,
    onChangeRole = () => {},
    isErrorsValueChild = false,
    idFocus = ''
  } = props
  const roleDetail = [
    {
      id: 1,
      name: 'Hỗ trợ'
    },
    {
      id: 2,
      name: 'Thi hành'
    },
    {
      id: 3,
      name: 'Hỗ trợ & thi hành'
    }
  ]
  const refOpt = useRef(null)
  const [showOpt, setShowOpt] = useState(false)

  const handleSelectRole = (value) => {
    setShowOpt(false)
    onChangeRole(value)
  }
  const handleCloseOpt = () => setShowOpt(false)
  useOnClickOutside(refOpt, handleCloseOpt)
  return (
    <div className="relative" ref={refOpt}>
      <button
        id={idFocus}
        className={`bg-white border  rounded-lg  w-full flex justify-between py-4 px-6 items-center ${
          isErrorsValueChild ? 'border-semantic-red' : 'border-grey-3'
        }`}
        onClick={() => setShowOpt(!showOpt)}
      >
        {!value ? (
          <Fragment>
            <p className="xl:text-p18 text-grey-3">Chọn vai trò</p>
            <XProfileIcon name="arrowDown" />
          </Fragment>
        ) : (
          <Fragment>
            <p className="xl:text-p18 text-p14">{value}</p>
            <XProfileIcon name="arrowDown" />
          </Fragment>
        )}
      </button>
      {showOpt && (
        <div className="custom-scrollbar border border-grey-3 z-20 shadow bg-white max-h-[190px] w-full overflow-x-hidden absolute top-[64px] rounded-lg">
          {roleDetail?.map((role) => (
            <div
              key={role?.id}
              className="flex justify-between items-center px-[24px] hover:bg-light-nude py-[10px]"
              onClick={() => handleSelectRole(role)}
            >
              <p>{role?.name}</p>
              {value === role?.name && <XProfileIcon name="check" />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

RoleOptionInput.propTypes = {
  toggleModal: PropTypes.func
}

RoleOptionInput.defaultProps = {
  toggleModal: () => {}
}

export default RoleOptionInput
