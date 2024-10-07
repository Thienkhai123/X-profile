import React from 'react'
import PropTypes from 'prop-types'
import Button from 'common/presentation/Button'
import { CourseCard } from 'common/presentation/Card'
import StepSkill from './StepSkills'
import useTrans from 'common/hooks/useTrans'
import SkeletonBox from 'common/presentation/Skeleton/SkeletonBox'

const DemandSkills = (props) => {
  const {
    type,
    title,
    id,
    courses,
    skillTypes,
    skillEnumType,
    setSkillEnumType,
    isLoading,
    height
  } = props
  const trans = useTrans()
  return (
    <div
      id={id}
      className="w-full h-full xl:w-[1140px] pl-5 pr-5 xl:pl-0 xl:pr-0 pt-[40px] pb-[40px]"
    >
      <div className="md:flex mb-10">
        <div className="mr-8">
          <p className="text-h2 text-neutral">{title}</p>
        </div>
        <div className="flex items-center gap-[12px]">
          {Object.keys(skillTypes)?.map((type, ind) => (
            <StepSkill
              key={`skill-${ind}`}
              enumType={type}
              selected={skillEnumType === type}
              onSelected={setSkillEnumType}
              title={skillTypes[type]}
            />
          ))}
        </div>
      </div>
      <div className={`${type !== 'profileCompany' ? 'mb-10' : ''}`}>
        {isLoading && (
          <div className="w-auto grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[20px]">
            {[...Array(3)].map((el, ind) => {
              return <SkeletonBox key={ind} width="w-full" height="h-[330px]" />
            })}
          </div>
        )}
        {courses?.length === 0 && !isLoading && (
          <div className="h-[349px]">
            <p className="text-p18 text-neutral">{trans.home.empty.course}</p>
          </div>
        )}
        {courses?.length > 0 && !isLoading && (
          <div className="w-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[20px]">
            {courses?.map((course, ind) => (
              <CourseCard
                course={
                  type !== 'profileCompany'
                    ? course
                    : { ...course, imageUrl: course?.coverPictureUrl }
                }
                key={`course-${course?.courseId}`}
                isLastIndex={(ind + 1) % 3 === 0}
                isCompanyCourse={type === 'profileCompany'}
                height={height}
              />
            ))}
          </div>
        )}
      </div>
      {type !== 'profileCompany' && (
        <div className="flex justify-center">
          <Button
            title="Xem tất cả khóa học"
            width="w-[227px]"
            height="h-auto"
            rounded="rounded-[12px]"
            padding="py-[12px]"
          />
        </div>
      )}
    </div>
  )
}

DemandSkills.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  courses: PropTypes.array,
  skillTypes: PropTypes.object,
  skillEnumType: PropTypes.string,
  setSkillEnumType: PropTypes.func,
  isLoading: PropTypes.bool
}

DemandSkills.defaultProps = {
  id: '',
  title: 'Learn In-demand Skills',
  type: '',
  courses: [],
  skillTypes: {},
  skillEnumType: '0',
  setSkillEnumType: () => {},
  isLoading: false
  // height: 'h-[349px]'
}

export default DemandSkills
