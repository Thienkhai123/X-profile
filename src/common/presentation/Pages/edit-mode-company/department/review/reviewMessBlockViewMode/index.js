import React from 'react'
import PropTypes from 'prop-types'
import { SwiperSlide } from 'swiper/react'
import { Slider } from 'common/presentation/Swiper'
import ReviewMessBlockDetailEdit from '../reviewMessBlockDetailEdit'
import XProfileIcon from 'common/presentation/Icons'
import ReviewLayoutEdit from '../reviewLayoutEdit'

const ReviewMessBlockViewMode = (props) => {
  const {
    toggleModal = () => {},
    titleAdd,
    onsubmit = () => {},
    comments = [],
    handleAddReview = () => {},
    handleDelete = () => {},
    editmode = false,
    setInd = () => {},
    profileDeparment = {},
    autofocus = false,
    persent,
    checkUpload,
    errorsList,
    errors
  } = props

  return (
    <div id="commentList">
      <ReviewLayoutEdit
        profileDeparment={profileDeparment}
        editmode={editmode}
      />
      <div className="max-w-[1140px] mx-auto  xl:px-[0] px-5">
        {editmode && (
          <div className="flex justify-end mb-[24px]">
            <button onClick={() => handleAddReview()}>
              <div className="w-auto flex items-center gap-[20px] py-[12px] px-[32px]">
                <XProfileIcon
                  name="add"
                  stroke="#294F9B"
                  width="20"
                  height="20"
                />
                <p className="text-end text-button-2 xl:text-p18-bold text-p14-bold">
                  {titleAdd}
                </p>
              </div>
            </button>
          </div>
        )}
        {errors?.commentList && (
          <p className="text-star ml-40 text-p16 text-semantic-red leading-[28px]">
            Bạn phải thêm ít nhất cuộc gặp gỡ
          </p>
        )}
        <div className={comments?.length > 0 ? '' : 'min-h-[262px]'}>
          <Slider
            breakpoints={{
              330: {
                slidesPerView: 1,
                slidesPerGroup: 1
              }
            }}
            hasArrow={comments.length > 1}
            hasShadow={false}
            classNameLeft="absolute z-[100] -left-[80px] top-1/2 -translate-y-1/2"
            classNameRight="absolute z-[100] -right-[80px] top-1/2 -translate-y-1/2"
            stylePrev="bg-white p-5 shadow-blur24"
            classNameSwiper="swiper-radius"
          >
            {comments?.map((comment, ind) => {
              const isErrorsDescription = errorsList?.some(
                (element) => element === `Comment_description_${ind}`
              )
              const isErrorsContent = errorsList?.some(
                (element) => element === `Comment_content_${ind}`
              )
              const isErrorsName = errorsList?.some(
                (element) => element === `Comment_name_${ind}`
              )
              return (
                <SwiperSlide key={ind}>
                  <ReviewMessBlockDetailEdit
                    isErrorsName={isErrorsName}
                    isErrorsContent={isErrorsContent}
                    isErrorsDescription={isErrorsDescription}
                    persent={persent}
                    checkUpload={checkUpload}
                    keyComment={ind}
                    comment={comment}
                    onsubmit={onsubmit}
                    editmode={editmode}
                    handleDelete={handleDelete}
                    toggleModal={toggleModal}
                    setInd={setInd}
                    autofocus={autofocus}
                  />
                </SwiperSlide>
              )
            })}
          </Slider>
        </div>
      </div>
    </div>
  )
}

ReviewMessBlockViewMode.propTypes = {
  titleAdd: PropTypes.string
}
ReviewMessBlockViewMode.defaultProps = {
  titleAdd: 'Thêm thành viên'
}

export default ReviewMessBlockViewMode
