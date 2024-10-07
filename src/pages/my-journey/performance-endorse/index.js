import useTrans from 'common/hooks/useTrans'

import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'
import MyJourneySideMenu from 'common/presentation/Pages/my-journey/MyJourneySideMenu'
import { NextArrow, PreviousArrow } from 'common/presentation/Swiper/Arrows'
import Head from 'next/head'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Navigation } from 'swiper'
import { toast } from 'react-toastify'
import { Swiper, SwiperSlide } from 'swiper/react'
import EndorseAboutModal from 'common/presentation/Pages/my-journey/EndorseAboutModal'
import PerformanceEndorseStepAnalytic from 'common/presentation/Pages/my-journey/PerformanceEndorseStepAnalytic'
import PerformanceEndorseList from 'common/presentation/Pages/my-journey/PerformanceEndorseList'
import Image from 'next/image'
import Button from 'common/presentation/Button'
import SuggestCourseModal from 'common/presentation/Pages/my-journey/SuggestCourseModal'
import MyJourneyMap from 'common/presentation/Pages/my-journey/MyJourneyMap'
import { getMap, selectStepMap } from 'store/app/journeySlice'
import { useDispatch } from 'react-redux'
import { getAllUserSkill, selectUserSkill } from 'store/app/portfolioSlice'
import { useSelector } from 'react-redux'
import MyJourneyMapMobile from 'common/presentation/Pages/my-journey/MyJourneyMapMobile'
import {
  getSkillsByJobs,
  getSuggestedSkills,
  getUserJobs,
  selectInitSkillsDatabase
} from 'store/app/journeySkillsDatabase'
import { getExamBySkill } from 'store/app/examSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import ThingsToFinishCard from 'common/presentation/Pages/my-journey/ThingsToFinishCard'
import Modal from 'common/presentation/Modal'
import useModal from 'common/hooks/useModal'

const FAKE_LIST = [
  {
    id: 0,
    title: 'Endorse Requested',
    type: 1,
    content: 'You have 1 endorse requested by Nguyen Quoc Thanh',
    byUserName: 'Nguyen Quoc Thanh'
  }
]

const DATA_FAKE = [
  {
    id: 0,
    name: 'Monty Hayton',
    time: '11:03 24/12/2023',
    status: 'have not responded yet',
    isPublic: false,
    avatarUrl: '/images/avatar.png',
    content: ''
  },
  {
    id: 1,
    name: 'Monty Hayton',
    time: '11:03 24/12/2023',
    status: 'past client',
    isPublic: false,
    avatarUrl: '/images/avatar.png',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat dui a velit commodo, in sagittis odio imperdiet. Praesent rutrum, metus et luctus viverra, nisl risus pharetra nisi, at aliquet felis justo et velit.'
  },
  {
    id: 2,
    name: 'Monty Hayton',
    time: '11:03 24/12/2023',
    status: 'past client',
    isPublic: false,
    avatarUrl: '/images/avatar.png',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat dui a velit commodo, in sagittis odio imperdiet. Praesent rutrum, metus et luctus viverra, nisl risus pharetra nisi, at aliquet felis justo et velit.'
  }
]

const SKILL_DATABASE_STEP = [
  { id: 0, title: 'Business Analyst', href: '#', status: 100 },
  { id: 1, title: 'Product Owner', href: '#', status: 200 },
  { id: 2, title: 'UI/UX Designer', href: '#', status: 400 },
  { id: 3, title: 'Developer', href: '#', status: 500 },
  { id: 4, title: 'Front-end Developer', href: '#', status: 800 },
  { id: 5, title: 'Back-end Developer', href: '#', status: 300 },
  { id: 6, title: 'Công nghệ sinh học', href: '#', status: 300 },
  { id: 7, title: 'Nhân viên bán hàng', href: '#', status: 300 }
]

const MyJourneyPerformanceEndorsePage = () => {
  const trans = useTrans()
  const { MY_JOURNEY } = trans
  const swiperRef = useRef(null)
  const [selectedId, setSelectedId] = useState(null)
  const [modalSuggestCourse, setmodalSuggestCourse] = useState(false)
  const [skillSelected, setSkillSelected] = useState(null)
  const dispatch = useDispatch()
  const userSkills = useSelector(selectUserSkill) || {}
  const { suggestedSkills, relatedCourse, relatedBlog, userJobs, skillByJobs } =
    useSelector(selectInitSkillsDatabase) || {}
  const [choosedStepId, setChooseStepId] = useState(null)
  const selectStep = useSelector(selectStepMap)
  const [modalReview, toggleModalReview] = useModal()
  const [reviewSelected, setReviewSelected] = useState({ id: null, name: '' })
  const [data, setData] = useState(DATA_FAKE)

  const handleSurvey = () => {
    toast(
      AlertWaring({
        title:
          'Bài trắc nghiệm này vẫn đang được phát triển, bạn chờ thêm một chút nữa nhé!'
      }),
      {
        toastId: 'alert-create-success',
        className: 'bg-toast-custom',
        closeButton: false,
        position: 'top-center',
        hideProgressBar: true,
        autoClose: 3000
      }
    )
  }
  const handleChoose = async (id) => {
    setChooseStepId(id)
  }
  const handleCloseModalSuggestCourse = async () => {
    document.body.style.overflow = 'auto'
    setmodalSuggestCourse(false)
    setSelectedId(null)
    // await delay(500)
    setSkillSelected(null)
  }
  const handleClickSuggest = (skillData) => {
    if (skillData) {
      document.body.style.overflow = 'hidden'
      setSkillSelected(skillData)
      setmodalSuggestCourse(true)
    }
  }
  const onCloseReview = () => {
    if (reviewSelected.id) {
      setReviewSelected({ ...reviewSelected, id: null })
    }
    toggleModalReview()
  }
  const handleClickExam = async (skillId) => {
    if (!isNaN(skillId)) {
      const fetchExam = await dispatch(getExamBySkill({ skillId }))
      const res = unwrapResult(fetchExam)
      if (res?.data) {
        window.open(`/exam/${res?.data?.examGuid}`)
      } else {
        toast(
          AlertWaring({
            // title: res?.errorMessage
            title:
              'Bài trắc nghiệm này vẫn đang được phát triển, bạn chờ thêm một chút nữa nhé!'
          }),
          {
            toastId: 'alert-create-success',
            className: 'bg-toast-custom',
            closeButton: false,
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 3000
          }
        )
      }
    } else {
      toast(
        AlertWaring({
          title:
            'Bài trắc nghiệm này vẫn đang được phát triển, bạn chờ thêm một chút nữa nhé!'
        }),
        {
          toastId: 'alert-create-success',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
    }
  }
  const getStepJob = async () => {
    const res = await dispatch(getUserJobs())
    if (res.payload.data.length > 0) {
      setChooseStepId(res.payload.data[0].jobId)
    }
  }
  const stageId = selectStep
  const roleId = parseInt(localStorage.getItem('ROLE')) || 0
  const handleToogle = (index) => {
    const data = [...DATA_FAKE]
    data[index].isPublic = !data[index].isPublic
    setData(data)
  }

  useEffect(() => {
    dispatch(getAllUserSkill())
    dispatch(getSuggestedSkills())
    dispatch(getMap())
    getStepJob()
  }, [])
  useEffect(() => {
    if (choosedStepId !== null) {
      dispatch(getSkillsByJobs({ jobId: choosedStepId }))
    }
  }, [choosedStepId])
  return (
    <Fragment>
      <Head>
        <title>Hành trình của tôi - My Performance Endorse</title>
      </Head>
      <div className="min-h-[100vh] relative flex flex-col">
        <div className="flex-1  bg-white">
          <div className="xl:max-w-[1440px] md:py-[56px] py-6 sm:px-20 px-0 mx-auto">
            <h1 className="text-center xl:mb-11 mb-4 md:text-p28-bold text-p16  mx-auto">
              Explore your career journey
            </h1>
            <div className="mb-[56px] xl:w-[1140px] xl:block hidden mx-auto relative group pointer-events-none">
              <MyJourneyMap state={stageId} role={roleId} />
            </div>
            <div className="xl:hidden px-6">
              <MyJourneyMapMobile state={stageId} role={roleId} />
            </div>
            <div className="xl:flex gap-8 justify-center">
              <div className="xl:min-w-[280px] ">
                <MyJourneySideMenu actionList={MY_JOURNEY?.journeyActionNew} />
              </div>
              <div className="flex flex-col flex-1 w-full max-w-[965px] relative">
                {/* Đề xuất cho bạn */}
                <div>
                  <div className=" flex items-start justify-between md:px-0 px-6">
                    <div className="flex flex-col gap-1">
                      <p className="md:text-p28-bold text-p16-bold text-black">
                        Endorse requested
                      </p>
                      <p className="md:text-p18 text-p14 text-[#1B75BB]">
                        Check it - confirm it honestly
                      </p>
                    </div>
                    <div className={' items-center gap-5 md:flex hidden'}>
                      <PreviousArrow
                        className={'block'}
                        hasShadow={false}
                        stylePrev={
                          'arrow-left cursor-pointer  w-14 h-14  border border-nude flex items-center justify-center shadow-[0_16px_24px_rgba(0,0,0,0.04)]'
                        }
                        // stroke={stroke}
                      />

                      <NextArrow
                        className={'block'}
                        hasShadow={false}
                        stylePrev={
                          'arrow-right cursor-pointer w-14 h-14  border border-nude flex items-center justify-center shadow-[0_16px_24px_rgba(0,0,0,0.04)]'
                        }
                        // stroke={stroke}
                      />
                    </div>
                  </div>
                  <div className=" relative ">
                    <Swiper
                      style={{ width: 'auto' }}
                      maxBackfaceHiddenSlides={0}
                      ref={swiperRef}
                      breakpoints={{
                        330: {
                          slidesPerView: 1.3,
                          slidesPerGroup: 1,
                          spaceBetween: 8
                        },
                        700: {
                          slidesPerView: 3,
                          slidesPerGroup: 1,
                          allowTouchMove: false
                        }
                      }}
                      navigation={{
                        nextEl: '.arrow-right',
                        prevEl: '.arrow-left'
                      }}
                      modules={[Navigation]}
                      spaceBetween={24}
                      className="md:!pt-8 !pt-4 !px-6 md:!px-0"
                    >
                      {/* {suggestedSkills.map((item, index) => {
                        const {
                          id,
                          name,
                          time,
                          question,
                          score,
                          examId,
                          skillId,
                          examTotalQuestions,
                          examTotalTime,
                          description
                        } = item
                        const findExisSkill = userSkills?.find(
                          (el) => el?.skillId === skillId
                        )
                        return (
                          <SwiperSlide key={index}>
                            <div className="cursor-pointer transition-all duration-200 ">
                              <SkillDatabaseCard
                                title={name}
                                skillId={skillId}
                                score={findExisSkill?.percentageComplete || 0}
                                question={examTotalQuestions}
                                time={examTotalTime}
                                handleClickExam={() => handleClickExam(skillId)}
                                handleClickSuggest={() =>
                                  handleClickSuggest(item)
                                }
                              />
                            </div>
                          </SwiperSlide>
                        )
                      })} */}
                      {FAKE_LIST.length > 0 ? (
                        FAKE_LIST.map((item, index) => {
                          const { id, title, content, type, byUserName } = item

                          return (
                            <SwiperSlide key={index}>
                              <div className="cursor-pointer transition-all duration-200 ">
                                <ThingsToFinishCard
                                  title={title}
                                  content={content}
                                  type={type}
                                  handleClickCheckIt={() => {
                                    setReviewSelected({
                                      id: id,
                                      name: byUserName
                                    })
                                    toggleModalReview()
                                  }}
                                />
                              </div>
                            </SwiperSlide>
                          )
                        })
                      ) : (
                        <div className="md:block hidden">
                          <Image
                            alt="empty"
                            width={200}
                            height={200}
                            src={'/images/empty.svg'}
                          />
                        </div>
                      )}
                    </Swiper>
                  </div>
                </div>
                {/* Kỹ năng chuyên môn bạn có thể cần */}
                <div>
                  <div className="md:mt-14 mt-6 ">
                    <div className="flex flex-col gap-1 md:mb-8 md:px-0 px-6">
                      <p className="md:text-p28-bold text-p16-bold text-black">
                        Your Endorse
                      </p>
                      <p className="md:text-p18 text-p14 text-[#1B75BB]">
                        Check it out
                      </p>
                    </div>
                    {userJobs?.length > 0 ? (
                      <Fragment>
                        <div className="">
                          <PerformanceEndorseStepAnalytic
                            SETTING_STEP={userJobs}
                            handleChoose={handleChoose}
                            choosedStepId={choosedStepId}
                            breakpoints={{
                              330: {
                                slidesPerView: 3,
                                slidesPerGroup: 1
                              },
                              750: {
                                slidesPerView: 5,
                                slidesPerGroup: 1
                              }
                            }}
                          />
                        </div>
                        {DATA_FAKE?.length > 0 ? (
                          <PerformanceEndorseList
                            data={data}
                            handleToogle={handleToogle}
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center mt-[72px]">
                            <div className="md:block hidden">
                              <Image
                                alt="empty"
                                width={200}
                                height={200}
                                src={'/images/empty.svg'}
                              />
                            </div>
                            <div className="md:hidden">
                              <Image
                                alt="empty"
                                width={160}
                                height={160}
                                src={'/images/empty.svg'}
                              />
                            </div>
                            <p className="md:text-p18 text-p16 max-w-[286px] md:max-w-full text-center md:mt-10">
                              Hiện chưa có gợi ý kỹ năng chuyên môn dành cho bạn
                            </p>
                            <Button
                              width="w-full"
                              height="h-[48px]"
                              padding="px-8"
                              margin="mt-8"
                              title="Khám phá lộ trình nghề nghiệp"
                              rounded="rounded-[8px]"
                              // onClick={() => console.log()}
                            />
                          </div>
                        )}
                      </Fragment>
                    ) : (
                      <div className="flex flex-col items-center justify-center mt-[72px]">
                        <div className="md:block hidden">
                          <Image
                            alt="empty"
                            width={200}
                            height={200}
                            src={'/images/empty.svg'}
                          />
                        </div>
                        <div className="md:hidden">
                          <Image
                            alt="empty"
                            width={160}
                            height={160}
                            src={'/images/empty.svg'}
                          />
                        </div>
                        <p className="md:text-p18 text-p16 max-w-[286px] md:max-w-full text-center md:mt-10">
                          Hiện chưa có gợi ý kỹ năng chuyên môn dành cho bạn
                        </p>
                        <Button
                          width="w-full"
                          height="h-[48px]"
                          padding="px-8"
                          margin="mt-8"
                          title="Khám phá lộ trình nghề nghiệp"
                          rounded="rounded-[8px]"
                          // onClick={() => console.log()}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {modalSuggestCourse && (
            <SuggestCourseModal
              handleCloseModalSuggestCourse={handleCloseModalSuggestCourse}
              modalSuggestCourse={modalSuggestCourse}
              skill={skillSelected}
              relatedCourse={relatedCourse}
              relatedBlog={relatedBlog}
            />
          )}
        </div>
      </div>
      <Modal
        open={modalReview}
        toggleModal={onCloseReview}
        childStyle="w-screen h-fit sm:w-[480px] mt-4 p-8 bg-white rounded-[16px]"
      >
        <EndorseAboutModal
          onCloseReview={onCloseReview}
          name={reviewSelected.name}
        />
      </Modal>
    </Fragment>
  )
}

export default MyJourneyPerformanceEndorsePage
