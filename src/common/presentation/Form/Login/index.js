import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { login } from 'store/app/authSlice'
import InputFloat from '../InputFloat'
import InputFloatHidden from '../InputFloatHidden'
import Link from 'next/link'
import SocialLogin from '../SocialLogin'
import Image from 'next/image'

export const FormLogin = () => {
  const dispatch = useDispatch()
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Email không hợp lệ!')
      .required('Email không được để trống'),
    password: yup.string().required('Password không được để trống')
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const onSubmit = (data) => {
    dispatch(login(data))
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="lg:hidden w-[302px] h-[311px] mx-auto">
        <Image
          placeholder="blur"
          blurDataURL="/images/bearSignInMobile.png"
          src="/images/bearSignInMobile.png"
          alt=""
          width={906}
          height={933}
          objectFit="contain"
        />
      </div>
      <p className="lg:hidden text-p20-bold text-center">Đăng Nhập</p>
      <p className="text-black lg:text-[28px] text-[14px] lg:text-left text-center lg:font-bold mb-[24px]">
        Đăng nhập tài khoản
      </p>
      <div className="mb-[20px]">
        <InputFloat
          label="Địa chỉ email"
          name="email"
          register={register}
          iconName="mail"
          errorMessage={errors?.email?.message}
        />
      </div>
      <div className="mb-[32px]">
        <InputFloatHidden
          label="Mật khẩu"
          name="password"
          register={register}
          iconName="eye"
          errorMessage={errors?.password?.message}
        />
      </div>
      <div className="mb-[14px]">
        <button
          type="submit"
          disabled={!isValid}
          className="w-full py-[12px] bg-button rounded-[8px] text-black font-bold disabled:bg-grey-2 disabled:text-white hover:opacity-80"
        >
          Đăng nhập
        </button>
      </div>
      <div className="flex items-center justify-between mb-[24px]">
        <div className="flex items-center gap-[12px]">
          <input
            type="checkbox"
            className="accent-semantic-green w-[16px] h-[16px] cursor-pointer hover:brightness-125"
          />
          <p className="text-grey-1 text-[16px]">Ghi nhớ</p>
        </div>
        <Link href="/forgot-password">
          <p className="text-semantic-text-link text-[16px] cursor-pointer hover:opacity-80">
            Quên mật khẩu
          </p>
        </Link>
      </div>
      <SocialLogin />
    </form>
  )
}
