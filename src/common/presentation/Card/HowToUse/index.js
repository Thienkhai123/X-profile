import XProfileIcon from 'common/presentation/Icons'
import PropTypes from 'prop-types'

export const HowToUseCard = (props) => {
  const { icon, name, description, active, onClick } = props
  return (
    <div
      className={`p-[27px_29px_21px_24px] bg-white shadow-[0_4px_40px_rgba(0,0,0,0.1)] rounded-[12px] flex-1 cursor-pointer ${
        active ? 'opacity-1 transition-opacity duration-200' : 'opacity-70'
      }`}
      onClick={onClick}
    >
      <div
        className={`flex gap-[20px]  ${
          active ? 'items-start' : 'items-center'
        }`}
      >
        <div className="w-[50px]">
          <XProfileIcon name={icon} fill={active ? '#294F9B' : '#999999'} />
        </div>
        <div>
          <p
            className={`${
              active ? 'text-blue-light ' : 'text-grey-2 '
            } xl:text-p18-bold text-p14 font-bold `}
          >
            {name}
          </p>
          <div
            className={`${
              active ? 'max-h-[176px]' : 'max-h-0'
            } overflow-hidden transition-[max-height] duration-300 ease-in`}
          >
            <p className="xl:text-p16 text-p12 text-neutral mt-[8px]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

HowToUseCard.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func
}

HowToUseCard.defaultProps = {
  icon: 'identify',
  name: '',
  description: '',
  active: false,
  onClick: () => {}
}
