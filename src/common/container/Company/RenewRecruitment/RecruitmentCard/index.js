import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Lottie from 'react-lottie'

const RecruitmentCard = (props) => {
  const { images, name, description, defaultOptionsLoading } = props

  return (
    <div className="md:w-[360px] px-[16px] w-full">
      <div className="xl:mb-[43px] mb-4 flex justify-center ">
        <div className="xl:w-[200px] xl:h-[200px] w-[64px] h-[64px] relative">
          <Lottie options={defaultOptionsLoading} />
        </div>
      </div>
      <div className="mb-[10px] text-center ">
        <p className="xl:text-p20-bold text-p16-bold text-blue-light ">
          {name}
        </p>
      </div>
      <div className="text-justify">
        <p className="xl:text-p18 text-p12">{description}</p>
      </div>
    </div>
  )
}

RecruitmentCard.propTypes = {
  images: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string
}
RecruitmentCard.defaultProps = {
  images: '/images/2.png',
  name: 'Practical experience',
  description: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet'
}

export default RecruitmentCard
