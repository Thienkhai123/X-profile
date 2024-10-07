import { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import MapState2 from './MapState2'
import Image from 'next/image'
import MapState1 from './MapState1'
import MapState3 from './MapState3'
import MapState4 from './MapState4'

const lIST_STATE_VALUES = {
  1: {
    aspectRatioLeft: 132.5,
    aspectRatioBottom: 69,
    content:
      'Khám phá bản thân thông qua các bài kiểm tra tính cách, quiz, IQ, EQ'
  },
  '1-role': {
    aspectRatioLeft: 140,
    aspectRatioBottom: 108,
    content:
      'Khám phá bản thân thông qua các bài kiểm tra tính cách, quiz, IQ, EQ'
  },
  2: {
    aspectRatioLeft: 43,
    aspectRatioBottom: 130,
    content: 'Làm bài test kỹ năng'
  },
  3: {
    aspectRatioLeft: 113,
    aspectRatioBottom: 212,
    content:
      'Tạo E-Portfolio và tìm cách và tìm cách thể hiện năng lực của bản thân một cách ấn tượng'
  },
  '3-role': {
    aspectRatioLeft: 113,
    aspectRatioBottom: 221,
    content:
      'Tạo E-Portfolio và tìm cách và tìm cách thể hiện năng lực của bản thân một cách ấn tượng'
  },
  4: {
    aspectRatioLeft: 272,
    aspectRatioBottom: 185,
    content: 'Khám phá lộ trình các ngành nghề'
  },
  5: {
    aspectRatioLeft: 428,
    aspectRatioBottom: 202,
    content:
      'Làm lại các bài test kỹ năng để luyện tập giải quyết vấn đề. Nhận dự án, flashjob,..'
  },
  '5-role': {
    aspectRatioLeft: 431,
    aspectRatioBottom: 224,
    content:
      'Làm lại các bài test kỹ năng để luyện tập giải quyết vấn đề. Nhận dự án, flashjob,..'
  },
  6: {
    aspectRatioLeft: 532,
    aspectRatioBottom: 340,
    content: 'Tham gia các khóa học theo lộ trình phù hợp'
  },
  7: {
    aspectRatioLeft: 616,
    aspectRatioBottom: 368,
    content:
      'Cập nhật và hoàn thiện hồ sơ thường xuyên để gây ấn tượng trong mắt nhà tuyển dụng'
  },
  8: {
    aspectRatioLeft: 560,
    aspectRatioBottom: 476,
    content:
      'Tìm kiếm cơ hội thực tập, đi làm để áp dụng những điều đã tích lũy'
  },
  '8-role': {
    aspectRatioLeft: 555,
    aspectRatioBottom: 492,
    content:
      'Tìm kiếm cơ hội thực tập, đi làm để áp dụng những điều đã tích lũy'
  },
  9: {
    aspectRatioLeft: 810,
    aspectRatioBottom: 460,
    content:
      'Nhận thêm dự án, flashjob,... vừa để nâng cao thu nhập, vừa tích lũy kinh nghiệm.'
  }
}

const RenderMap = ({ state = 1, getElPosition = () => {} }) => {
  return (
    <Fragment>
      {state === 1 && <MapState1 getElPosition={getElPosition} />}
      {state === 2 && <MapState2 getElPosition={getElPosition} />}
      {state === 3 && <MapState3 getElPosition={getElPosition} />}
      {state === 4 && <MapState4 getElPosition={getElPosition} />}
    </Fragment>
  )
}

const RenderTooltip = ({
  position = {
    bottom: 0,
    left: 0
  },
  stage = 1
}) => {
  const { bottom, left } = position
  const { content = '' } = lIST_STATE_VALUES[stage] || {}
  if (content) {
    return (
      <div
        className="absolute max-w-[272px] text-center z-10 inline-block py-2 px-4 text-p16 text-white transition-opacity duration-300 bg-button rounded-lg shadow-sm opacity-0 group-hover:opacity-100 "
        style={{
          bottom: bottom,
          left: left
        }}
      >
        {content}
        <div
          className="
            w-0 h-0
            border-l-[10px] border-l-transparent
            border-t-[16px] border-t-button
            border-r-[10px] border-r-transparent
            absolute -bottom-4
            -translate-x-1/2
            left-1/2
          "
        />
      </div>
    )
  }
}

const RenderRole = ({ role = 0, state = 1, getElPosition = () => {} }) => {
  const renderPositionByState = (hover = false) => {
    switch (state) {
      case 1:
        if (hover) {
          return {
            top: 397,
            left: 250
          }
        }
        return {
          top: 397,
          left: 259
        }
      case 2:
        if (hover) {
          return {
            top: 283,
            left: 224
          }
        }
        return {
          top: 283,
          left: 233
        }
      case 3:
        if (hover) {
          return {
            top: 283,
            left: 541
          }
        }
        return {
          top: 283,
          left: 549
        }
      case 4:
        if (hover) {
          return {
            top: 12,
            left: 665
          }
        }
        return {
          top: 12,
          left: 673
        }
      default:
        return {
          top: 0,
          left: 0
        }
    }
  }

  const renderImageByStateAndRole = () => {
    if (role === 0) {
      switch (state) {
        case 1:
          return (
            <Fragment>
              <div
                className="block group-hover/image:hidden absolute cursor-careerPath"
                style={{ ...renderPositionByState(false) }}
              >
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey/cuu-3.png"
                  width={30.667}
                  height={56}
                />
              </div>
              <div
                className="hidden group-hover/image:block absolute cursor-careerPath"
                style={{ ...renderPositionByState(true) }}
              >
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey/cuu-2.png"
                  width={50.318}
                  height={56}
                />
              </div>
            </Fragment>
          )
        case 2:
          return (
            <Fragment>
              <div
                className="block group-hover/image:hidden absolute cursor-careerPath"
                style={{ ...renderPositionByState(false) }}
              >
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey/cuu-1.png"
                  width={30.667}
                  height={56}
                />
              </div>
              <div
                className="hidden group-hover/image:block absolute cursor-careerPath"
                style={{ ...renderPositionByState(true) }}
              >
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey/cuu-2.png"
                  width={50.318}
                  height={56}
                />
              </div>
            </Fragment>
          )
        case 3:
          return (
            <Fragment>
              <div
                className="block group-hover/image:hidden absolute cursor-careerPath"
                style={{ ...renderPositionByState(false) }}
              >
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey/cuu-1.png"
                  width={30.667}
                  height={56}
                />
              </div>
              <div
                className="hidden group-hover/image:block absolute cursor-careerPath"
                style={{ ...renderPositionByState(true) }}
              >
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey/cuu-2.png"
                  width={50.318}
                  height={56}
                />
              </div>
            </Fragment>
          )
        case 4:
          return (
            <Fragment>
              <div
                className="block group-hover/image:hidden absolute cursor-careerPath"
                style={{ ...renderPositionByState(false) }}
              >
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey/cuu-1.png"
                  width={30.667}
                  height={56}
                />
              </div>
              <div
                className="hidden group-hover/image:block absolute cursor-careerPath"
                style={{ ...renderPositionByState(true) }}
              >
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey/cuu-2.png"
                  width={50.318}
                  height={56}
                />
              </div>
            </Fragment>
          )
        default:
          return <></>
      }
    } else {
      switch (state) {
        case 1:
          return (
            <Fragment>
              <div
                className="block group-hover/image:hidden absolute cursor-careerPath"
                style={{ ...renderPositionByState(false) }}
              >
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey/chuot-3.png"
                  width={30.667}
                  height={56}
                />
              </div>
              <div
                className="hidden group-hover/image:block absolute cursor-careerPath"
                style={{ ...renderPositionByState(true) }}
              >
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey/chuot-2.png"
                  width={50.318}
                  height={56}
                />
              </div>
            </Fragment>
          )
        case 2:
          return (
            <Fragment>
              <div
                className="block group-hover/image:hidden absolute cursor-careerPath"
                style={{ ...renderPositionByState(false) }}
              >
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey/chuot-1.png"
                  width={30.667}
                  height={56}
                />
              </div>
              <div
                className="hidden group-hover/image:block absolute cursor-careerPath"
                style={{ ...renderPositionByState(true) }}
              >
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey/chuot-2.png"
                  width={50.318}
                  height={56}
                />
              </div>
            </Fragment>
          )
        case 3:
          return (
            <Fragment>
              <div
                className="block group-hover/image:hidden absolute cursor-careerPath"
                style={{ ...renderPositionByState(false) }}
              >
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey/chuot-1.png"
                  width={30.667}
                  height={56}
                />
              </div>
              <div
                className="hidden group-hover/image:block absolute cursor-careerPath"
                style={{ ...renderPositionByState(true) }}
              >
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey/chuot-2.png"
                  width={50.318}
                  height={56}
                />
              </div>
            </Fragment>
          )
        case 4:
          return (
            <Fragment>
              <div
                className="block group-hover/image:hidden absolute cursor-careerPath"
                style={{ ...renderPositionByState(false) }}
              >
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey/chuot-1.png"
                  width={30.667}
                  height={56}
                />
              </div>
              <div
                className="hidden group-hover/image:block absolute cursor-careerPath"
                style={{ ...renderPositionByState(true) }}
              >
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey/chuot-2.png"
                  width={50.318}
                  height={56}
                />
              </div>
            </Fragment>
          )
        default:
          return <></>
      }
    }
  }

  const getStageByState = () => {
    switch (state) {
      case 1:
        return '1-role'
      case 2:
        return '3-role'
      case 3:
        return '5-role'
      case 4:
        return '8-role'
      default:
        return 0
    }
  }

  if (state) {
    return (
      <div
        className=" group/image pointer-events-auto"
        onMouseEnter={() => getElPosition(getStageByState(state))}
      >
        {renderImageByStateAndRole()}
      </div>
    )
  }
}

const MyJourneyMap = (props) => {
  const [position, setPosition] = useState({
    top: 0,
    left: 0
  })
  const [stage, setStage] = useState(0)

  const mapTooltipPosition = (state = 1) => {
    const { aspectRatioLeft, aspectRatioBottom } = lIST_STATE_VALUES[state]

    return {
      bottom: aspectRatioBottom,
      left: aspectRatioLeft
    }
  }

  const getElPosition = (stageVal = 1) => {
    if (stageVal) {
      setPosition(mapTooltipPosition(stageVal))
      setStage(stageVal)
    }
  }

  return (
    <Fragment>
      <RenderMap {...props} getElPosition={getElPosition} />
      <RenderTooltip position={position} stage={stage} />
      <RenderRole {...props} getElPosition={getElPosition} />
    </Fragment>
  )
}

MyJourneyMap.propTypes = {
  state: PropTypes.number,
  role: PropTypes.number
}

MyJourneyMap.defaultProps = { state: 1, role: 0 }

export default MyJourneyMap
