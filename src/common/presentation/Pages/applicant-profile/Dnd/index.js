import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import TemplateContainer from '../TemplateContainer'

const DragDropContext = dynamic(
  () => import('react-beautiful-dnd').then((mod) => mod.DragDropContext),
  { ssr: false }
)
const Droppable = dynamic(
  () => import('react-beautiful-dnd').then((mod) => mod.Droppable),
  { ssr: false }
)
const Draggable = dynamic(
  () => import('react-beautiful-dnd').then((mod) => mod.Draggable),
  { ssr: false }
)

const btnTitles = {
  UserCertificate: 'Thêm chứng chỉ',
  UserAchievement: 'Thêm thành tích',
  UserExperience: 'Thêm kinh nghiệm',
  UserSkill: 'Thêm kỹ năng'
}

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const getItemStyle = (isDragging) => ({
  // change background colour if dragging
  background: isDragging ? '#FBECCA' : '#F5F6F7'
})

const DNDComponent = ({
  data,
  modify = false,
  portfolioId = 0,
  templateOptions = [],
  skillsCommon = [],
  skillsAdvanced = [],
  languages = [],
  editingBlockIds = [],
  showError = false,
  imageAnotherBlock = null,
  openModal = false,
  showEditTool = true,
  loadingBlock = false,
  loadingPrivacy,
  sortBlockPosition = () => {},
  handleDelete = () => {},
  handleSaveTemplateOption = () => {},
  handleCreateElement = () => {},
  handleInAtiveChildrenTemplate = () => {},
  handleUploadImageLocal = () => {},
  handleEditingId = () => {},
  handleRemoveEditingId = () => {},
  handleOffShowError = () => {}
}) => {
  const [listBlock, setListBlock] = useState([])

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(
      listBlock,
      result.source.index,
      result.destination.index
    )
    const dragItemIds = items.map((el) => el.templateOptionId)
    const currentIds = listBlock.map((el) => el.templateOptionId)

    if (dragItemIds.toString() !== currentIds.toString()) {
      setListBlock(items)
      sortBlockPosition(items)
    }
  }

  useEffect(() => {
    setListBlock(data)
    return () => {}
  }, [data])

  return (
    <div key={`dnd-${modify}`}>
      <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
        <Droppable
          droppableId="droppable"
          isDropDisabled={editingBlockIds.length > 0}
          style={{ padding: 0 }}
        >
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {listBlock?.map((block, index) => {
                const {
                  templateOptionValueId,
                  templateOptionId,
                  value,
                  children,
                  templateOptionName,
                  isActive
                } = block || {}
                const titleButton = btnTitles[templateOptionName]
                const [userSkillCommon] = listBlock?.filter(
                  (el) => el?.templateOptionName === 'UserSkillCommon'
                )
                return (
                  <Draggable
                    key={`item-${block?.templateOptionId}`}
                    draggableId={`item-${block?.templateOptionId}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        // className={`${!block?.isActive && 'hidden'} mb-6`}
                        className="mb-6"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TemplateContainer
                          id={templateOptionId}
                          index={index}
                          parentId={templateOptionValueId}
                          title={value}
                          btnTitle={titleButton}
                          portfolioId={portfolioId}
                          templateOptionName={templateOptionName}
                          isActive={isActive}
                          skillsCommon={skillsCommon}
                          skillsAdvanced={skillsAdvanced}
                          languages={languages}
                          templateOptions={templateOptions}
                          childrenTemplate={children}
                          editingBlockIds={editingBlockIds}
                          showError={showError}
                          imageAnotherBlock={imageAnotherBlock}
                          openModal={openModal}
                          showEditTool={showEditTool}
                          dragStyle={getItemStyle(snapshot.isDragging)}
                          handleDelete={handleDelete}
                          handleSaveTemplateOption={handleSaveTemplateOption}
                          handleCreateElement={handleCreateElement}
                          handleInAtiveChildrenTemplate={
                            handleInAtiveChildrenTemplate
                          }
                          handleEditingId={handleEditingId}
                          handleRemoveEditingId={handleRemoveEditingId}
                          handleUploadImageLocal={handleUploadImageLocal}
                          handleOffShowError={handleOffShowError}
                          userSkillCommon={userSkillCommon?.children}
                          userSkillCommonId={userSkillCommon.templateOptionId}
                          userSkillCommonParentId={
                            userSkillCommon.templateOptionValueId
                          }
                          loadingBlock={loadingBlock}
                          loadingPrivacy={loadingPrivacy}
                        />
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default DNDComponent
