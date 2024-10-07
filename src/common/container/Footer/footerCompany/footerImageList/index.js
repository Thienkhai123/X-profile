import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

const FooterImageList = (props) => {
  const { element } = props
  const { href, src, alt } = element
  return (
    <a href={href} className="mr-2">
      <Image width={150} height={50} src={src} alt={alt} objectFit="contain" />
    </a>
  )
}

FooterImageList.propTypes = {}

export default FooterImageList
