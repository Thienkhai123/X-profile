import React, { useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
import Button from 'common/presentation/Button'

const Action = (props) => {
  const {
    handleMap,
    handleShareBlog,
    handleCreateProfile,
    title = 'Tester'
  } = props

  const [choose, setChoose] = useState({
    chooseMap: false,
    chooseBlog: false
  })

  return (
    <div className="grid grid-cols-3 border-t-[0.5px] border-b-[0.5px] border-[#000000]">
      <div
        onMouseLeave={() => setChoose({ ...choose, chooseMap: false })}
        onMouseMove={() =>
          setChoose({ ...choose, chooseMap: true, chooseBlog: false })
        }
        className="group py-[36px] px-[40px] border-l-[0.5px] border-[#000000] cursor-pointer "
      >
        <div className="flex items-start gap-[24px]">
          <div className="p-[12px] rounded-[8px] border border-[0.5ox] border-[#000000] group-hover:border-[#F6BB3A]">
            <XProfileIcon
              name="map"
              fill={choose.chooseMap ? '#F6BB3A' : 'black'}
            />
          </div>
          <div>
            <div className="flex gap-[24px] mb-[8px]">
              <p
                className="sm:text-p18-bold group-hover:text-button"
                onClick={() => handleMap()}
              >
                Bản đồ Phát triển
              </p>
              <div className="transition -rotate-90">
                <XProfileIcon
                  name="arrowDown"
                  stroke={choose.chooseMap ? '#F6BB3A' : 'black'}
                />
              </div>
            </div>
            <p className="sm:text-p18 text-grey-1">
              Tìm hiểu thêm về nghề {title} qua bản đồ Phát triển sản phẩm ngành
              Công nghệ phần mềm
            </p>
          </div>
        </div>
      </div>
      <div
        onMouseLeave={() => setChoose({ ...choose, chooseBlog: false })}
        onMouseMove={() =>
          setChoose({ ...choose, chooseBlog: true, chooseMap: false })
        }
        className="group py-[36px] px-[40px] border-l-[0.5px] border-[#000000] cursor-pointer"
      >
        <div className="flex items-start gap-[24px]">
          <div className="p-[12px] rounded-[8px] border border-[0.5ox] border-[#000000] group-hover:border-[#F6BB3A]">
            <XProfileIcon
              name="blog"
              fill={choose.chooseBlog ? '#F6BB3A' : 'black'}
            />
          </div>
          <div>
            <div className="flex gap-[24px] mb-[8px]">
              <p
                className="sm:text-p18-bold group-hover:text-button"
                onClick={() => handleShareBlog()}
              >
                Blog chia sẻ
              </p>
              <div className="transition -rotate-90">
                <XProfileIcon
                  name="arrowDown"
                  stroke={choose.chooseBlog ? '#F6BB3A' : 'black'}
                />
              </div>
            </div>
            <p className="sm:text-p18 text-grey-1">
              Đọc thêm các bài blog chia sẻ kiến thức cho nghề {title}
            </p>
          </div>
        </div>
      </div>
      <div className="px-[40px] border-l-[0.5px] border-[#000000]">
        <div className="flex items-start gap-[24px] h-full">
          <div className="flex items-end h-full ">
            <div className="min-w-[78px] h-[109px]">
              <Image
                src="/images/Landing/cuu.png"
                alt=""
                width={78}
                height={109}
              />
            </div>
          </div>
          <div className="py-[36px]">
            <div className="flex gap-[24px] mb-[8px]">
              <p className="sm:text-p18-bold text-center">
                Hãy tạo hồ sơ năng lực & ứng tuyển nghề {title}!
              </p>
            </div>
            <div className="flex justify-center">
              <div className="flex justify-center relative group">
                <div className="bg-black rounded-[8px] h-[56px] duration-200 absolute  w-[136px] left-[4px] top-[4px] group-hover:left-[8px] group-hover:top-[8px] "></div>
                <Button
                  title="Tạo hồ sơ"
                  background="bg-white"
                  hover="hover:bg-button relative z-[100] duration-200"
                  width="w-[136px]"
                  height="h-[56px]"
                  rounded="rounded-[8px] border-[0.5px] border-[#000000]"
                  margin="m-0"
                  onClick={() => handleCreateProfile()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="py-[36px] px-[40px] border-l-[0.5px] border-[#000000]">
        <div className="flex items-start gap-[24px]">
          <div className="p-[12px] rounded-[8px] border border-[0.5ox] border-[#000000]">
            <XProfileIcon name="blog" />
          </div>
          <div>
            <div className="flex gap-[24px] mb-[8px]">
              <p className="sm:text-p18-bold">Blog chia sẻ</p>
              <div className="transition -rotate-90">
                <XProfileIcon name="arrowDown" />
              </div>
            </div>
            <p className="sm:text-p18 text-grey-1">
              Đọc thêm các bài blog chia sẻ kiến thức cho nghề Tester
            </p>
          </div>
        </div>
      </div> */}
    </div>
  )
}

Action.propTypes = {}
Action.defaultProps = {}

export default Action
