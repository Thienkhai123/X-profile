import useTrans from 'common/hooks/useTrans'

import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'
import MyJourneySideMenu from 'common/presentation/Pages/my-journey/MyJourneySideMenu'
import { NextArrow, PreviousArrow } from 'common/presentation/Swiper/Arrows'
import Head from 'next/head'
import XProfileIcon from 'common/presentation/Icons'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Navigation } from 'swiper'
import { toast } from 'react-toastify'
import { Swiper, SwiperSlide } from 'swiper/react'
import ThingsToFinishCard from 'common/presentation/Pages/my-journey/ThingsToFinishCard'
import DashboardJourney from 'common/presentation/Pages/my-journey/DashboardJourney'

import CourseManySourceItemNew from 'common/presentation/Pages/my-journey/CourseManySourceItemNew'
import Image from 'next/image'
import Button from 'common/presentation/Button'
import { getMap, selectStepMap } from 'store/app/journeySlice'
import { useDispatch } from 'react-redux'
import { getAllUserSkill, selectUserSkill } from 'store/app/portfolioSlice'

import { selectUserProfile } from 'store/app/userSlice'
import { useSelector } from 'react-redux'
import { getRelatedCoursesBySkill } from 'store/app/journeySkillsDatabase'
import {
  getSkillsByJobs,
  getSuggestedSkills,
  getUserJobs,
  selectInitSkillsDatabase
} from 'store/app/journeySkillsDatabase'
import { getExamBySkill } from 'store/app/examSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { useRouter } from 'next/router'

const FAKE_LIST = [
  {
    id: 0,
    title: 'Reminder',
    type: 0,
    content: 'Your course is nearing expiration'
  },
  {
    id: 1,
    title: 'Endorse Requested',
    type: 1,
    content: 'You have 1 endorse requested by Nguyen Quoc Thanh'
  },
  {
    id: 2,
    title: 'Action Required',
    type: 1,
    content: 'You are assigned to do a competency assessment'
  },
  {
    id: 3,
    title: 'Reminder',
    type: 1,
    content: 'You are assigned to do a competency assessment'
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

const MyJourneyPage = () => {
  const trans = useTrans()
  const { MY_JOURNEY } = trans
  const swiperRef = useRef(null)
  const { query } = useRouter()
  const { keyword, categoryId, dev } = query
  const [selectedId, setSelectedId] = useState(null)
  const [modalSuggestCourse, setmodalSuggestCourse] = useState(false)
  const [skillSelected, setSkillSelected] = useState(null)
  const dispatch = useDispatch()
  const userSkills = useSelector(selectUserSkill) || {}
  const userProfile = useSelector(selectUserProfile)
  const { suggestedSkills, relatedCourse, relatedBlog, userJobs, skillByJobs } =
    useSelector(selectInitSkillsDatabase) || {}
  const [choosedStepId, setChooseStepId] = useState(null)
  const selectStep = useSelector(selectStepMap)
  const { name: userName } = userProfile || {}

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

  useEffect(() => {
    dispatch(getAllUserSkill())
    dispatch(getSuggestedSkills())
    dispatch(getRelatedCoursesBySkill({ skillId: 177 }))
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
        <title>Hành trình của tôi</title>
      </Head>
      {dev ? (
        <div className="min-h-[100vh] relative flex flex-col">
          <div className="flex-1  bg-white">
            <div className="xl:max-w-[1440px] md:py-[56px] py-6 sm:px-20 px-0 mx-auto">
              <h1
                className="text-center xl:mb-5 mb-4 md:text-[28px] font-bold
             text-p16  mx-auto"
              >
                Good morning, {userName}
              </h1>
              <div className="hidden xl:block">
                <DashboardJourney />
              </div>
              {/* <div className="mb-[56px] xl:w-[1140px] xl:block hidden mx-auto relative group pointer-events-none">
              <MyJourneyMap state={stageId} role={roleId} />
            </div>
            <div className="xl:hidden px-6">
              <MyJourneyMapMobile state={stageId} role={roleId} />
            </div> */}
              <div className="xl:flex gap-8 justify-center xl:mt-14">
                <div className="xl:min-w-[280px] ">
                  <MyJourneySideMenu
                    actionList={MY_JOURNEY?.journeyActionNew}
                  />
                </div>
                <div className="flex flex-col flex-1 w-full max-w-[965px] relative">
                  {/* Đề xuất cho bạn */}
                  <div>
                    <div className=" flex items-start justify-between md:px-0 px-6">
                      <div className="flex flex-col gap-1">
                        <p className="md:text-p28-bold text-p16-bold text-black">
                          Things to Finish
                        </p>
                        <p className="md:text-p18 text-p14 text-[#1B75BB]">
                          Let’s get it done
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
                            slidesPerView: 2.3,
                            slidesPerGroup: 1,
                            allowTouchMove: false
                          },
                          1000: {
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
                              <ThingsToFinishCard
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
                        {FAKE_LIST.map((item, index) => {
                          const { id, title, content, type } = item

                          return (
                            <SwiperSlide key={index}>
                              <div className="cursor-pointer transition-all duration-200 ">
                                <ThingsToFinishCard
                                  title={title}
                                  content={content}
                                  type={type}
                                />
                              </div>
                            </SwiperSlide>
                          )
                        })}
                      </Swiper>
                    </div>
                  </div>
                  {/* Kỹ năng chuyên môn bạn có thể cần */}
                  <div>
                    <div className="md:mt-14 mt-6 ">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-1 md:px-0 px-6">
                          <p className="md:text-p28-bold text-p16-bold text-black">
                            News and Announcements
                          </p>
                          <p className="md:text-p18 text-p14 text-[#1B75BB]">
                            Check it out for your career goal
                          </p>
                        </div>
                        <div className="cursor-pointer">
                          <XProfileIcon
                            name="turning3"
                            width="40"
                            height="40"
                            fill="#1B75BB"
                          />
                        </div>
                      </div>
                      {relatedCourse?.length > 0 ? (
                        <Fragment>
                          <div className="grid  md:grid-cols-3 grid-cols-2 sm:gap-5 gap-1 mt-8 max-w-[850px] px-3 sm:px-0">
                            {relatedCourse?.map((courseItem, ind) => {
                              const { companyId, course, otherSource, type } =
                                courseItem
                              if (type === 0) {
                                const {
                                  totalUserCount,
                                  videoAmount,
                                  totalComments,
                                  metadata,
                                  totalSeconds,
                                  coverPictureUrl,
                                  name,
                                  basePrice,
                                  price,
                                  seoName
                                } = course || {}
                                const { totalVideoLessons } = metadata || {}
                                return (
                                  <div key={ind} className="relative">
                                    <CourseManySourceItemNew
                                      basePrice={basePrice}
                                      sellingPrice={price}
                                      name={name}
                                      imageUrl={coverPictureUrl}
                                      totalUserCount={totalUserCount || 0}
                                      totalComment={totalComments}
                                      totalVideoCount={totalVideoLessons}
                                      length={totalSeconds}
                                      source={
                                        type === 0 ? 'x-profile' : 'other'
                                      }
                                      // maxWidth="100%"
                                      // widthImg={360.87}
                                      isCompanyCourse={type === 0}
                                      handleLinkCourse={() =>
                                        handleLinkCourse(seoName)
                                      }
                                    />
                                  </div>
                                )
                              } else {
                                const {
                                  metadata: metadataOther,
                                  otherSourceAuthor,
                                  imageUrl,
                                  title,
                                  url
                                } = otherSource || {}
                                const {
                                  imageUrl: imageUrlAuthor,
                                  name: authorName
                                } = otherSourceAuthor || {}
                                const { price, priceUnit } = metadataOther || {}
                                return (
                                  <div key={ind} className="relative">
                                    <CourseManySourceItemNew
                                      name={title}
                                      imageUrl={imageUrl}
                                      source={
                                        type === 0 ? 'x-profile' : 'other'
                                      }
                                      isCompanyCourse={type === 0}
                                      company={authorName}
                                      sellingPrice={price}
                                      priceUnit={priceUnit}
                                      companyImageUrl={imageUrlAuthor}
                                      handleLinkCourse={() =>
                                        handleLinkOtherCourse(url)
                                      }
                                    />
                                  </div>
                                )
                              }
                            })}
                          </div>
                          {/* <div className="md:hidden relative ">
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
                                {skillByJobs.map((item, index) => {
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
                                          score={
                                            findExisSkill?.percentageComplete ||
                                            0
                                          }
                                          question={examTotalQuestions}
                                          time={examTotalTime}
                                          handleClickExam={() =>
                                            handleClickExam(skillId)
                                          }
                                          handleClickSuggest={() =>
                                            handleClickSuggest(item)
                                          }
                                        />
                                      </div>
                                    </SwiperSlide>
                                  )
                                })}
                              </Swiper>
                            </div> */}
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
          {/* <div>
          {modalSuggestCourse && (
            <SuggestCourseModal
              handleCloseModalSuggestCourse={handleCloseModalSuggestCourse}
              modalSuggestCourse={modalSuggestCourse}
              skill={skillSelected}
              relatedCourse={relatedCourse}
              relatedBlog={relatedBlog}
            />
          )}
        </div> */}
        </div>
      ) : (
        <div className="flex-1 bg-portfolio-empty sm:px-0 px-10">
          <div className="flex flex-col items-center sm:py-[48px] py-[48px]">
            <div className="text-center mb-8">
              <p className="sm:text-p28-bold text-p16-bold text-black mb-4">
                Tính năng này vẫn đang được phát triển
              </p>
              <p className="sm:text-p20 text-p16 text-black">
                Trang “Hành trình của tôi” sẽ ra mắt sớm thôi, bạn chờ thêm một
                chút nha!
              </p>
            </div>
            <div className="sm:mb-[88px]">
              <Button
                title={'Trở về trang chủ'}
                textWeight="sm:text-p18-bold text-p14-bold"
                width="w-auto"
                rounded="rounded-lg"
                height="h-[44px]"
                color="text-white"
                background="bg-button-2"
                padding="px-8 py-[13px]"
                onClick={() => {
                  window.location.href = '/'
                }}
              />
            </div>
            <div className="relative xl:w-[800px] w-[340px] h-[200px] xl:h-[384px]">
              <Image
                placeholder="blur"
                blurDataURL="/images/WorkInProgress.webp"
                src="/images/WorkInProgress.webp"
                alt=""
                layout="fill"
                objectFit="contain"
                quality={100}
              />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default MyJourneyPage
