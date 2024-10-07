import XProfileIcon from 'common/presentation/Icons'
import LandingForm from 'common/presentation/Pages/landing/landingForm'
import QuestionItemLanding from 'common/presentation/Pages/landing/questionItemLanding'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  createUserSurvey,
  selectAnswersLanding,
  selectQuestionsLanding,
  selectScoreListLanding,
  updateAnswersLanding
} from 'store/app/landingSlice'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { toast } from 'react-toastify'
import { ToastError } from 'common/presentation/Notification/Toast/ToastError'
import localforage from 'localforage'
import { getProfile, selectUserProfile } from 'store/app/userSlice'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'

const SurveyLandingPage = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Email không đúng định dạng')
      .required('Không được bỏ trống tên và email'),
    name: yup.string().required('Không được bỏ trống tên và email')
  })
  const {
    register,
    control,
    handleSubmit,
    getValues,
    watch,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',

    resolver: yupResolver(schema)
  })
  const userProfile = useSelector(selectUserProfile)
  const [isLastSlide, setIsLastSlide] = useState(false)
  const [isFirstSlide, setIsFirstSlide] = useState(false)
  const [swiper, setSwiper] = useState(null)
  const [isChoosing, setIsChoosing] = useState(true)
  const [onSliding, setOnSliding] = useState(true)
  const questions = useSelector(selectQuestionsLanding)
  const dispatch = useDispatch()
  const answers = useSelector(selectAnswersLanding)
  const scoreList = useSelector(selectScoreListLanding)
  const router = useRouter()
  const loading = useSelector((state) =>
    selectLoading(state, APP_TYPES.SURVEY.CREATEUSERSURVEY)
  )
  const handleChooseAnswer = (data) => {
    setIsChoosing(false)
    const { index, questionId, answerId } = data
    const newResult = { ...answers }
    newResult[questionId] = {
      exQuestionId: questionId,
      exAnswerId: answerId
    }
    dispatch(updateAnswersLanding(newResult))
    if (!isLastSlide) {
      setTimeout(() => {
        setIsChoosing(true)
        swiper?.slideNext()
      }, 500)
    } else {
      if (userProfile) {
        setTimeout(() => {
          setIsChoosing(true)
          submitLogin()
        }, 500)
      }
    }
  }

  const handleClickBack = () => {
    window.location.href = '/itcareers'
  }
  const submitLogin = async () => {
    const scoreResult = Object.keys(answers)?.map((el) =>
      scoreList.find((score) => score.exAnswerId === answers[el].exAnswerId)
    )
    const result = new Map()
    scoreResult.forEach((item) => {
      Object.entries(item).forEach(([key, value]) => {
        if (key !== 'exAnswerId') {
          if (result.has(key)) {
            result.set(key, result.get(key) + value)
          } else {
            result.set(key, value)
          }
        }
      })
    })

    const output = Object.fromEntries(result.entries())
    const max = Math.max(...Object.values(output))
    const keyOfMax = Object.entries(output).reduce(
      (acc, [key, value]) => (value === max ? [...acc, key] : acc),
      []
    )
    const randomKey = keyOfMax[Math.floor(Math.random() * keyOfMax.length)]
    const payload = {
      result: randomKey
    }
    const res = await dispatch(createUserSurvey(payload))
    if (res?.payload?.isSuccess) {
      router.push(`/itcareers/${randomKey}`)
    } else {
      toast(
        AlertWaring({
          title: res?.payload?.errorMessage
        }),
        {
          toastId: 'alert-save-warning',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
    }
  }
  const submit = async (data) => {
    const { name, email } = data
    const scoreResult = Object.keys(answers)?.map((el) =>
      scoreList.find((score) => score.exAnswerId === answers[el].exAnswerId)
    )
    const result = new Map()
    scoreResult.forEach((item) => {
      Object.entries(item).forEach(([key, value]) => {
        if (key !== 'exAnswerId') {
          if (result.has(key)) {
            result.set(key, result.get(key) + value)
          } else {
            result.set(key, value)
          }
        }
      })
    })

    const output = Object.fromEntries(result.entries())
    const max = Math.max(...Object.values(output))
    const keyOfMax = Object.entries(output).reduce(
      (acc, [key, value]) => (value === max ? [...acc, key] : acc),
      []
    )
    const randomKey = keyOfMax[Math.floor(Math.random() * keyOfMax.length)]
    const payload = {
      name: name,
      email: email,
      result: randomKey
    }
    const res = await dispatch(createUserSurvey(payload))
    if (res?.payload?.isSuccess) {
      router.push(`/itcareers/${randomKey}`)
    } else {
      toast(
        AlertWaring({
          title: res?.payload?.errorMessage
        }),
        {
          toastId: 'alert-save-warning',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
    }
  }
  const handleSlideChangeTransitionStart = (swiper) => {
    const activeBullet = document.querySelector(
      '.swiper-pagination-bullet-active'
    )
    if (activeBullet) {
      activeBullet.classList.add('custom-bullet-active-transition')
      setTimeout(() => {
        activeBullet.classList.remove('custom-bullet-active-transition')
      }, 500)
    }
  }

  useEffect(() => {
    dispatch(getProfile())
  }, [])
  return (
    <div className="flex-1  h-screen bg-[#FFFBF0] xl:py-20 py-10 overflow-y-auto">
      <Head>
        <title>Bạn là ai trong thế giới IT - X-Profile</title>
      </Head>
      {loading && <LoadingRole />}
      <div className="">
        <div className=" xl:mb-20 mb-10 px-6 xl:px-0">
          <div className="max-w-[1440px] mx-auto flex xl:flex-row flex-col justify-between xl:px-20 ">
            <div className="flex w-full xl:flex-row flex-col  justify-between xl:gap-[80px]">
              <div className="hidden xl:block">
                <XProfileIcon name="logoLanding" />
              </div>
              <div
                className="flex items-center gap-2 group transition-all cursor-pointer "
                onClick={() => handleClickBack()}
              >
                <div className="hidden xl:block group-hover:hidden">
                  <XProfileIcon name="arrowBackTest" />
                </div>
                <div className="xl:hidden block group-hover:block">
                  <XProfileIcon name="arrowBackTest" fill="#F6BB3A" />
                </div>
                <p className="w-fit  xl:text-xl text-p14 font-light  cursor-pointer xl:text-black  text-button group-hover:text-button">
                  Bắt đầu lại
                </p>
              </div>
            </div>
          </div>
        </div>
        {isLastSlide && !userProfile && Object.keys(answers)?.length === 8 ? (
          <LandingForm
            errors={errors}
            register={register}
            handleSubmit={handleSubmit}
            submit={submit}
          />
        ) : (
          <Swiper
            allowTouchMove={false}
            // maxBackfaceHiddenSlides={1}

            touchEventsTarget="wrapper"
            speed={600}
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: '.next',
              prevEl: '.prev',
              clickable: true
            }}
            // observer={true}
            pagination={{
              el: '.swiper-pagination',
              // clickable: true,
              renderBullet: function (index, className) {
                return `<span class="${className}"><img class="pagination-bullet"/></span>`
              }
            }}
            autoHeight={true}
            onSwiper={(swiper) => setSwiper(swiper)}
            onSlideChange={(swiper) => {
              const bullets = swiper.pagination.el.querySelectorAll(
                '.swiper-pagination-bullet'
              )
              bullets.forEach((bullet, index) => {
                if (index < swiper.realIndex) {
                  bullet.classList.add('custom-bullet-passed')
                } else {
                  bullet.classList.remove('custom-bullet-passed')
                }
              })
              setIsLastSlide(swiper?.isEnd)
              setIsFirstSlide(swiper?.isBeginning)
            }}
            onSlideChangeTransitionStart={(swiper) => {
              handleSlideChangeTransitionStart(swiper)
              setOnSliding(false)
            }}
            // onAnimationStart={(swiper) => setOnSliding(true)}
            // onAnimationEnd={(swiper) => }
            onSlideChangeTransitionEnd={(swiper) => setOnSliding(true)}
          >
            {questions?.map((el, index) => {
              const { position, questionId, question, exQuestionId } = el || {}
              const { exAnswers, content, enumQuestionType, imageTemplate } =
                question || {}
              return (
                <SwiperSlide key={index}>
                  <QuestionItemLanding
                    {...el}
                    answers={exAnswers}
                    questionTitle={content}
                    type={imageTemplate}
                    handleChooseAnswer={handleChooseAnswer}
                    result={answers}
                    questionIndex={index}
                    exQuestionId={exQuestionId}
                    isChoosing={isChoosing && onSliding}
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>
        )}
        <div
          className={`w-full fixed bottom-0 xl:py-8 py-4 px-4 xl:px-0 z-50   bg-gradient-to-b from-transparent to-[#fffcf4] via-[#fffcf4]`}
        >
          <div
            className={`xl:max-w-[1440px] xl:mx-auto xl:px-20 flex items-center ${
              Object.keys(answers)?.length !== 8
                ? 'justify-between'
                : 'justify-end'
            }`}
          >
            {Object.keys(answers)?.length !== 8 && (
              <div>
                <div className=" swiper-pagination"></div>
              </div>
            )}
            <div className="xl:hidden  ">
              <XProfileIcon name="logoLanding" width="32" height="24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SurveyLandingPage
