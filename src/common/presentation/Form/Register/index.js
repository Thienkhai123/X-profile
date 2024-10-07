import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import PropTypes from 'prop-types'
import SocialLogin from '../SocialLogin'
import InputFloatHidden from '../InputFloatHidden'
import { useEffect, useState } from 'react'
import { SIGNUPVALIDATE } from 'common/presentation/Pages/SignUp/constant'
import Validation from '../Validation'
import { handleValidate } from 'store/helper/functionHelper'
import SurveyStep from 'common/presentation/Pages/Survey/SurveyStep'

const FormRegister = (props) => {
  const { nextStep, registerPayload, setRegisterPayload } = props
  const [validationIds, setValidationIds] = useState([])
  const schema = yup.object().shape({
    password: yup.string().required('Password không được để trống')
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const watchPassword = watch('password')

  const onSubmit = async (data) => {
    setRegisterPayload({
      ...registerPayload,
      password: data.password,
      rePassword: data.password
    })
    nextStep()
  }

  useEffect(() => {
    handleValidate(watchPassword, validationIds, setValidationIds)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchPassword])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <p className="text-black lg:text-[28px] text-p20-bold lg:text-left text-center font-bold mb-[24px]">
        Cài đặt mật khẩu
      </p>
      <div className="mb-[20px]">
        <InputFloatHidden
          label="Mật khẩu"
          name="password"
          register={register}
          iconName="eye"
          errorMessage={errors?.password?.message}
        />
      </div>
      <div className="mb-[16px]">
        <SurveyStep
          length={5}
          width="w-full"
          grid="grid grid-cols-5"
          typeSurvey={validationIds.length + 1}
          bg="bg-semantic-green"
        />
      </div>
      <div className="flex flex-col gap-[8px] mb-[26px]">
        {SIGNUPVALIDATE.map((val, ind) => (
          <Validation
            key={ind}
            text={val}
            active={validationIds.includes(ind)}
          />
        ))}
      </div>

      <div className="mb-[22px]">
        <button
          type="submit"
          disabled={!isValid || validationIds.length < 5}
          className="w-full py-[12px] bg-button rounded-[8px] text-black font-bold disabled:bg-grey-2 disabled:text-white hover:opacity-80"
        >
          Tiếp theo
        </button>
      </div>
      <SocialLogin />
    </form>
  )
}

FormRegister.propTypes = {
  nextStep: PropTypes.func,
  registerPayload: PropTypes.object,
  setRegisterPayload: PropTypes.func
}

FormRegister.defaultProps = {
  nextStep: () => {},
  registerPayload: {},
  setRegisterPayload: () => {}
}

export default FormRegister
