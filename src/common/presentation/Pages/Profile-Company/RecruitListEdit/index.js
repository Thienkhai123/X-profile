import React, { useState } from 'react'
import PropTypes from 'prop-types'
import BlockEditorContainer from 'common/container/block-editor'
import RecruitList from '../RecruitList'
import useTrans from 'common/hooks/useTrans'
import { useSelector } from 'react-redux'
import { selectInitRecruitList } from 'store/app/edit-mode-company/profile/recruitListSlice'
import HideShowBlock from '../HideShowBlock'
import RecruitmentEditMode from '../../edit-mode-company/company/recruitment/RecruitmentEditMode'
import RecruitmentViewMode from '../../edit-mode-company/company/recruitment/RecruitmentViewMode'
import Modal from 'common/presentation/Modal'
import RecruitmentModalEdit from '../../edit-mode-company/company/recruitment/RecruitmentModalEdit'
import useModal from 'common/hooks/useModal'
import { useRouter } from 'next/router'
import {
  selectFooterProfile,
  updateFooterEdit
} from 'store/app/edit-mode-company/profile/footerSlice'
import { useDispatch } from 'react-redux'

const RecruitListEdit = (props) => {
  const { editmode = false, isShowCampaigns = false } = props
  const trans = useTrans()
  const router = useRouter()
  const { companyId } = router.query
  const { PROFILE_COMPANY } = trans
  const [modal, toggleModal] = useModal()
  const footerProfile = useSelector(selectFooterProfile)
  const {
    recruitmentCampaign,
    recruitmentSelected,
    recruitmentSelectedDefault
  } = useSelector(selectInitRecruitList)
  const dispatch = useDispatch()
  const handleAdd = () => {
    toggleModal(true)
  }
  const handleChangeIsShow = () => {
    dispatch(
      updateFooterEdit({
        ...footerProfile,
        meta: {
          ...footerProfile.meta,
          isShowCampaigns: !isShowCampaigns
        }
      })
    )
  }
  return (
    <div className="relative bg-nude">
      <BlockEditorContainer
        editmode={editmode}
        editState={
          <div>
            <HideShowBlock
              editMode={editmode}
              isShowBlock={isShowCampaigns}
              handleChangeIsShow={handleChangeIsShow}
            />
            <RecruitmentEditMode
              recruitmentCampaign={recruitmentCampaign}
              handleAdd={handleAdd}
              trans={PROFILE_COMPANY}
            />
          </div>
        }
        viewState={
          <RecruitmentViewMode
            recruitmentCampaign={recruitmentCampaign}
            trans={PROFILE_COMPANY}
          />
        }
      />
      <Modal
        open={modal}
        toggleModal={toggleModal}
        hiddenCancel={true}
        childStyle="w-screen h-fit sm:w-[1024px] max-h-[780px] pb-[88px] mt-4 shadow-md  relative bg-white rounded-2xl"
        // title="Các vị trí tuyển dụng nổi bật"
        // styleTitle="text-p28-bold text-neutral"
      >
        <RecruitmentModalEdit
          companyId={companyId}
          trans={PROFILE_COMPANY}
          toggleModal={toggleModal}
          recruitmentCampaign={recruitmentCampaign}
          recruitmentSelected={recruitmentSelected}
          recruitmentSelectedDefault={recruitmentSelectedDefault}
        />
      </Modal>
    </div>
  )
}

RecruitListEdit.propTypes = {}
RecruitListEdit.defaultProps = {}

export default RecruitListEdit
