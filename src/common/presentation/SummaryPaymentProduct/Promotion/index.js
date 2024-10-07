import { yupResolver } from '@hookform/resolvers/yup'
import XProfileIcon from 'common/presentation/Icons'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'

const Promotion = (props) => {
  const { placeholder, defaultValue } = props
  const schema = yup.object().shape({
    codePromotion: yup.string()
  })

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: { ...defaultValue },
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })
  const onSubmitPromotion = (data) => {
    console.log('data', data)
    reset()
  }

  return (
    <form
      onBlur={handleSubmit(onSubmitPromotion)}
      className="w-full flex items-center py-6 bg-yellow-paler px-8 gap-2 rounded-lg border-custom-img-course-payment"
    >
      <XProfileIcon name="promotionTag" />
      <input
        type="text"
        id="promotion"
        className="rounded-lg text-p18 text-button  placeholder:text-grey-3 focus:outline-none w-full bg-transparent"
        {...register('codePromotion')}
        placeholder={placeholder}
      />
      {errors?.codePromotion && (
        <span className="text-semantic-red text-p18">
          {errors?.codePromotion.message && 'Mã không hợp lệ!'}
        </span>
      )}
    </form>
  )
}

Promotion.propTypes = {
  placeholder: PropTypes.string
}
Promotion.defaultProps = {
  placeholder: 'Nhập mã giảm giá (nếu có)'
}

export default Promotion
