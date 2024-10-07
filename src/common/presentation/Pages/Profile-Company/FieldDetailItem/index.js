import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

const FieldDetailItem = (props) => {
  const { src, title, description } = props
  return (
    <div className="flex gap-8 items-center">
      {src && (
        <div className="rounded-[8px] relative min-w-[56px] h-[56px]">
          <div className="hidden sm:block">
            <Image
              src={src}
              alt=""
              objectFit="contain"
              layout="fill"
              width={56}
              height={56}
            />
          </div>
          <div className="block sm:hidden">
            <Image
              src={src}
              alt=""
              objectFit="contain"
              layout="fill"
              width={30}
              height={35}
            />
          </div>
        </div>
      )}
      <div>
        <p
          className="sm:text-p18-bold text-p14 font-bold text-blue-boild line-clamp-2 mb-2"
          style={{
            wordBreak: 'break-word'
          }}
        >
          {title}
        </p>
        {description && (
          <div
            className="sm:text-p16 text-p12 text-grey-1"
            dangerouslySetInnerHTML={{ __html: description }}
            style={{
              wordBreak: 'break-word'
            }}
          />
        )}
      </div>
    </div>
  )
}

FieldDetailItem.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
}
FieldDetailItem.defaultProps = {
  src: '/images/fieldDetail.png',
  title: '#Favorite Character',
  description: ''
}

export default FieldDetailItem
