import Image from 'next/image'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import { useDispatch } from 'react-redux'
import {
  getAllProductCourse,
  selectProductCourseCategory
} from 'store/app/courseProductGuidSlice'
import { useSelector } from 'react-redux'
import CourseManySourceItem from '../CourseManySourceItem'
import BlogManySourceItem from '../BlogManySourceItem'
import {
  getRelatedBlogsBySkill,
  getRelatedCoursesBySkill
} from 'store/app/journeySkillsDatabase'

const BLOG_DATA = [
  {
    id: 0,
    companyId: null,
    title: 'Generative AI with Large Language Models',
    desc: 'Consectetur erat magnis mollis vestibulum consequat suscipit himenaeos elit id netus. Pellentesque elit dictumst ex praesent ipsum suscipit nunc tristique...',
    imageUrl: '/images/positionTemplate.png',
    href: '/'
  },
  {
    id: 1,
    companyId: 23,
    title: 'Generative AI with Large Language Models',
    desc: 'Consectetur erat magnis mollis vestibulum consequat suscipit himenaeos elit id netus. Pellentesque elit dictumst ex praesent ipsum suscipit nunc tristique...',
    imageUrl: '/images/positionTemplate.png',
    href: '/'
  },
  {
    id: 2,
    companyId: 21,
    title: 'Generative AI with Large Language Models',
    desc: 'Consectetur erat magnis mollis vestibulum consequat suscipit himenaeos elit id netus. Pellentesque elit dictumst ex praesent ipsum suscipit nunc tristique...',
    imageUrl: '/images/couse-demo.png',
    href: '/'
  },
  {
    id: 3,
    companyId: 45,
    title: 'Generative AI with Large Language Models',
    desc: 'Consectetur erat magnis mollis vestibulum consequat suscipit himenaeos elit id netus. Pellentesque elit dictumst ex praesent ipsum suscipit nunc tristique...',
    imageUrl: '/images/positionTemplate.png',
    href: '/'
  },
  {
    id: 4,
    companyId: null,
    title: 'Generative AI with Large Language Models',
    desc: 'Consectetur erat magnis mollis vestibulum consequat suscipit himenaeos elit id netus. Pellentesque elit dictumst ex praesent ipsum suscipit nunc tristique...',
    imageUrl: '/images/couse-demo.png',
    href: '/'
  },
  {
    id: 5,
    companyId: null,
    title: 'Generative AI with Large Language Models',
    desc: 'Consectetur erat magnis mollis vestibulum consequat suscipit himenaeos elit id netus. Pellentesque elit dictumst ex praesent ipsum suscipit nunc tristique...',
    imageUrl: '/images/positionTemplate.png',
    href: '/'
  },
  {
    id: 6,
    companyId: null,
    title: 'Generative AI with Large Language Models',
    desc: 'Consectetur erat magnis mollis vestibulum consequat suscipit himenaeos elit id netus. Pellentesque elit dictumst ex praesent ipsum suscipit nunc tristique...',
    imageUrl: '/images/couse-demo.png',
    href: '/'
  }
]
const SuggestCourseModal = (props) => {
  const {
    handleCloseModalSuggestCourse = () => {},
    modalSuggestCourse = false,
    relatedCourse,
    relatedBlog,
    skill = {}
  } = props
  const dispatch = useDispatch()
  const course = useSelector(selectProductCourseCategory)
  const modalSuggestCourseRef = useRef(null)
  console.log(relatedBlog)

  const {
    name: title,
    examTotalTime: time,
    examTotalQuestions: question,
    description,
    skillId,
    id
  } = skill || {}

  const handleLinkCourse = (productGruid, isUserOwned) => {
    window.open(`/course/${productGruid}`, '_blank')
  }
  const handleLinkOtherCourse = (url) => {
    window.open(url, '_blank')
  }
  const handleLinkBlog = (url) => {
    window.open(url, '_blank')
  }
  useOnClickOutside(modalSuggestCourseRef, handleCloseModalSuggestCourse)
  useEffect(() => {
    dispatch(getRelatedCoursesBySkill({ skillId }))
    dispatch(getRelatedBlogsBySkill({ skillId }))
  }, [])
  return (
    <div
      key={id}
      className={`${
        modalSuggestCourse ? 'z-[10000] bg-black/30' : '-z-50 '
      } w-[100vw] h-[100vh] fixed flex justify-center items-start  left-[calc(0%)] top-[calc(0%)] transition-all md:pb-24 duration-500 overflow-y-scroll`}
    >
      <div
        ref={modalSuggestCourseRef}
        className={`w-[1024px] md:min-h-fit min-h-full bg-white md:rounded-2xl  overflow-hidden duration-200 animate-fadeIn md:translate-y-20`}
      >
        <div>
          <div className="relative md:p-10 pt-[10px] flex md:gap-[53px] items-center justify-center md:justify-normal md:h-[240px] md:bg-[#F5F6F7]">
            <div className="min-w-[280px] md:block hidden">
              <Image
                src={'/images/bearSkillSuggest.png'}
                width={280}
                height={240}
                alt=""
                quality={100}
              />
            </div>
            <div
              onClick={() => handleCloseModalSuggestCourse()}
              className="absolute md:top-10 top-3 md:right-10 md:left-auto left-6 cursor-pointer"
            >
              <XProfileIcon
                name="cross"
                stroke="#000000"
                // width="20"
                // height="20"
              />
            </div>
            <div className="flex flex-col items-center justify-center ">
              <p
                style={{ wordBreak: 'break-word' }}
                className="md:text-p28-bold text-p16-bold line-clamp-1 mb-2"
              >
                {title}
              </p>
              <div className="flex items-center gap-1">
                {time > 0 && (
                  <p
                    style={{ wordBreak: 'break-word' }}
                    className="md:text-p18 text-p14 line-clamp-1 "
                  >
                    {Math.floor(time / 60) || 0} phút
                  </p>
                )}
                {time > 0 && question > 0 && (
                  <p className="md:text-p18 text-p14 ">•</p>
                )}
                {question > 0 && (
                  <p
                    style={{ wordBreak: 'break-word' }}
                    className="md:text-p18 text-p14 line-clamp-1 "
                  >
                    {question || 0} câu hỏi
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="md:p-10 p-6 pt-4">
            <p className="md:text-p18 text-p14 text-grey-1 mb-6">
              {description}
            </p>
            {/* Các khoá học liên quan */}
            {relatedCourse?.length > 0 && (
              <div className="mb-6">
                <p className="md:text-p20-bold text-p16-bold">
                  Các khoá học liên quan
                </p>
                <div className="md:max-w-[858px] md:mt-6 mt-4 grid grid-cols-2  lg:grid-cols-3 md:gap-6 gap-2 auto-rows-fr">
                  {relatedCourse?.map((courseItem, ind) => {
                    const { companyId, course, otherSource, type } = courseItem
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
                          <CourseManySourceItem
                            basePrice={basePrice}
                            sellingPrice={price}
                            name={name}
                            imageUrl={coverPictureUrl}
                            totalUserCount={totalUserCount || 0}
                            totalComment={totalComments}
                            totalVideoCount={totalVideoLessons}
                            length={totalSeconds}
                            source={type === 0 ? 'x-profile' : 'other'}
                            // maxWidth="100%"
                            // widthImg={360.87}
                            isCompanyCourse={type === 0}
                            handleLinkCourse={() => handleLinkCourse(seoName)}
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
                      const { imageUrl: imageUrlAuthor, name: authorName } =
                        otherSourceAuthor || {}
                      const { price, priceUnit } = metadataOther || {}
                      return (
                        <div key={ind} className="relative">
                          <CourseManySourceItem
                            name={title}
                            imageUrl={imageUrl}
                            source={type === 0 ? 'x-profile' : 'other'}
                            isCompanyCourse={type === 0}
                            company={authorName}
                            sellingPrice={price}
                            priceUnit={priceUnit}
                            companyImageUrl={imageUrlAuthor}
                            handleLinkCourse={() => handleLinkOtherCourse(url)}
                          />
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
            )}
            {/* Các blog liên quan */}
            {relatedBlog?.length > 0 && (
              <div className="flex flex-col items-start md:gap-6 gap-5 max-w-[943px]">
                <p className="md:text-p20-bold text-p16-bold">
                  Các blog liên quan
                </p>
                {relatedBlog?.map((blogItem, ind) => {
                  const { companyId, otherSource } = blogItem || {}
                  const {
                    otherSourceAuthor,
                    imageUrl,
                    title,
                    description,
                    url
                  } = otherSource || {}
                  const {
                    isXProfile,
                    name,
                    imageUrl: imageUrlAuthor
                  } = otherSourceAuthor || {}
                  return (
                    <BlogManySourceItem
                      key={ind}
                      title={title}
                      desc={description}
                      imageUrl={imageUrl}
                      isCompanyCourse={isXProfile}
                      handleLinkBlog={() => handleLinkBlog(url)}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

SuggestCourseModal.propTypes = {}

SuggestCourseModal.defaultProps = {}

export default SuggestCourseModal
