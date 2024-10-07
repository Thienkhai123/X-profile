import {
  AvatarHandDown,
  CareerPathArrow,
  CareerPathCancelButton,
  CareerPathControlBar,
  CareerPathControlBarDetail,
  CareerPathDialog,
  CareerPathInfo
} from 'common/container/career-path'
import { HandDown, HandUp } from 'common/container/career-path/hands'
import {
  CareerMapBackground,
  CareerMapBackgroundCS,
  CareerMapCSItSuport,
  CareerMapCSNetworking,
  CareerMapCSSecurityIntelligence,
  CareerMapCSSoftwareDeveloper,
  CareerMapCSSystemEngineering,
  CareerMapItBa,
  CareerMapItInteractionDesign,
  CareerMapItMain,
  CareerMapItMainCS,
  CareerMapItSoftwareEngineer
} from 'common/container/career-path/maps'
import useCareerMap from 'common/hooks/useCareerMap'
import { Fragment, useEffect, useState } from 'react'
import { CareerPathLayer } from 'common/container/career-path/layer'
import { NavBarCareerPath } from 'common/container/career-path/navBarCareerPath'
import { drawMapCrp } from 'store/helper/drawMapCrp'
import { CareerMapItSoftwareQualityControl } from 'common/container/career-path/maps/it/software-quality-control'

const WrapperCRP = () => {
  const crpState = useCareerMap()
  const { setStep } = crpState
  const [checkFirst, setCheckFirst] = useState(false)
  const [isEndTutorial, setIsEndTutorial] = useState(false)

  useEffect(() => {
    const checkTutorial = () => {
      const tutorialState = localStorage.getItem('tutorial')
      if (tutorialState === 'end') {
        setIsEndTutorial(true)
        setStep(0)
      }
      setCheckFirst(true)
    }
    checkTutorial()
  }, [])

  if (!checkFirst) {
    return <></>
  }
  return (
    <Fragment>
      <DemoCareerMap isEndTutorial={isEndTutorial} crpState={crpState} />
    </Fragment>
  )
}

const RenderMap = ({ name = 'it', current = 'main' }) => {
  if (name === 'it') {
    switch (current) {
      case 'it-main':
        return <CareerMapItMain />
      case 'ba-map-crp':
        return <CareerMapItBa />
      case 'id-map-crp':
        return <CareerMapItInteractionDesign />
      case 'se-map-crp':
        return <CareerMapItSoftwareEngineer />
      case 'sqc-map-crp':
        return <CareerMapItSoftwareQualityControl />
      default:
        return <></>
    }
  } else {
    switch (current) {
      case 'cs-main':
        return <CareerMapItMainCS />
      case 'cs-si-map-crp':
        return <CareerMapCSSecurityIntelligence />
      case 'cs-se-map-crp':
        return <CareerMapCSSystemEngineering />
      case 'cs-sd-map-crp':
        return <CareerMapCSSoftwareDeveloper />
      case 'cs-network-map-crp':
        return <CareerMapCSNetworking />
      case 'cs-is-map-crp':
        return <CareerMapCSItSuport />
      default:
        return <></>
    }
  }
}

const DemoCareerMap = ({ isEndTutorial = false, crpState = {} }) => {
  const {
    step,
    nextStep,
    initMap,
    endTutorial,
    showArrowBtn,
    showCancelBtn,
    completeTutorialUser,
    map,
    changeMap,
    showBackgroundMap,
    hideBackgroundMap
  } = crpState

  useEffect(() => {
    const element = document.getElementById('career-map')
    const height = -(screen.height * 0.22)

    const onPanzoomComplete = () => {
      const elItMain = document.getElementById('it-main')
      if (elItMain) {
        drawMapCrp('it-main')
      }
    }
    if (element) {
      if (!isEndTutorial) {
        initMap({
          element: element,
          config: {
            minScale: 1,
            canvas: true,
            contain: 'outside',
            animate: true,
            disablePan: true,
            startY: height,
            cursor: 'default',
            startX: 3
          },
          onPanzoomComplete: onPanzoomComplete
        })
      } else {
        const handleInitMap = async () => {
          const panzoom = await initMap({
            element: element,
            config: {
              minScale: 1,
              canvas: true,
              contain: 'outside',
              animate: true,
              startY: height,
              cursor: 'move',
              startX: 3
            },
            onPanzoomComplete: onPanzoomComplete
          })
          completeTutorialUser(panzoom)
        }
        handleInitMap()
      }
    }
  }, [])

  return (
    <Fragment>
      <NavBarCareerPath map={map} />

      <div className="w-screen h-screen relative bg-black">
        {step > 0 && step < 6 && (
          <CareerPathInfo
            step={step}
            showArrowBtn={showArrowBtn}
            nextStep={nextStep}
          />
        )}
        <CareerPathArrow onClick={nextStep} />
        <CareerPathDialog onClick={endTutorial} />
        <CareerPathCancelButton onClick={endTutorial} />
        <CareerPathLayer />
        <HandUp />
        <HandDown />
        <CareerPathControlBar
          showBackgroundMap={showBackgroundMap}
          hideBackgroundMap={hideBackgroundMap}
          changeMap={changeMap}
          map={map}
        />
        <CareerPathControlBarDetail
          changeMap={changeMap}
          map={map}
          showBackgroundMap={showBackgroundMap}
          hideBackgroundMap={hideBackgroundMap}
        />
        <AvatarHandDown />
        <div id="career-map">
          <CareerMapBackground />
          <CareerMapBackgroundCS />
          <RenderMap {...map} />
        </div>
      </div>
    </Fragment>
  )
}

export default WrapperCRP
