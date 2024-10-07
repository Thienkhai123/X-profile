import React from 'react'
import ScaleProfile from '../scaleProfile'
import StepProfile from '../stepProfile'

const RequestProfile = (props) => {
  const { roleId = 0, templateForDnd = [] } = props

  const handleSubmitAdd = () => {
    window.location.replace('/applicant-profile')
  }

  const checkTemplateIsActiveIsActive = (e) => {
    if (e?.templateOptionName === 'CareerTarget') {
      if (
        e.isActive === true &&
        e.children[0]?.CareerTargetDescription?.value !== ''
      )
        return true
      else return false
    } else {
      if (e.isActive === true && Object.keys(e?.children).length !== 0)
        return true
      else return false
    }
  }

  const presentComplete = () => {
    const fullfillLength = templateForDnd?.length + 1
    let present = (100 - fullfillLength) / templateForDnd?.length
    const totalPresentIsActive = templateForDnd.filter(
      (e) => checkTemplateIsActiveIsActive(e) === true
    )
    present += Math.floor((totalPresentIsActive?.length / fullfillLength) * 100)
    return present + '%'
  }

  const selectTemplateForDnd = () => {
    const templateIsActive = templateForDnd.filter(
      (e) => checkTemplateIsActiveIsActive(e) === true
    )
    const templateNoActive = templateForDnd.filter(
      (e) => checkTemplateIsActiveIsActive(e) === false
    )
    return [...templateIsActive, ...templateNoActive]
  }

  const hiddenButtonMoreFirst = templateForDnd.find(
    (e) => e?.isActive === false
  )

  return (
    <div className="w-full">
      <div className="w-full pb-[32px]">
        <ScaleProfile
          roleId={roleId}
          precent={presentComplete()}
          templateForDnd={selectTemplateForDnd()}
          checkTemplateIsActiveIsActive={checkTemplateIsActiveIsActive}
        />
      </div>
      <hr
        style={{
          height: '1px',
          backgroundImage:
            'linear-gradient(90deg, #333333, #333333 75%, transparent 75%, transparent 100%)',
          backgroundSize: '20px 1px',
          border: 'none',
          opacity: 0.1
        }}
      />
      <div className="pt-[32px]">
        <StepProfile handleSubmitAdd={handleSubmitAdd} isActive={true} />
        {templateForDnd.map((e, ind) => {
          return (
            <div key={ind}>
              <StepProfile
                title={e?.value}
                description=""
                hiddenMoreFirst={
                  hiddenButtonMoreFirst?.templateOptionId ===
                  e?.templateOptionId
                }
                isActive={checkTemplateIsActiveIsActive(e)}
                handleSubmitAdd={handleSubmitAdd}
                isLineActive={ind !== templateForDnd.length - 1}
                isShowButton={checkTemplateIsActiveIsActive(e)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

RequestProfile.propTypes = {}
RequestProfile.defaultProps = {}

export default RequestProfile
