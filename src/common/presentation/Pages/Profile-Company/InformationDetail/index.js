import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'common/presentation/Avatar'

function isHTML(str) {
  if (typeof window !== 'undefined') {
    var a = document.createElement('div')
    a.innerHTML = str

    for (var c = a.childNodes, i = c.length; i--; ) {
      if (c[i].nodeType == 1) return true
    }

    return false
  }
  return false
}

const InformationDetail = (props) => {
  const { title, profile } = props
  const { description, avatarUrl, imageUrl } = profile || {}
  return (
    <div className="flex justify-center xl:justify-start items-center h-full flex-wrap sm:flex-nowrap">
      <div className="xl:mr-8 sm:mb-0 mb-[12px]">
        {/* <Avatar
          avatarUrl={imageUrl}
          height="sm:h-[160px] h-[124px]"
          width="sm:w-[160px] w-[124px]"
          border="border-[4px] border-oragin"
        /> */}
      </div>
      <div>
        <div className="sm:mb-5 mb-[12px] text-center xl:text-start">
          <p className="sm:text-h2 text-p20-bold text-neutral">{title}</p>
        </div>
        <div className="text-center xl:text-start">
          {isHTML(description) && (
            <div
              className="sm:text-p18 text-p12 text-grey-1"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
          {!isHTML(description) && (
            <pre
              className="text-p18 text-grey-1 whitespace-pre-wrap"
              style={{
                wordBreak: 'break-word'
              }}
            >
              {description}
            </pre>
          )}
        </div>
      </div>
    </div>
  )
}

InformationDetail.propTypes = {
  title: PropTypes.string,
  images: PropTypes.array,
  profile: PropTypes.object
}
InformationDetail.defaultProps = {
  title: 'Đôi nét về Team',
  images: [],
  profile: {}
}

export default InformationDetail
