import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
import PropTypes from 'prop-types'

const BadgeCourse = (props) => {
  const {
    value,
    subValue,
    icon,
    bg,
    padding,
    spacing,
    radius,
    width,
    height,
    textStyle,
    subTextStyle,
    imageIcon,
    imageStyle,
    imageWidth,
    imageHeight,
    isActiveIcon
  } = props
  return (
    <div
      className="flex items-center justify-center rounded-[4px]"
      style={{
        gap: spacing,
        background: bg,
        padding: padding,
        borderRadius: radius,
        width: width,
        height: height
      }}
    >
      <p className={textStyle}>
        {value}
        <span className={subTextStyle}>{subValue}</span>
      </p>
    </div>
  )
}

BadgeCourse.propTypes = {
  value: PropTypes.string,
  subValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  icon: PropTypes.string,
  bg: PropTypes.string,
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  spacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  radius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.string,
  textStyle: PropTypes.string,
  subTextStyle: PropTypes.string,
  height: PropTypes.string,
  isActiveIcon: PropTypes.bool
}

BadgeCourse.defaultProps = {
  value: '',
  subValue: '',
  icon: 'logo',
  bg: 'white',
  position: '',
  padding: '4px 16px',
  spacing: '10px',
  radius: '4px',
  width: 'auto',
  textStyle: 'text-grey-1  sm:text-p16-bold text-p12',
  subTextStyle: '',
  height: 'auto',
  isActiveIcon: true
}

export default BadgeCourse
