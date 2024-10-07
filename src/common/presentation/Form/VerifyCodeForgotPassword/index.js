import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import PropTypes from 'prop-types'
import InputFloat from '../InputFloat'
import { forgotPasswordUpdate } from 'store/app/authSlice'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'
import LoadingView from 'common/presentation/Loading/LoadingView'
import { unwrapResult } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import SurveyStep from 'common/presentation/Pages/Survey/SurveyStep'
import Validation from '../Validation'
import InputFloatHidden from '../InputFloatHidden'
import { SIGNUPVALIDATE } from 'common/presentation/Pages/SignUp/constant'
import { handleValidate } from 'store/helper/functionHelper'
import { useRouter } from 'next/router'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'

const FormVerifyCodeForgotPassword = (props) => {
  const { email, nextStep, setRegisterCode = () => {} } = props
  const dispatch = useDispatch()
  const { push } = useRouter()
  const loading = useSelector((state) =>
    selectLoading(state, APP_TYPES.AUTH.REGISTERVERIFYCODE)
  )
  const [errorValidateMessage, setErrorValidateMessage] = useState('')
  const [validationIds, setValidationIds] = useState([])

  const schema = yup.object().shape({
    code: yup.string().required('Mã xác thực không được để trống'),
    newPassword: yup.string().required('Password không được để trống'),
    reEnterPassword: yup
      .string()
      .oneOf(
        [yup.ref('newPassword'), null],
        'Mật khẩu xác nhận không trùng khớp'
      )
      .required('Password không được để trống')
  })

  const {
    register,
    handleSubmit,
    watch,
    setError,

    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const watchPassword = watch('newPassword')
  const watchReEnterPassword = watch('reEnterPassword')

  const onSubmit = async (data) => {
    const fetchVerifyEmail = await dispatch(
      forgotPasswordUpdate({
        email: email,
        ...data
      })
    )
    const response = unwrapResult(fetchVerifyEmail)
    if (response?.isSuccess) {
      toast(
        AlertSuccess({
          title: 'Cập nhật thành công'
        }),
        {
          toastId: 'alert-save-success',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
      push('/sign-in')
    } else {
      toast(
        AlertError({
          title: 'Có lỗi xảy ra'
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

  useEffect(() => {
    setErrorValidateMessage('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch().code])

  useEffect(() => {
    if (watchPassword !== watchReEnterPassword) {
      setError('reEnterPassword', {
        type: 'custom',
        message: 'Mật khẩu xác nhận không trùng khớp'
      })
    } else {
      setError('reEnterPassword', {
        type: 'custom',
        message: ''
      })
    }
    handleValidate(watchPassword, validationIds, setValidationIds)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchPassword])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <p className="text-black text-[28px] font-bold mb-[24px]">
        Nhập mã xác thực
      </p>
      <div className="mb-[20px]">
        <InputFloat
          label="Mã xác thực"
          name="code"
          register={register}
          iconName="mail"
          errorMessage={errors?.code?.message}
          errorValidateMessage={errorValidateMessage}
        />
      </div>
      <div className="mb-[20px]">
        <InputFloatHidden
          label="Mật khẩu"
          name="newPassword"
          register={register}
          iconName="eye"
          errorMessage={errors?.newPassword?.message}
        />
      </div>
      <div className="mb-[20px]">
        <InputFloatHidden
          label="Nhập lại mật khẩu"
          name="reEnterPassword"
          register={register}
          iconName="eye"
          errorMessage={errors?.reEnterPassword?.message}
        />
      </div>

      <div className="mb-4">
        <SurveyStep
          length={5}
          width="w-full"
          grid="grid grid-cols-5"
          typeSurvey={validationIds.length + 1}
          bg="bg-semantic-green"
        />
      </div>
      <div className="flex flex-col gap-2 mb-4">
        {SIGNUPVALIDATE.map((val, ind) => (
          <Validation
            key={ind}
            text={val}
            active={validationIds.includes(ind)}
          />
        ))}
      </div>

      <div className="mb-[22px]">
        <button
          type="submit"
          disabled={!isValid || loading}
          className="w-full py-[12px] bg-button rounded-[8px] text-black font-bold disabled:bg-grey-2 disabled:text-white hover:opacity-80"
        >
          {loading && <LoadingView height="20px" width="20px" color="#fff" />}
          Xác nhận
        </button>
      </div>
    </form>
  )
}

FormVerifyCodeForgotPassword.propTypes = {
  email: PropTypes.string,
  nextStep: PropTypes.func
}

FormVerifyCodeForgotPassword.defaultProps = {
  email: '',
  nextStep: () => {}
}

export default FormVerifyCodeForgotPassword
