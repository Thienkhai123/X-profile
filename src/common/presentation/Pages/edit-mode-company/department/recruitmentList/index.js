import React from 'react'
import PropTypes from 'prop-types'
import RecruitmentListEditMode from './recruitmentListEditMode'
import RecruitmentListViewMode from './recruitmentListViewMode'
import BlockEditorContainer from 'common/container/block-editor'

const RecruitmentList = (props) => {
  const {
    departmentId = 0,
    companyId = 0,
    editmode = false,
    profileCompany,
    recruitments = [],
    isAuthentication,
    ownedCompany
  } = props

  return (
    <div>
      <BlockEditorContainer
        editmode={editmode}
        editState={
          <RecruitmentListEditMode
            recruitmentCampaign={recruitments}
            isAuthentication={!ownedCompany && isAuthentication}
            ownedCompany={ownedCompany}
          />
        }
        viewState={
          <RecruitmentListViewMode
            recruitmentCampaign={recruitments}
            isAuthentication={isAuthentication}
            ownedCompany={ownedCompany}
          />
        }
      />
      <div></div>
    </div>
  )
}

RecruitmentList.propTypes = {}

export default RecruitmentList
