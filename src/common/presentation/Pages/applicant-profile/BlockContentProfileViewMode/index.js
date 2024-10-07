import EmptyTemplate from '../TemplateContainer/EmptyTemplate'
import TemplateContainerViewMode from '../TemplateContainerViewMode'

const btnTitles = {
  UserCertificate: 'Thêm chứng chỉ',
  UserAchievement: 'Thêm thành tích',
  UserExperience: 'Thêm kinh nghiệm',
  UserSkill: 'Thêm kỹ năng'
}

const checkEmptyTemplateOptionValues = (list = []) => {
  const activeOptions = []
  list.forEach((el) => {
    const { templateOptionId, children, isActive, templateOptionName } =
      el || {}
    if (isActive && Object.keys(children).length > 0) {
      if (templateOptionName === 'CareerTarget') {
        if (children[0]['CareerTargetDescription']['value']?.length > 0) {
          activeOptions.push(templateOptionId)
        }
      } else {
        activeOptions.push(templateOptionId)
      }
    }
  })
  if (activeOptions.length > 0) {
    return true
  } else {
    return false
  }
}

const BlockContentProfileViewMode = ({
  data,
  portfolioId = 0,
  templateOptions = [],
  skillsCommon = [],
  skillsAdvanced = [],
  editingBlockIds = [],
  imageAnotherBlock = null,
  showEditTool = true,
  hiddenDoExamBtn = false,
  languages = []
}) => {
  const isEmptyTemplateOptions = checkEmptyTemplateOptionValues(data)
  if (!isEmptyTemplateOptions) {
    return <EmptyTemplate />
  }
  return (
    <div className="flex flex-col gap-6">
      {data?.map((block, index) => {
        const {
          templateOptionValueId,
          templateOptionId,
          value,
          children,
          templateOptionName,
          isActive
        } = block || {}
        const titleButton = btnTitles[templateOptionName]
        const isHasChildren = children
          ? Object?.keys(children)?.length > 0
          : false
        if (isActive && isHasChildren) {
          return (
            <div key={index}>
              <TemplateContainerViewMode
                id={templateOptionId}
                parentId={templateOptionValueId}
                index={index}
                title={value}
                btnTitle={titleButton}
                portfolioId={portfolioId}
                templateOptionName={templateOptionName}
                skillsCommon={skillsCommon}
                skillsAdvanced={skillsAdvanced}
                templateOptions={templateOptions}
                childrenTemplate={children}
                editingBlockIds={editingBlockIds}
                imageAnotherBlock={imageAnotherBlock}
                showEditTool={showEditTool}
                hiddenDoExamBtn={hiddenDoExamBtn}
                dragStyle={{ background: '#F5F6F7' }}
                languages={languages}
              />
            </div>
          )
        }
      })}
    </div>
  )
}

export default BlockContentProfileViewMode
