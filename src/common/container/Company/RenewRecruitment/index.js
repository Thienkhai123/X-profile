import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import RecruitmentCard from './RecruitmentCard'
import CreatingProfile from '../CreatingProfile'
import loadingAnimationDataHeThong from '../../../../../public/asset/jsons/1-hethong.json'
import loadingAnimationDataPhuHop from '../../../../../public/asset/jsons/2-phuhop.json'
import loadingAnimationDataTichHop from '../../../../../public/asset/jsons/3-tichhop.json'

const RenewRecruitment = (props) => {
  const { title, isCompanyOwner } = props

  const defaultOptionsLoadingHeThong = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimationDataHeThong,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  const defaultOptionsLoadingTichHop = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimationDataTichHop,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  const defaultOptionsLoadingPhuHop = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimationDataPhuHop,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  return (
    <div
      className={`bg-white xl:px-0 xl:pt-0 ${
        !isCompanyOwner ? 'pb-[88px]' : 'pb-[205px]'
      } px-5 pt-8`}
    >
      <div className="flex justify-center mb-[44px] lg:mb-0">
        <div className="flex justify-between lg:w-[1440px] lg:pt-[88px] lg:pl-[72px]">
          <div className="hidden lg:block  ">
            <Image
              width={94.09}
              height={157.64}
              src="/images/triangleRecruiment.png"
              placeholder="blur"
              blurDataURL="/images/triangleRecruiment.png"
              alt=""
              objectFit="contain"
            />
          </div>
          <div className="text-center mt-[12px]">
            <p className="xl:text-h2 text-p16-bold text-neutral">{title}</p>
          </div>
          <div className="hidden lg:block">
            <Image
              width={114.86}
              height={136.74}
              placeholder="blur"
              blurDataURL="/images/4.png"
              src="/images/4.png"
              alt=""
              objectFit="contain"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="grid lg:grid-cols-3 xl:gap-[68px] gap-6 md:grid-cols-2 grid-cols-1 w-[1140px]">
          <RecruitmentCard
            defaultOptionsLoading={defaultOptionsLoadingHeThong}
            images="/images/doi-moi-tuyen-dung-1.png"
            name="Tính hệ thống"
            description="Tạo hồ sơ tuyển dụng trên X-Profile với các thông tin về công ty và ngành nghề được thể hiện một cách có hệ thống, với cấu trúc và lộ trình nghề nghiệp rõ ràng giúp tăng độ uy tín và thuyết phục cho hồ sơ."
          />
          <RecruitmentCard
            defaultOptionsLoading={defaultOptionsLoadingPhuHop}
            images="/images/doi-moi-tuyen-dung-2.png"
            name="Tỉ lệ phù hợp"
            description="Dựa trên các bài kiểm tra năng lực, X-Profile tính toán mức độ phù hợp của ứng viên cho từng vị trí công việc, giúp doanh nghiệp tối đa thời gian và chi phí trong việc sàng lọc hồ sơ và tìm được ứng viên phù hợp."
          />
          <RecruitmentCard
            defaultOptionsLoading={defaultOptionsLoadingTichHop}
            images="/images/doi-moi-tuyen-dung-3.png"
            name="Dễ dàng tích hợp"
            description="X-Profile cung cấp hệ thống quản lý tuyển dụng có thể dễ dàng tích hợp với hệ thống quản lý nhân sự của công ty, giúp tiết kiệm tối đa thời gian và chi phí trong việc quản lý tuyển dụng và nhân sự."
          />
        </div>
      </div>
    </div>
  )
}

RenewRecruitment.propTypes = { title: PropTypes.string }
RenewRecruitment.defaultProps = { title: 'Điểm nổi bật của X-Profile là gì?' }

export default RenewRecruitment
