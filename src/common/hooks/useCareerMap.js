import { useState } from 'react'
import Panzoom from '@panzoom/panzoom'
import { delay } from 'store/helper/functionHelper'
import { drawMapCrp } from 'store/helper/drawMapCrp'
import { LG_SCREEN } from 'common/config/app.constants'

const useCareerMap = () => {
  const [step, setStep] = useState(1)
  const [map, setMap] = useState({
    name: 'it', // 'anm'| 'it'
    current: 'it-main' // 'ba' | 'id' | 'sqc' | 'se' | 'it-main'
  })
  const [panState, setPanState] = useState(null)

  const changeMap = async (info) => {
    const { current } = info || {}
    setMap({ ...info }) // change state info map
    const zoomOutDetailCrp = document.getElementById('zoomOut-detail-crp') // get zoom out btn detail map
    zoomOutDetailCrp.click() // click button to zoom out
    hideControlBarDetail() // hide control bar of detail map
    showControlBar() // show control bar of main map
    hideBorderControlBar() // hide border outline control bar of main map
    await delay(500) // wait for map element add to root document
    drawMapCrp(current) // draw map with top,left,width,height properties base on screen size
    enablePointerEventForIds() // add event listenter (hover, click,...) to area Ba, Interaction design,...
  }

  const changeMapDetail = async (info) => {
    const { current } = info || {}
    setMap({ ...info }) // change state info map
    const zoomOutCrp = document.getElementById('zoomOut-crp') // get zoom out btn
    zoomOutCrp.click() // click button to zoom out
    hideControlBar() // hide main control bar
    showControlBarDetail() //show control bar for detail map
    await delay(500) // wait for map element add to root document
    drawMapCrp(current) // visible map and set properties for map
  }

  const hideBackgroundMap = (id = '') => {
    // id = "crp-it-bg" | "crp-cs-bg"
    if (id) {
      document.getElementById(id).style.display = 'none'
    }
  }

  const showBackgroundMap = (id = '') => {
    // id = "crp-it-bg" | "crp-cs-bg"
    if (id) {
      document.getElementById(id).style.display = 'block'
    }
  }

  const getPropertiesById = (id = null) => {
    if (id) {
      const el = document.getElementById(id)
      const thisClientRect = el.getBoundingClientRect()
      const top = thisClientRect.top // get offsetTop of element
      const left = thisClientRect.left // get offsetLeft of element
      const width = thisClientRect.width // get width of element
      const height = thisClientRect.height // get height of element
      return {
        top,
        left,
        width,
        height
      }
    }
  }

  const hideInfo = () => {
    document.getElementById('info-crp').style.display = 'none' // hide dialog text tutorial
  }

  const showLayer = ({ top = 0, left = 0, width = 0, height = 0 }) => {
    const ws = screen.width
    let el = document.getElementById('layer-crp')
    el.style.display = 'block'
    el.style.width = width + ws * 0.02 + 'px'
    el.style.height = height + ws * 0.02 + 'px'
    el.style.boxShadow = `0px 0px 0px 0px rgba(0,0,0,0.7) inset, 0px 0px 0px ${ws}px rgba(0,0,0,0.7)`
    el.style.top = top - ws * 0.01 + 'px'
    el.style.left = left - ws * 0.01 + 'px'
  }

  const showFullLayer = () => {
    const ws = screen.width
    let el = document.getElementById('layer-crp')
    el.style.display = 'block'
    el.style.border = 'none'
    el.style.width = 0 + 'px'
    el.style.boxShadow = `0px 0px 0px 0px rgba(0,0,0,0.7) inset, 0px 0px 0px ${ws}px rgba(0,0,0,0.7)`
    el.style.top = 0 + 'px'
    el.style.left = 0 + 'px'
    if (screen.width >= LG_SCREEN) {
      el.style.height = 0 + 'px'
    } else {
      el.style.height = '100%'
    }
  }

  const hideLayer = () => {
    document.getElementById('layer-crp').style.display = 'none'
  }

  const showHandUp = ({
    width = 0,
    height = 0,
    top = 0,
    left = 0,
    flip = false
  }) => {
    let el = document.getElementById('hand-up-crp')
    el.style.display = 'block'
    el.style.width = width + 'px'
    el.style.height = height + 'px'
    el.style.top = top + 'px'
    el.style.left = left + 'px'
    if (flip) {
      el.classList.add('-scale-x-100')
    } else {
      if (el.classList.contains('-scale-x-100')) {
        el.classList.remove('-scale-x-100')
      }
    }
  }

  const hideHandUp = () => {
    document.getElementById('hand-up-crp').style.display = 'none'
  }

  const showHandDown = ({
    width = 0,
    height = 0,
    top = 0,
    left = 0,
    flip = false
  }) => {
    let el = document.getElementById('hand-down-crp')
    el.style.display = 'block'
    el.style.width = width + 'px'
    el.style.height = height + 'px'
    el.style.top = top + 'px'
    el.style.left = left + 'px'
    if (flip) {
      el.classList.add('-scale-x-100')
    }
  }

  const hideHandDown = () => {
    document.getElementById('hand-down-crp').style.display = 'none'
  }

  const showAvatarHandDown = ({ top = 0, left = 0, flip = false }) => {
    let el = null
    if (screen.width >= LG_SCREEN) {
      el = document.getElementById('avatar-hand-down-crp')
    } else {
      el = document.getElementById('avatar-hand-down-crp-mobile')
    }
    el.style.display = 'block'
    el.style.top = top + 'px'
    el.style.left = left + 'px'
    if (flip) {
      el.classList.add('-scale-x-100')
    }
  }

  const hideAvatarHandDown = () => {
    if (screen.width >= LG_SCREEN) {
      document.getElementById('avatar-hand-down-crp').style.display = 'none'
    } else {
      document.getElementById('avatar-hand-down-crp-mobile').style.display =
        'none'
    }
  }

  const showArrowBtn = () => {
    if (screen.width >= LG_SCREEN) {
      // DESKTOP
      const el = document.getElementById('arrow-btn-crp')
      el.classList.remove('hidden')
      el.classList.remove('lg:hidden')
      el.classList.add('animate-fadeIn2')
      el.classList.add('h-auto')
    } else {
      // MOBILE
      const el = document.getElementById('arrow-btn-crp-mobile')
      el.classList.remove('hidden')
    }
  }

  const hideArrowBtn = () => {
    if (screen.width >= LG_SCREEN) {
      // DESKTOP
      const el = document.getElementById('arrow-btn-crp')
      el.classList.add('hidden')
    } else {
      // MOBILE
      const el = document.getElementById('arrow-btn-crp-mobile')
      el.classList.add('hidden')
    }
  }

  const showCancelBtn = () => {
    const el = document.getElementById('cancel-btn-crp')
    el.classList.remove('hidden')
    el.classList.add('animate-fadeIn2')
    el.classList.add('h-auto')
  }

  const showCancelBtnMobile = () => {
    const el = document.getElementById('dialog-crp-next-step')
    el.classList.remove('hidden')
  }

  const hideCancelBtn = () => {
    const el = document.getElementById('cancel-btn-crp')
    el.classList.add('hidden')
  }

  const showDialog = ({ top = 0, left = 0 }) => {
    const el = document.getElementById('dialog-crp')
    el.style.display = 'block'
    el.style.top = top + 'px'
    el.style.left = left + 'px'
  }

  const hideDialog = () => {
    document.getElementById('dialog-crp').style.display = 'none'
  }

  const showContentAnimation = async () => {
    let i = 0
    const content = `Hãy khám phá tiếp ngành <strong>Công nghệ phần mềm</strong> theo cách của bạn. Ngoài ra bạn có thể chọn bản đồ để xem những nghề khác ở đây nha!`

    if (screen.width >= LG_SCREEN) {
      await new Promise((resolve) => {
        let consoleTyper = setInterval(function () {
          if (i != content.length) {
            i += 1
            let el = document.getElementById('dialog-crp-content')
            el.innerHTML = content.substring(0, i)
          } else {
            clearInterval(consoleTyper)
            resolve()
          }
        }, 5)
      }).then(() => {
        showCancelBtn()
      })
    } else {
      let el = document.getElementById('dialog-crp-content')
      el.innerHTML = content
      showCancelBtnMobile()
    }
  }

  const showControlBar = () => {
    document.getElementById('control-bar-crp').style.display = 'block'
    let firstChild = null
    if (screen.width >= LG_SCREEN) {
      // DESKTOP
      firstChild = document.getElementById('control-bar-it-crp')
    } else {
      // MOBILE
      firstChild = document.getElementById('control-bar-it-crp-mobile')
    }
    firstChild.style.outline = '1px solid #F6BB3A'
    firstChild.style.borderRadius = '16px'
    firstChild.classList.add('pointer-events-none')
  }

  const hideControlBar = () => {
    document.getElementById('control-bar-crp').style.display = 'none'
  }

  const hideBorderControlBar = () => {
    if (screen.width >= LG_SCREEN) {
      // DESKTOP
      document.getElementById('control-bar-it-crp').style.outline = 'none'
    } else {
      // MOBILE
      document.getElementById('control-bar-it-crp-mobile').style.outline =
        'none'
    }
  }

  const showControlBarDetail = () => {
    document.getElementById('control-bar-detail-crp').style.display = 'block'
  }

  const hideControlBarDetail = () => {
    document.getElementById('control-bar-detail-crp').style.display = 'none'
  }

  const addEventControlBar = (pz = null) => {
    const zoomInCrp = document.getElementById('zoomIn-crp')
    const zoomOutCrp = document.getElementById('zoomOut-crp')
    const zoomInDetailCrp = document.getElementById('zoomIn-detail-crp')
    const zoomOutDetailCrp = document.getElementById('zoomOut-detail-crp')
    let controlBar = null
    if (screen.width >= LG_SCREEN) {
      controlBar = document.getElementById('control-bar-it-crp')
    } else {
      controlBar = document.getElementById('control-bar-it-crp-mobile')
    }

    if (pz === null) {
      if (screen.width >= LG_SCREEN) {
        zoomInCrp.addEventListener('click', () => {
          panState.zoom(2, { animate: true })
        })
        zoomOutCrp.addEventListener('click', () => {
          panState.zoom(0, { animate: true })
        })
        zoomInDetailCrp.addEventListener('click', () => {
          panState.zoom(2, { animate: true })
        })
        zoomOutDetailCrp.addEventListener('click', () => {
          panState.zoom(0, { animate: true })
        })
      } else {
        zoomInCrp.addEventListener('click', () => {
          panState.zoom(3, { animate: true })
        })
        zoomOutCrp.addEventListener('click', () => {
          panState.zoom(0, { animate: true })
        })
        zoomInDetailCrp.addEventListener('click', () => {
          panState.zoom(3, { animate: true })
        })
        zoomOutDetailCrp.addEventListener('click', () => {
          panState.zoom(0, { animate: true })
        })
      }
    } else {
      if (screen.width >= LG_SCREEN) {
        zoomInCrp.addEventListener('click', () => {
          pz.zoom(2, { animate: true })
        })
        zoomOutCrp.addEventListener('click', () => {
          pz.zoom(0, { animate: true })
        })
        zoomInDetailCrp.addEventListener('click', () => {
          pz.zoom(2, { animate: true })
        })
        zoomOutDetailCrp.addEventListener('click', () => {
          pz.zoom(0, { animate: true })
        })
      } else {
        zoomInCrp.addEventListener('click', () => {
          pz.zoom(3, { animate: true })
        })
        zoomOutCrp.addEventListener('click', () => {
          pz.zoom(0, { animate: true })
        })
        zoomInDetailCrp.addEventListener('click', () => {
          pz.zoom(3, { animate: true })
        })
        zoomOutDetailCrp.addEventListener('click', () => {
          pz.zoom(0, { animate: true })
        })
      }
    }

    controlBar.classList.remove('pointer-events-none')
    controlBar.classList.add('pointer-events-auto')
  }

  const enablePointerEventForIds = () => {
    const childMaps = [
      {
        id: '_1-ba',
        parent: 'it',
        value: 'ba-map-crp'
      },
      {
        id: '_2-interaction-design',
        parent: 'it',
        value: 'id-map-crp'
      },
      {
        id: '_3-software-engineering',
        parent: 'it',
        value: 'se-map-crp'
      },
      {
        id: '_4-quality-control',
        parent: 'it',
        value: 'sqc-map-crp'
      },
      {
        id: '_1-security-intelligence',
        parent: 'cs',
        value: 'cs-si-map-crp'
      },
      {
        id: '_2-system-engineering',
        parent: 'cs',
        value: 'cs-se-map-crp'
      },
      {
        id: '_3-software-developer',
        parent: 'cs',
        value: 'cs-sd-map-crp'
      },
      {
        id: '_4-networking',
        parent: 'cs',
        value: 'cs-network-map-crp'
      },
      {
        id: '_5-it-support',
        parent: 'cs',
        value: 'cs-is-map-crp'
      }
    ]

    childMaps.forEach((childMap) => {
      const { id, parent, value } = childMap || {}
      let thisEl = document.getElementById(id)
      if (thisEl) {
        thisEl.classList.remove('pointer-events-none')
        thisEl.classList.add('pointer-events-auto')
        thisEl.addEventListener('click', () =>
          changeMapDetail({
            name: parent,
            current: value
          })
        )
      }
    })
  }

  const endTutorial = () => {
    panState.setOptions({
      disablePan: false,
      cursor: 'move'
    })
    addEventControlBar()
    hideBorderControlBar()
    hideCancelBtn()
    hideHandDown()
    hideLayer()
    hideDialog()
    hideAvatarHandDown()
    enablePointerEventForIds()
    localStorage.setItem('tutorial', 'end')
  }

  const completeTutorialUser = (panzoom) => {
    showControlBar()
    hideBorderControlBar()
    addEventControlBar(panzoom)
    enablePointerEventForIds()
  }

  const nextStep = () => {
    if (map.name === 'it') {
      switch (step) {
        case 1:
          hideArrowBtn()
          const ba = getPropertiesById('_1-ba')
          showLayer({ ...ba })
          if (screen.width >= LG_SCREEN) {
            // DESKTOP
            showHandDown({
              top: ba.top - screen.width * 0.082,
              left: ba.left - screen.width * 0.078,
              width: screen.width * 0.083,
              height: screen.width * 0.083
            })
          } else {
            // MOBILE
            showHandDown({
              top: ba.top - ba.height * (80 / 134) - 16,
              left: ba.left - ba.width * (31 / 134),
              width: ba.width * 0.597,
              height: ba.height * 0.597
            })
          }
          setStep(step + 1)
          break
        case 2:
          hideArrowBtn()
          setStep(step + 1)
          const design = getPropertiesById('_2-interaction-design')
          showLayer({ ...design })
          if (screen.width >= LG_SCREEN) {
            // DESKTOP
            showHandDown({
              top: design.top - screen.width * 0.082,
              left: design.left - screen.width * 0.078,
              width: screen.width * 0.083,
              height: screen.width * 0.083
            })
          } else {
            // MOBILE
            showHandDown({
              top: design.top - design.height * (80 / 134) - 16,
              left: design.left + design.width - design.width * (31 / 134) - 3,
              width: design.width * 0.597,
              height: design.height * 0.597,
              flip: true
            })
          }

          break
        case 3:
          hideArrowBtn()
          setStep(step + 1)
          const se = getPropertiesById('_3-software-engineering')
          hideHandDown()
          showLayer({ ...se })
          if (screen.width >= LG_SCREEN) {
            // DESKTOP
            showHandUp({
              width: screen.width * 0.083,
              height: screen.width * 0.083,
              top: se.top + screen.width * 0.06,
              left: se.left - screen.width * 0.105
            })
          } else {
            // MOBILE
            showHandUp({
              top: se.top + se.height - 16,
              left: se.left + se.width - se.width * (31 / 134) - 3,
              width: se.width * 0.597,
              height: se.height * 0.597,
              flip: true
            })
          }
          break
        case 4:
          hideArrowBtn()
          setStep(step + 1)
          const qc = getPropertiesById('_4-quality-control')
          showLayer({ ...qc })
          if (screen.width >= LG_SCREEN) {
            // DESKTOP
            showHandUp({
              width: screen.width * 0.083,
              height: screen.width * 0.083,
              top: qc.top + screen.width * 0.06,
              left: qc.left - screen.width * 0.105
            })
          } else {
            // MOBILE
            showHandUp({
              top: qc.top + qc.height - 16,
              left: qc.left - screen.width * 0.078,
              width: qc.width * 0.597,
              height: qc.height * 0.597
            })
          }

          break
        case 5:
          hideArrowBtn()
          setStep(step + 1)
          hideLayer()
          showFullLayer()
          hideHandUp()
          hideArrowBtn()
          showControlBar()
          hideInfo()
          const elCtr = getPropertiesById('control-bar-crp')
          if (screen.width >= LG_SCREEN) {
            // DESKTOP
            showAvatarHandDown({
              top: elCtr.top - 138,
              left: elCtr.left + 136
            })
            showDialog({
              top: elCtr.top - 286,
              left: elCtr.left - 23
            })
          } else {
            // MOBILE
            showAvatarHandDown({
              top: elCtr.top - 103,
              left: elCtr.left + 82,
              flip: true
            })
            showDialog({
              top: elCtr.top - 320,
              left: screen.width * 0.06
            })
          }
          showContentAnimation()
          break
        default:
          break
      }
    }
  }

  const initMap = async ({
    element,
    config = {},
    onPanzoomComplete = () => {}
  }) => {
    const panzoom = Panzoom(element, config)
    setPanState(panzoom)
    onPanzoomComplete()
    return panzoom
  }

  return {
    step: step,
    nextStep: nextStep,
    initMap: initMap,
    endTutorial: endTutorial,
    showArrowBtn: showArrowBtn,
    showCancelBtn: showCancelBtn,
    setStep: setStep,
    completeTutorialUser: completeTutorialUser,
    map: map,
    setMap: setMap,
    changeMap: changeMap,
    hideBackgroundMap: hideBackgroundMap,
    showBackgroundMap: showBackgroundMap
  }
}

export default useCareerMap
