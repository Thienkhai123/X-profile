import useModal from 'common/hooks/useModal'
import useTrans from 'common/hooks/useTrans'
import Modal from 'common/presentation/Modal'

import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import {
  addQuestion,
  getAllFaqs,
  removeQuestion,
  selectAllFaqs,
  selectInitFaqs,
  updateEditFaq,
  updateQuestion
} from 'store/app/edit-mode-company/profile/questionsSlice'
import QuestionsEditView from '../../edit-mode-company/company/questionsEdit/QuestionsEditView'
import QuestionEditModal from '../../edit-mode-company/company/questionsEdit/QuestionEditModal'
import { scrollToIdInElement } from 'store/helper/functionHelper'
import XProfileIcon from 'common/presentation/Icons'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import { selectBannerProfile } from 'store/app/edit-mode-company/profile/bannerSlice'

const HideShowBlock = (props) => {
  const { editMode, isShowBlock, handleChangeIsShow = () => {} } = props

  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const handleCloseMenu = () => {
    setShowMenu(false)
  }
  const menuRef = useRef(null)
  useOnClickOutside(menuRef, handleCloseMenu)

  return (
    <div className="relative ">
      <div className=" max-w-[1140px] mx-auto">
        {editMode && (
          <div
            ref={menuRef}
            className="flex items-center gap-2 justify-end relative "
          >
            {!isShowBlock && (
              <div className="flex gap-2 px-4 py-2 border border-grey-3 rounded-lg">
                <XProfileIcon name="eyeOff2" stroke="#000000" />
                <p>Đã ẩn</p>
              </div>
            )}
            <div
              onClick={() => toggleMenu()}
              className="w-[44px] h-[44px] rounded-full hover:bg-grey-3  transition-all duration-150 relative cursor-pointer flex items-center justify-center"
            >
              <XProfileIcon name="menuDot" />
            </div>
            {showMenu && (
              <div
                onClick={() => {
                  handleChangeIsShow(), toggleMenu()
                }}
                className="absolute cursor-pointer -bottom-14  transition-all duration-500 right-4 p-2 rounded-lg bg-white"
              >
                <p className="py-2 px-5 hover:bg-light-nude rounded-lg">{`${
                  isShowBlock ? 'Ẩn phần này' : 'Bỏ ẩn'
                }`}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default HideShowBlock
