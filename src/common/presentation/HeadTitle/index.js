import React from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from '../Icons'

const HeadTitle = (props) => {
  const { title, showIcon, nameIcon, showLink, contentLink, href } = props
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between items-center">
      <div className="flex justify-between gap-6">
        {showIcon && <XProfileIcon name={nameIcon} />}

        <p className="text-p28-bold text-black first-letter:uppercase">
          {title}
        </p>
      </div>
      {showLink && (
        <a href={href} className="text-blue-light text-p20-bold">
          {contentLink}
        </a>
      )}
    </div>
  )
}

HeadTitle.propTypes = {
  title: PropTypes.string,
  showIcon: PropTypes.bool,
  nameIcon: PropTypes.string,
  contentLink: PropTypes.string,
  href: PropTypes.string
}
HeadTitle.defaultProps = {
  title: ' Tất cả khoá học',
  showIcon: false,
  showLink: false,
  nameIcon: 'bookWiki',
  contentLink: 'Xem tất cả',
  href: '#'
}

export default HeadTitle
