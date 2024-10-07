import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'

const NavbarFormMobile = (props) => {
  const {
    handleSubmit,
    placehoder: passedPlaceholder = '',
    setSearchSuggest = () => {}
  } = props
  const [placeholder, setPlaceholder] = useState(passedPlaceholder.slice(0, 0))
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [showSearch, setShowSearch] = useState(false)
  const [keyword, setKeyword] = useState('')

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
    setSearchSuggest(true)
    setShowSearch(!showSearch)
    document.body.style.overflow = 'hidden'
  }

  return (
    <form onSubmit={(e) => handleSubmit(keyword, e)}>
      <div className={`${!showSearch && 'xl:relative flex'}`}>
        <div
          onClick={() => handleClickSearch()}
          className={`flex  inset-y-0 left-0 items-center  xl:pl-3   cursor-pointer ${
            showSearch && 'text-gray-400 '
          }`}
        >
          <XProfileIcon name="searchNavBar" />
        </div>

        <div
          className={`xl:hidden transition-all duration-200 ${
            showSearch
              ? 'absolute flex gap-6 items-center w-full top-4 left-0 h-full p-4 bg-white z-20 '
              : 'w-0'
          }`}
        >
          <input
            type="search"
            id="search"
            maxLength={255}
            className={`${
              showSearch ? 'w-full  bg-light-nude ' : 'w-0 bg-transparent'
            } focus:placeholder:text-transparent outline-none block transition-all duration-500 px-6 py-3 text-p14 text-gray-900  rounded-lg   placeholder-grey-3`}
            placeholder={placeholder}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" hidden>
            submit
          </button>
          {showSearch && (
            <div
              className="xl:hidden "
              onClick={() => {
                setShowSearch(false)
                setSearchSuggest(false)
                document.body.style.overflow = 'scroll'
              }}
            >
              <p className="text-p18-bold text-button-2">Huỷ</p>
            </div>
          )}
        </div>
      </div>
    </form>
  )
}

export default NavbarFormMobile
NavbarFormMobile.propTypes = {
  placehoder: PropTypes.string,
  handleSubmit: PropTypes.func
}

NavbarFormMobile.defaultProps = {
  placehoder: 'Business Analyst',
  handleSubmit: () => {}
}
