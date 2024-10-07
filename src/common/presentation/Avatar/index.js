import Image from 'next/image'
import PropTypes from 'prop-types'
import SkeletonAvatar from '../Skeleton/SkeletonAvatar'

export const Avatar = (props) => {
  const { avatarUrl, width, height, objectFit, border } = props

  if (!avatarUrl) {
    return <SkeletonAvatar width={width} height={height} />
  }

  return (
    <div
      className={`rounded-full relative overflow-hidden ${width} ${height} ${border}`}
    >
      <Image alt="avatar" src={avatarUrl} layout="fill" objectFit={objectFit} />
    </div>
  )
}

Avatar.propTypes = {
  avatarUrl: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  objectFit: PropTypes.string,
  border: PropTypes.string
}

Avatar.defaultProps = {
  avatarUrl: '',
  width: 'w-[24px]',
  height: 'h-[24px]',
  objectFit: 'cover',
  border: ''
}
