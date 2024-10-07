import Lottie from 'react-lottie'
import loadingAnimationSheep from '../../../../../../../public/asset/jsons/loading-camera-qr.json'

const LoadingConfirmCameraRear = (props) => {
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
      width={32}
      height={32}
      isClickToPauseDisabled={true}
    />
  )
}

export default LoadingConfirmCameraRear
