import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import {
  convertCurrency,
  secondsToHmsFormatSimple
} from 'store/helper/functionHelper'
import BadgeCourse from 'common/presentation/BadgeCourse'
import Modal from 'common/presentation/Modal'
import useModal from 'common/hooks/useModal'
import ModalCourse from '../ModalCourse'
import BadgeCourseCombo from 'common/presentation/BadgeCourseCombo'

const ContentCourseComboPay = (props) => {
  const { course, title, description, skillCourse = [] } = props

  const [modal, setModal] = useState(false)

  const handleCloseModal = () => {
    setModal(false)
    document.body.style.overflow = 'auto'
  }

  const handleOpenModal = () => {
    setModal(true)
    document.body.style.overflow = 'hidden'
  }

  return (
    <div className="xl:w-[1140px]">
      <p className="text-h3 text-black mb-[32px] ">Các khoá học trong combo</p>
      <div className="mb-[40px]">
        <div className="flex gap-[40px]">
          <div className="flex flex-col gap-[24px]">
            {course?.slice(0, 5).map((element, ind) => {
              return (
                <div key={ind}>
                  <BadgeCourseCombo
                    {...element}
                    handleOpenModal={handleOpenModal}
                  />
                </div>
              )
            })}
          </div>
          <div className="bg-portfolio-empty p-[40px] w-full min-h-[576px] rounded-[24px]">
            <div className="bg-linear-gradient rounded-[24px_2px] px-[16px] w-[146px]  mb-[16px]">
              <p className="text-white text-p12-bold leading-[26px] text-center italic">
                Khoá học đính kèm
              </p>
            </div>
            <p className="xl:text-p18-bold leading-[30px] text-p14-bold text-black mb-[8px]">
              {title}
            </p>
            <p className="xl:text-p16 text-p12 text-grey-1 leading-[28px]">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div>
        {skillCourse?.length > 0 && (
          <div className="mb-[40px]">
            <p className="text-h3 text-black ">Những kỹ năng bạn sẽ đạt được</p>
            <div className="mt-[32px]  flex gap-[16px] flex-wrap ">
              {skillCourse?.map((element, ind) => {
                return (
                  <div key={ind}>
                    <BadgeCourse
                      padding="8px 16px"
                      bg="#F5F6F7"
                      subValue={element?.skillName}
                      textStyle="text-black text-p16 leading-[28px]"
                      radius="12px"
                      width=""
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
      {modal && (
        <ModalCourse modal={modal} handleCloseModal={handleCloseModal} />
      )}
    </div>
  )
}

ContentCourseComboPay.propTypes = {
  course: PropTypes.array,
  title: PropTypes.string
}
ContentCourseComboPay.defaultProps = {
  course: [
    {
      title: 'Lập trình Python cho mọi người',
      videoNumber: 27,
      time: 1000,
      isBought: true
    },
    {
      title: 'Lập trình Python cho mọi người',
      videoNumber: 27,
      time: 1000,
      isBought: true
    },
    {
      title: 'Lập trình Python cho mọi người',
      videoNumber: 27,
      time: 1000,
      isBought: false
    },
    {
      title: 'Lập trình Python cho mọi người',
      videoNumber: 27,
      time: 1000,
      isBought: false
    },
    {
      title: 'Lập trình Python cho mọi người',
      videoNumber: 27,
      time: 1000,
      isBought: false
    },
    {
      title: 'Lập trình CSS cho mọi người',
      videoNumber: 27,
      time: 1000,
      isBought: false
    }
  ],
  title: 'Chương trình thực tập',
  description:
    'Mô tả lộ trình trong khoá thực tập này. Magna lacus efficitur sapien libero semper nibh suspendisse eu consequat. Accumsan inceptos dis lorem eleifend tincidunt. Fusce maximus dis cursus vestibulum tortor sed. Cubilia sed quis tincidunt iaculis nunc litora sodales. Convallis mollis penatibus fames ullamcorper facilisis orci. Finibus sociosqu aliquam facilisi sem dapibus dictum eget gravida est leo. Litora per sagittis cubilia est ullamcorper pretium lacus nascetur. Ac mollis facilisis taciti sollicitudin risus nibh curae etiam luctus aenean. Convallis cursus hendrerit tincidunt vivamus placerat facilisi elementum. Tortor curabitur vitae consectetuer per nec elementum arcu aptent facilisis si pharetra.'
}

export default ContentCourseComboPay
