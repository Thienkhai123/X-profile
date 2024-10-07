import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CourseItem from 'common/presentation/Card/CourseItem'
import { DUMP_COURSE } from 'common/presentation/Pages/Demo/constants'
import Button from 'common/presentation/Button'
import { ACCESS_TOKEN } from 'common/config/app.constants'
import Image from 'next/image'

const InternalCourseEditMode = (props) => {
  const [itemHovered, setItemHovered] = useState(null)
  const [openDiscovery, setOpenDiscovery] = useState(false)

  const handleOpenDiscovery = async (id) => {
    setItemHovered(id)
    setOpenDiscovery(true)
  }
  const handleCloseDiscovery = async () => {
    setOpenDiscovery(false)
  }

  const handleManageCourse = () => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    window.open(
      process.env.NEXT_PUBLIC_LMS +
        'user?token=' +
        token +
        '&redirect=companycourse'
    )
  }

  return (
    <div className="pb-[72px] pt-[20px]">
      <div className="text-center mb-[32px]">
        <p className="xl:text-h2 text-p20-bold text-neutral">Khoá học nội bộ</p>
      </div>
      <div className="flex justify-center">
        <div className=" mb-[24px] w-[200px] h-[200px] relative">
          <Image layout="fill" quality={100} src="/images/empty5.png" alt="" />
        </div>
      </div>
      <div className="text-center mb-[32px]">
        <p className="text-p18 text-neutral opacity-[0.8]">
          Thêm mới và quản lý khóa học nội ở hệ thống quản lý nhé!
        </p>
      </div>
      <div className="flex justify-center">
        <Button
          title="Đến trang quản lý khoá học"
          width="w-auto"
          padding="p-[13px_32px]"
          margin="mt-0"
          rounded="rounded-[8px]"
          height="h-[56px]"
          onClick={handleManageCourse}
        />
      </div>

      {/* <div className="max-w-[1140px] mx-auto px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 ">
        {DUMP_COURSE?.slice(0, 3).map((item, ind) => {
          return (
            <div key={ind} className="relative">
              <CourseItem
                {...item}
                itemHovered={itemHovered}
                isLastIndex={(ind + 1) % 3 === 0}
                handleOpenDiscovery={handleOpenDiscovery}
                openDiscovery={openDiscovery}
                handleCloseDiscovery={handleCloseDiscovery}
                maxWidth="100%"
                widthImg={360.87}
                widthHover="367.87px"
                leftPosition="-left-[372.87px]"
                rightPositon="-right-[372.87px]"
                // handleLinkCourse={handleLinkCourse}
              />
            </div>
          )
        })}
      </div> */}
    </div>
  )
}

InternalCourseEditMode.propTypes = {}
InternalCourseEditMode.defaultProps = {}

export default InternalCourseEditMode
