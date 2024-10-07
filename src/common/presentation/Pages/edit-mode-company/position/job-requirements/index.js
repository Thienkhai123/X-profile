import BlockEditorContainer from 'common/container/block-editor'
import JobRequirementsPositionEditMode from './jobRequirementsPositionEditMode'
import JobRequirementsPositionViewMode from './jobRequirementsPositionViewMode'
import { selectInitSatePosition } from 'store/app/edit-mode-company/position/bannerSlice'
import { useSelector } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import { useEffect, useState } from 'react'

const JobRequirementsPositionEdit = (props) => {
  const {
    pageEditMode = false,
    errors = null,
    handleResetErrors = () => {},
    showPreview,
    valuePreview
  } = props

  const { profile } = useSelector(selectInitSatePosition)

  return (
    <div className="bg-white relative">
      <BlockEditorContainer
        editmode={pageEditMode}
        editState={
          <JobRequirementsPositionEditMode
            content={
              valuePreview !== '' ? valuePreview : profile?.meta?.requirement
            }
            errors={errors}
            handleResetErrors={handleResetErrors}
          />
        }
        viewState={
          <JobRequirementsPositionViewMode
            content={
              valuePreview !== '' ? valuePreview : profile?.meta?.requirement
            }
          />
        }
        showBlock={
          showPreview
            ? !isEmpty(valuePreview)
            : !isEmpty(profile?.meta?.requirement)
        }
      />
    </div>
  )
}

export default JobRequirementsPositionEdit
