import React from 'react'
import PropTypes from 'prop-types'

const RejectedSection = (props) => {
  const { handleClickRedirectHomePage } = props
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-8">
        <p className="text-p28-bold text-black">
          Cảm ơn bạn đã phản hồi thông tin này
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleClickRedirectHomePage}
            className="py-3 px-8 bg-button text-p18-bold rounded-lg lg:w-[194px]"
          >
            Trang chủ
          </button>
        </div>
      </div>
    </>
  )
}

RejectedSection.propTypes = {
  handleClickRedirectHomePage: PropTypes.func
}
RejectedSection.defaultProps = {
  handleClickRedirectHomePage: () => {}
}

export default RejectedSection
