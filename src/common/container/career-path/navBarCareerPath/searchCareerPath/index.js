import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import $ from 'jquery'
import Modal from 'common/presentation/Modal'

const SearchCareerPath = (props) => {
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
  const { handleSubmit, placehoder: passedPlaceholder = '' } = props
  const [searchRecentData, setSearchRecentData] = useState([])
  const [placeholder, setPlaceholder] = useState(passedPlaceholder.slice(0, 0))
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [showSearch, setShowSearch] = useState(false)
  const [showSearchMobile, setShowSearchMobile] = useState(false)

  const [keyword, setKeyword] = useState('')
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
  const toogleSearch = () => {
    setShowSearch(!showSearch)
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

  useEffect(() => {
    const intr = setInterval(() => {
      setPlaceholder(passedPlaceholder.slice(0, placeholderIndex))
      if (placeholderIndex + 1 > passedPlaceholder.length) {
        setPlaceholderIndex(0)
      } else {
        setPlaceholderIndex(placeholderIndex + 1)
      }
    }, 200)
    return () => {
      clearInterval(intr)
    }
  })
  const handleClickSearch = () => {
    setShowSearch(!showSearch)
  }
  const handleClickSearchMobile = () => {
    setShowSearchMobile(!showSearchMobile)
  }

  return (
    <Fragment>
      <div className="md:block hidden relative">
        <div
          onClick={() => handleClickSearch()}
          className={`cursor-pointer w-6 h-6  flex items-center justify-center `}
        >
          <XProfileIcon name="searchNavBar" fill="#FFFFFF" />
        </div>
        <Modal
          open={showSearch}
          toggleModal={() => toogleSearch()}
          hiddenCancel={true}
          modalStyle="w-[100vw] h-[100vh] p-2 flex justify-center items-center fixed bg-black/30 z-[10000] left-[calc(0%)] top-[calc(0%)]"
          childStyle="w-screen h-fit sm:w-[720px] mt-4 p-6 bg-white rounded-2xl animate-fadeIn shadow-[0_16px_24px_rgba(0,0,0,0.16)]"
        >
          <div>
            <form onSubmit={(e) => handleSubmit(keyword, e)}>
              <div className=" w-full flex items-center gap-4">
                <div className=" relative ">
                  <div
                    className={`flex absolute  inset-y-0 left-6 items-center    cursor-pointer `}
                  >
                    <XProfileIcon name="searchNavBar" />
                  </div>
                  <input
                    // type="search"
                    maxLength={80}
                    id="search"
                    className="w-full min-w-[600px]  bg-light-nude  focus:placeholder:text-transparent outline-none block transition-all duration-300 pl-16 py-3 px-6 text-p18  rounded-full placeholder:text-grey-3"
                    placeholder={placeholder}
                    onChange={(e) => setKeyword(e.target.value.trim())}
                  />
                  <button type="submit" hidden>
                    submit
                  </button>
                </div>
                <div
                  onClick={() => toogleSearch()}
                  className="w-14 h-14 bg-light-nude rounded-full flex items-center justify-center cursor-pointer"
                >
                  <XProfileIcon name="cross" stroke="#000000" />
                </div>
              </div>
            </form>
            {searchRecentData?.length > 0 && (
              <div className="mt-6">
                <div>
                  <p className="text-p18 text-grey-1">Tìm kiếm gần đây</p>
                  <div className="flex flex-wrap items-center w-full mt-4 gap-4">
                    {searchRecentData.map(
                      (searchName, idx) =>
                        idx < 10 && (
                          <div
                            key={idx}
                            className="   flex items-center cursor-pointer  gap-2 px-6 py-2 rounded-full border border-grey-4 hover:bg-light-nude transition-all "
                          >
                            <p
                              onClick={() => handleClickRecent(searchName)}
                              className="max-w-[320px] text-p16-bold overflow-hidden text-ellipsis"
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
                </div>
              </div>
            )}
            <div className="mt-6">
              <p className="text-p18 text-grey-1">Gợi ý tìm kiếm </p>
              {SUGGEST_DATA.map((suggest, index) => {
                const { keyword, title } = suggest
                return (
                  <div
                    key={index}
                    onClick={() => handleClickSuggest(keyword)}
                    className="flex items-center  my-4 gap-5 cursor-pointer"
                  >
                    <div>
                      <XProfileIcon
                        name="searchNavBar"
                        width={'24'}
                        height={'24'}
                      />
                    </div>
                    <p className=" text-p18-bold">{title}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </Modal>
      </div>
      <div className="md:hidden relative">
        <form onSubmit={(e) => handleSubmit(keyword, e)}>
          <div className={`${!showSearchMobile && 'xl:relative flex'}`}>
            <div
              onClick={() => handleClickSearchMobile()}
              className={`flex  inset-y-0 left-0 items-center  xl:pl-3   cursor-pointer ${
                showSearchMobile && 'text-gray-400 '
              }`}
            >
              <XProfileIcon name="searchNavBar" fill="#fff" />
            </div>

            <div
              className={`xl:hidden transition-all duration-200 ${
                showSearchMobile
                  ? 'fixed flex gap-6 items-center w-full top-0 left-0 h-fit p-4 bg-white z-20 '
                  : 'w-0'
              }`}
            >
              <input
                type="search"
                id="search"
                maxLength={255}
                className={`${
                  showSearchMobile
                    ? 'w-full  bg-light-nude '
                    : 'w-0 bg-transparent'
                } focus:placeholder:text-transparent outline-none block transition-all duration-500 px-6 py-3 text-p14 text-gray-900  rounded-lg   placeholder-grey-3`}
                placeholder={placeholder}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button type="submit" hidden>
                submit
              </button>
              {showSearchMobile && (
                <div
                  className="xl:hidden "
                  onClick={() => {
                    setShowSearchMobile(false)
                    document.body.style.overflow = 'scroll'
                  }}
                >
                  <p className="text-p18-bold text-button-2">Huỷ</p>
                </div>
              )}
            </div>
          </div>
        </form>
        {showSearchMobile && (
          <div className="xl:hidden fixed bg-white animate-fadeIn left-0  w-screen h-screen flex flex-col  p-6 pt-10  z-10">
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
        )}
      </div>
    </Fragment>
  )
}

export default SearchCareerPath
SearchCareerPath.propTypes = {
  placehoder: PropTypes.string,
  handleSubmit: PropTypes.func
}

SearchCareerPath.defaultProps = {
  placehoder: 'Business Analyst',
  handleSubmit: () => {}
}
