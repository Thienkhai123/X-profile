import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Button from 'common/presentation/Button'

const NewPaperJob = (props) => {
  const {
    title,
    description,
    description2,
    name,
    placeholder,
    titleButton,
    logoCompany
  } = props
  return (
    <div className="flex flex-wrap xl:justify-between justify-center xl:w-[1140px] w-auto">
      <div className="max-w-[799px] xl:mb-0 mb-10">
        <div className="mb-2 text-center xl:text-start">
          <p className="text-h3 text-white">{title}</p>
        </div>
        <div className="mb-8 text-center xl:text-start">
          <p className="text-p18 text-grey-4">
            {description + ' '}
            <span className="text-yellow-main">{name + '’s newsletter'}</span>
            {' ' + description2}
          </p>
        </div>
        <div className="flex flex-wrap justify-center xl:justify-start">
          <div className="md:mr-5 xl:w-[360px] w-full mb-10 xl:mb-0">
            <input
              type="text"
              className="py-3 px-5 text-neutral rounded-borderStep w-full"
              placeholder={placeholder}
            />
          </div>
          <div>
            <Button
              title={titleButton}
              width="w-[120px]"
              height="h-[48px]"
              margin=""
            />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-borderStep p-[11.83px]">
        {logoCompany && (
          <Image width={148.35} height={148.35} src={logoCompany} alt="" />
        )}
      </div>
    </div>
  )
}

NewPaperJob.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string,
  description2: PropTypes.string,
  placeholder: PropTypes.string,
  titleButton: PropTypes.string,
  logoCompany: PropTypes.string
}
NewPaperJob.defaultProps = {
  title: 'Đừng bỏ lỡ những tin tức hấp dẫn!',
  description: 'Subscrible to',
  name: '',
  description2: 'to receive job alerts, lastest news and updates.',
  placeholder: 'Nhập địa chỉ email',
  titleButton: 'Theo dõi',
  logoCompany: ''
}

export default NewPaperJob
