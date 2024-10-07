import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import React, { Fragment, useEffect, useRef, useState } from 'react'

const CvFilter = (props) => {
  const {
    recruitmentFilter,
    timeType,
    register,
    handleSubmit = () => {},
    onSubmit = () => {},
    resetFilter = () => {},
    handleClickCreateRecruitment = () => {}
  } = props

  return (
    <form
      // onSubmit={handleSubmit(onSubmit)}
      className=" w-full border border-grey-3 rounded-lg p-8 "
    >
      <div className="flex items-center justify-between pb-8 border-b border-grey-4">
        <p className="text-p20-bold">Bộ lọc</p>
        <div className="cursor-pointer" onClick={() => resetFilter()}>
          <p className="text-p18 text-blue-light ">Xoá bộ lọc</p>
        </div>
      </div>
      <div className="py-6 border-b border-grey-4">
        <p className="text-p18-bold">Các vị trí bạn đang tuyển dụng</p>
        <div className="mt-6">
          {recruitmentFilter?.length > 0 ? (
            recruitmentFilter?.map((recruitment, index) => {
              const { recruitmentCampaignId, name } = recruitment
              return (
                <label key={index} className="mb-6 w-fit flex gap-6">
                  <div className=" relative w-fit h-fit">
                    <input
                      type="radio"
                      value={recruitmentCampaignId}
                      {...register('recruitment')}
                      className="appearance-none block w-6 h-6 accent-button bg-white border peer checked:bg-button border-grey-4 rounded-full"
                    />
                    <div className="absolute top-0 w-full h-full flex items-center justify-center  opacity-0 peer-checked:opacity-100">
                      <XProfileIcon
                        name="quizCheck"
                        width="9.38"
                        height="7.88"
                      />
                    </div>
                  </div>
                  <p className="text-p18 max-w-[280px] overflow-hidden overflow-ellipsis">
                    {name}
                  </p>
                </label>
              )
            })
          ) : (
            <div className="mb-8">
              <p className="text-p16 text-grey-2 text-center ">
                Hiện chưa có vị trí tuyển dụng nào
              </p>
            </div>
          )}
          <div className="flex items-center justify-center">
            <Button
              title={
                recruitmentFilter?.length > 0
                  ? 'Tạo tuyển dụng mới'
                  : 'Tạo tuyển dụng'
              }
              rounded="rounded-lg"
              background={'bg-button'}
              color={'text-black'}
              padding="py-[13px] px-6"
              width="w-auto"
              height="h-[36px]"
              margin=""
              textWeight={'text-p16-bold whitespace-nowrap'}
              type="button"
              onClick={() => handleClickCreateRecruitment()}
            />
          </div>
        </div>
      </div>
      <div className="py-6 ">
        <p className="text-p18-bold">Thời gian</p>
        <div className="mt-6">
          {timeType?.map((recruitment, idx) => {
            const { type, typeDisplay } = recruitment
            return (
              <label key={idx} className="mb-6 w-fit flex gap-6">
                <div className=" relative w-fit h-fit">
                  <input
                    type="checkbox"
                    value={type}
                    {...register('type')}
                    // name="recruitment"
                    // onChange={(e) => handleSoftSkillsSelect(e)}
                    // defaultChecked={softSkillsSelected?.includes(
                    //   parseInt(skillId)
                    // )}
                    className="appearance-none block w-6 h-6 accent-button bg-white border peer checked:bg-button border-grey-4 rounded"
                  />
                  <div className="absolute top-0 w-full h-full flex items-center justify-center  opacity-0 peer-checked:opacity-100">
                    <XProfileIcon name="quizCheck" width="9.38" height="7.88" />
                  </div>
                </div>
                <p className="text-p18">{typeDisplay}</p>
              </label>
            )
          })}
        </div>
      </div>
    </form>
  )
}

CvFilter.propTypes = {}

export default CvFilter
