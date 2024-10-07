import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import InputFloat from '../InputFloat'
import Select from '../Select'
import { useEffect, useRef, useState } from 'react'
import {
  getCity,
  registerAccount,
  selectCity,
  selectEmailPassword
} from 'store/app/authSlice'
import Option from '../Option'
import { NotificationModal } from 'common/presentation/Notification/Modal'
import useTrans from 'common/hooks/useTrans'
import { loginAfterSignup } from 'store/helper/serviceHelper'
import XProfileIcon from 'common/presentation/Icons'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import { useRouter } from 'next/router'

export const FormInformation = ({ registerPayload }) => {
  const trans = useTrans()
  const dispatch = useDispatch()
  const cities = useSelector(selectCity)
  const emailPassword = useSelector(selectEmailPassword)
  const { query } = useRouter()
  console.log(query)
  const refCities = useRef(null)

  const [state, setState] = useState({
    showCities: false,
    showDistricts: false,
    showWards: false,
    tempCities: []
  })

  const schema = yup.object().shape({
    firstName: yup.string().required('Họ không được để trống'),
    lastName: yup.string().required('Tên không được để trống'),
    jobTitle: yup.string().required('Nghề nghiệp không được để trống'),
    city: yup.string(),
    cityId: yup.string()
  })
  const [modals, setModals] = useState({
    login: {
      success: false,
      error: false
    }
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const handleChooseCity = async (id, val) => {
    setValue('city', val)
    setValue('cityId', id)
    setState({
      ...state,
      showCities: false,
      showDistricts: false
    })
  }

  const onSubmit = async (data) => {
    // const data = {...data, cityId: data?.}
    const res = await dispatch(
      registerAccount({
        ...registerPayload,
        ...data,
        affiliate: query?.ref
      })
    )

    if (res?.payload?.data?.errorMessage) {
      setModals({ ...modals, login: { ...modals.login, error: true } })
    } else {
      setModals({
        ...modals,
        login: { ...modals.login, success: true }
      })
    }
  }
  const handleCloseSuccesModal = () => {
    loginAfterSignup(emailPassword.email, emailPassword.password)
    setModals({
      ...modals,
      login: { ...modals.login, success: !modals.login.success }
    })
  }

  const queryCityByName = (val) => {
    const tempArr = [...cities]
    const filterCities = tempArr?.filter((city) =>
      city?.name?.toLowerCase().includes(val?.toLowerCase())
    )
    setState({ ...state, tempCities: filterCities })
  }

  const handleCloseCities = () => {
    setState({ ...state, showCities: false })
  }

  useOnClickOutside(refCities, handleCloseCities)

  useEffect(() => {
    dispatch(getCity())
  }, [dispatch])
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <p className="text-black lg:text-[28px] text-p20-bold text-center lg:text-left font-bold mb-[24px]">
        Thông tin của bạn
      </p>
      <div className="mb-[20px]">
        <InputFloat
          label="Họ"
          name="firstName"
          register={register}
          errorMessage={errors?.firstName?.message}
          maxLength={50}
        />
      </div>

      <div className="mb-[20px]">
        <InputFloat
          label="Tên"
          name="lastName"
          register={register}
          errorMessage={errors?.lastName?.message}
          maxLength={50}
        />
      </div>

      <div className="mb-[20px]">
        <InputFloat
          label="Nghề nghiệp"
          name="jobTitle"
          register={register}
          errorMessage={errors?.jobTitle?.message}
          maxLength={50}
        />
      </div>

      <div className="mb-[32px]">
        <div className="relative" ref={refCities}>
          <div
            className={`w-full flex justify-between px-[20px] pb-2.5 pt-4 gap-2  items-center border border-[#999999] rounded-lg`}
            onClick={() =>
              setState({
                ...state,
                showCities: true,
                showWards: false,
                showDistricts: false
              })
            }
          >
            <label className="absolute  text-p14 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 left-[24px] text-grey-2">
              Địa chỉ
              <span className="text-semantic-red ml-1">*</span>
            </label>
            <input
              autoComplete="off"
              placeholder="Chọn Tỉnh/Thành Phố"
              className="outline-0 sm:text-p14 text-p12 text-black  placeholder:text-[#999999] w-full px-2.5"
              {...register('city')}
              onChange={(e) => queryCityByName(e.target.value)}
            />
            <XProfileIcon name="arrowDown" />
          </div>
          {state?.showCities && (
            <div className="bg-white max-h-[180px] w-full overflow-x-hidden absolute top-[64px]   items-center border border-grey-3 rounded-lg custom-scrollbar z-10 -mt-4">
              {state?.tempCities.length === 0 &&
                cities?.map((city, ind) => {
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
              {state?.tempCities.length > 0 &&
                state?.tempCities?.map((city, ind) => {
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
      </div>

      <div className="mb-[14px]">
        <button
          type="submit"
          disabled={!isValid}
          className="w-full py-[12px] bg-button rounded-[8px] text-black font-bold disabled:bg-grey-2 disabled:text-white hover:opacity-80"
        >
          Hoàn thành
        </button>
      </div>
      <NotificationModal
        icon="tick"
        title={trans.MESSAGE?.loginSuccess?.title}
        description={trans.MESSAGE?.loginSuccess?.description}
        btnClickTitle={trans.MESSAGE?.loginSuccess?.buttonClick}
        open={modals.login.success}
        onCloseModal={() => handleCloseSuccesModal()}
        onClick={() => handleCloseSuccesModal()}
      />
      <NotificationModal
        icon="cancelModal"
        title={trans.MESSAGE?.loginError?.title}
        description={trans.MESSAGE?.loginError?.description}
        btnClickTitle={trans.MESSAGE?.loginError?.buttonClick}
        open={modals.login.error}
        onCloseModal={() =>
          setModals({
            ...modals,
            login: { ...modals.login, error: !modals.login.error }
          })
        }
        onClick={() =>
          setModals({
            ...modals,
            login: { ...modals.login, error: !modals.login.error }
          })
        }
      />
    </form>
  )
}
