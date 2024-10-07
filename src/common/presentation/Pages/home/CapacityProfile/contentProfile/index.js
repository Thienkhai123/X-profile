import React from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types'

const ContentProfile = (props) => {
  const { roleId, title, description } = props
  return (
    <div className="flex justify-center">
      <div>
        <div className="mb-[4px]">
          <p className="text-p18-bold text-neutral">{title}</p>
        </div>
        <div>
          <p className="text-p12 text-grey-1">{description}</p>
        </div>
      </div>
      <div className="w-full h-full flex justify-center">
        <Image
          width={71}
          height={100}
          placeholder="blur"
          blurDataURL="/images/CapacityProfile/lamp.png"
          src="/images/CapacityProfile/lamp.png"
          alt="lamp.png"
          quality={100}
        />
      </div>
    </div>
  )
}

ContentProfile.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}
ContentProfile.defaultProps = {
  title: 'Tips từ X-Profile',
  description:
    'Hoàn chỉnh profile sẽ giúp các nhà tuyển dụng chú ý tới bạn hơn và dễ dàng kiếm được công việc mới hơn các profile chưa hoàn thiện.'
}

export default ContentProfile
