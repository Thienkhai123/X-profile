import XProfileIcon from 'common/presentation/Icons'
import { Slider } from 'common/presentation/Swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import BenefitsCardEdit from './benefitsCardEdit'
import { useEffect, useRef, useState } from 'react'
import { NextArrow, PreviousArrow } from 'common/presentation/Swiper/Arrows'
import { Grid, Navigation } from 'swiper'
const BenefitsPositionEditMode = (props) => {
  const {
    benefitsList,
    handleAdd = () => {},
    onChangeEdit = () => {},
    handleRemoveItem = () => {},
    toggleModal = () => {},
    errorsList = [],
    errors
  } = props

  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef(null)

  useEffect(() => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex + 1)
      const swiper = swiperRef.current.swiper
      swiper.slideTo(activeIndex + 1)
    } else {
      setActiveIndex(activeIndex + 1)
    }
  }, [benefitsList.length])
  return (
    <div>
      <div className="text-center mt-12 mb-10">
        <p className="sm:text-h2 text-p20-bold text-neutral">
          Phúc lợi dành cho vị trí này
        </p>
      </div>
      <div className="flex justify-end">
        <div
          onClick={() => {
            if (activeIndex > 0) {
              setActiveIndex(activeIndex + 1)
              const swiper = swiperRef.current.swiper
              swiper.slideTo(activeIndex + 1)
            } else {
              setActiveIndex(activeIndex + 1)
            }
            handleAdd()
          }}
          className="flex items-center gap-3  cursor-pointer mb-4"
        >
          <XProfileIcon name="add" width="24" height="24" stroke="#294F9B" />
          <p className="text-p18-bold text-blue-light">Thêm phúc lợi</p>
        </div>
      </div>
      {errors?.benefitList && (
        <div className="xl:flex justify-center mb-4">
          <p className="text-p16 xl:w-[1140px] xl:ml-[180px] text-start text-semantic-red leading-[28px]">
            Bạn phải thêm ít nhất hai phúc lợi
          </p>
        </div>
      )}
      <div id="benefitList" className="flex justify-center">
        <div className="relative xl:max-w-[1140px] w-screen  px-5 xl:px-0">
          {benefitsList?.length > 3 && (
            <div className="hidden xl:block">
              <PreviousArrow prevRef={prevRef} hasShadow={true} />
              <NextArrow nextRef={nextRef} hasShadow={true} />
            </div>
          )}
          <Swiper
            ref={swiperRef}
            breakpoints={{
              330: {
                slidesPerView: 1.5,
                slidesPerGroup: 1
              },
              800: {
                slidesPerView: 2,
                slidesPerGroup: 2
              },
              1100: {
                slidesPerView: 2,
                slidesPerGroup: 2
              },
              1280: {
                slidesPerView: 3,
                slidesPerGroup: 1
              }
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current
            }}
            modules={[Grid, Navigation]}
            initialSlide={activeIndex}
          >
            {benefitsList?.map((element, ind) => {
              const isErrorsImageUrl = errorsList?.some(
                (element) => element === `Benefits_imageUrl_${ind}`
              )
              const isErrorsDesciption = errorsList?.some(
                (element) => element === `Benefits_desciption_${ind}`
              )
              const isErrorsName = errorsList?.some(
                (element) => element === `Benefits_name_${ind}`
              )
              return (
                <SwiperSlide key={`benefits-${ind}`}>
                  <BenefitsCardEdit
                    {...element}
                    isErrorsName={isErrorsName}
                    isErrorsDesciption={isErrorsDesciption}
                    isErrorsImageUrl={isErrorsImageUrl}
                    benefitsList={benefitsList}
                    index={ind}
                    toggleModal={toggleModal}
                    onChangeEdit={onChangeEdit}
                    handleRemoveItem={handleRemoveItem}
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default BenefitsPositionEditMode
