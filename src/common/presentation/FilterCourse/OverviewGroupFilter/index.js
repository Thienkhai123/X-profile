import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import XProfileIcon from 'common/presentation/Icons'
import CheckBoxFilterItem from '../CheckBoxFilterItem'
const OverviewGroupFilter = (props) => {
  const {
    filterGroups,
    nameField,
    title,
    register,
    defaultValue = [],
    categoriesIds
  } = props
  const [showDetail, setShowDetail] = useState(true)
  return (
    <>
      <div
        onClick={() => setShowDetail(!showDetail)}
        className="flex  justify-between items-center cursor-pointer "
      >
        <p className="text-black text-p18-bold">{title}</p>
      </div>
      <div
        className={` 
         duration-500 transition-all ease-in-out delay-150 `}
      >
        <div className="flex flex-col gap-4 mt-6">
          {filterGroups.map((item, ind) => {
            const { value, id, content } = item
            return (
              <div key={ind}>
                <CheckBoxFilterItem
                  value={value}
                  content={content}
                  nameField={nameField}
                  register={register}
                  selected={defaultValue?.includes(value?.toString())}
                />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

OverviewGroupFilter.propTypes = {
  filterGroups: PropTypes.array.isRequired,
  nameField: PropTypes.string,
  title: PropTypes.string
}
OverviewGroupFilter.defaultProps = {
  title: 'Course Type',
  filterGroups: [],
  nameField: ''
}

export default OverviewGroupFilter
