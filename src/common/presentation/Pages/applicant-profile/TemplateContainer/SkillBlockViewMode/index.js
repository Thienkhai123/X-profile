import React, { useEffect, useState } from 'react'
import XProfileIcon from 'common/presentation/Icons'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectUserSkill } from 'store/app/portfolioSlice'
import SkillItem from '../SkillBlock/SkillItem'
import { Divider } from 'common/presentation/Divider'

const SkillBlockViewMode = (props) => {
  const {
    title,
    skillsAdvanced,
    childrenTemplate,
    dragStyle,
    hiddenDoExamBtn = false
  } = props
  const [userTemplateSkill, setUserTemplateSkill] = useState({
    skills: [],
    ids: [],
    newSkills: []
  })
  const [seeMore, setSeeMore] = useState(false)

  const userSkills = useSelector(selectUserSkill)

  const handleInitValue = () => {
    const tempArr = []
    if (Object?.keys(childrenTemplate)?.length > 0) {
      Object.keys(childrenTemplate).map((childKey, ind) => {
        if (ind < 3) {
          const {
            isActive,
            value,
            templateOptionValueId,
            group,
            templateOptionId,
            parentId,
            templateOptionName,
            templateOptionType
          } = childrenTemplate[childKey]['Skill'] || {}
          if (isNaN(value)) {
            tempArr.push({
              ...childrenTemplate[childKey]['Skill'],
              name: value,
              skillId: value
            })
          } else {
            const findElement = skillsAdvanced.find(
              (s) => s.skillId === parseInt(value)
            )
            tempArr.push({
              ...findElement,
              isActive,
              templateOptionValueId,
              group,
              templateOptionId,
              parentId,
              templateOptionName,
              templateOptionType,
              value
            })
          }
        }
      })
      const tempIds = []
      tempArr.map((el) => {
        if (el.isActive) {
          tempIds.push(el.skillId)
        }
      })

      setUserTemplateSkill({
        skills: [...tempArr],
        ids: [...tempIds],
        newSkills: []
      })
    } else {
      setUserTemplateSkill({
        skills: [],
        ids: [],
        newSkills: []
      })
    }
  }

  const handleSeeMore = () => {
    const tempArr = []
    if (Object?.keys(childrenTemplate)?.length > 0) {
      Object.keys(childrenTemplate).map((childKey, ind) => {
        const {
          isActive,
          value,
          templateOptionValueId,
          group,
          templateOptionId,
          parentId,
          templateOptionName,
          templateOptionType
        } = childrenTemplate[childKey]['Skill'] || {}
        if (isNaN(value)) {
          tempArr.push({
            ...childrenTemplate[childKey]['Skill'],
            name: value,
            skillId: value
          })
        } else {
          const findElement = skillsAdvanced.find(
            (s) => s.skillId === parseInt(value)
          )
          tempArr.push({
            ...findElement,
            isActive,
            templateOptionValueId,
            group,
            templateOptionId,
            parentId,
            templateOptionName,
            templateOptionType,
            value
          })
        }
      })
      const tempIds = []
      tempArr.map((el) => {
        if (el.isActive) {
          tempIds.push(el.skillId)
        }
      })

      setUserTemplateSkill({
        skills: [...tempArr],
        ids: [...tempIds],
        newSkills: []
      })
    } else {
      setUserTemplateSkill({
        skills: [],
        ids: [],
        newSkills: []
      })
    }
    setSeeMore(true)
  }

  useEffect(() => {
    handleInitValue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childrenTemplate])

  return (
    <div className="rounded-xl border-2 border-stoke overflow-hidden bg-white">
      <div
        className="flex sm:px-6 px-3 sm:py-4 py-3 bg-stoke items-center justify-between"
        style={dragStyle}
      >
        <div className="flex items-center gap-1">
          <p className="uppercase sm:text-p18-bold text-p14-bold text-blue-light">
            {title}
          </p>
        </div>
      </div>
      <div className="sm:p-6 p-3 bg-white min-h-[130px]">
        {userTemplateSkill?.skills?.length > 0 &&
          userTemplateSkill.skills?.map((skill, ind) => {
            const { name, isActive, skillId } = skill

            if (isActive) {
              const findExisSkill = userSkills?.find(
                (el) => el?.skillId === skillId
              )
              return (
                <SkillItem
                  key={`skill-active-${ind}`}
                  title={name}
                  editMode={false}
                  hiddenBtn={isNaN(skillId)}
                  percentageComplete={findExisSkill?.percentageComplete || 0}
                  hiddenDoExamBtn={hiddenDoExamBtn}
                />
              )
            }
          })}
        {Object?.keys(childrenTemplate)?.length > 3 && !seeMore && (
          <div className="flex flex-col justify-center">
            <Divider />
            <button
              className="text-button-2 text-p16-bold text-center mt-4"
              onClick={handleSeeMore}
            >
              Xem thêm kỹ năng
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

SkillBlockViewMode.propTypes = {
  id: PropTypes.number,
  parentId: PropTypes.number,
  portfolioId: PropTypes.number,
  title: PropTypes.string,
  btnTitle: PropTypes.string,
  showUploadImage: PropTypes.bool,
  skillsAdvanced: PropTypes.array,
  templateOptions: PropTypes.array,
  childrenTemplate: PropTypes.object,
  dragStyle: PropTypes.object,
  handleDelete: PropTypes.func,
  handleSaveTemplateOption: PropTypes.func,
  handleCreateElement: PropTypes.func,
  handleInAtiveChildrenTemplate: PropTypes.func,
  handleEditingId: PropTypes.func,
  handleRemoveEditingId: PropTypes.func
}

SkillBlockViewMode.defaultProps = {
  id: 0,
  parentId: 0,
  portfolioId: 0,
  title: 'No title',
  btnTitle: '',
  templateOptionName: '',
  showUploadImage: false,
  skillsAdvanced: [],
  templateOptions: [],
  childrenTemplate: {},
  dragStyle: {},
  handleDelete: () => {},
  handleSaveTemplateOption: () => {},
  handleCreateElement: () => {},
  handleInAtiveChildrenTemplate: () => {},
  handleEditingId: () => {},
  handleRemoveEditingId: () => {}
}

export default SkillBlockViewMode
