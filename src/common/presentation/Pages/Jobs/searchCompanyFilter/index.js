import React, { Fragment, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import useTrans from 'common/hooks/useTrans'

const SearchCompanyFilter = (props) => {
  const {
    titlePlaceholder,
    locationName,
    titleButton,
    showOpt,
    selectedCity,
    handleSelectJob,
    refOpt,
    setShowOpt,
    setContentFilter,
    handleSubmit,
    titleAllselect
  } = props

  return (
    <div className="">
      <div
        className="flex  flex-wrap sm:gap-[20px] gap-[10px] justify-center xl:justify-start "
        ref={refOpt}
      >
        <div className="sm:hidden flex sm:gap-[20px] gap-[10px] w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <button
              className="bg-light-nude h-[52px] rounded-[8px] xl:min-w-[188px] w-full flex justify-between py-[12px] px-[24px] items-center"
              onClick={() => setShowOpt(!showOpt)}
            >
              {selectedCity.id === 1 ? (
                <Fragment>
                  <div className="flex gap-[16px]">
                    <XProfileIcon name="mapPoint" />
                    <p className="text-p16">{locationName[0]?.name}</p>
                  </div>

                  <XProfileIcon name="arrowDown" />
                </Fragment>
              ) : (
                <Fragment>
                  <div className="flex gap-[16px]">
                    <XProfileIcon name="mapPoint" />
                    <p className="text-p16">{selectedCity.name}</p>
                  </div>
                  <XProfileIcon name="arrowDown" />
                </Fragment>
              )}
            </button>
            {showOpt && (
              <div className="bg-white max-h-[190px] xl:border-none border border-grey-4 z-50  w-full overflow-x-hidden absolute top-[64px] rounded-[12px]">
                <div
                  className="flex justify-between items-center px-[24px] hover:bg-light-nude py-[10px]"
                  onClick={() => {
                    handleSelectJob({
                      id: null,
                      name: titleAllselect
                    })
                  }}
                >
                  <p className="sm:text-p16 text-p12 ">{titleAllselect}</p>
                </div>
                {locationName?.map((city) => (
                  <div
                    key={city?.id}
                    className="flex justify-between items-center px-[24px] hover:bg-light-nude py-[10px]"
                    onClick={() => {
                      handleSelectJob(city)
                    }}
                  >
                    <p className="sm:text-p16 text-p12">{city?.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <Button
              title={titleButton}
              rounded="rounded-[8px]"
              background={'bg-[#F6BB3A]'}
              color="text-neutral"
              height="h-[52px]"
              margin="mt-[0px]"
              width="sm:w-[122px] w-[104px]"
              textWeight="sm:text-p18-bold font-bold text-p16"
              onClick={() => {
                handleSubmit()
              }}
            />
          </div>
        </div>
        <div className="flex flex-1  h-[52px]  items-center px-[20px] rounded-borderStep bg-light-nude group">
          <div className="mr-[12px]">
            <XProfileIcon name="searchNavBar" width="20" height="20" />
          </div>
          <input
            type="text"
            className="text-p16  bg-inherit border-none focus:outline-none w-full"
            placeholder={titlePlaceholder}
            onChange={(e) => setContentFilter(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit()
              }
            }}
            maxLength={255}
          />
        </div>
        <div className="sm:flex hidden sm:gap-[20px] gap-[10px] w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <button
              className="bg-light-nude h-[52px] rounded-[8px] xl:min-w-[188px] w-full flex justify-between py-[12px] px-[24px] items-center"
              onClick={() => setShowOpt(!showOpt)}
            >
              {selectedCity.id === 1 ? (
                <Fragment>
                  <div className="flex gap-[16px]">
                    <XProfileIcon name="mapPoint" />
                    <p className="text-p16">{locationName[0]?.name}</p>
                  </div>
                  <XProfileIcon name="arrowDown" />
                </Fragment>
              ) : (
                <Fragment>
                  <div className="flex gap-[16px]">
                    <XProfileIcon name="mapPoint" />
                    <p className="text-p16">{selectedCity.name}</p>
                  </div>

                  <XProfileIcon name="arrowDown" />
                </Fragment>
              )}
            </button>
            {showOpt && (
              <div className="bg-white max-h-[190px] xl:border-none border border-grey-4 z-50  w-full overflow-x-hidden absolute top-[64px] rounded-[12px]">
                <div
                  className="flex justify-between items-center px-[24px] hover:bg-light-nude py-[10px]"
                  onClick={() => {
                    handleSelectJob({
                      id: null,
                      name: titleAllselect
                    })
                  }}
                >
                  <p className="sm:text-p16 text-p12 ">{titleAllselect}</p>
                </div>
                {locationName?.map((city) => (
                  <div
                    key={city?.id}
                    className="flex justify-between items-center px-[24px] hover:bg-light-nude py-[10px]"
                    onClick={() => {
                      handleSelectJob(city)
                    }}
                  >
                    <p className="sm:text-p16 text-p12">{city?.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <Button
              title={titleButton}
              rounded="rounded-[8px]"
              background={'bg-[#F6BB3A]'}
              color="text-neutral"
              height="h-[52px]"
              margin="mt-[0px]"
              width="sm:w-[122px] w-[104px]"
              textWeight="sm:text-p18-bold font-bold text-p16"
              onClick={() => {
                handleSubmit()
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

SearchCompanyFilter.propTypes = {}

export default SearchCompanyFilter
