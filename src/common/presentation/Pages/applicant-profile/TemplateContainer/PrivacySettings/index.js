import XProfileIcon from 'common/presentation/Icons'
import PropTypes from 'prop-types'

const PrivacySettings = (props) => {
  const { listItems } = props

  return (
    <div className="absolute group-hover:block hidden pt-[2px] top-8 right-0 w-[160px] z-10">
      <div className=" bg-white border border-grey-4 rounded-lg p-2 cursor-careerPath">
        <div className="flex flex-col gap-2">
          {listItems?.map((item, index) => {
            const {
              icon = '',
              title = '',
              fill = 'black',
              action = () => {}
            } = item || {}
            return (
              <div
                key={index}
                className="flex items-center gap-2 cursor-careerPath px-4 py-2 rounded-lg hover:bg-light-nude transition-all"
                onClick={() => action()}
              >
                <XProfileIcon name={icon} fill={fill} />
                <p className={`text-p18 text-[${fill}] whitespace-nowrap`}>
                  {title}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

PrivacySettings.propTypes = {
  listItems: PropTypes.array
}

PrivacySettings.defaultProps = {
  listItems: [
    {
      icon: 'lock2',
      title: 'Riêng tư',
      fill: 'black',
      action: () => {}
    },
    {
      icon: 'publish',
      title: 'Công khai',
      fill: 'black',
      action: () => {}
    }
  ]
}

export default PrivacySettings
