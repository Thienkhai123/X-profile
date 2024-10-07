import React, { useEffect, useRef, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  getAllDistricts,
  getAllWards,
  selectCitySort,
  selectDistrictsSort,
  selectWardsSort
} from 'store/app/jobSlice'
import {
  selectFooterAddressBook,
  updateAddressBookCreate
} from 'store/app/edit-mode-company/profile/footerSlice'
import XProfileIcon from 'common/presentation/Icons'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'

const FormUpdateAddressCompany = (props) => {
  const {
    id = 'formUpdateAddressCompany',
    toggleModal,
    defaultValue,
    setStateParent,
    handleDeleteAddress,
    stateParent
  } = props
  const {
    wardId: defaultWardId,
    phone,
    name,
    email,
    districtName,
    districtId: defaultDistrictId,
    cityName,
    wardName,
    cityId: defaultCityId,
    addressDetail,
    isDefault,
    addressBookId
  } = defaultValue
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
    defaultValues: {
      ...defaultValue,
      cityId: defaultCityId,
      districtId: defaultDistrictId,
      wardId: defaultWardId,
      city: cityName,
      ward: wardName,
      district: districtName,
      nameAddress: name,
      phoneNumber: phone,
      fullDetailAddress: addressDetail,
      headQuaters: isDefault
    },
    resolver: yupResolver(schema)
  })

  const refCities = useRef(null)
  const refDistricts = useRef(null)
  const refWards = useRef(null)

  const [state, setState] = useState({
    tempCities: cities,
    tempDistricts: districts,
    tempWards: wards
  })
  const [showCities, setShowCities] = useState(false)
  const [showDistricts, setShowDistricts] = useState(false)
  const [showWards, setShowWards] = useState(false)
  const onSubmitFormUpdateAddress = (data) => {
    // Kiểm tra xem city , districts, wards có tồn tại trong danh sách tạm thời không
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
        addressBookId: addressBookId,
        isCreate: false,
        email: data?.email,
        phone: data?.phoneNumber,
        wardId: data?.wardId,
        districtId: data?.districtId,
        cityId: data?.cityId,
        name: data?.nameAddress,
        mailCompany: data?.email,
        isDefault: data?.headQuaters,
        addressDetail: data?.fullDetailAddress,
        googleMapUrl: '',
        lat: null,
        long: null,
        wardName: data?.ward,
        districtName: data?.district,
        cityName: data?.city
      }
      // Tìm ra địa chỉ cần cập nhật dựa trên ID hoặc ID tạm thời trước đó
      const foundAddressNeedUpdate = !defaultValue?.addressTemporaryId
        ? addressBooks?.find(
            (x) => x.addressBookId === defaultValue?.addressBookId
          )
        : addressBooks?.find(
            (x) => x.addressTemporaryId === defaultValue?.addressTemporaryId
          )
      // Tìm ra vị trí cần cập nhật của địa chỉ
      const indexItemUpdate = !defaultValue?.addressTemporaryId
        ? addressBooks?.findIndex(
            (x) => x.addressBookId === defaultValue?.addressBookId
          )
        : addressBooks?.findIndex(
            (x) => x.addressTemporaryId === defaultValue?.addressTemporaryId
          )
      // Ghi đè dữ liệu mới vào địa chỉ cần cập nhật --> Payload sau cùng
      const newDataUpdate = { ...foundAddressNeedUpdate, ...payload }
      // Thay thế dữ liệu mới vào vị trí cũ và bắt đầu cập nhật (update)
      const cloneAddressBooksUpdate = [...addressBooks]
      cloneAddressBooksUpdate?.splice(indexItemUpdate, 1, newDataUpdate)

      // flow thay thế is default = false khi chọn địa chỉ hiển tại làm dịa chỉ chính
      const foundHeadQuaters = addressBooks?.find((x) => x.isDefault === true)
      const indexItemIsDefault = addressBooks?.findIndex(
        (x) => x.isDefault === true
      )
      //Kiểm tra xem địa chỉ mặc định trước đó thuộc sổ địa chỉ pha-ke hay thuộc sổ địa chỉ thật
      const tempIsDefault = !defaultValue?.addressTemporaryId
        ? foundHeadQuaters?.addressBookId !== newDataUpdate?.addressBookId
        : foundHeadQuaters?.addressTemporaryId !==
          newDataUpdate?.addressTemporaryId
      if (payload?.isDefault && tempIsDefault) {
        // Cập nhật địa chỉ mặc định trước đó trở thành false nếu đã chọn địa chỉ hiện tai làm địa chỉ chính (payload?.isDefault = true)
        const tmp = { ...foundHeadQuaters, isDefault: false }
        cloneAddressBooksUpdate?.splice(indexItemIsDefault, 1, tmp)
        dispatch(updateAddressBookCreate(cloneAddressBooksUpdate))
      } else {
        const isHaveDefaultInListAddress = cloneAddressBooksUpdate?.some(
          (x) => x?.isDefault === true
        )
        if (isHaveDefaultInListAddress) {
          // Cập nhật danh sách địa chỉ nếu đã có địa chỉ mặc định
          dispatch(updateAddressBookCreate(cloneAddressBooksUpdate))
        } else {
          return toast(
            AlertWaring({
              title: 'Sổ địa chỉ phải có địa chỉ mặc định '
            }),
            {
              toastId: 'alert-create-error',
              className: 'bg-toast-custom',
              closeButton: false,
              position: 'top-center',
              hideProgressBar: true,
              autoClose: 3000
            }
          )
        }
      }
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

  useEffect(() => {
    const fetchInitData = async () => {
      const actions = []
      actions.push(
        getAllDistricts({ cityId: defaultCityId }),
        getAllWards({ districtId: defaultDistrictId })
      )
      const results = await Promise.all(
        actions.map((action) => dispatch(action))
      )
      const districtsData = results && results[0]?.payload?.data
      const wardsData = results && results[1]?.payload?.data
      setState({
        ...state,
        tempDistricts: districtsData,
        tempWards: wardsData
      })
    }
    if (defaultCityId && defaultDistrictId) {
      fetchInitData()
    }
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultCityId, defaultDistrictId])

  return (
    <form
      id={id}
      onSubmit={handleSubmit(onSubmitFormUpdateAddress)}
      className="h-full"
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex-1 overflow-y-auto custom-scrollbar my-10 pr-4">
          <div className="flex flex-col gap-x-4 mb-4">
            <label className="text-p18 text-black">Tên địa chỉ</label>
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
            <div className="relative cities" ref={refCities}>
              <div
                className={`w-full flex justify-between py-2 gap-2 px-6 items-center border ${
                  errors?.city?.message
                    ? 'border-semantic-red'
                    : 'border-grey-3'
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
                        onClick={() =>
                          handleChooseCity(city?.cityId, city?.name)
                        }
                      >
                        <p>{city?.name}</p>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
            <div className="flex  w-full gap-6">
              <div className="relative w-1/2 district" ref={refDistricts}>
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
            <div className="flex flex-col gap-x-4">
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
            <div className="flex flex-col gap-x-4 mb-1 ">
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
        </div>
        <div className="flex justify-between items-center mb-10">
          <button
            onClick={() =>
              handleDeleteAddress(
                stateParent?.defaultValueAddress?.addressBookId,
                stateParent?.defaultValueAddress?.addressTemporaryId
              )
            }
            className="py-3 px-8 bg-white text-semantic-red border-semantic-red border text-p18-bold rounded-lg line-clamp-1 hover:opacity-80 duration-200"
          >
            Xoá địa chỉ
          </button>
          <div className="flex gap-4 justify-end items-center">
            <button
              onClick={() =>
                setStateParent({ ...stateParent, isUpdateAddress: false })
              }
              className="py-3 px-8 bg-grey-4 text-p18-bold rounded-lg line-clamp-1 hover:opacity-80 duration-200"
            >
              Huỷ
            </button>
            <button
              className="py-3 px-8 bg-button text-p18-bold rounded-lg line-clamp-1 hover:opacity-80 duration-200"
              form="formUpdateAddressCompany"
              type="submit"
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

FormUpdateAddressCompany.propTypes = {}

export default FormUpdateAddressCompany
