import { LG_SCREEN } from 'common/config/app.constants'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
import { Fragment, useEffect } from 'react'

const POSITIONS = {
  1: {
    bottom: '80px',
    left: '80px'
  },
  2: {
    bottom: '80px',
    left: '80px'
  },
  3: {
    bottom: '80px',
    left: '80px'
  },
  4: {
    top: '160px',
    right: '80px'
  },
  5: {
    top: '160px',
    right: '80px'
  }
}

const POSITIONS_MOBILE = {
  1: {
    bottom: '40px',
    left: '0px'
  },
  2: {
    bottom: '40px',
    left: '0px'
  },
  3: {
    bottom: '40px',
    left: '0px'
  },
  4: {
    top: '76px',
    left: '0px'
  },
  5: {
    top: '76px',
    left: '0px'
  }
}

const CONTENTS = {
  1: {
    title: 'Chào mừng bạn đến với bản đồ lộ trình!',
    content:
      'Đây là bản đồ lộ trình nghề nghiệp được thể hiện thông qua quy trình phát triển một sản phẩm công nghệ phần mềm, cùng khám phá nhé!'
  },
  2: {
    title: '',
    content: `Bắt đầu với việc <strong>Phân tích nghiệp vụ</strong>, yêu cầu kinh doanh, để đưa ra ý tưởng và đặc tả phần mềm phù hợp nè!`
  },
  3: {
    title: '',
    content: `Sau đó, Team <strong>Thiết kế UX UI</strong> sẽ thể hiện ý tưởng trên bản mẫu, từ đó thiết kế giao diện và trải nghiệm người dùng.`
  },
  4: {
    title: '',
    content: `Từ đặc tả phần mềm, Team <strong>Kỹ thuật</strong> sẽ xây dựng kiến trúc dữ liệu cho hệ thống, kết hợp với bản thiết kế giao diện để triển khai thành sản phẩm.`
  },
  5: {
    title: '',
    content: `Sau bước triển khai sẽ đến bước kiểm thử, lúc này <strong>QA/QC</strong> sẽ tiến hành kiểm thử toàn bộ sản phẩm, phát hiện lỗi sai và phản hồi để điều chỉnh.`
  }
}

const LargeScreenUI = ({ title = '', step = 1 }) => {
  return (
    <div
      id="info-crp"
      className="bg-background-info lg:flex hidden w-[560px] pt-10 px-6 pb-7 gap-6 fixed z-30"
      style={{
        ...POSITIONS[step]
      }}
    >
      <div className="w-[92px]">
        <Image
          src="/images/career_path/chuotava.png"
          width={92}
          height={89}
          alt="chuot-avatar"
          quality={100}
        />
      </div>
      <div className="flex-1">
        {title && (
          <p id="text-info-crp-title" className="mb-1 text-h5 text-button" />
        )}
        <p
          id="text-info-crp-content"
          className="text-p16 text-card-title leading-7"
        />
      </div>
    </div>
  )
}

const SmallScreenUI = ({ title = '', step = 1, nextStep = () => {} }) => {
  return (
    <div
      id="info-crp-mobile"
      className="fixed z-30 block lg:hidden w-full px-6"
      style={{
        ...POSITIONS_MOBILE[step]
      }}
    >
      <div className="sm:bg-background-info bg-background-info-mobile p-4 bg-cover bg-no-repeat rounded-bl-lg rounded-br-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="w-[56px]">
            <Image
              src="/images/career_path/chuotava.png"
              width={56}
              height={56}
              alt="chuot-avatar"
              quality={100}
            />
          </div>
          <div
            id="arrow-btn-crp-mobile"
            className="flex items-center gap-2 sm:mt-1 mt-0 hidden"
            onClick={nextStep}
          >
            <p className="text-p14-bold leading-[26px] text-button">
              Tiếp theo
            </p>
            <div>
              <XProfileIcon
                name="arrowRight"
                width="22.4"
                height="22.4"
                fill="#F6BB3A"
              />
            </div>
          </div>
        </div>
        <div className="flex-1">
          {title && (
            <p
              id="text-info-crp-title-mobile"
              className="mb-1 text-h5 text-button"
            />
          )}
          <p
            id="text-info-crp-content-mobile"
            className="text-p16 text-card-title leading-7"
          />
        </div>
      </div>
    </div>
  )
}

export const CareerPathInfo = ({
  step = 1,
  showArrowBtn = () => {},
  nextStep = () => {}
}) => {
  const showTitleAnimation = () => {
    let i = 0
    const titleText = CONTENTS[step].title
    let el = null
    if (screen.width >= LG_SCREEN) {
      el = document.getElementById('text-info-crp-title')
    } else {
      el = document.getElementById('text-info-crp-title-mobile')
    }
    if (titleText && el) {
      if (screen.width >= LG_SCREEN) {
        let consoleTyper = setInterval(function () {
          if (i != titleText.length) {
            i += 1
            el.innerText = titleText.substring(0, i)
          } else {
            clearInterval(consoleTyper)
          }
        }, 5)
      } else {
        el.innerText = titleText
      }
    }
  }

  const showContentAnimation = async () => {
    if (screen.width >= LG_SCREEN) {
      let i = 0
      await new Promise((resolve) => {
        let consoleTyper = setInterval(function () {
          if (i != CONTENTS[step].content.length) {
            i += 1
            // DESTOP SCREEN
            let el = document.getElementById('text-info-crp-content')
            el.innerHTML = CONTENTS[step].content.substring(0, i)
          } else {
            clearInterval(consoleTyper)
            resolve()
          }
        }, 5)
      }).then(() => {
        showArrowBtn()
      })
    } else {
      let el = document.getElementById('text-info-crp-content-mobile')
      el.innerHTML = CONTENTS[step].content
      showArrowBtn()
    }
  }

  useEffect(() => {
    showTitleAnimation()
    showContentAnimation()
  }, [step])
  return (
    <Fragment>
      <LargeScreenUI step={step} />
      <SmallScreenUI nextStep={nextStep} step={step} />
    </Fragment>
  )
}
