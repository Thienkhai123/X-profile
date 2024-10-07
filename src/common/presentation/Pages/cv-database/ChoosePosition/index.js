import Button from 'common/presentation/Button'

import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { useRouter } from 'next/router'
import XProfileIcon from 'common/presentation/Icons'
import { useEffect, useState } from 'react'
import {
  getAllDepartmentsEdit,
  selectAllDepartmentsEdit
} from 'store/app/edit-mode-company/profile/teamListSlice'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import {
  getAllDepartmentPositionsEdit,
  selectAllDepartmentPositionEdit
} from 'store/app/edit-mode-company/department/positionsDepartmentSlice'
import {
  convertCurrency,
  toLowerCaseNonAccentVietnamese
} from 'store/helper/functionHelper'

const ChoosePosition = (props) => {
  const {
    companyId,
    departmentId,
    companyAvatar,
    departmentName,
    handleChoosePosition = () => {},
    handleClickBack = () => {},
    handleClickTurnRecruitment = () => {},
    onCloseModal = () => {}
  } = props

  const { push } = useRouter()
  const dispatch = useDispatch()

  const positionList = useSelector(selectAllDepartmentPositionEdit)

  const [positionTempList, setPositionTempList] = useState([])
  const [keyword, setKeyword] = useState('')
  useEffect(() => {
    let result
    if (positionList?.length > 0) {
      result = positionList?.filter((el) =>
        toLowerCaseNonAccentVietnamese(el?.name).includes(
          toLowerCaseNonAccentVietnamese(keyword)
        )
      )
      setPositionTempList(result)
    } else {
      setPositionTempList(positionList)
    }
  }, [keyword, positionList, departmentId])
  useEffect(() => {
    if (departmentId) {
      dispatch(getAllDepartmentPositionsEdit({ departmentId }))
    }
  }, [departmentId])
  return (
    <div className="w-full ">
      <div className="">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-8">
            <div onClick={() => handleClickBack()} className="cursor-pointer ">
              <XProfileIcon name="arrowBackTest" width="24" height="24" />
            </div>
            <p className="text-h3 text-black line-clamp-1">
              Các vị trí trong {departmentName}
            </p>
          </div>
        </div>

        <p className="text-p18 text-grey-1 mb-4">
          Bật tuyển dụng cho vị trí công việc mà doanh nghiệp của bạn muốn tuyển
        </p>
        <div className="relative  w-full mb-4">
          <div className="absolute  inset-y-0 left-2 flex items-center pl-2 ">
            <XProfileIcon name="searchNavBar" width="20" height="20" />
          </div>
          <input
            className="sm:text-p16 text-p12 py-3 placeholder:text-grey-3 w-full pl-11 bg-light-nude rounded-xl focus:outline-none"
            placeholder="Tìm kiếm công việc"
            maxLength={255}
            onChange={(e) => setKeyword(e.target.value.trim())}
          />
        </div>
        <div className="max-w-[1140px] my-8 h-[340px] overflow-y-auto custom-scrollbar ">
          {positionTempList?.length > 0 && (
            <div className=" grid grid-cols-2 gap-4  mx-auto ">
              {Array.from(positionTempList)?.map((position) => {
                const {
                  shortDescription,
                  name,
                  departmentPositionId,
                  currentRecruitmentCampaignId,
                  averageSalary,
                  maxSalary
                } = position
                return (
                  <div
                    key={departmentPositionId}
                    // onClick={() => handleChoosePosition(departmentId)}
                    className="flex items-start justify-between gap-4 p-6 h-fit rounded-2xl transition-all cursor-pointer border border-grey-4"
                  >
                    <div className="flex items-start gap-4 ">
                      <div className="relative min-w-16 w-16 h-16 rounded-full overflow-hidden border border-grey-4">
                        {companyAvatar ? (
                          <Image
                            src={companyAvatar}
                            alt=""
                            layout="fill"
                            className="rounded-full"
                            objectFit="cover"
                          />
                        ) : (
                          <div className="bg-white">
                            <Image
                              src={'/images/empty.svg'}
                              alt=""
                              layout="fill"
                              className="rounded-lg"
                              objectFit="contain"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 w-[264px]">
                        <p className="text-p18-bold  line-clamp-1 overflow-hidden overflow-ellipsis">
                          {name || 'Phòng ban mới'}
                        </p>

                        {/* {shortDescription || 'Mô tả ngắn'} */}
                        {((maxSalary === 0 && averageSalary !== 0) ||
                          (maxSalary !== 0 &&
                            averageSalary !== 0 &&
                            maxSalary === averageSalary)) && (
                          <p className="text-p16  max-w-[240px] whitespace-nowrap overflow-hidden overflow-ellipsis">
                            {'Mức lương'}:{' '}
                            {convertCurrency(averageSalary || 0, false)}
                          </p>
                        )}
                        {maxSalary !== 0 && maxSalary !== averageSalary && (
                          <p className="text-p16  max-w-[240px] whitespace-nowrap overflow-hidden overflow-ellipsis">
                            {'Khoảng lương'}:{' '}
                            {convertCurrency(averageSalary || 0, false)}-
                            {convertCurrency(maxSalary || 0, false)}
                          </p>
                        )}
                        {maxSalary === 0 && averageSalary === 0 && (
                          <p className="text-p16  max-w-[240px]  overflow-hidden overflow-ellipsis">
                            {'Mức lương'}: Thoả thuận
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="relative  items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={currentRecruitmentCampaignId ? true : false}
                          className="sr-only peer"
                          onChange={(e) => {
                            if (!currentRecruitmentCampaignId) {
                              handleClickTurnRecruitment(departmentPositionId)
                            }
                          }}
                        />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none  peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] peer-checked:after:left-[5px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-light"></div>
                      </label>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          {positionTempList?.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center ">
              <div className="relative w-[200px] h-[200px] mb-2">
                <Image src="/images/empty.png" alt="" layout="fill" />
              </div>
              <p className="text-p16 text-grey-1 max-w-[524px] text-center mb-10">
                Hiện doanh nghiệp của bạn chưa có vị trí công việc nào. Hãy tạo
                vị trí công việc cho doanh nghiệp của bạn ở Hồ sơ công ty
              </p>
              <Button
                title="Đến trang hồ sơ công ty"
                width="xl:w-[279px]"
                height="h-[48px]"
                textWeight="sm:text-p18-bold text-p14 font-bold "
                background="bg-button"
                color="text-neutral"
                // hover="hover:bg-nude"
                rounded="rounded-lg "
                padding="px-8 py-3"
                onClick={() => {
                  window.open(
                    `/profile-company/${companyId}/${departmentId}/edit?focus=position`
                  )
                }}
              />
            </div>
          )}
        </div>
      </div>
      {positionTempList?.length > 0 && (
        <div className=" w-full  sticky py-2 ">
          <div className="flex items-center justify-between gap-4">
            <Button
              title="Thêm vị trí tuyển dụng mới"
              width="xl:w-[306px]"
              height="h-[56px]"
              textWeight="sm:text-p18-bold text-p14 font-bold "
              background="bg-white"
              color="text-neutral"
              hover="hover:bg-nude"
              rounded="rounded-lg border border-grey-3"
              padding="px-8 py-3"
              onClick={() => {
                window.open(
                  `/profile-company/${companyId}/${departmentId}/edit?focus=position`
                )
              }}
            />
            <Button
              title="Xong"
              width="xl:w-[112px]"
              height="h-[56px]"
              textWeight="sm:text-p18-bold text-p14 font-bold "
              background="bg-button"
              color="text-neutral"
              rounded="rounded-lg "
              padding="px-8 py-3"
              onClick={() => onCloseModal()}
            />
          </div>
        </div>
      )}
    </div>
  )
}

ChoosePosition.propTypes = {
  toggleModal: PropTypes.func
}

ChoosePosition.defaultProps = {
  toggleModal: () => {}
}

export default ChoosePosition
