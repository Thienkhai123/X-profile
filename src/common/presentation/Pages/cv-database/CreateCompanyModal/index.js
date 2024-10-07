import Button from 'common/presentation/Button'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import { ACCESS_TOKEN } from 'common/config/app.constants'

const CreateCompanyModal = (props) => {
  const { toggleShowCreateCompanyModal = () => {} } = props

  const redirectToAdmin = () => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    window.open(process.env.NEXT_PUBLIC_LMS + 'user?token=' + token)
  }
  const handleCloseModal = () => {
    toggleShowCreateCompanyModal()
    document.body.style.overflow = 'auto'
  }
  return (
    <div className="relative flex flex-col items-center justify-center ">
      <div
        onClick={() => handleCloseModal()}
        className="absolute top-0 right-0 cursor-pointer"
      >
        <XProfileIcon name="cancel" width="16" height="16" />
      </div>
      <div className="mb-6">
        <XProfileIcon name="bell2" />
      </div>
      <p className="text-h4 text-center mb-4">
        Tạo hồ sơ công ty cho doanh nghiệp
      </p>
      <p className="text-p16 text-grey-1 text-center mb-10">
        Hãy tạo hồ sơ cho doanh nghiệp của bạn để có thể bật tuyển dụng một cách
        dễ dàng nhé!
      </p>
      <div className="flex items-center gap-4">
        <Button
          title="Huỷ"
          width="xl:w-[200px]"
          height="h-[44px]"
          textWeight="sm:text-p18-bold text-p14 font-bold "
          background="bg-grey-4"
          color="text-neutral"
          // hover="hover:bg-nude"
          rounded="rounded-lg "
          padding="px-8 py-3"
          onClick={() => handleCloseModal()}
        />
        <Button
          title="Tạo hồ sơ"
          width="xl:w-[200px]"
          height="h-[44px]"
          textWeight="sm:text-p18-bold text-p14 font-bold "
          background="bg-button"
          color="text-neutral"
          // hover="hover:bg-nude"
          rounded="rounded-lg "
          padding="px-8 py-3"
          onClick={() => redirectToAdmin()}
        />
      </div>
    </div>
  )
}

CreateCompanyModal.propTypes = {
  toggleModal: PropTypes.func
}

CreateCompanyModal.defaultProps = {
  toggleModal: () => {}
}

export default CreateCompanyModal
