import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import ReCAPTCHA from 'react-google-recaptcha'
import { useRef } from 'react'
import Button from 'common/presentation/Button'
import InputCheckbox from '../InputCheckBox'
import InputMultipleLines from '../InputMultipleLines'
import Input from '../Input'

const RegisterModalContent = (props) => {
  const {
    packageId,
    handleToggleRegisterModal = () => {},
    handleToggleSuccessModal = () => {},
    minutes,
    student
  } = props
  const recaptchaRef = useRef()
  const schema = yup.object().shape({
    fullName: yup.string().trim().required('Không được bỏ ô trống'),
    email: yup
      .string()
      .email('Email không hợp lệ!')
      .required('Không được bỏ ô trống'),
    phone: yup
      .string()
      .matches(
        /(^^(09|03|07|08|05|02)+([0-9]{8,9})$)|^$/,
        'Số điện thoại không đúng định dạng'
      )
      .required('Không được bỏ ô trống'),
    field: yup.string().trim().required('Không được bỏ ô trống'),
    companyName: yup.string().trim().required('Không được bỏ ô trống'),
    companyWebsite: yup.string().trim(),
    contentSupport: yup.string().trim(),
    recaptchaResponse: yup.string().required('Vui lòng xác thực bạn nhé!'),
    tagline: yup.string().required('Không được bỏ ô trống'),
    companySize: yup
      .number()
      .typeError('Không được bỏ ô trống')
      .required('Không được bỏ ô trống')
  })
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  })
  const onChangeRecaptcha = (val) => {
    setValue('recaptchaResponse', val)
  }
  const submit = async (data) => {
    const {
      companyName,
      fullName,
      companyWebsite,
      contentSupport,
      field,
      need,
      phone,
      email,
      companySize,
      tagline,
      recaptchaResponse
    } = data
    if (recaptchaRef.current.getValue()) {
      const payload = {
        email: email,
        phone: phone,
        name: companyName,
        userJobTitle: field,
        userName: fullName,
        userNote: contentSupport,
        demands: need || [],
        website: companyWebsite,
        recaptchaResponse: recaptchaResponse,
        package: packageId,
        companySize: 1,
        companySize: companySize || 1,
        tagline: tagline,
        customVideoMinute: packageId === 3 ? minutes : 0,
        customStudentCount: packageId === 3 ? student : 0
      }
      await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/Home/b2b-contact`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error(res.statusText)
        } else {
          recaptchaRef.current?.reset()
          setValue('recaptchaResponse', '')
          handleToggleRegisterModal()
          handleToggleSuccessModal()
        }
      })
    } else {
      recaptchaRef.current?.reset()
      setValue('recaptchaResponse', '')
    }
    // console.log(payload);
    // handleToggleRegisterModal();
    // handleToggleSuccessModal();
  }
  return (
    <div className="mt-10 ">
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <div className="flex flex-col lg:flex-row gap-[45px]">
            <div className="lg:w-[495px] w-full flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                <p className="text-p18-bold text-black leading-[30px]">
                  Bạn đang quan tâm đến nhu cầu:
                </p>
                <InputCheckbox
                  register={register}
                  name="need"
                  value={0}
                  title="Giải pháp xây dựng thương hiệu tuyển dụng doanh nghiệp"
                />
                <InputCheckbox
                  register={register}
                  name="need"
                  value={1}
                  title="Tối ưu quy trình và nâng cao hiệu quả tuyển dụng"
                />
                <InputCheckbox
                  register={register}
                  name="need"
                  value={2}
                  title="Chuẩn hóa quy trình đào tạo Onboarding"
                />
                <InputCheckbox
                  register={register}
                  name="need"
                  value={3}
                  title="Thiết kế và sản xuất chương trình đào tạo nội bộ trực tuyến"
                />
                <InputCheckbox
                  register={register}
                  name="need"
                  value={4}
                  title="Tư vấn giải pháp số hóa đào tạo và tuyển dụng toàn diện cho doanh nghiệp"
                />
              </div>
              <div>
                <InputMultipleLines
                  register={register}
                  placeholder={`Bạn cần hỗ trợ giải đáp thêm thông tin về dịch vụ của \n X-Profile?`}
                  name="contentSupport"
                />
              </div>
            </div>
            <div className="lg:w-[488px] w-full flex flex-col gap-6">
              <Input errors={errors.fullName?.message} register={register} />
              <Input
                errors={errors.email?.message}
                register={register}
                placeholder="Email*"
                name="email"
              />
              <div className="flex items-start gap-4">
                <Input
                  errors={errors.phone?.message}
                  register={register}
                  placeholder="Số điện thoại*"
                  name="phone"
                />
                <Input
                  errors={errors.field?.message}
                  register={register}
                  placeholder="Chức vụ*"
                  name="field"
                />
              </div>
              <div className="flex items-start gap-4">
                <Input
                  errors={errors.tagline?.message}
                  register={register}
                  placeholder="Lĩnh vực*"
                  name="tagline"
                />
                <Input
                  errors={errors.companySize?.message}
                  register={register}
                  placeholder="Quy mô công ty*"
                  name="companySize"
                  type="number"
                  onInput={(e) => {
                    e.target.value =
                      !!e.target.value && Math.abs(e.target.value) > 0
                        ? Math.abs(e.target.value.slice(0, 8))
                        : null
                  }}
                  onWheel={(e) => e.target.blur()}
                  max={10000000}
                  min={1}
                />
              </div>
              <Input
                errors={errors.companyName?.message}
                register={register}
                placeholder="Tên công ty*"
                name="companyName"
              />
              <Input
                errors={errors.companyWebsite?.message}
                register={register}
                placeholder="Website công ty"
                name="companyWebsite"
              />
              <div className="">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6Lc7KcooAAAAAJ4kpBi-iGeCtt0R_yBgGoK63uC4"
                  onChange={onChangeRecaptcha}
                />
                {errors?.recaptchaResponse?.message && (
                  <p className="text-p14 text-semantic-red  mt-1">
                    {errors?.recaptchaResponse?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex md:flex-row flex-col gap-4  justify-end items-center mt-10 ">
            <Button
              title="Huỷ"
              background="bg-white"
              rounded="rounded-full"
              width="w-[140px]"
              height="h-14"
              color="text-button-2"
              textWeight="text-p18-bold leading-[30px]"
              margin="mt-0"
              padding="px-8 py-[13px]"
              hover="hover:bg-white hover:shadow-[0px_16px_24px_0px_rgba(38,58,124,0.08)] hover:-translate-y-1 duration-200"
              border="border border-button-2 "
              onClick={() => handleToggleRegisterModal()}
            />
            <Button
              title="Đăng ký"
              background="bg-button-2"
              rounded="rounded-full"
              width="w-[140px]"
              height="h-14"
              color="text-white"
              textWeight="text-p18-bold leading-[30px]"
              margin="mt-0"
              type="submit"
              padding="px-8 py-[13px]"
              hover="hover:shadow-[0px_16px_24px_0px_rgba(38,58,124,0.08)] hover:-translate-y-1 duration-200"
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegisterModalContent
