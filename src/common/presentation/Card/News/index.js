import Image from 'next/image'
import PropTypes from 'prop-types'
import Badge from 'common/presentation/Badge'
import XProfileIcon from 'common/presentation/Icons'
// import { getDaysAgo } from 'store/helper/functionHelper'

export const NewsCard = (props) => {
  const {
    logo,
    title,
    description,
    location,
    salaryFrom,
    salaryTo,
    createAt,
    liked
  } = props.news
  return (
    <div className="rounded-[12px] bg-white w-full py-[24px] px-[15px] flex gap-[16px]">
      <div className="relative  w-[80px] h-[80px]">
        <Image alt="news" src={logo} layout="fill" />
      </div>
      <div>
        <p className="font-bold text-[16px] text-card-title mb-[4px]">
          {title}
        </p>
        <p className="text-[14px] text-grey-1 mb-[4px]">{description}</p>
        <div className="flex justify-between mb-[12px]">
          <Badge icon="location" value={location} padding={0} spacing="4px" />
          <Badge
            icon="price"
            value={salaryFrom + ' - ' + salaryTo + 'triệu VND'}
            padding={0}
            spacing="4px"
          />
        </div>
        <div className="flex items-center justify-between">
          <XProfileIcon name="heart" />
          <p className="text-[14px] text-grey-1">{createAt}</p>
        </div>
      </div>
    </div>
  )
}

NewsCard.propTypes = {
  news: PropTypes.shape({
    logo: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    salaryFrom: PropTypes.number,
    salaryTo: PropTypes.number,
    createAt: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string
    ]),
    liked: PropTypes.bool
  })
}

NewsCard.defaultProps = {
  news: {
    logo: '',
    title: '',
    description: '',
    location: '',
    salaryFrom: 0,
    salaryTo: 0,
    createAt: '',
    liked: false
  }
}
