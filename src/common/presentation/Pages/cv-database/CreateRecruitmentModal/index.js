import Button from 'common/presentation/Button'

import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { useRouter } from 'next/router'
import XProfileIcon from 'common/presentation/Icons'
import { useEffect, useState } from 'react'
import ChooseDepartment from '../ChooseDepartment'
import { selectUserProfile } from 'store/app/userSlice'
import { useSelector } from 'react-redux'
import ChoosePosition from '../ChoosePosition'
import TurnOnRecruitment from '../TurnOnRecruitment'
import { getAllJobLevels, selectAllJobLevels } from 'store/app/jobSlice'
import {
  getAddressBooksCompany,
  selectFooterAddressBook
} from 'store/app/edit-mode-company/profile/footerSlice'
import LoadingRoleBlock from 'common/presentation/Loading/LoadingRoleBlock'
import { APP_TYPES } from 'store/types'
import { selectLoading } from 'store/ui/loadingSlice'
import { getCampaignPriceBannerPosition } from 'store/app/edit-mode-company/position/bannerSlice'

const CreateRecruitmentModal = (props) => {
  const { toggleShowCreateRecruitmentModal = () => {} } = props
  const { push } = useRouter()
  const dispatch = useDispatch()
  const [step, setStep] = useState(1)
  const handleClickCancel = () => {
    // dispatch(updateRecruitmentSelected(recruitmentSelectedDefault))
  }
  const userProfile = useSelector(selectUserProfile)
  const jobCategory = useSelector(selectAllJobLevels)
  const addressBooks = useSelector(selectFooterAddressBook)
  const { ownedCompany } = userProfile || {}
  const { companyId, tag, name, avatarUrl: companyAvatar } = ownedCompany || {}
  const [departmentId, setDepartmentId] = useState(null)
  const [departmentName, setDepartmentName] = useState('')
  const [departmentPositionId, setDepartmentPositionId] = useState(null)

  const loading = useSelector(
    (state) =>
      selectLoading(state, APP_TYPES.JOB.GETALLJOBLEVELS) ||
      selectLoading(state, APP_TYPES.EDIT.GETADDRESSBOOKS) ||
      selectLoading(state, APP_TYPES.EDIT.GETALLDEPARTMENTEDIT) ||
      selectLoading(state, APP_TYPES.EDIT.GETDEPARTMENTPOSITIONS)
  )
  const handleCloseModal = () => {
    toggleShowCreateRecruitmentModal()
    setDepartmentId(null)
    setDepartmentPositionId(null)
    setDepartmentName('')
    document.body.style.overflow = 'auto'
  }
  const handleChooseDepartment = (id, name) => {
    if (id) {
      setDepartmentId(id)
      setDepartmentName(name)
      setStep(2)
    }
  }
  const handleClickBack = () => {
    setStep(1)
    setDepartmentId(null)
    setDepartmentName('')
  }
  const handleClickTurnRecruitment = (id) => {
    setDepartmentPositionId(id)
    setStep(3)
  }
  useEffect(() => {
    if (companyId) {
      dispatch(getAllJobLevels())
      dispatch(getAddressBooksCompany(parseInt(companyId)))
      dispatch(getCampaignPriceBannerPosition())
    }
  }, [companyId])
  return (
    <div className="relative">
      {loading && <LoadingRoleBlock />}
      {step === 1 && (
        <ChooseDepartment
          companyId={companyId}
          handleChooseDepartment={handleChooseDepartment}
          onCloseModal={handleCloseModal}
        />
      )}
      {step === 2 && (
        <ChoosePosition
          companyId={companyId}
          departmentId={departmentId}
          departmentName={departmentName}
          handleClickBack={handleClickBack}
          companyAvatar={companyAvatar}
          handleClickTurnRecruitment={handleClickTurnRecruitment}
          onCloseModal={handleCloseModal}

          // handleChooseDepartment={handleChooseDepartment}
        />
      )}
      {step === 3 && (
        <TurnOnRecruitment
          companyId={companyId}
          departmentId={departmentId}
          departmentPositionId={departmentPositionId}
          toggleModal={handleCloseModal}
          addressBooks={addressBooks}
          jobCategory={jobCategory}
        />
      )}
    </div>
  )
}

CreateRecruitmentModal.propTypes = {
  toggleModal: PropTypes.func
}

CreateRecruitmentModal.defaultProps = {
  toggleModal: () => {}
}

export default CreateRecruitmentModal
