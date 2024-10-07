import { Slider } from 'common/presentation/Swiper'
import { SwiperSlide } from 'swiper/react'
import BenefitsCardView from './benefitsCardView'

const BenefitsPositionViewMode = (props) => {
  const { benefitsList } = props
  return (
    <div className="xl:pb-9">
      <div className="text-center xl:mt-[3.25rem] xl:mb-10">
        <p className="sm:text-h2 text-p20-bold text-neutral">
          Phúc lợi dành cho vị trí này
        </p>
      </div>
      <div className="flex justify-center">
        <div className="xl:max-w-[1140px] w-screen px-0">
          <Slider
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
            classNameSwiper="!px-5 xl:!px-0"
            hasArrow={benefitsList?.length > 3}
          >
            {benefitsList?.map((element, ind) => {
              return (
                <SwiperSlide key={`benefits-${ind}`}>
                  <BenefitsCardView {...element} benefitsList={benefitsList} />
                </SwiperSlide>
              )
            })}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default BenefitsPositionViewMode
