import useTrans from 'common/hooks/useTrans'
import XProfileIcon from 'common/presentation/Icons'
import WrapperSkillItemTippy from 'common/presentation/WrapperSkillItemTippy'
import Button from 'common/presentation/Button'

import { Fragment, useRef } from 'react'

const ThingsToFinishCard = (props) => {
  const {
    id,
    title,
    content = 'Your course is nearing expiration',
    type = 1,
    time,
    question,
    score,
    handleClickDissmiss = () => {},
    handleClickCheckIt = () => {},
    handleClickReject = () => {}
  } = props
  return (
    <Fragment>
      <div className=" group  hover:-translate-y-2  cursor-pointer transition-all duration-200">
        <div className="xl:w-[306px] w-fit h-[174px] flex flex-col justify-between py-5 px-8 hover:shadow-[0_8px_24px_0px_rgba(11,74,137,0.04)] rounded-3xl bg-[#F5F6F7] border border-[#EDF0F2]">
          <div className=" ">
            <p
              style={{ wordBreak: 'break-word' }}
              className="text-p18-bold line-clamp-1 mb-1"
            >
              {title}
            </p>
            <p
              style={{ wordBreak: 'break-word' }}
              className="text-p16 line-clamp-2 mb-1"
            >
              {content}
            </p>
          </div>
          <div>
            {type === 0 && (
              <div className="flex items-start justify-end">
                <Button
                  title="Dismiss"
                  width="w-20"
                  rounded="rounded-[4px]"
                  textWeight="text-p14"
                  color="text-white"
                  padding="py-4"
                  height="h-[30px]"
                  // hover='hover:shadow-[0px_16px_24px_0px_rgba(38,58,124,0.08)] hover:-translate-y-1 duration-200 transition-all'
                  margin="mt-0"
                  background="bg-button-2"
                  onClick={() => {}}
                />
              </div>
            )}
            {type === 1 && (
              <div className="flex items-center justify-end gap-3">
                <Button
                  title="Check it"
                  width="w-20"
                  rounded="rounded-[4px]"
                  textWeight="text-p14"
                  color="text-[#008767]"
                  padding="py-4"
                  height="h-[30px]"
                  // hover='hover:shadow-[0px_16px_24px_0px_rgba(38,58,124,0.08)] hover:-translate-y-1 duration-200 transition-all'
                  margin="mt-0"
                  background="bg-[#16C09861]"
                  border="border border-[#00B087]"
                  onClick={() => {
                    handleClickCheckIt()
                  }}
                />
                <Button
                  title="Reject"
                  width="w-20"
                  rounded="rounded-[4px]"
                  textWeight="text-p14"
                  color="text-[#DF0404]"
                  padding="py-4"
                  height="h-[30px]"
                  // hover='hover:shadow-[0px_16px_24px_0px_rgba(38,58,124,0.08)] hover:-translate-y-1 duration-200 transition-all'
                  margin="mt-0"
                  background="bg-[#FFC5C5]"
                  border="border border-[#DF0404]"
                  onClick={() => {}}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile */}
      {/* <div className="md:hidden min-h-[174px]  p-6 flex flex-col justify-between bg-light-blue rounded-3xl">
        <div>
          <p
            style={{ wordBreak: 'break-word' }}
            className="text-p16-bold line-clamp-1 mb-1 "
          >
            {title}
          </p>
        </div>
      </div> */}
    </Fragment>
  )
}

export default ThingsToFinishCard
