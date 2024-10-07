import React from 'react'
import PropTypes from 'prop-types'
import Lottie from 'react-lottie'
import loadingAnimationMouse from '../../../../../public/asset/jsons/loading2.json'
const MouseLoading = (props) => {
  const defaultOptionsLoading1 = {
    loop: true, // true or number
    autoplay: true,
    animationData: loadingAnimationMouse,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice' // giữ nguyên tỉ lệ của json animation
    }
  }
  return (
    <Lottie
      options={defaultOptionsLoading1}
      width={200}
      height={200}
      isClickToPauseDisabled={true}
    />
  )
}

MouseLoading.propTypes = {}

export default MouseLoading
