import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import CertificateBlockViewMode from '../TemplateContainer/CertificateBlockViewMode'
import TargetBlock from '../TemplateContainer/TargetBlock'
import AchievementBlock from '../TemplateContainer/AchievementBlock'
// import SkillCommonBlock from '../TemplateContainer/SkillCommonBlock'
import AnotherBlock from '../TemplateContainer/AnotherBlock'
import SkillBlockViewMode from '../TemplateContainer/SkillBlockViewMode'
// import ExperienceBlockViewMode from '../TemplateContainer/ExperienceBlockViewMode'
import SkillCommonBlockViewMode from '../TemplateContainer/SkillCommonBlockViewMode'
import ExperienceBlock from '../TemplateContainer/ExperienceBlock'
import SkillBlock from '../TemplateContainer/SkillBlock'
import LanguageBlock from '../TemplateContainer/LanguageBlock'
import EducationBlock from '../TemplateContainer/EducationBlock'
import SkillCommonBlock from '../TemplateContainer/SkillCommonBlock'

const TemplateContainerViewMode = (props) => {
  const { templateOptionName } = props
  switch (templateOptionName) {
    case 'CareerTarget':
      return <TargetBlock {...props} />
    case 'UserCertificate':
      return <CertificateBlockViewMode {...props} />
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

TemplateContainerViewMode.propTypes = {
  id: PropTypes.number,
  parentId: PropTypes.number,
  portfolioId: PropTypes.number,
  title: PropTypes.string,
  btnTitle: PropTypes.string,
  showUploadImage: PropTypes.bool,
  showError: PropTypes.bool,
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

TemplateContainerViewMode.defaultProps = {
  id: 0,
  index: null,
  parentId: 0,
  portfolioId: 0,
  title: 'No title',
  btnTitle: '',
  templateOptionName: '',
  showUploadImage: false,
  showError: false,
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

export default TemplateContainerViewMode
