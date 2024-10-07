import { async } from '@firebase/util'
import { Slider } from 'common/presentation'
import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import QuestionItem from 'common/presentation/Pages/quiz/questionItem'
import AudioQuestion from 'common/presentation/Pages/quiz/audioQuestion'
import AudioImageQuestion from 'common/presentation/Pages/quiz/audioImageQuestion'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import useModal from 'common/hooks/useModal'
import { Virtual, Lazy } from 'swiper'
import {
  finishExam,
  selectAnswers,
  selectExamDetail,
  selectQuestions,
  startExam,
  updateAnswers
} from 'store/app/examSlice'
import { selectUserProfile } from 'store/app/userSlice'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import Modal from 'common/presentation/Modal'
const CountdownTimer = dynamic(
  () => import('common/presentation/Pages/quiz/CountdownTimer'),
  { ssr: false }
)

const QuizInProgress = () => {
  const router = useRouter()
  const { quizId } = router.query
  const dispatch = useDispatch()
  const [percent, setPercent] = useState(0)
  const examDetail = useSelector(selectExamDetail)
  const answers = useSelector(selectAnswers)
  const userProfile = useSelector(selectUserProfile)
  const [isLastSlide, setIsLastSlide] = useState(false)
  const [isFirstSlide, setIsFirstSlide] = useState(false)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [activeSlideChildIndex, setActiveSlideChildIndex] = useState(0)
  const [activeBottomSlideIndex, setActiveBottomSlideIndex] = useState(0)
  const [childSwiper, setChildSwiper] = useState(null)
  const [swiperRef, setSwiperRef] = useState()
  const [isShowBottomSheet, setShowBottomSheet] = useState(false)
  const [isSlideToId, setSlideToId] = useState(true)
  const [open, toggleModal] = useModal()
  const [imageUrl, setImageUrl] = useState(null)
  const { name: userName } = userProfile || {}
  const {
    name,
    totalTime,
    passScore,
    totalQuestions,
    questionGroups,
    exQuestions: questions
  } = examDetail || {}
  // const { childQuestions } = questions
  const audioRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAudioUrl, setCurrentAudioUrl] = useState(null)
  const [sliceArray, setSliceArray] = useState([])
  const play = (audioUrl, e) => {
    if (audioRef.current) {
      if (isPlaying) {
        // audioRef.current.pause()
      } else {
        audioRef.current.play()
        e.target.disabled = true
      }
      setIsPlaying(!isPlaying)
    } else {
      setCurrentAudioUrl(audioUrl)
    }
  }
  const stopAndClearAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      // audioRef.current.src = ''
      setIsPlaying(false)
    }
  }

  const toggleBottomSheet = () => {
    setShowBottomSheet(!isShowBottomSheet)
  }

  const handleNextSlide = () => {
    let listUnAnswer = []
    let listQuesUnAnswer = []
    questions.map((item, index) => {
      questionGroups.map((part, idx) => {
        if (item.questionGroupId === part.questionGroupId) {
          // console.log(item)
          if (!answers.hasOwnProperty(item.exQuestionId)) {
            listUnAnswer.push(idx)
            listQuesUnAnswer.push(item.exQuestionId)
            // swiperRef?.slideTo(idx)
          }
        }
      })
    })
    // console.log(listUnAnswer)
    // console.log(listQuesUnAnswer)
    if (listUnAnswer.length > 0) {
      swiperRef?.slideTo(listUnAnswer[0])
      const ques = questions?.filter(
        (ques) =>
          questionGroups[listUnAnswer[0]]?.questionGroupId ===
          ques.questionGroupId
      )

      const childIndex = ques.findIndex(
        (el) => el.exQuestionId === listQuesUnAnswer[0]
      )
      setActiveSlideChildIndex(childIndex)
    } else {
      // console.log('Doneeee')
      handleSubmitExam()
    }
  }

  const handleSlideTo = (exQuestionId) => {
    // setSlideToId(true)
    if (isSlideToId) {
      questions.map((item, index) => {
        questionGroups.map((part, idx) => {
          if (item.questionGroupId === part.questionGroupId) {
            if (item.exQuestionId === exQuestionId) {
              const ques = questions?.filter(
                (ques) =>
                  questionGroups[idx]?.questionGroupId === ques.questionGroupId
              )
              const childIndex = ques.findIndex(
                (el) => el.exQuestionId === exQuestionId
              )
              swiperRef?.slideTo(idx)
              setActiveSlideChildIndex(childIndex)
            }
          }
        })
      })
    }
  }

  const timer = useMemo(() => {
    const time = parseInt(totalTime) * 1000
    const NOW_IN_MS = new Date().getTime()
    const dateTimeAfterThreeDays = NOW_IN_MS + time
    return dateTimeAfterThreeDays
  }, [totalTime])

  const handleChooseAnswer = (data) => {
    const { index, questionId, answerId } = data
    const newResult = { ...answers }
    newResult[questionId] = {
      exQuestionId: questionId,
      exAnswerId: answerId
    }

    dispatch(updateAnswers(newResult))
  }

  const handleSubmitExam = async () => {
    if (quizId && answers) {
      const convertArr = Object.keys(answers).map((key) => answers[key])
      const payload = {
        examGuid: quizId,
        answers: convertArr
      }
      const res = await dispatch(finishExam(payload))

      if (res.payload?.isSuccess) {
        window.location.replace(`/demo/quiz/${quizId}/result`)
      }
    }
  }
  const handleClickBack = () => {
    if (quizId) {
      window.location.replace(`/exam/${quizId}`)
    }
  }
  // const togglePlay = (e) => {
  //   const song = e.target.id;
  //   if (currentSong === song) {
  //     isPlaying ? audio.current.pause() : audio.current.play();
  //     setPlaying(!isPlaying);
  //   } else {
  //     if (audio.current) {
  //       audio.current.pause();
  //     }

  //     setCurrentSong(song);
  //     setPlaying(true);
  //     audio.current = new Audio(song);
  //     audio.current.play();
  //   }
  // };

  // const slides = Array.from({ length: questionGroups.length }).map(
  //   (_, index) => `Slide ${index + 1}`
  // )
  const handleToggleModal = (imageUrl) => {
    if (!imageUrl) {
      setImageUrl(null)
    } else {
      setImageUrl(imageUrl)
    }
    toggleModal()
    if (!open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }
  useEffect(() => {
    if (!isSlideToId) {
      if (questions) {
        let listQuesUnAnswer = []
        let listUnAnswer = []
        questions.map((item, index) => {
          questionGroups.map((part, idx) => {
            if (item.questionGroupId === part.questionGroupId) {
              // console.log(item)
              if (!answers.hasOwnProperty(item.exQuestionId)) {
                // console.log(answers.hasOwnProperty(item.exQuestionId))
                // console.log(item.exQuestionId)
                listUnAnswer.push(idx)
                if (idx === activeSlideIndex) {
                  listQuesUnAnswer.push(item.exQuestionId)
                }
                // swiperRef?.slideTo(idx)
              }
            }
          })
        })
        if (listUnAnswer.length > 0) {
          const ques = questions?.filter(
            (ques) =>
              questionGroups[activeSlideIndex]?.questionGroupId ===
              ques.questionGroupId
          )

          const childIndex = ques.findIndex(
            (el) => el.exQuestionId === listQuesUnAnswer[0]
          )

          setActiveSlideChildIndex(childIndex)
        } else {
          setActiveSlideChildIndex(0)
        }
      }
    }
  }, [activeSlideIndex])

  useEffect(() => {
    if (isShowBottomSheet) {
      setSlideToId(true)
    } else {
      setSlideToId(false)
    }
  }, [isShowBottomSheet])

  useEffect(() => {
    const bullets = childSwiper?.pagination.el.querySelectorAll(
      '.swiper-pagination-bullet'
    )
    const bottomBullets = document.querySelectorAll('.bottom-pagination-bullet')
    const ques = questions?.filter(
      (ques) =>
        questionGroups[activeSlideIndex]?.questionGroupId ===
        ques.questionGroupId
    )

    if (bullets) {
      bullets.forEach((bullet, index) => {
        if (answers.hasOwnProperty(ques[index]?.exQuestionId)) {
          bullet.classList.add('custom-bullet-passed-test')
        } else {
          bullet.classList.remove('custom-bullet-passed-test')
        }
      })
    }
    if (bottomBullets) {
      bottomBullets.forEach((bottomBullet, idx) => {
        if (answers.hasOwnProperty(questions[idx]?.exQuestionId)) {
          bottomBullet.classList.add('bottom-bullet-passed')
        } else {
          bottomBullet.classList.remove('bottom-bullet-passed')
        }
      })
    }
  }, [answers])

  useEffect(() => {
    if (questions) {
      let result = []
      const arr1 = questions.slice(0, 100)
      const arr2 = questions.slice(100, questions.length)
      result = [arr1, arr2]
      setSliceArray(result)
    }
  }, [questions])

  useEffect(() => {
    if (quizId) {
      dispatch(startExam({ quizId }))
    }
  }, [quizId, dispatch])

  useEffect(() => {
    const pc = (Object.keys(answers).length / questions?.length) * 100
    setPercent(Math.ceil(pc))
  }, [Object.keys(answers).length, questions?.length])

  if (!questions || !examDetail) {
    return (
      <div className="flex-1">
        <LoadingRole />
      </div>
    )
  }
  return (
    <div className="relative pb-6  bg-white">
      <Head>
        <title>{name}</title>
      </Head>
      <div>
        <div className="bg-white py-10 px-4 xl:px-0">
          <div className="xl:max-w-[1104px] mx-auto flex xl:flex-row flex-col justify-between ">
            <div className=" w-[504px]">
              <div>
                <p className="text-h4">{name}</p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex items-center gap-2">
                    <XProfileIcon name="graduationCapIcon" fill="#666666" />
                    <p className="text-p16 text-grey-1">{passScore} điểm</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <XProfileIcon name="clockCountdownIcon" fill="#666666" />
                    <p className="text-p16 text-grey-1">
                      {Math.floor(totalTime / 60)} phút
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <XProfileIcon name="quizQuestion" fill="#666666" />
                    <p className="text-p16 text-grey-1">
                      {Object.keys(answers).length} / {questions?.length} câu
                      hỏi
                    </p>
                  </div>
                </div>
                <div>
                  <div className=" w-full h-2 bg-gray-200 mt-3 mb-5 rounded-full transition-all overflow-hidden  flex">
                    <div
                      className="bg-button transition-all text-p16  text-neutral text-center p-0.5  rounded-full"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  {percent < 100 && (
                    <div className="">
                      <p>
                        Bạn đã hoàn thành {percent}% bài kiểm tra. Tiếp tục nào!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className=" ">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 min-w-[260px] rounded-2xl border border-grey-4 px-4 py-[6px]">
                  <XProfileIcon
                    name="user2"
                    fill="#000"
                    width="20"
                    height="20"
                  />
                  <p className="text-p16 text-black max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {userName}
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-grey-4 px-4 py-[6px]">
                  <XProfileIcon name="videocamera" />
                  <XProfileIcon name="unread" width="20" height="20" />
                </div>
              </div>
              <CountdownTimer
                key="countdown"
                handleSubmitExam={handleSubmitExam}
                targetDate={timer}
                name={name}
              />
            </div>
          </div>
        </div>
        <Swiper
          // ref={swiperRef}
          allowTouchMove={false}
          modules={[Navigation, Virtual]}
          navigation={{
            nextEl: '.next',
            prevEl: '.prev',
            clickable: true
          }}
          observer={true}
          observeParents={true}
          onSwiper={(swiper) => setSwiperRef(swiper)}
          autoHeight={true}
          onActiveIndexChange={(swiper) => {
            setActiveSlideIndex(swiper?.activeIndex)
          }}
          virtual={true}
          onSlideChange={(swiper) => {
            setIsLastSlide(swiper?.isEnd), setIsFirstSlide(swiper?.isBeginning)
          }}
        >
          {questionGroups?.map((partGroup, index) => {
            const {
              questionGroupId: partId,
              typeDisplay,
              content,
              position,
              audioUrl,
              imageUrl,
              type,
              metadata
            } = partGroup || {}
            const { imageUrls } = metadata || {}
            const ques = questions.filter(
              (ques) =>
                questionGroups[activeSlideIndex]?.questionGroupId ===
                ques.questionGroupId
            )
            return (
              <SwiperSlide key={index} virtualIndex={index}>
                <div className="flex items-center justify-center mb-[89px]">
                  <div className="w-[1104px] flex flex-col items-center justify-center">
                    {/* <p className="text-p18-bold">PART {partId}</p> */}
                    <p
                      dangerouslySetInnerHTML={{ __html: content }}
                      className="text-p18 whitespace-pre-wrap"
                    ></p>
                    {type === 3 && audioUrl && imageUrls?.length > 0 && (
                      <div className="w-full">
                        <AudioImageQuestion
                          audioUrl={audioUrl}
                          imageUrls={imageUrls}
                          handleToggleModal={handleToggleModal}
                          activeSlideIndex={activeSlideIndex}
                        />
                      </div>
                    )}
                    {type === 2 && audioUrl && (
                      <div className="w-full">
                        <AudioQuestion
                          audioUrl={audioUrl}
                          activeSlideIndex={activeSlideIndex}
                        />
                      </div>
                    )}
                    {imageUrls?.length > 0 && (
                      <div
                        className={`w-full grid ${
                          imageUrls?.length < 2 ? 'grid-cols-1' : 'grid-cols-2'
                        }`}
                      >
                        {imageUrls?.map((image, idx) => {
                          return (
                            <div
                              key={idx}
                              onClick={() => handleToggleModal(image)}
                              className="relative w-full h-[500px] flex items-center justify-center"
                            >
                              <Image
                                src={image}
                                layout="fill"
                                alt=""
                                objectFit="contain"
                                quality={100}
                              />
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
                <Swiper
                  key={`${activeSlideIndex}-${activeSlideChildIndex}`}
                  initialSlide={activeSlideChildIndex}
                  allowTouchMove={false}
                  modules={[Navigation, Pagination]}
                  navigation={{
                    nextEl: `.nextChild` + activeSlideIndex,
                    // prevEl: '.prev',
                    clickable: true
                  }}
                  autoHeight={true}
                  observer={true}
                  observeParents={true}
                  pagination={{
                    el: `.swiper-custom-pagination-test` + activeSlideIndex,
                    clickable: true,

                    renderBullet: (indexBl, className) => {
                      return `<span key=${ques[indexBl]?.customNumber} class="${className} cursor-pointer text-p20 text-grey-1">${ques[indexBl].customNumber}</span>`
                    }
                  }}
                  onSlideChangeTransitionEnd={(swiper) => {
                    swiperRef.updateAutoHeight(400)
                  }}
                  onSwiper={setChildSwiper}
                  onPaginationUpdate={(swiper) => {
                    const bullets = swiper.pagination.el.querySelectorAll(
                      '.swiper-pagination-bullet'
                    )

                    bullets.forEach((bullet, index) => {
                      if (answers.hasOwnProperty(ques[index]?.exQuestionId)) {
                        bullet.classList.add('custom-bullet-passed-test')
                      } else {
                        bullet.classList.remove('custom-bullet-passed-test')
                      }
                    })
                  }}
                  onSlideChange={(swiper) => {}}
                >
                  {questions
                    ?.filter(
                      (ques) =>
                        questionGroups[activeSlideIndex]?.questionGroupId ===
                        ques.questionGroupId
                    )
                    ?.map((el, idx) => {
                      const {
                        questionGroupId,
                        question,
                        exQuestionId,
                        customNumber
                      } = el || {}

                      const {
                        exAnswers,
                        content,
                        enumQuestionType,
                        imageTemplate,
                        detail,
                        mediaLink,
                        metadata
                      } = question || {}

                      const { imageUrls: childImageUrls } = metadata || {}

                      return (
                        <SwiperSlide key={idx}>
                          <div key={`nextChild` + activeSlideIndex}>
                            <QuestionItem
                              {...el}
                              mediaLink={childImageUrls}
                              position={customNumber}
                              partId={questionGroupId}
                              answers={exAnswers}
                              questionTitle={content}
                              type={imageTemplate}
                              handleChooseAnswer={handleChooseAnswer}
                              result={answers}
                              questionIndex={idx}
                              exQuestionId={exQuestionId}
                              detail={detail}
                              showNextArrow={true}
                              classNextArrow={`nextChild` + activeSlideIndex}
                              handleToggleModal={handleToggleModal}
                            />
                          </div>
                        </SwiperSlide>
                      )
                    })}
                </Swiper>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <div
          key={activeSlideIndex}
          className={` mb-8 max-w-[1100px] flex-wrap mx-auto  flex items-center justify-center gap-5 swiper-custom-pagination-test${activeSlideIndex}`}
        ></div>
        <div className="w-full flex justify-center items-center  gap-4 ">
          <button
            disabled={isFirstSlide}
            className="prev disabled:bg-grey-4 disabled:text-black text-neutral  flex justify-center cursor-pointer px-8 py-3 rounded-lg bg-button"
          >
            <p className="text-p18-bold ">Previous PART</p>
          </button>
          <div className={`${isLastSlide ? 'hidden' : 'block'}`}>
            <button
              disabled={isLastSlide}
              className="next disabled:bg-grey-4 disabled:text-black text-neutral  flex justify-center  cursor-pointer px-8 py-3 rounded-lg bg-button"
            >
              <p className="text-p18-bold ">Next PART</p>
            </button>
          </div>
          <div className={`${!isLastSlide ? 'hidden' : 'block'}`}>
            <button
              // disabled={isLastSlide}
              onClick={() => handleNextSlide()}
              className="next disabled:bg-grey-4 disabled:text-black text-neutral w-[150px] flex justify-center  cursor-pointer px-4 py-3 rounded-lg bg-button"
            >
              <p className="text-p18-bold ">Done</p>
            </button>
          </div>
        </div>
      </div>
      {/* Bottom Pagination */}
      <div
        onClick={() => {
          if (!isShowBottomSheet) {
            toggleBottomSheet()
          }
        }}
        className={`fixed border border-gray-100 bottom-0 left-0 w-screen pb-10 bg-white z-[9999]  rounded-t-[50px] transition-all duration-300 shadow-2xl ${
          !isShowBottomSheet &&
          'translate-y-[330px] hover:bg-slate-100 cursor-pointer'
        }`}
      >
        <div className="relative pt-2 h-full">
          <div className="flex items-center justify-center">
            <div
              onClick={() => toggleBottomSheet()}
              className={`cursor-pointer animate-pulse ${
                !isShowBottomSheet && 'rotate-180'
              }`}
            >
              <XProfileIcon name="arrowToeic" />
            </div>
          </div>
          <div className="h-full flex items-center justify-evenly ">
            <div className=" flex flex-col justify-between gap-44">
              <div className="prevBottom w-12 h-12 rotate-90 flex items-center justify-center rounded-full hover:bg-grey-4 cursor-pointer">
                <XProfileIcon name="arrowLeft" />
              </div>
              <div className="nextBottom w-12 h-12 -rotate-90 flex items-center justify-center rounded-full hover:bg-grey-4 cursor-pointer">
                <XProfileIcon name="arrowLeft" />
              </div>
            </div>
            <Swiper
              allowTouchMove={false}
              direction="vertical"
              modules={[Navigation]}
              height={300}
              autoHeight={true}
              navigation={{
                nextEl: `.nextBottom`,
                prevEl: '.prevBottom',
                clickable: true
              }}
              className="!m-0"
              onActiveIndexChange={(swiper) => {
                setActiveBottomSlideIndex(swiper?.activeIndex)
              }}
            >
              {sliceArray?.map((item, idn) => {
                if (item?.length > 0) {
                  return (
                    <SwiperSlide key={idn}>
                      <div className="pt-4 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-4">
                        {item.map((ques, idx) => {
                          return (
                            <div
                              onClick={() => {
                                handleSlideTo(ques.exQuestionId)
                              }}
                              key={ques.customNumber}
                              className="bottom-pagination-bullet w-10 h-10 flex items-center justify-center border border-grey-3 border-dashed rounded-full cursor-pointer text-p16 text-black font-bold select-none"
                            >
                              {ques.customNumber}
                            </div>
                          )
                        })}
                      </div>
                    </SwiperSlide>
                  )
                }
              })}
            </Swiper>
            <div>
              <button
                disabled={Object.keys(answers).length !== questions?.length}
                onClick={() => handleNextSlide()}
                className="next disabled:bg-grey-4 disabled:text-black text-neutral w-[118px] flex justify-center  cursor-pointer px-8 py-3 rounded-lg bg-button"
              >
                <p className="text-p18-bold ">Done</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        toggleModal={handleToggleModal}
        hiddenCancel={true}
        childStyle="w-screen h-fit md:w-fit  translate-y-10 mt-4 transition-all animate-fadeIn shadow-md  bg-white rounded-2xl "
        modalStyle={`w-[100vw] h-[100vh] bg-black/30  z-[10000] fixed flex justify-center items-start  left-[calc(0%)] top-[calc(0%)] transition-all pb-24 duration-500 overflow-y-scroll custom-scrollbar`}
        // title="Gói Giải Pháp"
        // styleTitle="text-p28-bold text-neutral"
      >
        <div className="relative w-[1140px] h-[800px] flex items-center justify-center">
          <Image
            src={imageUrl}
            layout="fill"
            alt=""
            objectFit="contain"
            quality={100}
          />
        </div>
      </Modal>
    </div>
  )
}

export default QuizInProgress
