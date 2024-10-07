import useScrollPosition from 'common/hooks/useScrollPosition'
import { useScrollToAction } from 'common/hooks/useScrollToAction'
import Button from 'common/presentation/Button'
import { HowToUseCard } from 'common/presentation/Card/HowToUse'
import { Line } from 'common/presentation/Line'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import CreatingProfile from '../CreatingProfile'

const fakeData = [
  {
    id: 0,
    icon: 'identify',
    name: 'Tạo tài khoản X-Profile',
    src: '/images/01-Register.webp',
    description:
      'Sau khi cung cấp những thông tin cần thiết để tạo tài khoản thành công, bạn sẽ có thể truy cập và sử dụng miễn phí công cụ tạo hồ sơ doanh nghiệp và toàn bộ hệ thống quản lý tuyển dụng.'
  },
  {
    id: 1,
    icon: 'faceId',
    name: 'Tạo hồ sơ tuyển dụng',
    src: '/images/02-CreateCompanyProfile.webp',
    description:
      'Đội ngũ X-Profile sẽ hỗ trợ doanh nghiệp xây dựng một bộ hồ sơ tuyển dụng chuyên nghiệp, giúp tạo uy tín cho thương hiệu tuyển dụng của công ty bạn.'
  },
  {
    id: 2,
    icon: 'filter',
    name: 'Cập nhật hồ sơ văn hóa doanh nghiệp',
    src: '/images/03-UpdateCompanyCulture.webp',
    description:
      'Hồ sơ văn hóa doanh nghiệp là một trong những thông tin giúp thu hút ứng viên và tăng khả năng tìm thấy ứng viên phù hợp với môi trường làm việc tại công ty bạn.'
  },
  {
    id: 3,
    icon: 'identify',
    name: 'Thêm thông tin phòng ban',
    src: '/images/04-UpdateDepartmentInfo.webp',
    description:
      'Bổ sung đầy đủ thông tin các phòng ban trong công ty của bạn, hình ảnh, từng vị trí công việc và lộ trình phát triển chung, giúp tăng độ uy tín cho hồ sơ doanh nghiệp.'
  },
  {
    id: 4,
    icon: 'identify',
    name: 'Thêm vị trí tuyển dụng',
    src: '/images/05-UpdateJobDetail.webp',
    description:
      'Khởi tạo các vị trí mà công ty đang có nhu cầu muốn tuyển dụng với mô tả công việc chi tiết, yêu cầu kỹ năng, nghiệp vụ, phúc lợi & lộ trình phát triển,... để thu hút ứng viên thực sự phù hợp.'
  },
  {
    id: 5,
    icon: 'filter',
    name: 'Tìm ứng viên',
    src: '/images/06-CreaterecruitmentCampaign.webp',
    description:
      'Sau khi hoàn thành hồ sơ công ty, bạn sẽ có một website tuyển dụng chuyên nghiệp để có thể tạo các chiến dịch tuyển dụng trên X-Profile hoặc sử dụng trên các kênh tuyển dụng khác.'
  }
]

const HowToUse = () => {
  const [selectedId, setSelectedId] = useState(0)

  const scrollY1 = useScrollToAction('useCard1')
  const scrollY2 = useScrollToAction('useCard2')
  const scrollY3 = useScrollToAction('useCard3')
  const scrollY4 = useScrollToAction('useCard4')
  const scrollY5 = useScrollToAction('useCard5')
  const scrollY6 = useScrollToAction('useCard6')
  // let screenHeight = window.innerHeight
  // useEffect(() => {
  //   if (scrollY1?.visible > 98) {
  //     setSelectedId(0)
  //   }
  //   if (scrollY2?.visible > 98) {
  //     setSelectedId(1)
  //   }
  //   if (scrollY3?.visible > 98) {
  //     setSelectedId(2)
  //   }
  //   if (scrollY4?.visible > 98) {
  //     setSelectedId(3)
  //   }
  //   if (scrollY5?.visible > 98) {
  //     setSelectedId(4)
  //   }
  //   if (scrollY6?.visible > 98) {
  //     setSelectedId(5)
  //   }
  // }, [scrollY6, scrollY1, scrollY2, scrollY4, scrollY3, scrollY5])

  return (
    <div>
      <div className="relative flex items-center justify-center">
        <CreatingProfile />
      </div>
      <div className="pt-[190px] sm:pb-[60px] pb-[80px] sm:px-[52px] px-[16px] overflow-x-hidden">
        <div className="flex items-center justify-between">
          <div className="hidden xl:block">
            <Image
              alt="left-how-to-use"
              placeholder="blur"
              blurDataURL="/images/left-how-to-use-bg.png"
              src="/images/left-how-to-use-bg.png"
              width={239}
              height={160.63}
              objectFit="contain"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="xl:text-p36-bold text-p20-bold text-neutral max-w-[450px] text-center">
              06 bước tuyển dụng hiệu quả với X-Profile
            </p>
            <div className="flex items-center gap-[8px] mt-[32px]">
              <Line />
              <Line className="h-[10px] w-[131px] bg-button rounded-[12px]" />
            </div>
          </div>
          <div className="hidden xl:block">
            <Image
              alt="left-how-to-use"
              src="/images/right-how-to-use-bg.png"
              width={239}
              height={160.63}
              objectFit="contain"
            />
          </div>
        </div>
        <div className=" w-full mx-auto sm:pt-[56px] pt-[24px] sm:px-0 px-[4px] flex flex-col-reverse xl:flex-row items-center gap-[40px]">
          <div className="xl:w-1/2 w-full flex flex-col gap-[24px] flex-1 xl:pl-[10vw] h-[742]">
            {fakeData.map((el, ind) => {
              const { id } = el
              return (
                <div key={ind} id={`useCard${ind + 1}`}>
                  <HowToUseCard
                    {...el}
                    active={selectedId === id}
                    onClick={() => setSelectedId(id)}
                  />
                </div>
              )
            })}
          </div>
          <div className="xl:w-1/2 w-full">
            <div className="  mx-auto">
              <div className="xl:w-[45.35vw] xl:h-[26.7565vw] w-full h-[50vw] mt-6 xl:mt-0 relative">
                <div className="xl:block hidden absolute -top-[52px] ">
                  <Image
                    alt=""
                    placeholder="blur"
                    blurDataURL="/images/howToUseOverlayTop.png"
                    src="/images/howToUseOverlayTop.png"
                    width={204}
                    height={183}
                    objectFit="contain"
                  />
                </div>
                <div className="xl:block w-[16vw] h-[15.648vw] hidden absolute -bottom-[32px] -right-[6.1vw]">
                  <Image
                    placeholder="blur"
                    blurDataURL="/images/howToUseOverlayBottom.png"
                    alt=""
                    src="/images/howToUseOverlayBottom.png"
                    // width={232}
                    // height={227}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <Image
                  alt=""
                  src={fakeData[selectedId]['src']}
                  // width={1863}
                  // height={1092}
                  layout="fill"
                  objectFit="contain"
                  quality={100}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-[60px]">
          <Button
            title="Liên hệ với X-Profile"
            width="w-auto"
            padding="p-[13px_32px]"
            margin="mt-0"
            rounded="rounded-lg"
            height="h-[48px]"
            onClick={() =>
              window.open(
                'https://meetings.hubspot.com/ho-huu-toan/hen-tu-van-voi-x-profile'
              )
            }
          />
        </div>
      </div>
    </div>
  )
}

export default HowToUse
