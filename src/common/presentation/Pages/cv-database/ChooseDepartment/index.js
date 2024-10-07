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
import { toLowerCaseNonAccentVietnamese } from 'store/helper/functionHelper'

const ChooseDepartment = (props) => {
  const {
    companyId,
    handleChooseDepartment = () => {},
    onCloseModal = () => {}
  } = props
  const { push } = useRouter()
  const dispatch = useDispatch()

  const departmentList = useSelector(selectAllDepartmentsEdit)
  const [departmentTempList, setDepartmentTempList] = useState([])
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    let result
    if (departmentList?.length > 0) {
      result = departmentList?.filter((el) =>
        toLowerCaseNonAccentVietnamese(el?.name).includes(
          toLowerCaseNonAccentVietnamese(keyword)
        )
      )
      setDepartmentTempList(result)
    }
  }, [keyword, departmentList])
  useEffect(() => {
    if (companyId) {
      dispatch(getAllDepartmentsEdit({ companyId }))
    }
  }, [companyId])
  return (
    <div className="w-full ">
      <div className="">
        <div className="flex items-center justify-between mb-4">
          <p className="text-h3 text-black">Các phòng ban</p>
          <div onClick={() => onCloseModal()} className="cursor-pointer ">
            <XProfileIcon name="cancel" width="16" height="16" />
          </div>
        </div>

        <p className="text-p18 text-grey-1 mb-4">
          Chọn phòng ban mà doanh nghiệp của bạn muốn tuyển dụng
        </p>
        <div className="relative  w-full mb-4">
          <div className="absolute  inset-y-0 left-2 flex items-center pl-2 ">
            <XProfileIcon name="searchNavBar" width="20" height="20" />
          </div>
          <input
            className="sm:text-p16 text-p12 py-3 placeholder:text-grey-3 w-full pl-11 bg-light-nude rounded-xl focus:outline-none"
            placeholder="Tìm kiếm phòng ban"
            maxLength={255}
            onChange={(e) => setKeyword(e.target.value.trim())}
          />
        </div>

        <div className="max-w-[1140px] my-8 h-[340px] overflow-y-auto custom-scrollbar flex flex-col gap-4  mx-auto ">
          {departmentTempList?.length > 0 &&
            Array.from(departmentTempList)?.map((department) => {
              const { description, imageUrl, name, departmentId } =
                department || {}
              return (
                <div
                  key={departmentId}
                  onClick={() => handleChooseDepartment(departmentId, name)}
                  className="flex items-start gap-6 p-2 hover:bg-light-nude rounded-lg transition-all cursor-pointer"
                >
                  <div className="relative  min-w-[187px] h-24 rounded-lg overflow-hidden border border-grey-4">
                    {imageUrl ? (
                      <Image
                        src={imageUrl || '/images/empty.svg'}
                        alt=""
                        layout="fill"
                        className="rounded-lg"
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
                  <div className="flex flex-col gap-1">
                    <p className="text-p18-bold line-clamp-1">
                      {name || 'Phòng ban mới'}
                    </p>
                    <p className="text-p16 line-clamp-2">
                      {description || 'Mô tả ngắn'}
                    </p>
                  </div>
                </div>
              )
            })}

          {departmentTempList?.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center ">
              <div className="relative w-[200px] h-[200px] mb-2">
                <Image src="/images/empty.png" alt="" layout="fill" />
              </div>
              <p className="text-p16 text-grey-1 max-w-[524px] text-center mb-10">
                Hiện doanh nghiệp của bạn chưa có phòng ban. Hãy tạo phòng ban
                cho doanh nghiệp của bạn ở Hồ sơ công ty
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
                    `/profile-company/${companyId}/edit?focus=department`
                  )
                }}
              />
            </div>
          )}
        </div>
      </div>
      {departmentTempList?.length > 0 && (
        <div className=" w-full  sticky py-2 flex items-center justify-start">
          <div className="flex items-center justify-start gap-4">
            <Button
              title="Thêm phòng ban mới"
              width="xl:w-[254px]"
              height="h-[56px]"
              textWeight="sm:text-p18-bold text-p14 font-bold "
              background="bg-white"
              color="text-neutral"
              hover="hover:bg-nude"
              rounded="rounded-lg border border-grey-3"
              padding="px-8 py-3"
              onClick={() => {
                window.open(
                  `/profile-company/${companyId}/edit?focus=department`
                )
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

ChooseDepartment.propTypes = {
  toggleModal: PropTypes.func
}

ChooseDepartment.defaultProps = {
  toggleModal: () => {}
}

export default ChooseDepartment
