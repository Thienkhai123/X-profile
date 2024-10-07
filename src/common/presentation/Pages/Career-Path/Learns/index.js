import React from 'react'
import PropTypes from 'prop-types'
import { CourseCard } from 'common/presentation/Card'

const Learns = (props) => {
  const { title, COURSES } = props
  return (
    <div className="w-auto xl:w-[1261px]">
      <div className="text-center mb-10">
        <p className="text-h2">Các khóa học dành cho {title}</p>
      </div>
      <div className="mb-10">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[20px]">
          {COURSES.map((course, ind) => (
            <CourseCard
              isLastIndex={(ind + 1) % 3 === 0}
              course={course}
              key={ind}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
Learns.propTypes = { title: PropTypes.string }
Learns.defaultProps = {
  title: 'BA'
}

export default Learns
