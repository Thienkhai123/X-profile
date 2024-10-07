import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import PasswordInput from './PasswordInput'
import Button from 'common/presentation/Button'
import { updateProfile } from 'store/app/userSlice'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'

const ChangePasswordEdit = (props) => {
  const schema = yup.object().shape({
    oldPassword: yup.string().trim().required('Mật khẩu không được để trống'),
    password: yup
      .string()
      .trim()
      .required('Mật khẩu không được để trống')
      .min(8, 'Mật khẩu tối thiểu 8 ký tự.')
      .test(
        'passwordRequirements',
        'Mật khẩu phải có chữ thường, chữ hoa ,số và ký tự đặc biệt',
        (value) =>
          [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
            pattern.test(value)
          )
      ),
    rePassword: yup
      .string()
      .trim()
      .required('Mật khẩu không được để trống')
      .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp')
  })
  const {} = props
  const loading = useSelector((state) =>
    selectLoading(state, APP_TYPES.USER.UPDATEPROFILE)
  )
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const updatePassword = async (payload) => {
    const updatePasswordProfile = await dispatch(updateProfile(payload))
    const { data } = unwrapResult(updatePasswordProfile)

    if (data?.errorMessage) {
      toast(
        AlertError({
          title: data?.errorMessage,
          description: 'Vui lòng thử lại trong giây lát.'
          // information: 'Tìm hiểu thêm',
        }),
        {
          toastId: 'alert-password-warning',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
      reset()
    } else {
      toast(
        AlertSuccess({
          title: 'Cập nhật thành công',
          description: 'Mật khẩu của bạn đã được ghi nhận.'
          // information: 'Tìm hiểu thêm'
        }),
        {
          toastId: 'alert-password-success',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
      reset()
    }
  }

  const onSubmit = (data) => {
    updatePassword(data)
  }
  return (
    <form className=" " onSubmit={handleSubmit(onSubmit)}>
      {/* {loading && <LoadingPage />} */}
      {/* Information */}
      <div className="">
        <p className="xl:block hidden text-p20-bold text-neutral mb-6">
          Đổi mật khẩu
        </p>

        <div className="w-full">
          <PasswordInput
            label="Mật khẩu cũ"
            placeholder="Nhập mật khẩu cũ"
            name="oldPassword"
            register={register}
            errorMessage={errors?.oldPassword?.message}
          />
          <PasswordInput
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            name="password"
            register={register}
            errorMessage={errors?.password?.message}
          />
          <PasswordInput
            label="Nhập lại mật khẩu mới"
            placeholder="Nhập lại mật khẩu mới"
            name="rePassword"
            register={register}
            errorMessage={errors?.rePassword?.message}
          />
          <div className="w-full flex justify-center xl:justify-end">
            <button
              type="submit"
              className="xl:w-[240px] w-full py-3 bg-button rounded-lg hover:opacity-70"
            >
              <p className="text-p18-bold">Lưu thông tin</p>
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ChangePasswordEdit
