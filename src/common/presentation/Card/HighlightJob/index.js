import React, { Fragment } from 'react'
import { HightlightJobPC } from './HightLightJob'
import { HightLightJobMobile } from './HightLightJobMobile'

export const HightlightJobCard = (props) => {
  const {
    isAuthentication,
    job,
    handleAction,
    applied,
    step,
    titleButton,
    handleClickButton,
    disableButton,
    disableTitle,
    showHeart,
    timeRemaining,
    showTimeRemaining = false,
    isTemplate
  } = props
  return (
    <Fragment>
      <div className="hidden sm:block">
        <HightlightJobPC
          showTimeRemaining={showTimeRemaining}
          showHeart={showHeart}
          timeRemaining={timeRemaining}
          titleButton={titleButton}
          handleClickButton={handleClickButton}
          job={job}
          step={step}
          isAuthentication={isAuthentication}
          handleAction={handleAction}
          applied={applied}
          disableButton={disableButton}
          disableTitle={disableTitle}
          isTemplate={isTemplate}
        />
      </div>
      <div className="block sm:hidden">
        <HightLightJobMobile
          titleButton={titleButton}
          handleClickButton={handleClickButton}
          step={step}
          job={job}
          isAuthentication={isAuthentication}
          handleAction={handleAction}
          applied={applied}
          disableButton={disableButton}
        />
      </div>
    </Fragment>
  )
}
