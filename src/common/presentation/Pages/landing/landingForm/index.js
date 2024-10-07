import React from 'react'
import PropTypes from 'prop-types'
import { useCountdown } from 'common/hooks/useCountdown'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'

const LandingForm = (props) => {
  const { register, errors, handleSubmit = () => {}, submit = () => {} } = props

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="animate-fadeIn relative xl:px-0 px-6 flex flex-col xl:max-w-[1202px]   mx-auto justify-center items-center gap-10 text-center"
    >
      <div className="max-w-[600px]">
        <p className="xl:text-[36px] text-lg text-center font-light xl:leading-[48px]">
          Nhập tên và địa chỉ email của bạn để nhận kết quả
        </p>
        <div className="mt-16 flex flex-col items-start xl:gap-8 gap-6">
          {(errors?.name || errors?.email) && (
            <p className="xl:text-xl text-p16 font-light text-semantic-red">
              {errors?.name?.message || errors?.email?.message}
            </p>
          )}
          <input
            type="text"
            placeholder="Nhập tên"
            {...register('name')}
            className={`w-full rounded-lg xl:px-8 px-6 py-4 bg-white border-[0.5px]  ${
              errors?.name?.message
                ? 'border-semantic-red focus:outline-semantic-red'
                : 'border-black/50'
            } focus:outline-button   xl:text-p20 text-p16 font-light`}
          />
          <input
            type="email"
            placeholder="Nhập địa chỉ email"
            {...register('email')}
            className={`w-full rounded-lg xl:px-8 px-6 py-4 bg-white border-[0.5px] ${
              errors?.email?.message
                ? 'border-semantic-red focus:outline-semantic-red'
                : 'border-black/50'
            } focus:outline-button  xl:text-p20 text-p16 font-light`}
          />
        </div>
        <div className="relative xl:w-[181px] w-[154px] h-fit  group mx-auto xl:mt-20 mt-14">
          <div className="w-full h-full absolute bg-black left-1 top-1 rounded-lg transition-all  duration-300  group-hover:left-2 group-hover:top-2"></div>
          <button className="relative xl:text-p20-bold text-p16-bold bg-white group-hover:bg-button xl:h-16 h-14 border-[0.5px] border-black/50 w-full  rounded-lg z-10">
            Nhận kết quả
          </button>
        </div>
      </div>
    </form>
  )
}

LandingForm.propTypes = {}
LandingForm.defaultProps = {}

export default LandingForm
