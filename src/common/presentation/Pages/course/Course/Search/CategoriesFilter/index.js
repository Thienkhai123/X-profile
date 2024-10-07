import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
const CATEGORIES = [
  {
    id: 2,
    title: 'Development',
    subMenu: [
      {
        subId: 0,
        title: 'Web Development',
        subSubMenu: []
      },
      {
        subId: 1,
        title: 'Data science',
        subSubMenu: []
      },
      {
        subId: 2,
        title: 'Mobile Development',
        subSubMenu: []
      },
      {
        subId: 3,
        title: 'Programming Languages',
        subSubMenu: [
          {
            subSubId: 0,
            title: 'Marketing'
          },
          {
            subSubId: 1,
            title: 'Lifestyle'
          },
          {
            subSubId: 2,
            title: 'C#'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'IT & Software',
    subMenu: [
      {
        subId: 0,
        title: 'Databse Design & Development',
        subSubMenu: []
      },
      {
        subId: 1,
        title: 'Software Testing',
        subSubMenu: []
      },
      {
        subId: 2,
        title: 'Mobile ',
        subSubMenu: []
      },
      {
        subId: 3,
        title: 'Languages',
        subSubMenu: [
          {
            subSubId: 0,
            title: 'Python'
          },
          {
            subSubId: 1,
            title: 'Java'
          },
          {
            subSubId: 2,
            title: 'C#'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Office Productivity',
    subMenu: [
      {
        subId: 0,
        title: 'Databse Design & Development',
        subSubMenu: []
      },
      {
        subId: 1,
        title: 'Software Testing',
        subSubMenu: []
      },
      {
        subId: 2,
        title: 'Mobile ',
        subSubMenu: []
      },
      {
        subId: 3,
        title: 'Languages',
        subSubMenu: [
          {
            subSubId: 0,
            title: 'Python'
          },
          {
            subSubId: 1,
            title: 'Java'
          },
          {
            subSubId: 2,
            title: 'C#'
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Personal Development',
    subMenu: [
      {
        subId: 0,
        title: 'Databse Design & Development',
        subSubMenu: []
      },
      {
        subId: 1,
        title: 'Software Testing',
        subSubMenu: []
      },
      {
        subId: 2,
        title: 'Mobile ',
        subSubMenu: []
      },
      {
        subId: 3,
        title: 'Languages',
        subSubMenu: [
          {
            subSubId: 0,
            title: 'Python'
          },
          {
            subSubId: 1,
            title: 'Java'
          },
          {
            subSubId: 2,
            title: 'C#'
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'Design',
    subMenu: [
      {
        subId: 0,
        title: 'Databse Design & Development',
        subSubMenu: []
      },
      {
        subId: 1,
        title: 'Software Testing',
        subSubMenu: []
      },
      {
        subId: 2,
        title: 'Mobile ',
        subSubMenu: []
      },
      {
        subId: 3,
        title: 'Languages',
        subSubMenu: [
          {
            subSubId: 0,
            title: 'Python'
          },
          {
            subSubId: 1,
            title: 'Java'
          },
          {
            subSubId: 2,
            title: 'C#'
          }
        ]
      }
    ]
  },
  {
    id: 7,
    title: 'Marketing',
    subMenu: [
      {
        subId: 0,
        title: 'Databse Design & Development',
        subSubMenu: []
      },
      {
        subId: 1,
        title: 'Software Testing',
        subSubMenu: []
      },
      {
        subId: 2,
        title: 'Mobile ',
        subSubMenu: []
      },
      {
        subId: 3,
        title: 'Languages',
        subSubMenu: [
          {
            subSubId: 0,
            title: 'Python'
          },
          {
            subSubId: 1,
            title: 'Java'
          },
          {
            subSubId: 2,
            title: 'C#'
          }
        ]
      }
    ]
  },
  {
    id: 8,
    title: 'Lifestyle',
    subMenu: [
      {
        subId: 0,
        title: 'Databse Design & Development',
        subSubMenu: []
      },
      {
        subId: 1,
        title: 'Software Testing',
        subSubMenu: []
      },
      {
        subId: 2,
        title: 'Mobile ',
        subSubMenu: []
      },
      {
        subId: 3,
        title: 'Languages',
        subSubMenu: [
          {
            subSubId: 0,
            title: 'Python'
          },
          {
            subSubId: 1,
            title: 'Java'
          },
          {
            subSubId: 2,
            title: 'C#'
          }
        ]
      }
    ]
  },
  {
    id: 9,
    title: 'Photography & Video',
    subMenu: [
      {
        subId: 0,
        title: 'Databse Design & Development',
        subSubMenu: []
      },
      {
        subId: 1,
        title: 'Software Testing',
        subSubMenu: []
      },
      {
        subId: 2,
        title: 'Mobile ',
        subSubMenu: []
      },
      {
        subId: 3,
        title: 'Languages',
        subSubMenu: [
          {
            subSubId: 0,
            title: 'Python'
          },
          {
            subSubId: 1,
            title: 'Java'
          },
          {
            subSubId: 2,
            title: 'C#'
          }
        ]
      }
    ]
  },
  {
    id: 9,
    title: 'Music',
    subMenu: [
      {
        subId: 0,
        title: 'Databse Design & Development',
        subSubMenu: []
      },
      {
        subId: 1,
        title: 'Software Testing',
        subSubMenu: []
      },
      {
        subId: 2,
        title: 'Mobile ',
        subSubMenu: []
      },
      {
        subId: 3,
        title: 'Languages',
        subSubMenu: [
          {
            subSubId: 0,
            title: 'Python'
          },
          {
            subSubId: 1,
            title: 'Java'
          },
          {
            subSubId: 2,
            title: 'C#'
          }
        ]
      }
    ]
  }
]
const CategoriesFilter = (props) => {
  const { refCategory, setIsShow = () => {}, isShow } = props
  const [level, setLevel] = useState(0)
  const parentRef = useRef(null)

  const parentWidth = parentRef.current ? parentRef?.current?.offsetWidth : 0
  const parentHeight = parentRef.current ? parentRef?.current?.offsetHeight : 0

  return (
    <div ref={refCategory} className="relative">
      <button
        onClick={() =>
          setIsShow({
            ...isShow,
            searchCourse: false,
            categoryCourse: !isShow.categoryCourse
          })
        }
        className="outline-none focus:outline-none  border border-grey-3 px-6 py-[13px] bg-white  flex items-center justify-between min-w-[240px] rounded-lg  "
      >
        <span className="text-p18">Danh mục</span>
        <div>
          <XProfileIcon name="arrowDown" stroke="black" />
        </div>
      </button>

      <div
        className={`absolute ${
          isShow.categoryCourse
            ? 'min-w-[358px] h-[632px] '
            : 'w-0 h-0 overflow-hidden'
        } ${
          level === 0 ? 'rounded-lg' : 'rounded-l-lg'
        } bg-white outline-1 outline mt-2 outline-grey-4  z-[60] shadow-[0_16px_24px_0_rgba(0,0,0,0.04)]`}
      >
        <div ref={parentRef} className="min-w-[358px] h-[632px] p-2 relative ">
          <div className="px-6 py-[13px] hover:bg-portfolio-empty cursor-pointer rounded-lg  ">
            <p className="text-p18 leading-[30px]">Tất cả khoá học</p>
          </div>
          <div className="px-6 py-[13px] flex items-center gap-4 hover:bg-portfolio-empty cursor-pointer rounded-lg  ">
            <p className="text-p18 leading-[30px]">Khoá học combo</p>
            <div className="relative">
              <Image
                src={'/images/newCourseTag.svg'}
                width={48}
                height={26}
                alt=""
                quality={100}
              />
            </div>
          </div>
          {CATEGORIES?.map((menu, index) => {
            const { title, id, subMenu } = menu
            if (subMenu.length <= 0) {
              return (
                <div
                  className="px-6 py-[13px] hover:bg-portfolio-empty cursor-pointer rounded-lg  "
                  key={index}
                >
                  <p className="text-p18 leading-[30px]">{title}</p>
                </div>
              )
            } else {
              return (
                <div
                  onMouseEnter={() => {
                    setLevel(1)
                  }}
                  onMouseLeave={() => {
                    setLevel(0)
                  }}
                  className="px-6  group py-[13px] flex items-center justify-between hover:bg-portfolio-empty cursor-pointer rounded-lg  "
                  key={index}
                >
                  <p className="text-p18 group-hover:text-button-2 leading-[30px]">
                    {title}
                  </p>
                  <div className="-rotate-90">
                    <XProfileIcon name="arrowDown" stroke="black" />
                  </div>
                  <div
                    style={{
                      left: parentWidth
                      // height: `${parentHeight + 2}px`
                    }}
                    className={`absolute h-[632px] ${
                      level === 1 ? 'rounded-r-lg' : ''
                    } invisible group-hover:visible shadow-[0_16px_0_0_rgba(0,0,0,0.04)] outline outline-1 outline-grey-4 delay-75 top-[0] translate-y-0 bg-white min-w-[358px] p-2 `}
                  >
                    {subMenu?.map((menu, ind) => {
                      const { title, subId, subSubMenu } = menu
                      if (subSubMenu.length <= 0) {
                        return (
                          <div
                            className="px-6 py-[13px] hover:bg-portfolio-empty cursor-pointer rounded-lg  "
                            key={ind}
                          >
                            <p className="text-p18 leading-[30px]">{title}</p>
                          </div>
                        )
                      } else {
                        return (
                          <div
                            onMouseEnter={() => {
                              setLevel(2)
                            }}
                            onMouseLeave={() => {
                              setLevel(1)
                            }}
                            className="px-6 py-[13px] group/subsub flex items-center justify-between hover:bg-portfolio-empty cursor-pointer rounded-lg  "
                            key={ind}
                          >
                            <p className="text-p18 group-hover/subsub:text-button-2 leading-[30px]">
                              {title}
                            </p>
                            <div className="-rotate-90">
                              <XProfileIcon name="arrowDown" stroke="black" />
                            </div>
                            <div
                              style={{
                                left: parentWidth,
                                height: `${parentHeight}px`
                              }}
                              className={`absolute child invisible ${
                                level === 2 ? 'rounded-r-lg' : ''
                              }  group-hover/subsub:visible delay-75 shadow-[0_16px_0_0_rgba(0,0,0,0.04)] top-0 outline outline-1 outline-grey-4   bg-white min-w-[358px]  p-2  rounded-r-lg`}
                            >
                              {subSubMenu?.map((menu, idx) => {
                                const { title, subSubId } = menu

                                return (
                                  <div
                                    className="px-6 py-[13px] group/last hover:bg-portfolio-empty cursor-pointer rounded-lg  "
                                    key={idx}
                                  >
                                    <p className="text-p18 group-hover/last:text-button-2 leading-[30px]">
                                      {title}
                                    </p>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )
                      }
                    })}
                  </div>
                </div>
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

CategoriesFilter.propTypes = {}

export default CategoriesFilter
