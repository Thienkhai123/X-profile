import { OrgCard } from 'common/presentation/Card'
import { Slider } from 'common/presentation/Swiper'
import { useRouter } from 'next/router'
import { SwiperSlide } from 'swiper/react'

const TopCompanies = ({ topCompanies = [], title = '' }) => {
  const { push } = useRouter()

  const handleAction = (companyId) => {
    push(`/profile-company/${companyId}`)
  }
  if (topCompanies.length === 0) {
    return (
      <div className="xl:w-[1140px] w-auto  xl:mx-auto mx-[10%] py-[48px] ">
        <p className="md:text-h2 text-p18-bold text-center mb-[40px]">
          {title}
        </p>
        <p className="text-p18 text-center mb-[40px]">
          Chưa có doanh nghiệp phù hợp
        </p>
      </div>
    )
  }
  return (
    <div className="xl:w-[1140px] w-auto  xl:mx-auto sm:mx-[10%] mx-[4.8vw] py-[48px] ">
      <p className="sm:text-h2 text-p20-bold text-center mb-[40px]">{title}</p>
      <div className="md:block hidden">
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
              slidesPerView: 3,
              slidesPerGroup: 3
            },
            1280: {
              slidesPerView: 4,
              slidesPerGroup: 4
            }
          }}
          hasArrow={topCompanies.length > 4}
        >
          {topCompanies.map((org, ind) => (
            <SwiperSlide key={ind} style={{ height: 'auto' }}>
              <OrgCard
                org={org}
                style={{ height: '100%' }}
                handleAction={handleAction}
              />
            </SwiperSlide>
          ))}
        </Slider>
      </div>
      <div className="md:hidden grid grid-cols-2 gap-4">
        {topCompanies.map((org, ind) => (
          <OrgCard
            key={ind}
            org={org}
            style={{ height: '100%' }}
            handleAction={handleAction}
          />
        ))}
      </div>
    </div>
  )
}

export default TopCompanies
