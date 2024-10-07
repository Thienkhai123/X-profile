import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import ExperienceItem from '../ExperienceBlock/ExperienceItem'
import { Divider } from 'common/presentation/Divider'

const ExperienceBlockViewMode = (props) => {
  const { title, childrenTemplate, dragStyle } = props
  const [templateActive, setTemplateActive] = useState(null)
  const [seeMore, setSeeMore] = useState(false)

  const getInitialData = () => {
    if (Object?.keys(childrenTemplate)?.length > 0) {
      const tempObj = {}
      Object.keys(childrenTemplate)?.map((key, ind) => {
        if (ind < 3) {
          const { isActive } = childrenTemplate[key]['Title'] || {}
          if (isActive) {
            tempObj[key] = childrenTemplate[key]
          }
        }
      })
      setTemplateActive({ ...tempObj })
    } else {
      setTemplateActive({})
    }
  }
  const handleSeeMore = () => {
    if (Object?.keys(childrenTemplate)?.length > 0) {
      const tempObj = {}
      Object.keys(childrenTemplate)?.map((key, ind) => {
        const { isActive } = childrenTemplate[key]['Title'] || {}
        if (isActive) {
          tempObj[key] = childrenTemplate[key]
        }
      })
      setTemplateActive({ ...tempObj })
    } else {
      setTemplateActive({})
    }
    setSeeMore(true)
  }

  useEffect(() => {
    getInitialData()
  }, [childrenTemplate])

  return (
    <div className=" rounded-xl border-2 border-stoke overflow-hidden bg-white">
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
      <div className="sm:p-6 p-3 bg-white min-h-[130px]  flex flex-col gap-4">
        {templateActive &&
          Object.keys(templateActive)?.map((key, ind) => {
            const { value: TimeOfExp, isActive } =
              templateActive[key]['TimeOfExp'] || {}
            const { value: UnitOfTime } =
              templateActive[key]['UnitOfTime'] || {}
            const { value: Title } = templateActive[key]['Title'] || {}
            const { value: SubTitle } = templateActive[key]['SubTitle'] || {}
            const { value: Time } = templateActive[key]['Time'] || {}
            const { value: Description } =
              templateActive[key]['Description'] || {}
            if (isActive) {
              return (
                <div key={`current-${ind}`}>
                  <ExperienceItem
                    group={key}
                    TimeOfExp={TimeOfExp}
                    UnitOfTime={UnitOfTime}
                    Title={Title}
                    SubTitle={SubTitle}
                    Time={Time}
                    Description={Description}
                    editMode={false}
                    showHidden={false}
                    showEditTool={false}
                  />
                </div>
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
              Xem thêm kinh nghiệm
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

ExperienceBlockViewMode.propTypes = {
  id: PropTypes.number,
  parentId: PropTypes.number,
  portfolioId: PropTypes.number,
  title: PropTypes.string,
  btnTitle: PropTypes.string,
  showUploadImage: PropTypes.bool,
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
ExperienceBlockViewMode.defaultProps = {
  id: 0,
  parentId: 0,
  portfolioId: 0,
  title: 'No title',
  btnTitle: '',
  templateOptionName: '',
  showUploadImage: false,
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

export default ExperienceBlockViewMode
