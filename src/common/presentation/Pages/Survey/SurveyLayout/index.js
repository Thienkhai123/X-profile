import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import XProfileIcon from 'common/presentation/Icons'

const SurveyLayout = (props) => {
  const { type, src, alt, width, height } = props
  return (
    <div>
      <Image width={width} height={height} src={src} alt={alt} quality={100} />
    </div>
  )
}

SurveyLayout.propTypes = {
  type: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
}

SurveyLayout.defaultProps = {
  type: 'bearboss',
  src: '/images/bearBoss.png',
  alt: 'bearBoss',
  width: 323,
  height: 342
}

export default SurveyLayout
