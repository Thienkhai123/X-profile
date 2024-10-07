import useOnClickOutside from 'common/hooks/useClickOutSide'
import Button from 'common/presentation/Button'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  getAllJobs,
  getAllSkill,
  getJobFilter,
  selectAllJobFilter,
  selectAllSkill,
  selectFilterModel,
  selectSelectedField,
  selectSelectedFormal,
  selectSelectedSalary,
  selectSelectedSkill,
  updateFilter,
  updateSelectedField,
  updateSelectedFormal,
  updateSelectedSalary,
  updateSelectedSkill
} from 'store/app/jobSlice'
import OptionCustom from '../OptionCustom'
import SelectedItem from '../SelectedItem'
import { getAllSkillV2 } from 'store/app/portfolioSlice'

const FilterModal = (props) => {
  const { setMoreFilter = () => {} } = props
  const FILTER_DATA = [
    {
      displayName: 'Hình thức làm việc',
      name: 'formal',
      options: [
        { id: 0, title: 'Flash Job', value: 0 },
        { id: 1, title: 'Full-time', value: 1 },
        { id: 2, title: 'Part-time', value: 2 },
        { id: 3, title: 'Freelance', value: 3 }
      ]
    },
    {
      displayName: 'Mức lương',
      name: 'salary',
      options: [
        {
          id: 0,
          title: '5 - 10 triệu',
          value: { minSalary: 5000000, maxSalary: 10000000 }
        },
        {
          id: 1,
          title: '10 - 20 triệu',
          value: { minSalary: 10000000, maxSalary: 20000000 }
        },
        {
          id: 2,
          title: '20 - 40 triệu',
          value: { minSalary: 20000000, maxSalary: 40000000 }
        }
      ]
    }
  ]
  const [showSkillOpt, setShowSkillOpt] = useState(false)
  const [showFieldOpt, setShowFieldOpt] = useState(false)

  const filterModel = useSelector(selectFilterModel)
  const skills = useSelector(selectAllSkill)
  const jobFilters = useSelector(selectAllJobFilter)
  const selectedSkill = useSelector(selectSelectedSkill)
  const selectedField = useSelector(selectSelectedField)
  const selectedSalary = useSelector(selectSelectedSalary)
  const selectedFormal = useSelector(selectSelectedFormal)

  const refSkillOpt = useRef(null)
  const refFieldOpt = useRef(null)
  const dispatch = useDispatch()

  const handleSelectSkill = (value) => {
    const index = selectedSkill.findIndex((i) => i.id === value.id)
    if (index > -1) {
      const secondRemoved = selectedSkill.filter(
        (skill) => skill.id !== value.id
      )

      dispatch(updateSelectedSkill(secondRemoved))
    } else {
      const template = {
        id: value?.id,
        name: value?.name
      }
      dispatch(updateSelectedSkill([...selectedSkill, template]))
    }
    setShowSkillOpt(false)
  }

  const handleSelectField = (value) => {
    const index = selectedField.findIndex((i) => i.id === value.id)
    if (index > -1) {
      const secondRemoved = selectedField.filter(
        (skill) => skill.id !== value.id
      )
      dispatch(updateSelectedField(secondRemoved))
    } else {
      const template = {
        id: value?.id,
        name: value?.name
      }
      dispatch(updateSelectedField([...selectedField, template]))
    }
    setShowFieldOpt(false)
  }
  const handleCloseSkillOpt = () => setShowSkillOpt(false)
  useOnClickOutside(refSkillOpt, handleCloseSkillOpt)

  const handleCloseFieldOpt = () => setShowFieldOpt(false)
  useOnClickOutside(refFieldOpt, handleCloseFieldOpt)

  const handleRemoveSelectedSkillItem = (id) => {
    const cloneList = [...selectedSkill]
    if (id > -1) {
      cloneList.splice(id, 1)
      dispatch(updateSelectedSkill(cloneList))
    }
  }
  const handleRemoveSelectedFieldItem = (id) => {
    const cloneList = [...selectedField]
    if (id > -1) {
      cloneList.splice(id, 1)
      dispatch(updateSelectedField(cloneList))
    }
  }
  const handleSelectOption = (name, option) => {
    if (name === 'salary') {
      dispatch(updateSelectedSalary(option))
    } else if (name === 'formal') {
      dispatch(updateSelectedFormal(option))
    }
  }
  const handleSubmitFilter = () => {
    const resSkill = selectedSkill.map((x) => x.id).toString()
    const resField = selectedField.map((x) => x.id).toString()
    const query = {
      ...filterModel,
      page: 1,
      skills: resSkill,
      jobs: resField,
      minSalary: selectedSalary?.value?.minSalary,
      maxSalary: selectedSalary?.value?.maxSalary,
      type: selectedFormal?.value
    }
    dispatch(updateFilter(query))
    dispatch(getAllJobs(query))
    setMoreFilter(false)
  }

  const handleResetForm = () => {
    dispatch(updateSelectedFormal({}))
    dispatch(updateSelectedSalary({}))
    dispatch(updateSelectedField([]))
    dispatch(updateSelectedSkill([]))
    const query = { page: 1 }
    dispatch(updateFilter(query))
    dispatch(getAllJobs({}))
    setMoreFilter(false)
  }

  useEffect(() => {
    dispatch(getAllSkillV2({}))
    dispatch(getJobFilter({}))
  }, [dispatch])

  return (
    <div className="bg-white max-h-[80vh]  ">
      <div className=" px-[28px] py-[32px] border-b  max-h-[60vh] overflow-auto">
        <div className="flex xl:flex-row flex-col  items-start  sm:gap-24 gap-[8px]">
          {FILTER_DATA.map((template, index) => {
            const { options, name, displayName } = template
            return (
              <div key={index}>
                <label className="sm:text-p18-bold text-p14-bold  text-blue-light sm:mb-2 mb-[12px] block sm:min-w-[300px]">
                  {displayName}
                </label>
                {options.map((option, idx) => {
                  const { id, title, value } = option
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2 sm:mb-2 mb-3"
                    >
                      <input
                        className="w-5 h-5 accent-blue-light"
                        type="radio"
                        name={name}
                        id={`${title}${id}`}
                        // value={value}
                        checked={
                          (name === 'salary' && id === selectedSalary.id) ||
                          (name === 'formal' && id === selectedFormal.id)
                        }
                        onChange={(e) => handleSelectOption(name, option)}
                      />
                      <label
                        className="sm:text-p16 text-p12 text-grey-1"
                        htmlFor={`${title}${id}`}
                      >
                        {title}
                      </label>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
        <div className="mt-10 flex flex-col xl:flex-row justify-between items-start sm:gap-20 gap-[8px] w-full">
          <div className="w-full">
            <div>
              <label className="sm:text-p18-bold text-p14-bold  text-blue-light mb-2 block">
                Kỹ năng
              </label>
              <OptionCustom
                refOpt={refSkillOpt}
                selectedItem={selectedSkill}
                optionData={skills}
                showOpt={showSkillOpt}
                setShowOpt={setShowSkillOpt}
                handleSelectJob={handleSelectSkill}
              />
            </div>
            <div className="mt-4">
              <label className="sm:text-p16-bold text-p14-bold text-neutral  mb-2 block">
                Đã chọn
              </label>
              <div className="flex gap-2 flex-wrap">
                {selectedSkill.map((skill, ind) => {
                  const { name } = skill
                  return (
                    <SelectedItem
                      key={ind}
                      name={name}
                      handleRemoveSelectedItem={handleRemoveSelectedSkillItem}
                      id={ind}
                    />
                  )
                })}
              </div>
            </div>
          </div>
          <div className="w-full">
            <div>
              <label className="sm:text-p18-bold text-p14-bold  text-blue-light mb-2 block">
                Vị trí công việc
              </label>
              <OptionCustom
                refOpt={refFieldOpt}
                selectedItem={selectedField}
                optionData={jobFilters}
                showOpt={showFieldOpt}
                setShowOpt={setShowFieldOpt}
                handleSelectJob={handleSelectField}
              />
            </div>
            <div className="mt-4">
              <label className="sm:text-p16-bold text-p14-bold text-neutral mb-2 block">
                Đã chọn
              </label>
              <div className="flex gap-2 flex-wrap">
                {selectedField.map((field, indx) => {
                  const { name } = field
                  return (
                    <SelectedItem
                      key={indx}
                      name={name}
                      id={indx}
                      handleRemoveSelectedItem={handleRemoveSelectedFieldItem}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-[40px] gap-[16px]">
        <Button
          title="Xóa bộ lọc"
          rounded="rounded-[8px]"
          background={'bg-grey-2'}
          color="text-white"
          margin="m-0"
          padding="py-3 px-5"
          height="h-auto"
          width="w-auto"
          textWeight={'sm:text-p18-bold text-p14-bold'}
          onClick={handleResetForm}
          // disabled={isEditing}
        />
        <Button
          title="Tìm kiếm"
          rounded="rounded-[8px]"
          background={'bg-button'}
          color="text-neutral"
          margin="m-0"
          padding="py-3 px-5"
          height="h-auto"
          width="w-[138px]"
          textWeight={'sm:text-p18-bold text-p14-bold'}
          onClick={handleSubmitFilter}
          // disabled={isEditing}
        />
      </div>
    </div>
  )
}

FilterModal.propTypes = {}

export default FilterModal
