import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import PropTypes from 'prop-types'
import { forgotPasswordSendEmail } from 'store/app/authSlice'
import InputFloat from '../InputFloat'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'
import LoadingView from 'common/presentation/Loading/LoadingView'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'

const FormVerifyEmailForgotPassword = (props) => {
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
      forgotPasswordSendEmail({
        email: data.email
      })
    )
    const response = unwrapResult(fetchVerifyEmail)
    if (response?.isSuccess) {
      setRegisterEmail(data.email)
      nextStep()
    } else {
      toast(
        AlertError({
          title: response?.errorMessage
        }),
        {
          toastId: 'Auth_error',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <p className="lg:hidden text-p20-bold text-center">Đăng Ký</p>
      <p className="text-center lg:text-left text-black lg:text-[28px] text-[14px] lg:font-bold mb-[24px]">
        Xác thực Email
      </p>
      <div className="mb-4">
        <InputFloat
          label="Địa chỉ email"
          name="email"
          register={register}
          iconName="mail"
          errorMessage={errors?.email?.message}
          errorValidateMessage={errorValidateMessage}
        />
      </div>

      <div className="mb-[20px]">
        <button
          type="submit"
          disabled={!isValid || loading}
          className="w-full py-[12px] flex items-center justify-center bg-button rounded-[8px] text-black font-bold disabled:bg-grey-2 disabled:text-white hover:opacity-80"
        >
          {loading && <LoadingView height="20px" width="20px" color="#fff" />}
          Xác nhận
        </button>
      </div>
    </form>
  )
}

FormVerifyEmailForgotPassword.propTypes = {
  setRegisterEmail: PropTypes.func,
  nextStep: PropTypes.func
}

FormVerifyEmailForgotPassword.defaultProps = {
  setRegisterEmail: () => {},
  nextStep: () => {}
}

export default FormVerifyEmailForgotPassword
