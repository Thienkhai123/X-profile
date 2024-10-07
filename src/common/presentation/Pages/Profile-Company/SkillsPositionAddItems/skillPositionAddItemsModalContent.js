import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import SelectedItem from '../../Jobs/SelectedItem'
import useModal from 'common/hooks/useModal'
import Modal from 'common/presentation/Modal'
import SkillPositionAddNewItemsModalContent from './skillPositionAddNewItemsModalContent'

const SkillPositionAddItemsModalContent = ({
  skillId = 0,
  examList = [],
  toggleModal = () => {},
  titleModal = 'Kỹ năng',
  name = '',
  handleAddNewSkillToOption = () => {},
  hoverBg = 'bg-yellow-bg',
  refOpt,
  inputRef,
  showOpt,
  selectedSkill,
  setShowOpt,
  options,
  companySkillIds,
  optionsNewSkill,
  querySkillByName,
  handleSelectSkill = () => {},
  removeSelectedSkill,
  setSelectedSkill,
  handleAddSkill,
  openAddModal,
  toggleAddModal
}) => {
  const onClickCancel = () => {
    setSelectedSkill([])
    toggleModal()
  }

  return (
    <div>
      {/* <div className="flex justify-end">
        <div className="cursor-pointer" onClick={toggleModal}>
          <XProfileIcon name="cross" stroke="#666666" />
        </div>
      </div> */}
      {/* <p className="text-h2 text-neutral mb-4 text-start">{titleModal}</p> */}

      <div className=" my-[40px]">
        <p className="text-p18 text-neutral mb-2 mt-[16px]">Chọn kỹ năng:</p>

        <div className="flex-1">
          <div className="relative" ref={refOpt}>
            <div
              className={`w-full flex relative justify-between py-[14px] gap-2 px-[24px] items-center border bg-white mt-[8px] border-stoke`}
              onClick={() => setShowOpt(true)}
            >
              <div className=" flex gap-2 flex-wrap w-full items-center">
                {selectedSkill?.map((skill) => {
                  const { skillId, name } = skill
                  return (
                    <SelectedItem
                      key={`selected-${skillId}`}
                      id={skillId}
                      name={name}
                      handleRemoveSelectedItem={() =>
                        removeSelectedSkill(skillId)
                      }
                      style="bg-[#EDC66E] rounded-[8px]"
                      colorText="black"
                      stroke="black"
                    />
                  )
                })}
                <div>
                  <input
                    placeholder="Nhập kỹ năng"
                    className="outline-0 text-p16 text-card-title w-auto"
                    ref={inputRef}
                    onChange={(e) => querySkillByName(e.target.value)}
                  />
                </div>
              </div>

              <XProfileIcon name="arrowDown" />
            </div>

            {showOpt && (
              <div className="bg-white max-h-[180px] p-2 w-full  overflow-x-hidden absolute  border border-stoke custom-scrollbar z-10">
                {options?.map((skill) => {
                  const { skillId, name } = skill
                  const tempIds = companySkillIds?.map((el) => el?.skillId)
                  if (!tempIds.includes(skillId)) {
                    const ids = selectedSkill.map((el) => el.name)
                    return (
                      <div
                        key={skillId}
                        className={`flex justify-between items-center px-[24px]  py-[8px]  ${
                          ids.includes(name)
                            ? 'opacity-40 cursor-auto'
                            : `hover:${hoverBg} cursor-pointer`
                        }`}
                        onClick={() =>
                          !ids.includes(name) &&
                          handleSelectSkill(skillId, name)
                        }
                      >
                        <p>{name}</p>
                        {ids.includes(name) && <XProfileIcon name="check" />}
                      </div>
                    )
                  }
                })}
                {optionsNewSkill?.map((skill) => {
                  const { skillId, name } = skill
                  if (!companySkillIds.includes(skillId)) {
                    const ids = selectedSkill.map((el) => el.name)
                    return (
                      <div
                        key={skillId}
                        className={`flex justify-between items-center px-[24px] hover:${hoverBg} py-[8px] cursor-pointer`}
                        onClick={() => handleSelectSkill(skillId, name)}
                      >
                        <p>{name}</p>
                        {ids.includes(name) && <XProfileIcon name="check" />}
                      </div>
                    )
                  }
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between ">
        <Button
          type="button"
          title="Tạo mới"
          width="w-[136px]"
          margin="m-0"
          height="h-[56px]"
          padding="py-2"
          textWeight={'sm:text-p18-bold text-p14-bold'}
          onClick={toggleAddModal}
          background="bg-white"
          rounded="rounded-[8px] border border-[#CCCCCC]"
        />
        <div className="flex gap-[16px]">
          <Button
            title="Hủy"
            width="w-[99px]"
            margin="m-0"
            padding="py-2"
            background="bg-[#E6E6E6]"
            // color="text-white"
            height="h-[56px]"
            rounded="rounded-[8px]"
            onClick={onClickCancel}
            textWeight={'sm:text-p18-bold text-p14-bold'}
          />
          <Button
            title="Xác nhận"
            width="w-[149px]"
            margin="m-0"
            padding="py-2"
            background="bg-button"
            // color="text-white"
            height="h-[56px]"
            rounded="rounded-[8px]"
            onClick={() => handleAddSkill(selectedSkill)}
            textWeight={'sm:text-p18-bold text-p14-bold'}
          />
        </div>
      </div>
      <Modal
        toggleModal={toggleAddModal}
        open={openAddModal}
        title="Tạo kỹ năng mới"
        styleTitle="text-p28-bold text-neutral"
        childStyle="w-screen h-fit sm:w-[800px] mt-[60px] shadow-md p-[40px] bg-white rounded-lg"
      >
        <SkillPositionAddNewItemsModalContent
          handleAddNewSkillToOption={handleAddNewSkillToOption}
          toggleModal={toggleAddModal}
        />
      </Modal>
    </div>
  )
}

export default SkillPositionAddItemsModalContent
