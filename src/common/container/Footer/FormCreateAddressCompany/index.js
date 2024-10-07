import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm, useWatch } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  getAllDistricts,
  getAllWards,
  selectAllDistricts,
  selectAllWards,
  selectCitySort,
  selectDistrictsSort,
  selectJobCities,
  selectWardsSort,
  updateAddressBook
} from 'store/app/jobSlice'
import {
  selectFooterAddressBook,
  updateAddressBookCreate
} from 'store/app/edit-mode-company/profile/footerSlice'
import XProfileIcon from 'common/presentation/Icons'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import { unwrapResult } from '@reduxjs/toolkit'
import { isEmpty, uniqueId } from 'lodash'

const FormCreateAddressCompany = (props) => {
  const { id = 'formCreateAddressCompany', toggleModal } = props
  const cities = useSelector(selectCitySort)
  const districts = useSelector(selectDistrictsSort)
  const wards = useSelector(selectWardsSort)
  const addressBooks = useSelector(selectFooterAddressBook)
  const dispatch = useDispatch()

  const schema = yup.object().shape({
    city: yup.string().required('Thành phố không được để trống'),
    district: yup.string().required('Quận/Huyện không được để trống'),
    ward: yup.string().required('Phường/Xã không được để trống'),
    nameAddress: yup.string().required('Không được để trống ô'),
    fullDetailAddress: yup.string().required('Không được để trống ô'),
    phoneNumber: yup
      .string()
      // .required('Số điện thoại không được để trống')
      .matches(
        /(^^(09|03|07|08|05|02)+([0-9]{8,9})$)|^$/,
        'Số điện thoại không đúng định dạng'
      ),
    email: yup.string().email('Email không đúng định dạng'),
    // .required('Không được bỏ trống email'),
    headQuaters: yup.bool()
  })
  // implement useForm
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const cityId = watch('cityId')
  const districtId = watch('districtId')
  const wardId = watch('wardId')
  const refCities = useRef(null)
  const refDistricts = useRef(null)
  const refWards = useRef(null)

  const [state, setState] = useState({
    tempCities: cities,
    tempDistricts: [],
    tempWards: []
  })
  const [showCities, setShowCities] = useState(false)
  const [showDistricts, setShowDistricts] = useState(false)
  const [showWards, setShowWards] = useState(false)

  const onSubmitFormCreateAddress = (data) => {
    const isCityIncluded = state?.tempCities.some((x) => x.name === data?.city)
    const isDistrictIncluded = state?.tempDistricts.some(
      (x) => x.name === data?.district
    )
    const isWardIncluded = state?.tempWards.some((x) => x.name === data?.ward)
    if (
      isCityIncluded &&
      isDistrictIncluded &&
      isWardIncluded &&
      data?.wardId !== undefined &&
      data?.districtId !== undefined &&
      data?.cityId !== undefined
    ) {
      const payload = {
        addressBookId: 0,
        addressTemporaryId: uniqueId(),
        email: data?.email,
        phone: data?.phoneNumber,
        wardId: data?.wardId,
        wardName: data?.ward,
        districtName: data?.district,
        districtId: data?.districtId,
        cityId: data?.cityId,
        cityName: data?.city,
        name: data?.nameAddress,
        mailCompany: data?.email,
        isDefault: data?.headQuaters,
        addressDetail: data?.fullDetailAddress,
        isCreate: true,
        googleMapUrl: '',
        lat: null,
        long: null
      }
      if (payload?.isDefault) {
        // Nếu địa chỉ hiện tại làm địa chỉ chính -> Tìm ra địa chỉ chính trước đó và cho nó thành false
        const foundHeadQuaters = addressBooks?.find((x) => x.isDefault === true)
        const indexItemIsDefault = addressBooks?.findIndex(
          (x) => x?.isDefault === true
        )
        const tmp = { ...foundHeadQuaters, isDefault: false }
        const cloneAddressBooks = [...addressBooks]
        cloneAddressBooks?.splice(indexItemIsDefault, 1, tmp)
        dispatch(updateAddressBookCreate([...cloneAddressBooks, payload]))
      } else {
        dispatch(updateAddressBookCreate([...addressBooks, payload]))
      }
      reset()
      toggleModal()
    }
  }

  const handleCloseCities = () => setShowCities(false)
  useOnClickOutside(refCities, handleCloseCities)

  const handleCloseDistricts = () => setShowDistricts(false)
  useOnClickOutside(refDistricts, handleCloseDistricts)

  const handleCloseWards = () => setShowWards(false)
  useOnClickOutside(refWards, handleCloseWards)

  const queryCityByName = (val) => {
    const tempArr = [...cities]
    const filterCities = tempArr?.filter((city) =>
      city?.name?.toLowerCase().includes(val?.toLowerCase())
    )
    setState({ ...state, tempCities: filterCities })
  }
  const queryDistrictByName = (val) => {
    const tempArr = [...districts]
    const filterDistricts = tempArr?.filter((district) =>
      district?.name?.toLowerCase().includes(val?.toLowerCase())
    )
    setState({ ...state, tempDistricts: filterDistricts })
  }
  const queryWardByName = (val) => {
    const tempArr = [...wards]
    const filterWards = tempArr?.filter((ward) =>
      ward?.name?.toLowerCase().includes(val?.toLowerCase())
    )
    setState({ ...state, tempWards: filterWards })
  }

  const handleChooseCity = async (id, val) => {
    setValue('city', val)
    setValue('cityId', id)
    // Chọn thành phố mới thì phải reset giá trị của field district và ward
    setValue('district', '')
    setValue('districtId', '')
    setValue('ward', '')
    setValue('wardId', '')

    const getDistricts = await dispatch(
      getAllDistricts({ cityId: parseInt(id) })
    )
    const res = unwrapResult(getDistricts)
    if (res?.data) {
      setState({
        ...state,
        tempDistricts: res?.data
      })
      setShowCities(false)
    }
  }
  const handleChooseDistricts = async (id, val) => {
    setValue('district', val)
    setValue('districtId', id)
    // Khi chọn quận thì phải reset giá trị của phường về rỗng
    setValue('ward', '')
    setValue('wardId', '')
    const getWards = await dispatch(getAllWards({ districtId: parseInt(id) }))
    const res = unwrapResult(getWards)
    if (res?.data) {
      setState({
        ...state,
        tempWards: res?.data
      })
      setShowDistricts(false)
    }
  }
  const handleChooseWards = (id, val) => {
    setValue('ward', val)
    setValue('wardId', id)
    setShowWards(false)
  }
  return (
    <>
      <form
        id={id}
        onSubmit={handleSubmit(onSubmitFormCreateAddress)}
        className=""
      >
        <div className="flex flex-col gap-x-4 mb-4">
          <label className="text-p18 text-black mb-4">Tên địa chỉ</label>
          <input
            type="text"
            id={'nameAddress'}
            maxLength={30}
            className={`border  ${
              errors?.nameAddress?.message
                ? 'border-semantic-red'
                : 'border-grey-3'
            } rounded-lg px-6 py-2  placeholder:text-grey-3 focus:outline-none text-p18`}
            placeholder="Nhập tên địa chỉ"
            {...register('nameAddress')}
          />
          {errors?.nameAddress && (
            <span className="text-semantic-red text-p14">
              {errors?.nameAddress?.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-p18 text-black">Địa chỉ</label>
          <div className="relative" ref={refCities}>
            <div
              className={`w-full flex justify-between py-2 gap-2 px-6 items-center border ${
                errors?.city?.message ? 'border-semantic-red' : 'border-grey-3'
              } rounded-lg`}
              onClick={() => setShowCities(true)}
            >
              <input
                autoComplete="off"
                placeholder="Chọn Tỉnh/Thành Phố"
                className={`outline-0 sm:text-p18 text-p12 text-black   ${
                  errors?.city?.message
                    ? 'placeholder:text-semantic-red'
                    : 'placeholder:text-grey-3'
                }   w-full`}
                {...register('city')}
                onChange={(e) => queryCityByName(e.target.value)}
              />
              <XProfileIcon name="arrowDown" />
            </div>
            {showCities && (
              <div className="bg-white max-h-[180px] w-full overflow-x-hidden absolute top-[64px]   items-center border border-grey-3 rounded-lg custom-scrollbar z-10 -mt-4">
                {state?.tempCities?.map((city, ind) => {
                  return (
                    <div
                      key={ind}
                      className="flex justify-between items-center px-[24px] hover:bg-yellow-bg py-[10px]"
                      onClick={() => handleChooseCity(city?.cityId, city?.name)}
                    >
                      <p>{city?.name}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          <div className="flex  w-full gap-6">
            <div className="relative w-1/2" ref={refDistricts}>
              <div
                className={`w-full flex justify-between py-2 gap-2  px-6 items-center border ${
                  errors?.district?.message
                    ? 'border-semantic-red'
                    : 'border-grey-3'
                } rounded-lg`}
                onClick={() => setShowDistricts(true)}
              >
                <input
                  autoComplete="off"
                  placeholder="Chọn Quận/Huyện"
                  className={`outline-0 sm:text-p18 text-p12 text-black   ${
                    errors?.district?.message
                      ? 'placeholder:text-semantic-red'
                      : 'placeholder:text-grey-3'
                  }   w-full`}
                  {...register('district')}
                  onChange={(e) => queryDistrictByName(e.target.value)}
                />
                <XProfileIcon name="arrowDown" />
              </div>
              {showDistricts && (
                <div className="bg-white max-h-[180px] w-full overflow-x-hidden absolute top-[64px]  items-center border border-grey-3 rounded-lg custom-scrollbar z-10 -mt-4">
                  {state?.tempDistricts?.map((district, ind) => {
                    return (
                      <div
                        key={ind}
                        className="flex justify-between items-center px-[24px] hover:bg-yellow-bg py-[10px]"
                        onClick={() =>
                          handleChooseDistricts(
                            district?.districtId,
                            district?.name
                          )
                        }
                      >
                        <p>{district?.name}</p>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
            <div className="relative w-1/2" ref={refWards}>
              <div
                className={`w-full flex justify-between py-2 gap-2  px-6 items-center border ${
                  errors?.ward?.message
                    ? 'border-semantic-red'
                    : 'border-grey-3'
                } rounded-lg`}
                onClick={() => setShowWards(true)}
              >
                <input
                  autoComplete="off"
                  placeholder="Chọn Phường/Xã"
                  className={`outline-0 sm:text-p18 text-p12 text-black   ${
                    errors?.ward?.message
                      ? 'placeholder:text-semantic-red'
                      : 'placeholder:text-grey-3'
                  }   w-full`}
                  {...register('ward')}
                  onChange={(e) => queryWardByName(e.target.value)}
                />
                <XProfileIcon name="arrowDown" />
              </div>
              {showWards && (
                <div className="bg-white max-h-[180px] w-full overflow-x-hidden absolute top-[64px]   items-center border border-grey-3 rounded-lg custom-scrollbar z-10 -mt-4">
                  {state?.tempWards?.map((ward, ind) => {
                    return (
                      <div
                        key={ind}
                        className="flex justify-between items-center px-[24px] hover:bg-yellow-bg py-[10px]"
                        onClick={() =>
                          handleChooseWards(ward?.wardId, ward?.name)
                        }
                      >
                        <p>{ward?.name}</p>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-x-4 ">
            <input
              type="text"
              id={'nameAddress'}
              maxLength={110}
              className={`border ${
                errors?.fullDetailAddress?.message
                  ? 'border-semantic-red'
                  : 'border-grey-3'
              } rounded-lg px-6 py-2  placeholder:text-grey-3 focus:outline-none text-p18`}
              placeholder="Nhập địa chỉ chi tiết. VD: số nhà, tên đường"
              {...register('fullDetailAddress')}
            />
            {errors?.fullDetailAddress && (
              <span className="text-semantic-red text-p14">
                {errors?.fullDetailAddress?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-x-4 mb-1">
            <label className="text-p18 text-black mb-4">Số điện thoại</label>
            <input
              type="tel"
              id={'nameAddress'}
              className={`border ${
                errors?.phoneNumber?.message
                  ? 'border-semantic-red'
                  : 'border-grey-3'
              } rounded-lg px-6 py-2  placeholder:text-grey-3 focus:outline-none text-p18`}
              placeholder="Nhập số điện thoại"
              {...register('phoneNumber')}
            />
            {errors?.phoneNumber && (
              <span className="text-semantic-red text-p14">
                {errors?.phoneNumber?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-4 mb-8">
            <label className="text-p18 text-black">Email</label>
            <input
              type="email"
              id={'nameAddress'}
              maxLength={120}
              className="border border-grey-3 rounded-lg px-6 py-2  placeholder:text-grey-3 focus:outline-none text-p18"
              placeholder="Nhập Email"
              {...register('email')}
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <input
            {...register('headQuaters')}
            type="checkbox"
            id="switch"
            className="switch-input"
          />
          <label htmlFor="switch" className="switch"></label>
          <span className="bg-transparent">Chọn làm địa chỉ chính</span>
        </div>
      </form>
    </>
  )
}

FormCreateAddressCompany.propTypes = {}

export default FormCreateAddressCompany
