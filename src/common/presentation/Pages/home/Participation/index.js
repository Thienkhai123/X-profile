import React from 'react'
import Button from 'common/presentation/Button'
import PropTypes from 'prop-types'

const Paricipation = (props) => {
  const { title, button } = props
  return (
    <div className="h-[320px] bg-[#FBECCA] flex justify-center items-center">
      <div>
        <div className="mb-6 md:w-[604px] text-center">
          <p className="text-h3 text-neutral">{title}</p>
        </div>
        <div className="flex justify-center">
          <Button width="w-[174px] h-[52px]" title={button} />
        </div>
      </div>
    </div>
  )
}

Paricipation.propTypes = {
  title: PropTypes.string,
  button: PropTypes.string
}
Paricipation.defaultProps = {
  title: 'Tham gia cộng động X-Profile để cùng trao đổi kiến thức!',
  button: 'Tham gia ngay'
}

export default Paricipation
