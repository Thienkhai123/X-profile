import FormVerifyEmailForgotPassword from 'common/presentation/Form/ValidateMailForgotPassword'
import FormVerifyCodeForgotPassword from 'common/presentation/Form/VerifyCodeForgotPassword'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { APP_TYPES } from 'store/types'
import { selectLoading } from 'store/ui/loadingSlice'

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1)
  const [registerPayload, setRegisterPayload] = useState({
    email: '',
    code: null
  })
  const nextStep = () => setStep(step + 1)

  const loading = useSelector(
    (state) =>
      selectLoading(state, APP_TYPES.AUTH.FORGOTPASSWORDSENDEMAIL) ||
      selectLoading(state, APP_TYPES.AUTH.FORGOTPASSWORDUPDATE)
  )

  return (
    <>
      {loading && <LoadingRole />}
      <div className="w-full h-screen lg:h-auto bg-white lg:bg-transparent ">
        <Head>
          <title>Quên mật khẩu</title>
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
                <FormVerifyEmailForgotPassword
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
                <FormVerifyCodeForgotPassword
                  email={registerPayload.email}
                  nextStep={nextStep}
                  setRegisterCode={(value) => {
                    setRegisterPayload({
                      ...registerPayload,
                      code: value
                    })
                  }}
                />
              )}
              {/* {step === 2 && (
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
            )} */}
            </div>
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

export default ForgotPasswordPage
