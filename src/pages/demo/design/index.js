import useInfiniteScroll from 'common/hooks/useInfiniteScroll'
import { Slider } from 'common/presentation'
import {
  CourseCard,
  NewsCard,
  OrgCard,
  QuizCard,
  SurveyCard
} from 'common/presentation/Card'
import Head from 'next/head'
import { SwiperSlide } from 'swiper/react'
import {
  COURSES,
  DUMP_COURSE,
  NEWS,
  ORGS,
  QUIZS,
  SURVEYS
} from '../../../common/presentation/Pages/Demo/constants'
import CourseItem from 'common/presentation/Card/CourseItem'
import { useState } from 'react'
import BadgeMouseSkill from 'common/presentation/BadgeMoueseSkill'
import BadgeSheepSkill from 'common/presentation/BadgeSheepSkill'
import BadgeBearSkill from 'common/presentation/BadgeBearSkill'
import BadgeTestsSkill from 'common/presentation/BadgeTestsSkill'
import XProfileIcon from 'common/presentation/Icons'

const DemoDesign = () => {
  const [desc, setDesc] = useState('')
  const handleScroll = () => {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight)
      console.log('Fetch more list items!')
  }
  const [openDiscovery, setOpenDiscovery] = useState(false)
  const [itemHovered, setItemHovered] = useState(null)
  const handleOpenDiscovery = async (id) => {
    setItemHovered(id)
    setOpenDiscovery(true)
  }
  const handleCloseDiscovery = async () => {
    setOpenDiscovery(false)
  }

  useInfiniteScroll(handleScroll)

  const handleSubmit = () => {
    const el = document.getElementById('abc')
    console.log(el.innerHTML)
    setDesc(el.innerHTML)
  }

  const handleAddText = () => {
    const el2 = document.getElementById('cd')
    el2.innerHTML = desc
  }

  return (
    <>
      <Head>
        <title>Demo Design</title>
      </Head>
      <div className=" max-w-[1096px] mx-auto w-screen relative  px-5 xl:px-0">
        <Slider
          breakpoints={{
            330: {
              slidesPerView: 1.5,
              slidesPerGroup: 1
            },
            700: {
              slidesPerView: 2.4,
              slidesPerGroup: 2
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 20
            }
          }}
          hasArrow={DUMP_COURSE?.length > 3}
        >
          {DUMP_COURSE.map((item, ind) => {
            return (
              <SwiperSlide key={ind}>
                <CourseItem
                  {...item}
                  itemHovered={itemHovered}
                  isLastIndex={(ind + 1) % 4 === 0}
                  handleOpenDiscovery={handleOpenDiscovery}
                  openDiscovery={openDiscovery}
                  handleCloseDiscovery={handleCloseDiscovery}
                />
              </SwiperSlide>
            )
          })}
        </Slider>
      </div>

      <div className="max-w-[1141px] mx-auto mt-[20px]">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[20px]">
          {COURSES.map((course, ind) => (
            <CourseCard
              course={course}
              key={ind}
              isLastIndex={(ind + 1) % 3 === 0}
            />
          ))}
        </div>
      </div>

      <div className="max-w-[1141px] mx-auto mt-[20px]">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-[20px]">
          {QUIZS.map((quiz, ind) => (
            <QuizCard quiz={quiz} key={ind} isLastIndex={(ind + 1) % 4 === 0} />
          ))}
        </div>
      </div>

      <div className="max-w-[1141px] mx-auto mt-[20px]">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-[20px]">
          {ORGS.map((org, ind) => (
            <OrgCard org={org} key={ind} />
          ))}
        </div>
      </div>

      <div className="max-w-[500px] md:max-w-[800px] xl:max-w-[1141px] mx-auto mt-[20px]">
        <Slider
          breakpoints={{
            330: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              grid: { rows: 1, fill: 'row' }
            },
            1100: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              grid: { rows: 2, fill: 'row' }
            },
            1280: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              grid: { rows: 2, fill: 'row' }
            }
          }}
          hasArrow
        >
          {NEWS.map((news, ind) => (
            <SwiperSlide key={ind}>
              <NewsCard news={news} />
            </SwiperSlide>
          ))}
        </Slider>
      </div>

      <div className="max-w-[1141px] mx-auto mt-[20px]">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-[20px]">
          {SURVEYS.map((survey, ind) => (
            <SurveyCard content={survey} key={ind} />
          ))}
        </div>
      </div>

      <div className="mt-[20px]"></div>
      <div className="mt-[20px]  mx-auto xl:block hidden  relative">
        <div className="mb-[16px]">
          <p className="text-p18-bold text-neutral">Kỷ năng chung</p>
        </div>
        <div className="flex gap-[16px] justify-start items-end ">
          <div>
            <BadgeMouseSkill />
          </div>
          <div>
            <BadgeSheepSkill />
          </div>
          <div>
            <BadgeBearSkill />
          </div>
          <div>
            <BadgeTestsSkill />
          </div>
        </div>
      </div>

      <div
        className="text-area-custom mt-[20px]"
        contenteditable="true"
        id="abc"
      ></div>
      <button onClick={handleSubmit}>submit</button>
      <div className="text-area-custom" contenteditable="true" id="cd"></div>
      <button onClick={handleAddText}>add text</button>
    </>
  )
}

export default DemoDesign
