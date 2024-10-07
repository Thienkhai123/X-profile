import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import XProfileIcon from 'common/presentation/Icons'
const GroupFilter = (props) => {
  const {
    filterGroups,
    title,
    handleChangeFilter,
    nameField,
    handleChecked,
    isChecked
  } = props
  return (
    <>
      <p className="text-black text-p20-bold cursor-pointer mb-6">{title}</p>
      <div>
        <div className="flex flex-col gap-4 mb-6">
          {filterGroups?.map((item, ind) => {
            const { value, id, content, nameField = '', isChecked } = item
            return (
              <label
                key={ind}
                className="text-black text-p18 flex items-center gap-x-6 cursor-pointer "
              >
                <div className="relative">
                  <input
                    id={id}
                    type="checkbox"
                    value={value}
                    name={nameField}
                    checked={isChecked}
                    onChange={(e) => handleChangeFilter(e)}
                    className="appearance-none block w-6 h-6 accent-button bg-white border-2 peer checked:bg-button border-grey-4 rounded"
                  />
                  <div className="absolute top-0 w-full h-full flex items-center justify-center  opacity-0 peer-checked:opacity-100">
                    <XProfileIcon name="quizCheck" width="9.38" height="7.88" />
                  </div>
                </div>
                <span className="first-letter:uppercase text-p18">
                  {' '}
                  {content}
                </span>
              </label>
            )
          })}
        </div>
      </div>
    </>
  )
}

GroupFilter.propTypes = {
  filterGroups: PropTypes.array.isRequired,
  title: PropTypes.string
}
GroupFilter.defaultProps = {
  title: 'Course Type',
  filterGroups: [
    {
      id: 1,
      value: '1',
      content: 'Có phí'
    }
  ]
}

export default GroupFilter
