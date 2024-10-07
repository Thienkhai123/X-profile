import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

const FooterContent = (props) => {
  const { imageContent, content } = props
  return (
    <div className="md:flex md:items-center flex-wrap justify-between w-full">
      {content.cotented?.map((element, index) => {
        const { href, title } = element
        return (
          <div className="mr-4" key={index}>
            <a className="hover:text-sky-600 text-p14 text-grey-4" href={href}>
              {title}
            </a>
          </div>
        )
      })}
    </div>
  )
}

FooterContent.propTypes = {}

export default FooterContent
