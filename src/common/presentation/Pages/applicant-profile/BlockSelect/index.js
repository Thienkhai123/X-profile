import React, { useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import CareerTargetSelect from './CareerTargetSelect'
import CertificateSelect from './CertificateSelect'
import SkillSelect from './SkillSelect'
import AchievementSelect from './AchievementSelect'
import ExperienceSelect from './ExperienceSelect'
import OtherSelect from './OtherSelect'
import SkillCommonSelect from './SkillCommonSelect'

const BlockSelect = (props) => {
  const { title, status, templateOptionName } = props
  switch (templateOptionName) {
    case 'CareerTarget':
      return <CareerTargetSelect {...props} />
    case 'UserCertificate':
      return <CertificateSelect {...props} />
    case 'UserSkill':
      return <SkillSelect {...props} />
    case 'UserSkillCommon':
      return <SkillCommonSelect {...props} />
    case 'UserAchievement':
      return <AchievementSelect {...props} />
    case 'UserExperience':
      return <ExperienceSelect {...props} />
    case 'Other':
      return <OtherSelect {...props} />
    default:
      return <></>
  }
}

BlockSelect.propTypes = {}
BlockSelect.defaultProps = {
  title: 'Mục Tiêu Nghề Nghiệp',
  status: true,
  templateOptionName: ''
}

export default BlockSelect
