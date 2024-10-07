import React from 'react'
import PropTypes from 'prop-types'
import Lottie from 'react-lottie'
import loadingAnimationSheep from '../../../../../public/asset/jsons/loading1.json'
const SheepLoading = (props) => {
  const defaultOptionsLoading = {
    loop: true, // true or number
    autoplay: true,
    animationData: loadingAnimationSheep,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice' // giữ nguyên tỉ lệ của json animation
    }
  }
  return (
    <Lottie
      options={defaultOptionsLoading}
      width={200}
      height={200}
      isClickToPauseDisabled={true}
    />
  )
}

SheepLoading.propTypes = {}

export default SheepLoading
