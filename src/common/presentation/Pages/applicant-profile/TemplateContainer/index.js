import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import TargetBlock from './TargetBlock'
import CertificateBlock from './CertificateBlock'
import SkillBlock from './SkillBlock'
import AchievementBlock from './AchievementBlock'
import ExperienceBlock from './ExperienceBlock'
import AnotherBlock from './AnotherBlock'
import SkillCommonBlock from './SkillCommonBlock'
import LanguageBlock from './LanguageBlock'
import EducationBlock from './EducationBlock'

const TemplateContainer = (props) => {
  const { templateOptionName } = props
  switch (templateOptionName) {
    case 'CareerTarget':
      return <TargetBlock {...props} />
    case 'UserCertificate':
      return <CertificateBlock {...props} />
    case 'UserSkill':
      return <SkillBlock {...props} />
    case 'UserAchievement':
      return <AchievementBlock {...props} />
    case 'UserExperience':
      return <ExperienceBlock {...props} />
    case 'UserSkillCommon':
      return <SkillCommonBlock {...props} />
    case 'Other':
      return <AnotherBlock {...props} />
    case 'UserLanguage':
      return <LanguageBlock {...props} />
    case 'UserEducation':
      return <EducationBlock {...props} />
    default:
      return <Fragment></Fragment>
  }
}

TemplateContainer.propTypes = {
  id: PropTypes.number,
  parentId: PropTypes.number,
  portfolioId: PropTypes.number,
  title: PropTypes.string,
  btnTitle: PropTypes.string,
  showUploadImage: PropTypes.bool,
  showError: PropTypes.bool,
  isActive: PropTypes.bool,
  templateOptions: PropTypes.array,
  skillList: PropTypes.array,
  childrenTemplate: PropTypes.object,
  dragStyle: PropTypes.any,
  editingBlockIds: PropTypes.array,
  handleDelete: PropTypes.func,
  handleSaveTemplateOption: PropTypes.func,
  handleCreateElement: PropTypes.func,
  handleInAtiveChildrenTemplate: PropTypes.func,
  handleEditingId: PropTypes.func,
  handleRemoveEditingId: PropTypes.func,
  handleOffShowError: PropTypes.func
}

TemplateContainer.defaultProps = {
  id: 0,
  index: null,
  parentId: 0,
  portfolioId: 0,
  title: 'No title',
  btnTitle: '',
  templateOptionName: '',
  showUploadImage: false,
  showError: false,
  isActive: true,
  skillList: [],
  templateOptions: [],
  editingBlockIds: [],
  childrenTemplate: {},
  dragStyle: {},
  imageAnotherBlock: null,
  handleDelete: () => {},
  handleSaveTemplateOption: () => {},
  handleCreateElement: () => {},
  handleInAtiveChildrenTemplate: () => {},
  handleEditingId: () => {},
  handleRemoveEditingId: () => {},
  handleUploadImageLocal: () => {},
  handleOffShowError: () => {}
}

export default TemplateContainer
