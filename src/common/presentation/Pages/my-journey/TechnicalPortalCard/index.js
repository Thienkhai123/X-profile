import useTrans from 'common/hooks/useTrans'
import XProfileIcon from 'common/presentation/Icons'
import WrapperSkillItemTippy from 'common/presentation/WrapperSkillItemTippy'

import { Fragment, useRef } from 'react'

const TechnicalPortalCard = (props) => {
  const {
    id,
    title,
    time,
    question,
    score,
    handleClickSuggest = () => {},
    handleClickExam = () => {}
  } = props
  return (
    <Fragment>
      <div className="md:block hidden group  hover:-translate-y-2  cursor-pointer transition-all duration-200">
        <div className="xl:w-[306px] h-[174px] hover:shadow-[0_8px_24px_0px_rgba(11,74,137,0.04)] rounded-3xl bg-[#F5F6F7] hover:bg-stoke border border-[#EDF0F2]">
          <div className="group-hover:hidden opacity-100 p-8">
            <p
              style={{ wordBreak: 'break-word' }}
              className="text-p18-bold line-clamp-1 mb-1"
            >
              {title}
            </p>
            <div className="flex items-center gap-1">
              {time > 0 && (
                <p
                  style={{ wordBreak: 'break-word' }}
                  className="text-p16 line-clamp-1 "
                >
                  {Math.floor(time / 60) || 0} phút
                </p>
              )}
              {time > 0 && question > 0 && <p className="text-p16 ">•</p>}
              {question > 0 && (
                <p
                  style={{ wordBreak: 'break-word' }}
                  className="text-p16 line-clamp-1 "
                >
                  {question || 0} câu hỏi
                </p>
              )}
            </div>
          </div>
          <div className="hidden  group-hover:block  p-8 h-full animate-fadeIn ">
            <div className="flex flex-col justify-between h-full">
              <div>
                <p
                  style={{ wordBreak: 'break-word' }}
                  className="text-p18-bold line-clamp-1 mb-1"
                >
                  {title}
                </p>
                {score > 0 && (
                  <div className=" w-full h-1 mt-2  bg-grey-4 rounded-full transition-all   flex items-center">
                    <div
                      className={`${
                        score > 61
                          ? 'bg-[#294F9B]'
                          : score > 31
                          ? 'bg-[#F6BB3A]'
                          : 'bg-[#E29D98]'
                      } transition-all text-p16  text-neutral text-center p-0.5 relative rounded-full `}
                      style={{ width: `${score}%` }}
                    >
                      <div className="absolute group -right-2 -top-[34px] flex flex-col gap-1 items-center"></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div onClick={() => handleClickExam()}>
                  <WrapperSkillItemTippy
                    classNameButton="h-14 w-14 rounded-full bg-white hover:bg-grey-4 duration-200 cursor-pointer flex items-center justify-center"
                    percent={score}
                    title=""
                    showIcon={true}
                  />
                </div>
                <div
                  onClick={() => handleClickSuggest()}
                  className="relative w-14 h-14  hover:bg-grey-4 rounded-full group-2 bg-white flex items-center justify-center"
                >
                  <XProfileIcon
                    name="bookBookmarkNoFill"
                    width="24"
                    height="24"
                  />
                  <span
                    className={`absolute hidden [.group-2:hover_&]:flex shadow-[0_16px_24px_0px_rgba(0,0,0,0.04)] justify-center transition-all right-1/2 border border-grey-4 translate-x-1/2 -top-4 -translate-y-full w-[200px] px-4 py-[9px]  rounded-2xl text-center text-black text-p14 leading-[26px] after:content-[''] after:border-t-white bg-white after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent z-30`}
                  >
                    Gợi ý khoá học liên quan
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="md:hidden min-h-[174px]  p-6 flex flex-col justify-between bg-light-blue rounded-3xl">
        <div>
          <p
            style={{ wordBreak: 'break-word' }}
            className="text-p16-bold line-clamp-1 mb-1"
          >
            {title}
          </p>
          <div className="flex items-center gap-1">
            {time > 0 && (
              <p
                style={{ wordBreak: 'break-word' }}
                className="text-p14 line-clamp-1 "
              >
                {Math.floor(time / 60) || 0} phút
              </p>
            )}
            {time > 0 && question > 0 && <p className="text-p14 ">•</p>}
            {question > 0 && (
              <p
                style={{ wordBreak: 'break-word' }}
                className="text-p14 line-clamp-1 "
              >
                {question || 0} câu hỏi
              </p>
            )}
          </div>
          {score > 0 && (
            <div className=" w-full h-1 mt-4  bg-grey-4 rounded-full transition-all   flex items-center">
              <div
                className={`${
                  score > 61
                    ? 'bg-[#294F9B]'
                    : score > 31
                    ? 'bg-[#F6BB3A]'
                    : 'bg-[#E29D98]'
                } transition-all text-p16  text-neutral text-center p-0.5 relative rounded-full `}
                style={{ width: `${score}%` }}
              >
                <div className="absolute group -right-2 -top-[34px] flex flex-col gap-1 items-center"></div>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div onClick={() => handleClickExam()}>
            <WrapperSkillItemTippy
              classNameButton="h-10 w-10 rounded-full bg-white hover:bg-grey-4 duration-200 cursor-pointer flex items-center justify-center"
              percent={score}
              title=""
              showIcon={true}
              iconWidth={'16'}
              iconHeight={'16'}
            />
          </div>
          <div
            onClick={() => handleClickSuggest()}
            className="relative w-10 h-10  hover:bg-grey-4 rounded-full group-2 bg-white flex items-center justify-center"
          >
            <XProfileIcon name="bookBookmarkNoFill" width="16" height="16" />
            <span
              className={`absolute hidden [.group-2:hover_&]:flex shadow-[0_16px_24px_0px_rgba(0,0,0,0.04)] justify-center transition-all right-1/2 border border-grey-4 translate-x-1/2 -top-4 -translate-y-full w-[200px] px-4 py-[9px]  rounded-2xl text-center text-black text-p14 leading-[26px] after:content-[''] after:border-t-white bg-white after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent z-30`}
            >
              Gợi ý khoá học liên quan
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default TechnicalPortalCard
