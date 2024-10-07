import React from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'

const FailedSection = (props) => {
  const {
    accessToken,
    handleClickRedirectHomePage,
    handleClickRedirectSignInPage
  } = props
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-8">
        <div className="flex justify-center">
          <XProfileIcon name="cancelModal" />
        </div>
        <p className="text-p28-bold text-black">
          Có lỗi xảy ra, vui lòng thử lại sau
        </p>
        <div className="flex gap-2">
          {accessToken ? (
            <button
              onClick={handleClickRedirectHomePage}
              className="py-3 px-8 bg-button text-p18-bold rounded-lg lg:w-[194px]"
            >
              Trang chủ
            </button>
          ) : (
            <button
              onClick={handleClickRedirectSignInPage}
              className="py-3 px-8 bg-button text-p18-bold rounded-lg lg:w-[194px]"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </>
  )
}

FailedSection.propTypes = {
  accessToken: PropTypes.string,
  handleClickRedirectHomePage: PropTypes.func,
  handleClickRedirectSignInPage: PropTypes.func
}
FailedSection.defaultProps = {
  handleClickRedirectSignInPage: () => {},
  handleClickRedirectHomePage: () => {},
  accessToken: ''
}
export default FailedSection
