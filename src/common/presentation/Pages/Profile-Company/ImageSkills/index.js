import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import SkeletonBox from 'common/presentation/Skeleton/SkeletonBox'
import isEmpty from 'lodash/isEmpty'

const ImageSkill = (props) => {
  const { src } = props
  if (isEmpty(src)) {
    return <SkeletonBox width="w-[746px]" height="h-[372px]" />
  }
  return <Image width={746} height={372} src={src} alt="" objectFit="cover" />
}

ImageSkill.propTypes = { src: PropTypes.string }
ImageSkill.defaultProps = { src: '' }

export default ImageSkill
