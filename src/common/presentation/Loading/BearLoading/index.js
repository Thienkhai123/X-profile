import React from 'react'
import PropTypes from 'prop-types'
import Lottie from 'react-lottie'
import loadingAnimationBear from '../../../../../public/asset/jsons/loading3.json'
const BearLoading = (props) => {
  const defaultOptionsLoading1 = {
    loop: true, // true or number
    autoplay: true,
    animationData: loadingAnimationBear,
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

BearLoading.propTypes = {}

export default BearLoading
