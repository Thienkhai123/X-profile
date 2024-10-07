import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import SkeletonBox from 'common/presentation/Skeleton/SkeletonBox'

const WorkDayItem = (props) => {
  const { title, description, imageUrl } = props
  return (
    <div className=" xl:w-full   xl:h-full   min-h-[293px] p-5 mr-0 bg-white rounded-xl flex flex-col ">
      <div className="flex justify-center mt-[28px] ">
        {imageUrl && (
          <div className="min-h-[156px] flex items-center">
            <Image
              width={120}
              height={120}
              src={imageUrl}
              alt=""
              objectFit="contain"
            />
          </div>
        )}
        {/* // ) : (
        //   <div className="mb-5">
        //     <SkeletonBox width=" w-[326px]" height="h-[160px]" bg="bg-white" />
        //   </div>
        // )} */}
      </div>
      <div className="text-center mb-[8px] mt-[20px]">
        <p className="xl:text-p20-bold text-p16-bold">{title}</p>
      </div>
      <div className="flex justify-center ">
        <div className="w-[326px] text-center">
          <div
            className="xl:text-p18 font-normal text-grey-1 text-p12 h-[80px] xl:h-fit"
            style={{ wordBreak: 'break-word' }}
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
      </div>
    </div>
  )
}

WorkDayItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}
WorkDayItem.defaultProps = {
  title: 'Buổi sáng',
  description:
    ' You start the day with a discovery meeting for stakeholders from multiple departments. On the agenda: making sure the scope of your latest project.'
}

export default WorkDayItem
