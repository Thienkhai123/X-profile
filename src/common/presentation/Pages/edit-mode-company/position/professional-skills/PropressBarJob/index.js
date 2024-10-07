import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import PropressBar from 'common/presentation/ProgressBar'
import XProfileIcon from 'common/presentation/Icons'
import Modal from 'common/presentation/Modal'
import useModal from 'common/hooks/useModal'
import { useDispatch } from 'react-redux'
import {
  getAllSoftSkillPositionV2,
  getProfilePostionSoftSkill,
  savePositionSoftSkillEdit,
  selectProfilePositionSoftSkill,
  selectSkillCompanySoftSkillPosition
} from 'store/app/edit-mode-company/position/softSkillSlice'
import { toast } from 'react-toastify'
import { ToastSuccess } from 'common/presentation/Notification/Toast'
import { ToastError } from 'common/presentation/Notification/Toast/ToastError'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import {
  getProfessionalSkillPositionV2,
  getProfilePostionProfessionalSkill,
  savePositionProfessionalSkillEdit,
  selectProfileProfessionalSkillPosition,
  selectSkillListProfessionalSkillPositionExist,
  updateCompanyProfessionalSkills
} from 'store/app/edit-mode-company/position/professionalSkillSlice'
import ModalEdit from '../ModalEdit'
import ModalDelete from '../ModalDelete'
import ProgressSkill from 'common/presentation/Pages/Profile-Company/ProgressSkill'
// import ModalDelete from '../modalDelete'

const PropressBarJob = (props) => {
  const {
    id,
    title,
    percentValue,
    background,
    description,
    roleId,
    ind,
    tooltip,
    setTooltip,
    skillMatchingPercentage,
    isDisplayChart
  } = props

  const dispatch = useDispatch()

  const titleProfessionalSkillRef = useRef()
  const popUp = useRef()

  const { query } = useRouter()
  const { departmentPositionId, companyId } = query || {}

  const [openModalEdit, toggleModalEdit] = useModal()
  const [openModalDelete, toggleModalDelete] = useModal()

  const [hover, setHover] = useState(false)

  const companySkills = useSelector(
    selectSkillListProfessionalSkillPositionExist
  )
  const profile = useSelector(selectProfileProfessionalSkillPosition)
  const softSkills = useSelector(selectSkillCompanySoftSkillPosition)

  const submit = async (data) => {
    if (data.id !== 0) {
      const index = companySkills.findIndex(
        (element) => element.departmentPositionSkillId === data.id
      )
      const skillItem = {
        ...companySkills[index],
        passScore: parseInt(data.passScore),
        percentage: parseInt(data.passScore),
        isDisplayChart: data?.isDisplayChart
      }
      const tempList = [...companySkills]
      tempList[index] = { ...skillItem }
      dispatch(updateCompanyProfessionalSkills([...tempList]))
    } else {
      const skillItem = {
        ...companySkills[data.index],
        passScore: parseInt(data.passScore),
        percentage: parseInt(data.passScore),
        isDisplayChart: data?.isDisplayChart
      }
      const tempList = [...companySkills]
      tempList[data.index] = { ...skillItem }
      dispatch(updateCompanyProfessionalSkills([...tempList]))
    }
    toggleModalEdit()
  }

  const onClickDelete = async (id, ind) => {
    if (id !== 0) {
      const removeSkill = companySkills.filter(
        (e, ind) => e.departmentPositionSkillId !== id
      )
      dispatch(updateCompanyProfessionalSkills([...removeSkill]))
    } else {
      const removeSkill = companySkills.filter((e, index) => index !== ind)
      dispatch(updateCompanyProfessionalSkills([...removeSkill]))
    }
    toggleModalDelete()
  }

  const onClickCancel = () => {
    dispatch(getAllSoftSkillPositionV2({ departmentPositionId }))
    dispatch(
      getProfilePostionSoftSkill({
        departmentPositionId
      })
    )
    if (openModalDelete) {
      toggleModalDelete()
    }
    if (openModalEdit) {
      toggleModalEdit()
    }
  }
  const renderLevelSkill = (percentValue) => {
    if (percentValue <= 30) {
      return 'Cơ bản'
    } else if (percentValue <= 60) {
      return 'Trung bình'
    } else {
      return 'Cao'
    }
  }

  const titleProfessionalSkillHeight =
    titleProfessionalSkillRef.current?.offsetHeight
  const popUpHeight = popUp.current?.offsetHeight

  const titleProfessionalSkillWidth =
    titleProfessionalSkillRef.current?.offsetWidth
  const popUpWidth = popUp.current?.offsetWidth / 2

  return (
    <div className="">
      <div className="flex justify-between items-center relative">
        <div className="mb-[4px] w-full grid grid-cols-2 gap-6 mb:gap-0">
          <div className="flex flex-wrap">
            <div ref={titleProfessionalSkillRef} className="">
              <p className="text-p14 md:text-p16-bold text-neutral">{title}</p>
            </div>
          </div>
          <div className="w-full h-full grid grid-cols-[40%_30%_20%] items-center justify-between gap-2">
            <ProgressSkill percentValue={percentValue} />
            <p className="sm:text-p16 leading-7 text-p14 text-left  text-grey-1 whitespace-nowrap">
              {renderLevelSkill(percentValue)}
            </p>
            <div className="flex items-center justify-end gap-2">
              <div className="cursor-pointer" onClick={() => toggleModalEdit()}>
                <XProfileIcon name="pen" width="20" height="20" />
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  toggleModalDelete()
                }}
              >
                <XProfileIcon name="trash" width="20" height="20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        childStyle="w-screen h-fit sm:w-[800px] mt-10 shadow-md p-[40px] bg-white rounded-lg"
        toggleModal={toggleModalEdit}
        open={openModalEdit}
        title="Chỉnh sửa  kỹ năng"
        styleTitle="text-p28-bold text-neutral"
      >
        <ModalEdit
          submit={submit}
          percentValue={percentValue}
          id={id}
          onClickCancel={onClickCancel}
          title={title}
          ind={ind}
          isDisplayChart={isDisplayChart}
        />
      </Modal>

      <Modal
        toggleModal={toggleModalDelete}
        open={openModalDelete}
        childStyle="w-screen h-fit sm:w-[480px]   p-[40px] bg-white rounded-[16px]"
      >
        <ModalDelete
          id={id}
          onClickCancel={onClickCancel}
          onClickDelete={onClickDelete}
          ind={ind}
        />
      </Modal>
    </div>
  )
}

PropressBarJob.propTypes = {
  title: PropTypes.string,
  percentValue: PropTypes.number,
  background: PropTypes.string,
  roleId: PropTypes.number,
  description: PropTypes.string,
  skillMatchingPercentage: PropTypes.number
}
PropressBarJob.defaultProps = {
  title: 'Communication',
  percentValue: 50,
  background: '',
  roleId: 0,
  description: 'Kiểm tra mức độ phù hợp',
  skillMatchingPercentage: 0
}

export default PropressBarJob
