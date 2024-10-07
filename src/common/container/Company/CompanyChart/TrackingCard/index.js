import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
import PropTypes from 'prop-types'

const TrackingCard = (props) => {
  const { label, description, value, percentage, color, stroke, imgUrl, type } =
    props
  if (type === 1) {
    return (
      <div className="flex  items-center  justify-between py-[23px] bg-dark-blue px-[31px] rounded-[12px]">
        <div>
          <p className="xl:text-p14 text-p12 text-gray-light">{label}</p>
          <p className="xl:text-p18-bold text-p14 font-bold text-white">
            {description}
          </p>
          <div className="xl:block flex items-center">
            <p className="xl:text-h1 text-h3" style={{ color: color }}>
              {value}
            </p>
            <div className="flex gap-[5px] items-center">
              <p className="text-[#04CE00] text-p14">{percentage}</p>
              <XProfileIcon name="arrowRaise" />
            </div>
          </div>
        </div>
        <div className="relative xl:w-[250px] xl:h-[120px] w-[114px] h-[58px]">
          <Image src={imgUrl} layout="fill" alt="" />
        </div>
      </div>
    )
  }
  return (
    <div className="flex  items-center  justify-between py-[23px] bg-dark-blue px-[31px] rounded-[12px] gap-[20px]">
      <div>
        <p className="xl:text-p14 text-p12 text-gray-light">{label}</p>
        <p className="xl:text-h3 text-p14 font-bold text-white">
          {description}
        </p>
      </div>
      <div className="">
        <p className="text-[#FF718B] xl:text-h1 text-h3">
          {value + ' ' + percentage}
        </p>
      </div>
    </div>
  )
}

TrackingCard.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.string,
  percentage: PropTypes.string,
  color: PropTypes.string,
  stroke: PropTypes.string,
  percentageColor: PropTypes.string,
  type: PropTypes.number
}
TrackingCard.defaultProps = {
  label: '',
  description: '',
  value: '',
  percentage: '',
  color: '#F6BB3A',
  stroke: '#F6BB3A',
  percentageColor: '#04CE00',
  type: 1
}

export default TrackingCard
