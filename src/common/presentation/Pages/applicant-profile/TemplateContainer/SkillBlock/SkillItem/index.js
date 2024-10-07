import React from 'react'
import XProfileIcon from 'common/presentation/Icons'
import PropTypes from 'prop-types'
import Button from 'common/presentation/Button'
import SkillRange from '../SkillRange'

const SkillItem = (props) => {
  const {
    title,
    skillPoint,
    editMode,
    index,
    handleRemoveSkillItem,
    hiddenBtn = false,
    redirectToExam = () => {},
    percentageComplete = 0,
    hiddenDoExamBtn = false
  } = props
  return (
    <div className="mb-8">
      <div className="sm:flex items-center justify-between ">
        <div className="flex items-end gap-4 flex-wrap">
          <p className="sm:text-p18-bold text-p14-bold">{title}</p>
          {!hiddenBtn && !hiddenDoExamBtn && (
            <div className="ignore-el-pdf">
              <Button
                title="Làm bài kiểm tra năng lực"
                rounded="rounded-[8px]"
                color="text-neutral"
                padding="px-[12px] py-0.5"
                height="h-auto"
                width="w-auto"
                textWeight={'sm:text-p14-bold text-p12-bold '}
                onClick={redirectToExam}
              />
            </div>
          )}
        </div>
        {editMode && (
          <div className="flex items-center gap-3 sm:mt-0 mt-2 sm:justify-start justify-end">
            <div
              className="cursor-pointer ignore-el-pdf"
              onClick={() => handleRemoveSkillItem(index)}
            >
              <XProfileIcon name="trash" />
            </div>
          </div>
        )}
      </div>
      <SkillRange value={percentageComplete} />
    </div>
  )
}

SkillItem.propTypes = {
  title: PropTypes.any,
  skillPoint: PropTypes.number,
  editMode: PropTypes.bool,
  index: PropTypes.number,
  skillId: PropTypes.any,
  editingId: PropTypes.any,
  allSkills: PropTypes.array,
  userSkillIds: PropTypes.array,
  handleEditing: PropTypes.func,
  handleSaveItem: PropTypes.func,
  handleRemoveSkillItem: PropTypes.func,
  handleCancel: PropTypes.func
}
SkillItem.defaultProps = {
  title: '',
  skillPoint: 0,
  editMode: false,
  index: 0,
  skillId: 0,
  editingId: null,
  userSkillIds: [],
  allSkills: [],
  handleEditing: () => {},
  handleSaveItem: () => {},
  handleRemoveSkillItem: () => {},
  handleCancel: () => {}
}

export default SkillItem
