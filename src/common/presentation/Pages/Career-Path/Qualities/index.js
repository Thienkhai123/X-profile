import React from 'react'
import PropTypes from 'prop-types'

const Qualities = (props) => {
  const { SETTING_QUALITIES } = props
  return (
    <div className=" h-auto xl:h-[656px] bg-blue-light flex justify-center items-center">
      <div>
        <div className="md:flex md:justify-center w-full mb-10">
          <div className="text-center md:w-[754px]">
            <p className="text-h2 text-white ">
              Tố chất cho thấy bạn phù hợp với ngành Công nghệ thông tin
            </p>
          </div>
        </div>
        <div className="flex justify-center flex-wrap">
          {SETTING_QUALITIES.map((element, index) => {
            const { image, title, description } = element
            return (
              <div
                key={index}
                className="md:w-[327px] md:h-[320px] xl:ml-8 xl:mr-8 xl:mt-0 xl:m-0 mt-5 mb-5"
              >
                <div className="flex justify-center mb-4">
                  <div className=" w-[120px] h-[120px]  bg-white rounded-full"></div>
                </div>
                <div className="text-center mb-3">
                  <p className="text-white">{title}</p>
                </div>
                <div className="text-center">
                  <p className="text-white text-p18">{description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

Qualities.propTypes = {}

export default Qualities
