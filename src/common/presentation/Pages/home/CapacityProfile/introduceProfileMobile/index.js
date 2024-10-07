import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Button from 'common/presentation/Button'
import { useRouter } from 'next/router'

const IntroduceProfileMobile = (props) => {
  const { meta, roleId } = props
  const { mouseBackgroundColor, sheepBackgroundColor } = meta || {}
  const { push } = useRouter()
  const handleSubmit = () => {
    push('/applicant-profile')
  }
  return (
    <div
      className={`px-4 py-9 rounded-[12px]`}
      style={{
        backgroundColor:
          roleId === 0 ? sheepBackgroundColor : mouseBackgroundColor
      }}
    >
      <div className="w-[256px] h-[218px]  mx-auto ">
        <Image
          placeholder="blur"
          blurDataURL="/images/HosonanglucMobile.png"
          src="/images/HosonanglucMobile.png"
          width={768}
          height={651}
          alt=""
          objectFit="contain"
        />
      </div>
      <div>
        <p className="text-p16-bold text-neutral my-3">
          Bạn chưa có hồ sơ năng lực?
        </p>
        <p className="text-p12 leading-7 text-neutral">
          Hãy tạo hồ sơ của riêng bạn trên X-Profile để thể hiện đầy đủ năng lực
          của bản thân, đánh giá độ phù hợp với các vị trí ngành nghề hấp dẫn và
          gây ấn tượng với các nhà tuyển dụng uy tín.
        </p>
      </div>
      <div className="xl:hidden flex justify-center mt-3 ">
        <Button
          title="Tạo hồ sơ ngay"
          width="w-[211px]"
          height="h-auto]"
          padding="py-[12px]"
          rounded="rounded-[12px]"
          onClick={() => handleSubmit()}
        />
      </div>
    </div>
  )
}

IntroduceProfileMobile.propTypes = {
  titleLocation: PropTypes.string,
  titleAddress: PropTypes.string
}
IntroduceProfileMobile.defaultProps = {
  titleLocation: 'Thêm vị trí công việc',
  titleAddress: 'Thêm địa điểm làm việc'
}

export default IntroduceProfileMobile
