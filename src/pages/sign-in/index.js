import React from 'react'
import Head from 'next/head'
import { FormLogin } from 'common/presentation/Form'
import Image from 'next/image'
import Link from 'next/link'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import { useSelector } from 'react-redux'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'

const SignInPage = () => {
  const loading = useSelector(
    (state) =>
      selectLoading(state, APP_TYPES.AUTH.LOGIN) ||
      selectLoading(state, APP_TYPES.AUTH.LOGINBYTOKEN) ||
      selectLoading(state, APP_TYPES.AUTH.GETTOKENBYFIREBASE)
  )
  return (
    <>
      {loading && <LoadingRole />}
      <div className=" w-full h-screen lg:h-auto bg-white lg:bg-transparent ">
        <Head>
          <title>Đăng nhập</title>
        </Head>
        <div className="lg:grid lg:grid-cols-2 ">
          <div className="sm:bg-transparent bg-white sm:pb-0 pb-4">
            <div className="bg-white rounded-[12px] lg:p-[40px] p-4 lg:mt-[100px] lg:w-[80%] mx-auto">
              <FormLogin />
            </div>
            <div className="flex w-fit mx-auto gap-[16px] mt-[32px]">
              <p className="text-[16px] text-grey-1">
                Chưa có tài khoản X-Profile?
              </p>
              <Link href="/sign-up">
                <p className="text-[16px] text-semantic-text-link cursor-pointer hover:opacity-80 font-bold">
                  Đăng ký
                </p>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative w-full h-screen">
            <Image
              alt="sign-in-bg"
              placeholder="blur"
              blurDataURL="/images/sign_up_bg.webp"
              src="/images/sign_up_bg.webp"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </>
  )
}

SignInPage.propTypes = {}

export default SignInPage
