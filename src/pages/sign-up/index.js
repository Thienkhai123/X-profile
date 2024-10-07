import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import FormVerifyEmail from 'common/presentation/Form/VerifyEmail'
import FormVerifyCode from 'common/presentation/Form/VerifyCode'
import FormRegister from 'common/presentation/Form/Register'
import { FormInformation } from 'common/presentation/Form'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import { useSelector } from 'react-redux'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'

const SignUpPage = () => {
  const [step, setStep] = useState(1)
  const [registerPayload, setRegisterPayload] = useState({
    email: ''
  })
  const nextStep = () => setStep(step + 1)
  const loading = useSelector(
    (state) =>
      selectLoading(state, APP_TYPES.AUTH.REGISTER) ||
      selectLoading(state, APP_TYPES.AUTH.REGISTERVERIFY) ||
      selectLoading(state, APP_TYPES.AUTH.REGISTERVERIFYCODE) ||
      selectLoading(state, APP_TYPES.AUTH.GETCITY)
  )
  return (
    <>
      {loading && <LoadingRole />}
      <div className="w-full h-screen lg:h-auto bg-white lg:bg-transparent ">
        <Head>
          <title>Đăng ký</title>
        </Head>
        <div className="lg:grid lg:grid-cols-2 ">
          <div className="sm:bg-transparent bg-white sm:pb-0 pb-4">
            <div className="bg-white rounded-[12px] lg:p-[40px] p-4 lg:mt-[20px] sm:mt-[92px] lg:w-[80%] mx-auto pb-[10px]">
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
              {step === 1 && (
                <FormVerifyEmail
                  nextStep={nextStep}
                  setRegisterEmail={(value) => {
                    setRegisterPayload({
                      ...registerPayload,
                      email: value
                    })
                  }}
                />
              )}
              {step === 2 && (
                <FormVerifyCode
                  email={registerPayload.email}
                  nextStep={nextStep}
                />
              )}
              {step === 3 && (
                <FormRegister
                  nextStep={nextStep}
                  registerPayload={registerPayload}
                  setRegisterPayload={setRegisterPayload}
                />
              )}
              {step === 4 && (
                <FormInformation registerPayload={registerPayload} />
              )}
            </div>
            {step === 1 && (
              <div className="flex w-fit mx-auto gap-[16px] mt-[32px]">
                <p className="text-[16px] text-grey-1">
                  Đã có tài khoản X-Profile?
                </p>
                <Link href="/sign-in">
                  <p className="text-[16px] text-semantic-text-link cursor-pointer hover:opacity-80 font-bold">
                    Đăng nhập
                  </p>
                </Link>
              </div>
            )}
          </div>
          <div className="hidden lg:block relative h-screen">
            <Image
              placeholder="blur"
              blurDataURL="/images/sign_up_bg.webp"
              alt="sign-in-bg"
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

export default SignUpPage
