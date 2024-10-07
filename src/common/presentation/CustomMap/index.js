import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useState } from 'react'
import XProfileIcon from '../Icons'
const esMill = require('../../../../public/esMill.json')
const VectorMap = dynamic(
  // @ts-ignore
  () => import('@react-jvectormap/core').then((m) => m.VectorMap),
  {
    ssr: false
  }
)
import { gdpData } from './gdpData'

const CustomMap = (props) => {
  const { roleId, jobs, tagSelected = 'it', setTagSelected = () => {} } = props
  const router = useRouter()
  const [selectedId, setSelectedId] = useState(1)

  const handleToggleDetail = (id) => {
    setSelectedId(id)
  }
  const handleOnClickJob = (tag) => {
    setTagSelected(tag)
  }

  return (
    <div className="xl:w-[1114px] w-[100vw] xl:h-[500px] h-[300px] relative">
      {jobs?.map((location) => {
        const {
          jobCategoryId,
          name,
          numberOfJob,
          growthRate,
          averageSalary,
          top,
          right,
          topMobile,
          tag,
          rightMobile
        } = location

        if (selectedId !== jobCategoryId) {
          return (
            <div key={`jobCategoryId-${jobCategoryId}`}>
              <div
                className="hidden absolute z-40 w-[220px] h-[220px] rounded-full xl:flex flex-col justify-center items-center"
                style={{
                  top: top,
                  right: right,
                  backgroundColor: 'transparent'
                }}
              >
                <div
                  className="w-[32px] h-[32px] rounded-full  cursor-pointer hover:opacity-80"
                  onMouseEnter={() => handleToggleDetail(jobCategoryId)}
                  style={{
                    backgroundColor:
                      parseInt(roleId) === 1 ? '#E2A248' : '#E29D98'
                  }}
                />
              </div>
              <div
                className="xl:hidden absolute z-40 w-[169px] h-[169px] rounded-full flex flex-col justify-center items-center"
                style={{
                  top: topMobile,
                  right: rightMobile,
                  backgroundColor: 'transparent'
                }}
              >
                <div
                  className="w-[12px] h-[12px] rounded-full bg-[#E29D98] cursor-pointer hover:opacity-80"
                  onMouseEnter={() => handleToggleDetail(jobCategoryId)}
                />
              </div>
            </div>
          )
        }

        return (
          <div key={`jobCategoryId-${jobCategoryId}`}>
            <div className="xl:block hidden">
              <div
                className="absolute z-30 opacity-0 animate-fadeIn5"
                style={{
                  top: top + 120,
                  right: right + 220
                }}
              >
                <Image
                  alt={`left-info-${jobCategoryId}`}
                  placeholder="blur"
                  blurDataURL="/images/left-arrow-location.png"
                  src="/images/left-arrow-location.png"
                  width={108}
                  height={102}
                />
              </div>
              <div
                className="absolute z-50 py-[16px] px-[20px] bg-white rounded-[12px] w-[239px] opacity-0 animate-fadeIn10"
                style={{
                  top: top + 225,
                  right: right + 220
                }}
              >
                <p className="text-p16 text-grey-1">Xu hướng phát triển</p>
                <div className="flex items-center gap-[8px]">
                  <XProfileIcon name="growVector" />
                  <p className="text-p20-bold text-semantic-green">
                    {growthRate}
                  </p>
                </div>
              </div>
              <div
                className="absolute z-20 w-[220px] h-[220px] rounded-full flex flex-col justify-center items-center animate-fadeIn"
                style={{
                  top: top,
                  right: right,
                  backgroundColor:
                    parseInt(roleId) === 1 ? '#E2A248' : '#E29D98',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  // if (jobCategoryId === 1) {
                  //   router.push(`career-path/${tag}`)
                  // }
                  handleOnClickJob(tag)
                }}
              >
                <p className="text-white text-center text-h3 mb-[16px] w-[180px]">
                  {name}
                </p>
                <p className="text-white text-center text-p16-bold w-[107px]">
                  Gồm {numberOfJob} nghề bên dưới
                </p>
              </div>
              <div
                className="absolute z-30 opacity-0 animate-fadeIn5"
                style={{
                  top: top + 45,
                  right: right - 150
                }}
              >
                <Image
                  alt={`right-info-${jobCategoryId}`}
                  placeholder="blur"
                  blurDataURL="/images/right-arrow-location.png"
                  src="/images/right-arrow-location.png"
                  width={150}
                  height={78}
                />
              </div>
              <div
                className="absolute z-50 py-[16px] px-[20px] bg-white rounded-[12px] w-[239px] opacity-0 animate-fadeIn10"
                style={{
                  top: top - 50,
                  right: right - 260
                }}
              >
                <p className="text-p16 text-grey-1">Mức lương trung bình</p>
                <div className="flex items-center gap-[8px]">
                  <XProfileIcon name="growVector" />
                  <p className="text-p20-bold text-semantic-green">
                    {parseInt(averageSalary).toLocaleString()} VND
                  </p>
                </div>
              </div>
            </div>
            <div className=" xl:hidden">
              <div
                className="absolute z-20 w-[169px] h-[169px] rounded-full flex flex-col  justify-center items-center animate-fadeIn"
                style={{
                  top: topMobile,
                  right: rightMobile,
                  backgroundColor: '#E29D98',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  if (jobCategoryId === 1) {
                    router.push(`career-path/${tag}`)
                  }
                }}
              >
                <p className="text-white text-center text-p20-bold mb-[16px] w-[140px] ">
                  {name}
                </p>
                <p className="text-white text-center text-p16-bold w-[107px]">
                  Gồm {numberOfJob} nghề bên dưới
                </p>
              </div>
              <div
                className="absolute flex flex-col  gap-6"
                style={{
                  top: 350,
                  right: '20vw'
                }}
              >
                <div className=" z-30 py-[16px] px-[20px] bg-white rounded-[12px] w-[239px] opacity-0 animate-fadeIn10">
                  <p className="text-p16 text-grey-1">Xu hướng phát triển</p>
                  <div className="flex items-center gap-[8px]">
                    <XProfileIcon name="growVector" />
                    <p className="text-p20-bold text-semantic-green">
                      {growthRate}
                    </p>
                  </div>
                </div>
                <div
                  className=" z-30 py-[16px] px-[20px] bg-white rounded-[12px] w-[239px] opacity-0 animate-fadeIn10"
                  // style={{
                  //   top: top - 50,
                  //   right: right - 260
                  // }}
                >
                  <p className="text-p16 text-grey-1">Mức lương trung bình</p>
                  <div className="flex items-center gap-[8px]">
                    <XProfileIcon name="growVector" />
                    <p className="text-p20-bold text-semantic-green">
                      {parseInt(averageSalary).toLocaleString()} VND
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      <VectorMap
        map={esMill}
        backgroundColor={
          roleId !== null && parseInt(roleId) === 0 ? '#EDEDE8' : '#f5f5f2'
        }
        mapRef="map"
        containerStyle={{
          width: '100%',
          height: '100%'
        }}
        containerClassName="map"
        zoomOnScroll={false}
        zoomButtons={false}
        series={{
          regions: [
            {
              values: gdpData,
              scale: ['#C8EEFF', '#0071A4'],
              normalizeFunction: 'polynomial'
            }
          ]
        }}
      />
    </div>
  )
}

CustomMap.propTypes = {
  roleId: PropTypes.string || null,
  jobs: PropTypes.array,
  handleUpdateJobCategoryId: PropTypes.func
}

CustomMap.defaultProps = {
  roleId: null,
  jobs: [],
  handleUpdateJobCategoryId: () => {}
}

export default CustomMap
