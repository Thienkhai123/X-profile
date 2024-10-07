import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import { useWindowSize } from 'common/hooks/useWindowSize'

const Card = (props) => {
  const { element, handleRole, chooseId, setChooseId, titleButton } = props
  const { id, hoverIcon, title, description, href, src } = element

  const screenSize = useWindowSize()
  return (
    <div className="group">
      <button
        id={id}
        className={`flex justify-center relative  w-full`}
        onClick={() => {
          setChooseId(id)
          if (screenSize.width > 1024) {
            handleRole(id, href)
          }
        }}
      >
        <div className="z-10 hidden sm:block">
          <Image
            width={227.37}
            height={354.1}
            objectFit="contain"
            src={src}
            alt=""
            quality={100}
          />
        </div>
        <div className="z-10 block sm:hidden">
          <Image
            width={170.22}
            height={265.26}
            src={src}
            objectFit="contain"
            alt=""
            quality={100}
          />
        </div>
        <div
          className={`absolute top-[40%] flex items-center z-0 scale-[3] sm:scale-0 duration-300 sm:group-hover:scale-[4.5]`}
        >
          <XProfileIcon name={hoverIcon} />
        </div>
      </button>
      <div className=" mt-[6px] flex justify-center text-center">
        <p className="xl:text-h3 text-neutral text-p18-bold">{title}</p>
      </div>
      <div className="mt-3 flex justify-center text-center">
        <p className="xl:text-p18 text-grey-1 text-p12">{description}</p>
      </div>
      <div
        className={` mt-[23px] flex justify-center  duration-200 ease-in sm:hidden
        `}
      >
        <Button
          padding="p-[20px]"
          width="min-w-[88px]"
          title={titleButton}
          onClick={() => {
            handleRole(id, href)
          }}
        />
      </div>
    </div>
  )
}

Card.propTypes = {
  hoverIcon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
}
Card.defaultProps = {
  hoverIcon: 'vector',
  title: 'Gấu doanh nhân',
  description:
    'Phù hợp với sinh viên mới ra trường người cần thay đổi nghề nghiệp'
}

export default Card
