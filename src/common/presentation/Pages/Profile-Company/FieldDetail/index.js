import React from 'react'
import PropTypes from 'prop-types'
import FieldDetailItem from '../FieldDetailItem'

const FieldDetail = (props) => {
  const { title, FIELDETAIL } = props
  return (
    <div className="">
      <div className="text-center mb-4">
        <p className="sm:text-p20-bold text-p16-bold">{title}</p>
      </div>
      <div className="grid grid-row-3 gap-10 overflow-y-auto min-h-[200px] ">
        {FIELDETAIL?.map((element, ind) => {
          const { title, description, src } = element
          return (
            <div key={ind}>
              <FieldDetailItem
                title={title}
                description={description}
                src={src}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

FieldDetail.propTypes = { title: PropTypes.string }
FieldDetail.defaultProps = { title: 'Những sự thật thú vị' }

export default FieldDetail
