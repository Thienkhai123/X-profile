import useModal from 'common/hooks/useModal'
import useTrans from 'common/hooks/useTrans'
import Modal from 'common/presentation/Modal'
import RadarChart from 'common/presentation/Pages/Profile-Company/RadarChart'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getBannerEditPosition } from 'store/app/edit-mode-company/position/bannerSlice'
import {
  addChildJobDescription,
  addJobDescription,
  removeJobDescription,
  selectJobDescriptionInitState,
  updateJobDescription,
  updateJobDescriptionEdit
} from 'store/app/edit-mode-company/position/jobDescriptionSlice'
import { selectUserProfile } from 'store/app/userSlice'

import JobDescriptionEditMode from './jobDescriptionEditMode'
import JobDescriptionViewMode from './jobDescriptionViewMode'
import { selectSkillCompanySoftSkillPosition } from 'store/app/edit-mode-company/position/softSkillSlice'
import { selectSkillListProfessionalSkillPositionExist } from 'store/app/edit-mode-company/position/professionalSkillSlice'
import RadarChartEdit from './RadarChartEdit'
import RadarEditModal from './RadarChartEdit/RadarEditModal'

const JobDescriptionPositionEdit = (props) => {
  const {
    pageEditMode,
    errors = null,
    handleResetErrors = () => {},
    setErrors,
    showErrorCustomArray = () => {}
  } = props
  const dispatch = useDispatch()
  const { query } = useRouter()
  const trans = useTrans()
  const { departmentPositionId, companyId, departmentId } = query || {}
  const { jobDescriptionList, profile } = useSelector(
    selectJobDescriptionInitState
  )

  const userProfile = useSelector(selectUserProfile)
  const { userMatchingPercentage } = profile || {}
  const companySoftSkills = useSelector(selectSkillCompanySoftSkillPosition)
  const companyProSkills = useSelector(
    selectSkillListProfessionalSkillPositionExist
  )

  const [modal, toggleModal] = useModal()
  const [modalRadar, toggleModalRadar] = useModal()

  const { PROFILE_COMPANY } = trans

  const onClickCancel = () => {
    if (departmentPositionId) {
      dispatch(getBannerEditPosition(query))
    }
    toggleModal()
  }

  const onClickSave = async () => {
    if (jobDescriptionList?.length >= 1) {
      const isCheck = false
      const tmp = {}
      jobDescriptionList.forEach((element, key) => {
        if (element?.name === '') {
          const content = {
            id: `jobDescription_name_${key}`
          }
          showErrorCustomArray(
            `jobDescription_name_${key}`,
            tmp,
            setErrors,
            content,
            'jobDescriptionList'
          )
          isCheck = true
        }
        if (element?.childs?.length > 0) {
          element?.childs.forEach((el, ind) => {
            if (el?.name === '') {
              const content = {
                id: `jobDescription_nameChild_${key}_${ind}`
              }
              showErrorCustomArray(
                `jobDescription_nameChild_${key}_${ind}`,
                tmp,
                setErrors,
                content,
                'jobDescriptionList'
              )
              isCheck = true
            }
            if (el?.value === '') {
              const content = {
                id: `jobDescription_valueChild_${key}_${ind}`
              }
              showErrorCustomArray(
                `jobDescription_valueChild_${key}_${ind}`,
                tmp,
                setErrors,
                content,
                'jobDescriptionList'
              )
              isCheck = true
            }
          })
        }
      })
      if (isCheck) {
        const errorsList = Object.keys(tmp)
        const result = errorsList?.filter((elm) => elm?.id !== '')
        const element = document.getElementById(result[0])
        if (element) {
          element.focus()
        }
        return
      }
    }
    toggleModal()
  }
  const onClickSaveRadar = async () => {
    toggleModalRadar()
  }
  const onClickOutSide = () => {
    onClickSave()
  }
  const onClickOutSideRadar = () => {
    onClickSaveRadar()
  }
  const handleClickAddJob = () => {
    const template = {
      name: '',
      childs: [
        {
          name: '',
          value: ''
        }
      ]
    }
    dispatch(addJobDescription(template))
    handleResetErrors('JobDescriptionList')
  }
  const handleClickAddChild = (data) => {
    dispatch(addChildJobDescription(data))
  }
  const onChangeEdit = (data, id) => {
    dispatch(updateJobDescription(data))
    handleResetErrors(id)
  }
  const handleRemove = (id) => {
    dispatch(removeJobDescription({ id }))
    setErrors(null)
  }
  const handleOnChangeAverageSalaryField = (value) => {
    dispatch(updateJobDescriptionEdit({ ...profile, averageSalary: value }))
  }
  const handleOnChangeMaxSalaryField = (value) => {
    dispatch(updateJobDescriptionEdit({ ...profile, maxSalary: value }))
  }
  const resetSalary = () => {
    dispatch(
      updateJobDescriptionEdit({ ...profile, averageSalary: 0, maxSalary: 0 })
    )
  }
  const handleOnChangeEmployeeAmountField = (value) => {
    dispatch(
      updateJobDescriptionEdit({
        ...profile,
        employeeAmount: value || 0
      })
    )
  }

  const errorsList = []
  const errorsArray = Object.values(errors || {}) || []
  if (errorsArray?.length > 0) {
    errorsArray?.forEach((elm) => {
      if (elm.id !== '') {
        errorsList.push(elm.id)
      }
    })
  }

  return (
    <div id="jobDescriptionList" className="relative py-[88px]">
      <div className=" max-w-[1140px] mx-auto">
        <div className="flex gap-[40px]  justify-center xl:justify-between">
          <JobDescriptionViewMode
            toggleModal={toggleModal}
            profile={profile}
            jobDescriptionList={jobDescriptionList}
            pageEditMode={pageEditMode}
            handleOnChangeAverageSalaryField={handleOnChangeAverageSalaryField}
            handleOnChangeMaxSalaryField={handleOnChangeMaxSalaryField}
            handleResetSalary={resetSalary}
            handleOnChangeEmployeeAmountField={
              handleOnChangeEmployeeAmountField
            }
            errors={errors}
            handleResetErrors={handleResetErrors}
          />
          {/* {isShowChart && ( */}
          <div className="pt-[68px]">
            <RadarChartEdit
              pageEditMode={pageEditMode}
              toggleModal={toggleModalRadar}
              skills={[
                ...companySoftSkills?.filter((el) => el?.isDisplayChart),
                ...companyProSkills?.filter((el) => el?.isDisplayChart)
              ]}
              title={PROFILE_COMPANY.jobDetail.titleRelevance}
              numeral={userMatchingPercentage}
              titleApplyButton={PROFILE_COMPANY.jobDetail.titleRelevanceButton}
              descriptionDefault={
                PROFILE_COMPANY.jobDetail.descriptionRelevance
              }
              titleButton={PROFILE_COMPANY.jobDetail.titleApplyJob}
              // handleApply={checkApply}
              showApply={true}
              userProfile={userProfile}
              // isShowRadarChart={
              //   companySoftSkills?.filter((el) => el?.isDisplayChart)?.length +
              //     companyProSkills?.filter((el) => el?.isDisplayChart)
              //       ?.length >=
              //   3
              // }
            />
          </div>
          {/* )} */}
        </div>
      </div>
      <Modal
        open={modal}
        toggleModal={onClickOutSide}
        childStyle="w-screen h-fit sm:w-fit   mt-[56px] shadow-md p-[40px]  bg-white rounded-lg"
        modalStyle="w-[100vw] h-[100vh] p-2 flex justify-center items-center fixed bg-black/30 z-[10000] left-[calc(0%)] top-[calc(0%)]"
        title="Mô tả công việc"
        styleTile="text-p28-bold text-neutral"
      >
        <JobDescriptionEditMode
          jobDescriptionList={jobDescriptionList}
          handleClickAddJob={handleClickAddJob}
          handleClickAddChild={handleClickAddChild}
          onChangeEdit={onChangeEdit}
          handleRemove={handleRemove}
          onClickCancel={onClickCancel}
          onClickSave={onClickSave}
          errorsList={errorsList || []}
          handleResetErrors={handleResetErrors}
        />
      </Modal>
      <Modal
        open={modalRadar}
        toggleModal={toggleModalRadar}
        childStyle="w-screen h-fit sm:w-[800px]   sm:max-h-[740px]   mt-4 shadow-md  p-[40px] bg-white rounded-lg"
        modalStyle="w-[100vw] h-[100vh] p-2 flex justify-center items-center fixed bg-black/30 z-[10000] left-[calc(0%)] top-[calc(0%)]"
        title="Chọn hiển thị các kỹ năng"
        styleTitle="text-p28-bold text-neutral"
      >
        <RadarEditModal
          softSkills={companySoftSkills}
          proSkills={companyProSkills}
          toggleModal={toggleModalRadar}
        />
      </Modal>
    </div>
  )
}

export default JobDescriptionPositionEdit
