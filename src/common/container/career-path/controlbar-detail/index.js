import useOnClickOutside from 'common/hooks/useClickOutSide'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
import { useRef, useState } from 'react'

const DefaultControlBar = ({
  toggleMap = () => {},
  handleChangeMap = () => {}
}) => {
  return (
    <div className="bg-white rounded-3xl p-2">
      <div className="flex gap-[10px]">
        <div
          onClick={handleChangeMap}
          className="rounded-2xl bg-light-blue py-[19px] px-6 flex gap-[10px] items-center cursor-pointer"
        >
          <div>
            <XProfileIcon name="arrowLeft2" />
          </div>
          <p className="text-p14-bold leading-[26px] lg:block hidden">Trở về</p>
        </div>

        <div
          className="rounded-2xl bg-light-blue py-[19px] px-6 cursor-pointer"
          onClick={toggleMap}
        >
          <XProfileIcon name="map2" />
        </div>

        <div
          id="zoomIn-detail-crp"
          className="rounded-2xl bg-light-blue py-[19px] px-6 cursor-pointer"
        >
          <XProfileIcon name="zoomIn" />
        </div>

        <div
          id="zoomOut-detail-crp"
          className="rounded-2xl bg-light-blue py-[19px] px-6 cursor-pointer"
        >
          <XProfileIcon name="zoomOut" />
        </div>
      </div>
    </div>
  )
}

const DetailControlBar = ({
  toggleMap = () => {},
  hideBackgroundMap = () => {},
  showBackgroundMap = () => {},
  changeMap = () => {}
}) => {
  const handleChangeToCSMap = () => {
    hideBackgroundMap('crp-it-bg')
    showBackgroundMap('crp-cs-bg')
    changeMap({ name: 'cs', current: 'cs-main' })
    history.replaceState(null, 'xprofile', '/career-path/cyber-security')
  }

  const handleChangeToITMap = () => {
    hideBackgroundMap('crp-cs-bg')
    showBackgroundMap('crp-it-bg')
    changeMap({ name: 'it', current: 'it-main' })
    history.replaceState(null, 'xprofile', '/career-path/it')
  }
  return (
    <div className="flex flex-col gap-2 lg:w-[447px] w-[68vw]">
      <div
        className="bg-white rounded-3xl p-2 grid grid-cols-2 gap-2"
        onMouseLeave={toggleMap}
      >
        <div
          className="bg-light-blue rounded-2xl flex flex-col gap-2 justify-center items-center lg:p-6 p-4 hover:outline hover:outline-1 hover:outline-[#A0B8E9] cursor-pointer"
          onClick={handleChangeToCSMap}
        >
          <Image
            alt="cntt"
            src="/images/career_path/map.png"
            width={80}
            height={64}
          />
          <p className="text-p14 text-neutral leading-[26px] lg:text-start text-center">
            An ninh mạng
          </p>
        </div>

        <div
          className="bg-light-blue rounded-2xl flex flex-col gap-2 justify-center items-center lg:p-6 p-4 hover:outline hover:outline-1 hover:outline-[#A0B8E9] cursor-pointer"
          onClick={handleChangeToITMap}
        >
          <Image
            alt="cntt"
            src="/images/career_path/CNPM.png"
            width={80}
            height={64}
          />
          <p className="text-p14 text-neutral leading-[26px] lg:text-start text-center">
            Công nghệ phần mềm
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-2">
        <div className="bg-light-blue py-5 px-6 rounded-2xl flex justify-between items-center">
          <div className="flex gap-2">
            <p className="text-p14-bold text-neutral leading-[26px]">Bản đồ</p>
            <p className="text-p14 text-neutral leading-[26px] lg:block hidden">
              Công nghệ phần mềm
            </p>
          </div>

          <div className="cursor-pointer" onClick={toggleMap}>
            <XProfileIcon name="close" />
          </div>
        </div>
      </div>
    </div>
  )
}

export const CareerPathControlBarDetail = ({
  changeMap = () => {},
  map,
  hideBackgroundMap = () => {},
  showBackgroundMap = () => {}
}) => {
  const ref = useRef(null)
  const [showMaps, setShowMaps] = useState(false)
  const toggleMap = () => {
    setShowMaps(!showMaps)
  }

  const closeMap = () => {
    setShowMaps(false)
  }

  const handleChangeMap = () => {
    const { name } = map || {}
    changeMap({
      name,
      current: name + '-main'
    })
  }

  useOnClickOutside(ref, closeMap)
  return (
    <div
      ref={ref}
      id="control-bar-detail-crp"
      className="hidden bg-[rgba(255,255,255,0.60)] rounded-3xl p-2 fixed z-[30] lg:bottom-[80px] bottom-[40px] left-1/2 -translate-x-1/2"
    >
      <div className={`${!showMaps ? 'block' : 'hidden'}`}>
        <DefaultControlBar
          toggleMap={toggleMap}
          handleChangeMap={handleChangeMap}
        />
      </div>
      <div className={`${showMaps ? 'block' : 'hidden'}`}>
        <DetailControlBar
          toggleMap={toggleMap}
          hideBackgroundMap={hideBackgroundMap}
          showBackgroundMap={showBackgroundMap}
          changeMap={changeMap}
        />
      </div>
    </div>
  )
}
