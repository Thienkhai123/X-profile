import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { registerVerify } from 'store/app/authSlice'
import InputFloat from '../InputFloat'
import SocialLogin from '../SocialLogin'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'
import LoadingView from 'common/presentation/Loading/LoadingView'
import { unwrapResult } from '@reduxjs/toolkit'

const FormVerifyEmail = (props) => {
  const { setRegisterEmail, nextStep } = props
  const dispatch = useDispatch()
  const loading = useSelector((state) =>
    selectLoading(state, APP_TYPES.AUTH.REGISTERVERIFY)
  )
  const [termsOfUse, setTermsOfUse] = useState({
    sendMail: false,
    termOfService: false
  })
  const [errorValidateMessage, setErrorValidateMessage] = useState('')
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Email không hợp lệ!')
      .required('Email không được để trống')
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const onSubmit = async (data) => {
    const fetchVerifyEmail = await dispatch(
      registerVerify('?email=' + data.email)
    )
    const response = unwrapResult(fetchVerifyEmail)
    if (response?.data) {
      setRegisterEmail(data.email)
      nextStep()
    } else {
      setErrorValidateMessage(response?.errorMessage)
    }
  }

  useEffect(() => {
    setErrorValidateMessage('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch().email])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <p className="lg:hidden text-p20-bold text-center">Đăng Ký</p>
      <p className="text-center lg:text-left text-black lg:text-[28px] text-[14px] lg:font-bold mb-[24px]">
        Tạo tài khoản miễn phí
      </p>
      <div className="mb-[20px]">
        <InputFloat
          label="Địa chỉ email"
          name="email"
          register={register}
          iconName="mail"
          errorMessage={errors?.email?.message}
          errorValidateMessage={errorValidateMessage}
        />
      </div>

      <div className="flex items-center gap-[12px] mb-[8px]">
        <input
          type="checkbox"
          className="accent-semantic-green w-[16px] h-[16px] cursor-pointer hover:brightness-125"
          checked={termsOfUse.termOfService}
          onChange={(e) => {
            setTermsOfUse({ ...termsOfUse, termOfService: e.target.checked })
          }}
        />
        <div className="flex gap-[4px] items-center">
          <p className="text-grey-1 lg:text-[16px] text-[12px]">
            Tôi đồng ý với
          </p>
          <Link
            href="https://blog.xprofile.vn/dieu-khoan-su-dung-website"
            passHref
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-semantic-text-link lg:text-[16px] text-[12px] cursor-pointer hover:opacity-80"
            >
              Điều khoản sử dụng
            </a>
          </Link>
          <p className="text-grey-1 lg:text-[16px] text-[12px]">
            của X-Profile
          </p>
        </div>
      </div>
      <div className="flex items-center gap-[12px] mb-[34px]">
        <input
          type="checkbox"
          className="accent-semantic-green w-[16px] h-[16px] cursor-pointer hover:brightness-125"
          checked={termsOfUse.sendMail}
          onChange={(e) => {
            setTermsOfUse({ ...termsOfUse, sendMail: e.target.checked })
          }}
        />
        <p className="text-grey-1 lg:text-[16px] text-[12px]">
          Gửi cho tôi những cập nhật mới nhất từ X-Profile
        </p>
      </div>
      <div className="mb-[20px]">
        <button
          type="submit"
          disabled={!isValid || !termsOfUse.termOfService || loading}
          className="w-full py-[12px] flex items-center justify-center bg-button rounded-[8px] text-black font-bold disabled:bg-grey-2 disabled:text-white hover:opacity-80"
        >
          {loading && (
            <div className="mr-1">
              <LoadingView height="20px" width="20px" color="#fff" />
            </div>
          )}
          Tạo tài khoản
        </button>
      </div>
      <SocialLogin />
    </form>
  )
}

FormVerifyEmail.propTypes = {
  setRegisterEmail: PropTypes.func,
  nextStep: PropTypes.func
}

FormVerifyEmail.defaultProps = {
  setRegisterEmail: () => {},
  nextStep: () => {}
}

export default FormVerifyEmail
