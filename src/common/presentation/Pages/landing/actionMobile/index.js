import React, { useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'

const ActionMobile = (props) => {
  const {
    handleMap,
    handleShareBlog,
    handleCreateProfile,
    title = 'Tester'
  } = props
  const [hidden, setHidden] = useState({
    hiddenMap: true,
    hiddenBlog: true,
    hiddenPortfolio: true
  })
  return (
    <div className="flex flex-col gap-[24px] relative z-[100]">
      <div className="flex justify-between px-[24px]   border border-[0.5] border-black rounded-[16px] ">
        <div className="flex gap-[16px] py-[20px]">
          <div className="pt-[4px]">
            <XProfileIcon name="map" />
          </div>
          <div>
            <p
              className="text-p16-bold text-neutral  mb-[4px] cursor-pointer"
              onClick={() => handleMap()}
            >
              Bản đồ Phát triển
            </p>
            {!hidden.hiddenMap && (
              <p className={`text-p14 text-grey-1 duration-200 `}>
                Tìm hiểu thêm về nghề {title} qua bản đồ Phát triển sản phẩm
                ngành Công nghệ phần mềm
              </p>
            )}
          </div>
        </div>
        <div
          className="ml-[20px] py-[28px]"
          onClick={() => setHidden({ ...hidden, hiddenMap: !hidden.hiddenMap })}
        >
          <div
            className={`transition duration-200 cursor-pointer ${
              !hidden.hiddenMap ? '' : '-rotate-90'
            }`}
          >
            <XProfileIcon name="arrowDown" />
          </div>
        </div>
      </div>
      <div className="flex justify-between px-[24px]   border border-[0.5] border-black rounded-[16px] ">
        <div className="flex gap-[16px] py-[20px]">
          <div className="pt-[4px]">
            <XProfileIcon name="blog" />
          </div>
          <div>
            <p
              className="text-p16-bold text-neutral mb-[4px]  cursor-pointer"
              onClick={() => handleShareBlog()}
            >
              Blog chia sẻ
            </p>
            {!hidden.hiddenBlog && (
              <p className="text-p14 text-grey-1">
                Đọc thêm các bài blog chia sẻ kiến thức cho nghề {title}
              </p>
            )}
          </div>
        </div>
        <div
          className="ml-[20px] py-[28px]"
          onClick={() =>
            setHidden({ ...hidden, hiddenBlog: !hidden.hiddenBlog })
          }
        >
          <div
            className={`transition duration-200  cursor-pointer ${
              !hidden.hiddenBlog ? '' : '-rotate-90'
            }`}
          >
            <XProfileIcon name="arrowDown" />
          </div>
        </div>
      </div>
      <div className="flex justify-between px-[24px]   border border-[0.5] border-black rounded-[16px] ">
        <div className="flex gap-[16px] py-[20px]">
          <div className="pt-[4px]">
            <XProfileIcon name="profile" />
          </div>
          <div>
            <p
              className="text-p16-bold text-neutral mb-[4px] cursor-pointer"
              onClick={() => handleCreateProfile()}
            >
              Tạo hồ sơ và ứng tuyển
            </p>
            {!hidden.hiddenPortfolio && (
              <p className="text-p14 text-grey-1">
                Hãy tạo hồ sơ năng lực & ứng tuyển nghề {title}!
              </p>
            )}
          </div>
        </div>
        <div
          className="ml-[20px] py-[28px]"
          onClick={() =>
            setHidden({ ...hidden, hiddenPortfolio: !hidden.hiddenPortfolio })
          }
        >
          <div
            className={`transition duration-200 cursor-pointer ${
              !hidden.hiddenPortfolio ? '' : '-rotate-90'
            }`}
          >
            <XProfileIcon name="arrowDown" />
          </div>
        </div>
      </div>
    </div>
  )
}

ActionMobile.propTypes = {}
ActionMobile.defaultProps = {}

export default ActionMobile
