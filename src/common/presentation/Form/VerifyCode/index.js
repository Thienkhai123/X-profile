import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import PropTypes from 'prop-types'
import InputFloat from '../InputFloat'
import SocialLogin from '../SocialLogin'
import { registerVerifyCode } from 'store/app/authSlice'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'
import LoadingView from 'common/presentation/Loading/LoadingView'
import { unwrapResult } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'

const FormVerifyCode = (props) => {
  const { email, nextStep } = props
  const dispatch = useDispatch()
  const loading = useSelector((state) =>
    selectLoading(state, APP_TYPES.AUTH.REGISTERVERIFYCODE)
  )
  const [errorValidateMessage, setErrorValidateMessage] = useState('')

  const schema = yup.object().shape({
    code: yup.string().required('Mã xác thực không được để trống')
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
    const fetchVerifyCode = await dispatch(
      registerVerifyCode('?email=' + email + '&code=' + data.code)
    )
    const result = unwrapResult(fetchVerifyCode)
    if (result?.data) {
      nextStep()
    } else {
      setErrorValidateMessage(result?.errorMessage)
    }
  }

  useEffect(() => {
    setErrorValidateMessage('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch().code])

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
      <SocialLogin />
    </form>
  )
}

FormVerifyCode.propTypes = {
  email: PropTypes.string,
  nextStep: PropTypes.func
}

FormVerifyCode.defaultProps = {
  email: '',
  nextStep: () => {}
}

export default FormVerifyCode
