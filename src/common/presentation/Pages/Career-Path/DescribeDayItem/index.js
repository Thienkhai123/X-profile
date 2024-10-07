import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

const DescribeDayItem = (props) => {
  const { title, description } = props
  return (
    <div className="w-[366px] h-[400px]">
      <div className="flex justify-center">
        <Image
          width={326}
          height={160}
          placeholder="blur"
          blurDataURL="/images/bearCat.png"
          src="/images/bearCat.png"
          alt=""
        />
      </div>
      <div className="text-center">
        <p className="text-p20-bold">{title}</p>
      </div>
      <div className="flex justify-center ">
        <div className="w-[326px] text-center">
          <p className="text-p18 font-normal text-grey-1 ">{description}</p>
        </div>
      </div>
    </div>
  )
}

DescribeDayItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}
DescribeDayItem.defaultProps = {
  title: 'Buổi sáng',
  description:
    ' You start the day with a discovery meeting for stakeholders from multiple departments. On the agenda: making sure the scope of your latest project.'
}

export default DescribeDayItem
