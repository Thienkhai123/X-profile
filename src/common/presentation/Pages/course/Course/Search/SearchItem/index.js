import React, { useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'

const SearchItem = (props) => {
  const { title, chil, categoryChil } = props
  const [isShowCategoryChil, setIsShowCategoryChil] = useState(false)
  return (
    <div>
      <div
        className="cursor-pointer flex justify-between items-center sm:gap-[0px] gap-[20px]"
        onClick={() => setIsShowCategoryChil(!isShowCategoryChil)}
      >
        <p className="sm:text-p16 sm:hover:text-p16-bold text-p12 hover:text-p12-bold duration-100 text-grey-1">
          {title}
        </p>
        {chil && (
          <div>
            <div
              className={`duration-100 ${
                isShowCategoryChil ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <XProfileIcon name="arrowNext" />
            </div>
          </div>
        )}
      </div>
      <div
        className={` bg-grey-4 rounded-[8px]  duration-100 ${
          chil && isShowCategoryChil
            ? 'h-auto opacity-1 py-[8px] mt-[8px] pl-[16px] flex flex-col gap-[8px]'
            : 'opacity-0 h-0 py-[0px]'
        }`}
      >
        {categoryChil?.map((e, ind) => (
          <div key={ind} className="cursor-pointer">
            <p
              className={`sm:text-p16 sm:hover:text-p16-bold text-p12 hover:text-p12-bold duration-100 text-grey-1 ${
                chil && isShowCategoryChil ? 'block' : 'hidden'
              }`}
            >
              {e?.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

SearchItem.propTypes = {}
SearchItem.defaultProps = {}

export default SearchItem
