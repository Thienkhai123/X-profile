import React from 'react'
import PropTypes from 'prop-types'
import WorkExperience from '../workExperience'
import SurveyChoose from '../Pages/Survey/SurveyChoose'
import BadgeCourse from '../BadgeCourse'

const ATS_PDF = (props) => {
  const {
    targetRef,
    information = {},
    id = 'ATS',
    isLanguageVietnamese = true
  } = props

  const {
    name = 'Jeremy',
    mail = 'jeremy88@gmail.com',
    numberPhone = '09123456789',
    address = 'Ho Chi Minh',
    introduce = 'Turpis lectus natoque duis sit molestie augue cras. Pharetra ad mattis luctus laoreet volutpat curae dictum cras aliquam vehicula. Natoque feugiat nullam pretium erat letius praesent etiam id. Aptent aliquet luctus mus vehicula nam nascetur orci felis.',
    workExperience = [
      {
        skillName: 'UI/UX Designer',
        company: 'Công ty ABC',
        description: 'a',
        time: '04/2023 - Hiện tại'
      },
      {
        skillName: 'UI/UX Designer',
        company: 'Công ty ABC',
        description: 'a',
        time: '04/2023 - Hiện tại'
      }
    ],
    educations = [
      {
        schoolName: 'Đại học Sư Phạm TP. Hồ Chí Minh',
        academicYear: 'Công Nghệ Thông Tin • 2014 - 2018'
      }
    ],
    language = [
      {
        title: 'Tiếng anh'
      },
      {
        title: 'Tiếng Hàn'
      }
    ],
    generalSkills = [
      {
        title: 'Product Design'
      },
      {
        title: 'HTML'
      }
    ],
    professionalSkills = [
      {
        title: 'UXUI Design'
      },
      {
        title: 'SEO Content'
      }
    ],
    certifications = [
      { title: 'Google Analytics Individual Qualification', time: '2019' },
      { title: 'Digital Management Certification', time: '2019' }
    ],
    achievement = [
      { title: 'Software Engineer', time: '01/2019' },
      { title: 'Software Engineer', time: '01/2019' }
    ],
    experiences = [
      {
        title: 'Mobile Game',
        time: 'Viverra luctus velit ornare justo maecenas facilisis aliquet pede. Letius fusce aliquet tortor sapien semper a aenean felis facilisi vel suscipit.'
      },
      {
        title: 'Mobile Game',
        time: 'Viverra luctus velit ornare justo maecenas facilisis aliquet pede. Letius fusce aliquet tortor sapien semper a aenean felis facilisi vel suscipit.'
      }
    ]
  } = information

  return (
    <div className="flex justify-center">
      <div className="text-button-2 text-p28-bold  w-[1160px]">
        <div className="overflow-hidden h-0">
          <div id={id} ref={targetRef}>
            <div className="mb-[16px]">
              <p className="text-p36-bold text-neutral">{name}</p>
            </div>
            <div className="mb-[24px]">
              <p className="text-p18 text-neutral">
                {mail} | {numberPhone} | {address}
              </p>
            </div>
            <div className="pb-[40px] border-b border-grey-4">
              <p className="text-p18 text-grey-1">{introduce}</p>
            </div>
            {isLanguageVietnamese && (
              <div className="mb-[24px] pt-[40px]">
                <p>Kinh nghiệm làm việc</p>
              </div>
            )}
            {!isLanguageVietnamese && (
              <div className="mb-[24px] pt-[40px]">
                <p>Work experience</p>
              </div>
            )}
            <div>
              {workExperience?.map((element, ind) => {
                return (
                  <div key={ind} className="flex">
                    <div className="min-w-[40px]">
                      <div className="w-[16px] h-[16px] rounded-full bg-grey-3 mt-[8px]"></div>
                      {ind <= workExperience.length - 2 && (
                        <div className="h-full border-l-[2px] border-grey-3 ml-[7px]"></div>
                      )}
                    </div>
                    <div className="mb-[40px] w-full">
                      <WorkExperience {...element} />
                    </div>
                  </div>
                )
              })}
            </div>
            {isLanguageVietnamese && (
              <div className="mb-[24px] ">
                <p>Học vấn</p>
              </div>
            )}
            {!isLanguageVietnamese && (
              <div className="mb-[24px] ">
                <p>Educations</p>
              </div>
            )}

            <div className="mb-[40px] ">
              {educations?.map((element, ind) => {
                return (
                  <div key={ind} className="flex flex-col gap-[8px] ">
                    <p className="text-p20-bold text-neutral">
                      {element?.schoolName}
                    </p>
                    <div className="flex items-center gap-[8px]">
                      <p className="text-p18 text-grey-1">
                        {element?.academicYear}
                      </p>
                      <div className="w-[4px] h-[4px] bg-grey-1 rounded-full"></div>
                      <p className="text-p18 text-grey-1">
                        {element?.timeLearn}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
            {isLanguageVietnamese && (
              <div className="mb-[24px] ">
                <p>Ngôn ngữ</p>
              </div>
            )}
            {!isLanguageVietnamese && (
              <div className="mb-[24px] ">
                <p>Language</p>
              </div>
            )}
            <div className="mb-[40px] ">
              <div className="flex gap-[16px] flex-wrap">
                {language?.map((elment, ind) => {
                  return (
                    <div key={ind}>
                      <BadgeCourse
                        padding="8px 16px"
                        value={elment?.title}
                        bg="#F3F3F3"
                        radius="12px"
                        textStyle="text-p16 text-neutral"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
            {isLanguageVietnamese && (
              <div className="mb-[24px] ">
                <p>Kỹ năng chung</p>
              </div>
            )}
            {!isLanguageVietnamese && (
              <div className="mb-[24px] ">
                <p>General skills</p>
              </div>
            )}

            <div className="mb-[40px] ">
              <div className="flex gap-[16px] flex-wrap">
                {generalSkills?.map((elment, ind) => {
                  return (
                    <div key={ind}>
                      <BadgeCourse
                        padding="8px 16px"
                        value={elment?.title}
                        bg="#F3F3F3"
                        radius="12px"
                        textStyle="text-p16 text-neutral"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
            {isLanguageVietnamese && (
              <div className="mb-[24px] ">
                <p>Kỹ năng chuyên môn</p>
              </div>
            )}
            {!isLanguageVietnamese && (
              <div className="mb-[24px] ">
                <p>Professional skills</p>
              </div>
            )}

            <div className="mb-[40px] ">
              <div className="flex gap-[16px] flex-wrap">
                {professionalSkills?.map((elment, ind) => {
                  return (
                    <div key={ind}>
                      <BadgeCourse
                        padding="8px 16px"
                        value={elment?.title}
                        bg="#F3F3F3"
                        radius="12px"
                        textStyle="text-p16 text-neutral"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
            {isLanguageVietnamese && (
              <div className="mb-[24px] ">
                <p>Chứng chỉ chuyên môn</p>
              </div>
            )}
            {!isLanguageVietnamese && (
              <div className="mb-[24px] ">
                <p>Professional certifications</p>
              </div>
            )}

            <div className="mb-[40px] ">
              <div className="flex flex-col gap-[24px]">
                {certifications?.map((element, ind) => {
                  return (
                    <div key={ind} className="flex flex-col ga-[8px] ">
                      <p className="text-p20-bold text-neutral">
                        {element?.title}
                      </p>
                      <p className="text-p18 text-grey-1">{element?.time}</p>
                    </div>
                  )
                })}
              </div>
            </div>
            {isLanguageVietnamese && (
              <div className="mb-[24px] ">
                <p>Bảng thành tích</p>
              </div>
            )}
            {!isLanguageVietnamese && (
              <div className="mb-[24px] ">
                <p>Leaderboard</p>
              </div>
            )}

            <div className="mb-[40px] ">
              <div className="flex flex-col gap-[24px]">
                {achievement?.map((element, ind) => {
                  return (
                    <div key={ind} className="flex flex-col ga-[8px] ">
                      <p className="text-p20-bold text-neutral">
                        {element?.title}
                      </p>
                      <p className="text-p18 text-grey-1">{element?.time}</p>
                    </div>
                  )
                })}
              </div>
            </div>
            {isLanguageVietnamese && (
              <div className="mb-[24px] ">
                <p>Trải nghiệm khác</p>
              </div>
            )}
            {!isLanguageVietnamese && (
              <div className="mb-[24px] ">
                <p>Alternative experiences</p>
              </div>
            )}

            <div className="mb-[40px] ">
              <div className="flex flex-col gap-[24px]">
                {experiences?.map((element, ind) => {
                  return (
                    <div key={ind} className="flex flex-col ga-[8px] ">
                      <p className="text-p20-bold text-neutral">
                        {element?.title}
                      </p>
                      <p className="text-p18 text-grey-1">
                        {element?.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ATS_PDF.propTypes = {}

export default ATS_PDF
