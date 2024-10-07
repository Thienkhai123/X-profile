import Image from 'next/image'
import PropTypes from 'prop-types'

export const SimpleCard = (props) => {
  const { title, description, buttonTitle, buttonStyle } = props

  return (
    <div className="p-[20px] bg-white rounded-[12px]">
      <div className="w-full h-[200px] relative">
        <Image alt="" src="/images/370x200.gif" layout="fill" />
      </div>
      <p className="text-black text-p20-bold text-center mt-[20px]">{title}</p>
      <p className="text-p18 text-grey-1 text-center">{description}</p>
      <div className="flex justify-center">
        <button className={buttonStyle}>{buttonTitle}</button>
      </div>
    </div>
  )
}

SimpleCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  buttonTitle: PropTypes.string,
  buttonStyle: PropTypes.string
}

SimpleCard.defaultProps = {
  title: '',
  description: '',
  buttonTitle: '',
  buttonStyle:
    'text-black rounded-[8px] bg-button py-[10px] px-[20px] mt-[20px] mx-auto font-bold'
}
