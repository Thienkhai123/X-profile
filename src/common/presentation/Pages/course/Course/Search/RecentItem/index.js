import React from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'

const RecentItem = (props) => {
  const {
    searchName,
    handleRemoveRecentItemSearch,
    handleRedirectRecentSearchURL
  } = props
  return (
    <div className="flex justify-between items-center">
      <p
        onClick={() => handleRedirectRecentSearchURL(searchName)}
        className="text-p18-bold cursor-pointer truncate"
      >
        {searchName}
      </p>
      <div
        className="cursor-pointer"
        onClick={() => handleRemoveRecentItemSearch(searchName)}
      >
        <XProfileIcon stroke="#000" name="cancel" size={'0.7'} />
      </div>
    </div>
  )
}

RecentItem.propTypes = {}

export default RecentItem
