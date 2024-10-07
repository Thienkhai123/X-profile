import React from 'react'
import PropTypes from 'prop-types'
import OverviewGroupFilter from '../OverviewGroupFilter'

const OverviewFilterWrapper = (props) => {
  const { title = '', filterList = [], register, defaultValue } = props
  return (
    <>
      {filterList.map((item, ind) => {
        const { title, filterGroups, nameField, categoriesIds } = item
        return (
          <div key={ind} className=" border-b-stoke border-b pb-6 ">
            <OverviewGroupFilter
              nameField={nameField}
              defaultValue={defaultValue}
              title={title}
              categoriesIds={categoriesIds}
              filterGroups={filterGroups}
              register={register}
            />
          </div>
        )
      })}
    </>
  )
}

OverviewFilterWrapper.propTypes = {
  title: PropTypes.string,
  filterList: PropTypes.array.isRequired
}
OverviewFilterWrapper.defaultProps = {
  title: 'Filters',
  filterList: [
    {
      title: 'Course type',
      nameField: '',
      filterGroups: [
        {
          value: 'Blockchain',
          content: 'Blockchain'
        },
        {
          value: 'Machine Learning',
          content: 'Machine Learning'
        },
        {
          value: 'Database',
          content: 'Database'
        },
        {
          value: 'Frontend',
          content: 'Front end'
        },
        {
          value: 'Backend',
          content: 'Back end'
        }
      ]
    }
  ]
}

export default OverviewFilterWrapper
