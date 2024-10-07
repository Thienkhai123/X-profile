import React, { Fragment, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import Button from 'common/presentation/Button'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import { getAllCities, selectJobCities } from 'store/app/jobSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import useTrans from 'common/hooks/useTrans'

const SearchCVFilter = (props) => {
  const {
    title = '',
    selectedCity,
    isLoading,
    setSelectedCity = () => {},
    handleClickMore = () => {},
    setKeyword = () => {},
    handleClickSearch = () => {}
  } = props

  const dispatch = useDispatch()
  const cities = useSelector(selectJobCities)
  const trans = useTrans()
  const [showOpt, setShowOpt] = useState(false)
  const refOpt = useRef(null)
  const handleSelectCity = (value) => {
    if (value) {
      setSelectedCity({
        cityId: value?.cityId,
        name: value?.name
      })
    } else {
      setSelectedCity({
        cityId: null,
        name: ''
      })
    }
    setShowOpt(false)
  }
  const handleCloseOpt = () => setShowOpt(false)
  useOnClickOutside(refOpt, handleCloseOpt)

  const fetchCities = async () => {
    const fetchAllCities = await dispatch(getAllCities({}))
    const jobResponse = unwrapResult(fetchAllCities)
    return jobResponse
  }
  useEffect(() => {
    fetchCities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="bg-white py-8 flex sm:justify-center justify-start xl:px-0 px-[20px]">
      <div className="sm:w-[80vw] w-full">
        <p className="sm:text-h3 text-p18-bold pb-4">{title}</p>
        <div className="w-full flex xl:flex-row flex-col justify-between items-center sm:gap-[20px] gap-[10px]">
          <div className="flex w-full gap-[10px] ">
            <div className="relative  w-full ">
              <div className="absolute  inset-y-0 left-2 flex items-center pl-2 ">
                <XProfileIcon name="search" width="20" height="20" />
              </div>
              <input
                className="sm:text-p16 text-p12 py-3 w-full pl-11 bg-light-nude rounded-xl focus:outline-none"
                placeholder={trans.JOBS.searchInputPlaceholder}
                maxLength={255}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full sm:w-auto flex gap-5">
            <div className="w-full sm:w-auto relative" ref={refOpt}>
              <button
                className="bg-light-nude rounded-[8px] xl:min-w-[240px] w-full flex justify-between py-3 px-[24px] items-center"
                onClick={() => setShowOpt(!showOpt)}
              >
                {selectedCity.cityId === null ? (
                  <Fragment>
                    <XProfileIcon name="location" />
                    <p className="sm:text-p16 text-p12">
                      {trans.JOBS.cityDefault}
                    </p>
                    <XProfileIcon name="arrowDown" />
                  </Fragment>
                ) : (
                  <Fragment>
                    <XProfileIcon name="location" />
                    <p className="sm:text-p16 text-p12">{selectedCity.name}</p>
                    <XProfileIcon name="arrowDown" />
                  </Fragment>
                )}
              </button>
              {showOpt && (
                <div className="bg-white max-h-[190px] z-50  w-full overflow-x-hidden absolute top-[64px] rounded-[12px]">
                  <div
                    className="flex justify-between items-center px-[24px] hover:bg-light-nude py-[10px]"
                    onClick={() => handleSelectCity()}
                  >
                    <p className="sm:text-p16 text-p12">
                      {trans.JOBS.cityDefault}
                    </p>
                    {selectedCity.cityId === null && (
                      <XProfileIcon name="check" />
                    )}
                  </div>
                  {cities?.map((city) => (
                    <div
                      key={city?.cityId}
                      className="flex justify-between items-center px-[24px] hover:bg-light-nude py-[10px]"
                      onClick={() => handleSelectCity(city)}
                    >
                      <p className="sm:text-p16 text-p12">{city?.name}</p>
                      {selectedCity.cityId === city?.cityId && (
                        <XProfileIcon name="check" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="block sm:hidden">
              <Button
                title={trans.JOBS.searchButton}
                rounded="rounded-[8px]"
                background={'bg-[#F6BB3A]'}
                color="text-neutral"
                margin="m-0"
                padding="py-[10px] px-[20px]"
                height="h-auto"
                width="sm:w-[122px] w-[104px]"
                textWeight="sm:text-p18-bold font-bold text-p14"
                onClick={() => handleClickSearch()}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="hidden sm:block">
            <Button
              title={trans.JOBS.searchButton}
              rounded="rounded-[8px]"
              background={'bg-[#F6BB3A]'}
              color="text-neutral"
              margin="m-0"
              padding="py-[10px] px-[20px]"
              height="h-auto"
              width="sm:w-[122px] w-[104px]"
              textWeight={'sm:text-p18-bold font-bold text-p14'}
              onClick={handleClickSearch}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

SearchCVFilter.propTypes = {}

export default SearchCVFilter
