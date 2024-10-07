import { Slider } from 'common/presentation/Swiper'
import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { SwiperSlide } from 'swiper/react'
import MessDetail from '../MessDetail'

const MessBlock = (props) => {
  const { comments } = props

  if (comments?.length === 0) {
    return <Fragment></Fragment>
  }
  return (
    <div className=" max-w-[1140px] mx-auto  xl:px-[0] px-5">
      <Slider
        breakpoints={{
          330: {
            slidesPerView: 1,
            slidesPerGroup: 1
          }
        }}
        hasArrow={true}
      >
        {comments?.map((comment, ind) => {
          return (
            <SwiperSlide key={ind}>
              <MessDetail
                key={`comment-${ind}`}
                type={(ind + 2) % 2}
                comment={comment}
              />
            </SwiperSlide>
          )
        })}
      </Slider>
    </div>
  )
}

MessBlock.propTypes = {
  comments: PropTypes.array
}

MessBlock.defaultProps = {
  comments: []
}

export default MessBlock
