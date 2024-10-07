import BreadCrumbs from 'common/presentation/breadCrumbs'
import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { Fragment, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import {
  selectProSkillsSelected,
  updateCompanyProfessionalSkills,
  updateProSkillsSelected
} from 'store/app/edit-mode-company/position/professionalSkillSlice'
import {
  selectSoftSkillsSelected,
  updateCompanySkills,
  updateSoftSkillsSelected
} from 'store/app/edit-mode-company/position/softSkillSlice'

const RadarEditModal = (props) => {
  const { softSkills = [], proSkills = [], toggleModal = () => {} } = props
  const softSkillsSelected = useSelector(selectSoftSkillsSelected)
  const proSkillsSelected = useSelector(selectProSkillsSelected)

  const dispatch = useDispatch()
  const handleSoftSkillsSelect = (e) => {
    const arr = [...softSkillsSelected]
    const value = parseInt(e.target.value)
    const index = arr.findIndex((skill) => skill === value)
    if (index > -1) {
      arr = [...arr.slice(0, index), ...arr.slice(index + 1)]
    } else {
      arr.push(value)
    }
    dispatch(updateSoftSkillsSelected(arr))
  }
  const handleClickSave = () => {
    const newSoftSkills = [...softSkills]
    const newProSkills = [...proSkills]
    newSoftSkills?.forEach((softSkill, index) => {
      if (softSkillsSelected?.includes(softSkill?.skillId)) {
        newSoftSkills[index] = { ...softSkill, isDisplayChart: true }
      } else {
        newSoftSkills[index] = { ...softSkill, isDisplayChart: false }
      }
    })
    newProSkills?.forEach((proSkill, index) => {
      if (proSkillsSelected?.includes(proSkill?.skillId)) {
        newProSkills[index] = { ...proSkill, isDisplayChart: true }
      } else {
        newProSkills[index] = { ...proSkill, isDisplayChart: false }
      }
    })
    dispatch(updateCompanySkills(newSoftSkills))
    dispatch(updateCompanyProfessionalSkills(newProSkills))

    toggleModal()
  }

  const handleProSkillsSelect = (e) => {
    var arr = [...proSkillsSelected]
    const value = parseInt(e.target.value)
    const index = arr.findIndex((skill) => skill === value)
    if (index > -1) {
      arr = [...arr.slice(0, index), ...arr.slice(index + 1)]
    } else {
      arr.push(value)
    }
    dispatch(updateProSkillsSelected(arr))
  }
  return (
    <div className="">
      {/* <div className="flex justify-between items-center"> */}
      {/* <p className="text-h3 text-neutral">Chọn hiển thị các kỹ năng</p> */}
      {/* <div onClick={() => toggleModal()} className="cursor-pointer">
          <XProfileIcon name="cross" stroke="#000000" />
        </div> */}
      {/* </div> */}
      <div className="mt-8 ">
        <p className="text-p18">Chọn tối thiểu 3 kỹ năng, tối đa 6 kỹ năng</p>
      </div>
      <div className="max-h-[44vh] overflow-y-auto custom-scrollbar my-[40px]">
        <div className="my-4">
          <div className="flex justify-between items-center">
            <p className="text-p18-bold">Kỹ năng chung</p>
            {/* <p className="text-p18 text-blue-light">{`Đã chọn ${softSkillsSelected?.length}/3`}</p> */}
          </div>
          <div className="mt-6 grid grid-cols-3">
            {softSkills?.map((softSkill, index) => {
              const { name, skillId } = softSkill
              return (
                <label key={index} className="mb-6 w-fit flex gap-6">
                  <div className=" relative w-fit h-fit">
                    <input
                      type="checkbox"
                      value={skillId}
                      onChange={(e) => handleSoftSkillsSelect(e)}
                      defaultChecked={softSkillsSelected?.includes(
                        parseInt(skillId)
                      )}
                      className="appearance-none block w-6 h-6 accent-button bg-white border peer checked:bg-button border-grey-4 rounded"
                    />
                    <div className="absolute top-0 w-full h-full flex items-center justify-center  opacity-0 peer-checked:opacity-100">
                      <XProfileIcon
                        name="quizCheck"
                        width="9.38"
                        height="7.88"
                      />
                    </div>
                  </div>
                  <p className="text-p18">{name}</p>
                </label>
              )
            })}
          </div>
        </div>
        <div className="mt-6 mb-4">
          <div className="flex justify-between items-center">
            <p className="text-p18-bold">Kỹ năng chuyên môn</p>
            {/* <p className="text-p18 text-blue-light">{`Đã chọn ${proSkillsSelected?.length}/3`}</p> */}
          </div>
          <div className="mt-6 grid grid-cols-3">
            {proSkills?.map((proSkill, index) => {
              const { name, skillId } = proSkill
              return (
                <label key={index} className=" w-fit flex gap-6">
                  <div className=" relative w-fit h-fit">
                    <input
                      type="checkbox"
                      value={skillId}
                      onChange={(e) => handleProSkillsSelect(e)}
                      defaultChecked={proSkillsSelected?.includes(
                        parseInt(skillId)
                      )}
                      className="appearance-none block w-6 h-6 accent-button bg-white border peer checked:bg-button border-grey-4 rounded"
                    />
                    <div className="absolute top-0 w-full h-full flex items-center justify-center  opacity-0 peer-checked:opacity-100">
                      <XProfileIcon
                        name="quizCheck"
                        width="9.38"
                        height="7.88"
                      />
                    </div>
                  </div>
                  <p className="text-p18">{name}</p>
                </label>
              )
            })}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-p18 text-blue-light">{`Đã chọn ${
            proSkillsSelected?.length + softSkillsSelected?.length
          }/6`}</p>
        </div>
        <div className="flex justify-end items-center gap-4">
          <Button
            title="Huỷ"
            width="xl:w-[98px]"
            rounded="rounded-[8px]"
            padding="p-[12px_32px]"
            height="h-[56px]"
            background="bg-grey-4"
            onClick={() => toggleModal()}
          />
          <Button
            title="Xác nhận"
            width="xl:w-[152px]"
            rounded="rounded-[8px]"
            padding="p-[12px_32px]"
            height="h-[56px]"
            onClick={() => handleClickSave()}
            disabled={
              proSkillsSelected?.length + softSkillsSelected?.length < 3 ||
              proSkillsSelected?.length + softSkillsSelected?.length > 6
            }
          />
        </div>
      </div>
    </div>
  )
}

RadarEditModal.propTypes = {
  toggleModal: PropTypes.func
}

RadarEditModal.defaultProps = {
  toggleModal: () => {}
}

export default RadarEditModal
