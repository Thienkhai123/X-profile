import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import { useEffect, useState } from 'react'
import { convertCurrency } from 'store/helper/functionHelper'
export const EnterprisePackage = (props) => {
  const {
    time = 'tháng',
    currency = 0,
    timeType = 0,
    handleToggleRegisterModal = () => {},
    minutes = 100,
    setMinutes = () => {},
    student = 20,
    setStudent = () => {}
  } = props

  const pricePerMinute = 700000
  const pricePerStudent = 300000
  const calculatePriceForYear = (minutes, student) => {
    let total = +0
    if (minutes && minutes > 0) {
      total += minutes * pricePerMinute
    }
    // if (student && student - 20 > 0) {
    //   total += pricePerStudent * (student - 20)
    // }
    return Math.round(total)
  }

  const calculatePriceForMonthFromYear = (yearPrice) => {
    let total = yearPrice / 12
    return Math.round(total)
  }
  const calculatePriceForMonth = (minutes, student) => {
    let total = calculatePriceForMonthFromYear(
      calculatePriceForYear(minutes, student)
    )
    return Math.round(total)
  }
  const renderCurrency = () => {
    if (timeType === 1) {
      return convertCurrency(calculatePriceForYear(minutes, student), false)
    } else {
      return convertCurrency(calculatePriceForMonth(minutes, student), false)
    }
  }
  return (
    <div className="xl:max-w-[550px] w-full h-full md:p-10 px-4 py-6 rounded-3xl flex justify-between flex-col md:gap-8 gap-6 bg-[#F2F5F0]">
      <div className="flex flex-col md:gap-8 gap-6">
        <div>
          <div className="px-4 py-[5px] md:mb-8 mb-2 bg-[#E4F2DA] rounded-full w-fit ">
            <p className="md:text-p18 text-p14 leading-[26px] md:leading-[30px] text-grey-1 ">
              Gói Custom
            </p>
          </div>
          <p className="md:text-h3 text-h5">{`${renderCurrency()} / ${time}`}</p>
        </div>
        <div className="flex flex-col md:gap-6 gap-4">
          <div className="flex items-center md:gap-4 gap-2">
            <div className="w-4 h-4 md:w-auto md:h-auto flex items-center justify-center">
              <XProfileIcon name="starsB2B" fill="#B9E09F" />
            </div>
            <p className="md:text-p16-bold md:leading-7 text-p14-bold leading-[26px]">
              Có tất cả quyền lợi ở gói Pro
            </p>
          </div>
          <div className="flex items-start md:gap-4 gap-2">
            <div className="mt-4 md:mt-0 md:w-5 md:h-5 w-4 h-4 rounded-full bg-[#B9E09F] flex items-center justify-center">
              <XProfileIcon
                name="checkDone"
                width="18"
                height="18"
                fill="#F2F5F0"
              />
            </div>
            <div className="flex flex-col md:gap-6 gap-2 w-full">
              <p className="md:text-p16-bold md:leading-7 text-p14-bold leading-[26px] max-w-[229px] xl:max-w-[370px]">
                {minutes} phút video số hoá nội dung đào tạo nội bộ
              </p>
              <div className="flex items-center justify-between md:w-[326px] w-full">
                <p className="text-p16 text-grey-1">Tuỳ chọn số phút</p>
                <div className="md:block hidden show-arrow">
                  <input
                    type="number"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value.slice(0, 3))}
                    onInput={(e) => {
                      e.target.value =
                        !!e.target.value && Math.abs(e.target.value) >= 0
                          ? Math.abs(e.target.value)
                          : null
                    }}
                    min={10}
                    max={999}
                    onWheel={(e) => e.target.blur()}
                    className="px-4 py-2  rounded-full bg-white h-[43px] w-[142px] text-p14-bold text-center focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center md:gap-4 gap-2">
            <div className="md:w-5 md:h-5 w-4 h-4 rounded-full bg-[#B9E09F] flex items-center justify-center">
              <XProfileIcon
                name="checkDone"
                width="18"
                height="18"
                fill="#F2F5F0"
              />
            </div>
            <p className="md:text-p16-bold md:leading-7 text-p14-bold leading-[26px]">
              LMS không giới hạn
            </p>
          </div>

          <div className="flex items-center md:gap-4 gap-2">
            <div className="md:w-5 md:h-5 w-4 h-4 rounded-full bg-[#B9E09F] flex items-center justify-center">
              <XProfileIcon
                name="checkDone"
                width="18"
                height="18"
                fill="#F2F5F0"
              />
            </div>
            <p className="md:text-p16-bold md:leading-7 text-p14-bold leading-[26px]">
              Bật 3 tin tuyển dụng miễn phí
            </p>
          </div>
          <div className="flex items-center md:gap-4 gap-2">
            <div className="md:w-5 md:h-5 w-4 h-4 rounded-full bg-[#B9E09F] flex items-center justify-center">
              <XProfileIcon
                name="checkDone"
                width="18"
                height="18"
                fill="#F2F5F0"
              />
            </div>
            <p className="md:text-p16-bold md:leading-7 text-p14-bold leading-[26px] max-w-[429px] flex-1">
              Tư vấn xây dựng khung năng lực và lộ trình đào tạo cá nhân hoá cho
              doanh nghiệp
            </p>
          </div>
        </div>
      </div>
      <div>
        <Button
          title="Đăng ký"
          width="w-full"
          rounded="rounded-full"
          padding="py-4"
          height="md:h-[62px] h-[58px]"
          margin="mt-0"
          // hover='hover:shadow-[0px_16px_24px_0px_rgba(38,58,124,0.08)] hover:-translate-y-1 duration-200 transition-all'
          background="bg-white"
          onClick={() => handleToggleRegisterModal(3, 'Custom')}
        />
      </div>
    </div>
  )
}
