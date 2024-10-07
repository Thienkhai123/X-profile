import React, { useEffect, useState } from 'react'

import XProfileIcon from 'common/presentation/Icons'
import { useRouter } from 'next/router'

const SearchSuggestMobile = (props) => {
  const {} = props
  const SUGGEST_DATA = [
    {
      keyword: 'marketing',
      title: 'Marketing'
    },
    {
      keyword: 'IT Support',
      title: 'IT Support'
    },
    {
      keyword: 'UI/UX Design',
      title: 'UI/UX Design'
    },
    {
      keyword: 'Backend Developer',
      title: 'Backend Developer'
    },
    {
      keyword: 'Frontend Developer',
      title: 'Frontend Developer'
    }
  ]
  // const searchRecentData = JSON.parse(
  //   localStorage.getItem('searchRecent') || []
  // )

  const [searchRecentData, setSearchRecentData] = useState([])

  const router = useRouter()
  const handleClickSuggest = (value) => {
    if (value) {
      const array = localStorage.getItem('searchRecent')
      const parsed = array ? JSON.parse(array) : []
      const searchRecent = parsed.includes(value) ? parsed : [...parsed, value]
      localStorage.setItem('searchRecent', JSON.stringify(searchRecent))
      // router
      //   .push({ pathname: '/jobs', query: value ? { keyword: value } : '' })
      //   .then(() => router.reload())
      window.location.replace('/jobs?keyword=' + value)
    }
  }
  const handleClickRecent = (value) => {
    window.location.replace('/jobs?keyword=' + value)
  }
  const handleClickRemove = (value) => {
    if (value) {
      const array = localStorage.getItem('searchRecent')
      const parsed = array && JSON.parse(array)
      // const searchRecent = parsed.includes(value) ? parsed : [...parsed, value]
      const searchRecent = parsed.filter((item) => item !== value)
      localStorage.setItem('searchRecent', JSON.stringify(searchRecent))
      setSearchRecentData(
        JSON.parse(localStorage.getItem('searchRecent')).reverse()
      )
    }
  }
  useEffect(() => {
    if (localStorage.getItem('searchRecent')) {
      setSearchRecentData(
        JSON.parse(localStorage.getItem('searchRecent')).reverse()
      )
    }
  }, [])

  return (
    <div className="xl:hidden absolute bg-white animate-fadeIn left-0  w-screen h-screen flex flex-col  p-6 pt-10  z-10">
      {searchRecentData && (
        <div>
          <p className="text-p16 text-grey-1">Tìm kiếm gần đây</p>
          {searchRecentData.map(
            (searchName, idx) =>
              idx < 10 && (
                <div
                  key={idx}
                  className="flex items-center justify-between my-3"
                >
                  <p
                    onClick={() => handleClickRecent(searchName)}
                    className=" text-p16-bold max-w-[240px] overflow-hidden text-ellipsis"
                  >
                    {searchName}
                  </p>
                  <div
                    onClick={() => handleClickRemove(searchName)}
                    className="text-p14 text-blue-main"
                  >
                    <XProfileIcon name="cross" stroke="#000000" />
                  </div>
                </div>
              )
          )}
        </div>
      )}
      <div className="mt-3">
        <p className="text-p16 text-grey-1">Gợi ý tìm kiếm </p>
        {SUGGEST_DATA.map((suggest, index) => {
          const { keyword, title } = suggest
          return (
            <div
              key={index}
              onClick={() => handleClickSuggest(keyword)}
              className="flex items-center  my-4 gap-4"
            >
              <div>
                <XProfileIcon
                  name="searchNavBar"
                  width={'24'}
                  height={'24'}
                  stroke="#294F9B"
                />
              </div>
              <p className=" text-p16-bold">{title}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

SearchSuggestMobile.propTypes = {}

export default SearchSuggestMobile
