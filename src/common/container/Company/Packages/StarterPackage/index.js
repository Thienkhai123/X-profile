import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import { convertCurrency } from 'store/helper/functionHelper'

export const StarterPackage = (props) => {
  const {
    time = 'tháng',
    currency = 0,
    handleToggleRegisterModal = () => {}
  } = props
  return (
    <div className="xl:max-w-[550px] w-full p-10 rounded-3xl flex flex-col gap-8 bg-[#FFF7F5]">
      <div>
        <p className="text-p18 leading-[30px] text-grey-1 mb-4">Gói Trial</p>
        <p className="text-h3">{`Miễn phí sử dụng trong 55 ngày`}</p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 rounded-full bg-[#F5C1B3] flex items-center justify-center">
            <XProfileIcon name="checkDone" width="18" height="18" fill="#fff" />
          </div>
          <p className="text-p16-bold leading-7">
            Không giới hạn kho đào tạo Onboarding
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 rounded-full bg-[#F5C1B3] flex items-center justify-center">
            <XProfileIcon name="checkDone" width="18" height="18" fill="#fff" />
          </div>
          <p className="text-p16-bold leading-7">
            Không giới hạn Onboarding Template
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 rounded-full bg-[#F5C1B3] flex items-center justify-center">
            <XProfileIcon name="checkDone" width="18" height="18" fill="#fff" />
          </div>
          <p className="text-p16-bold leading-7">Tích hợp Logo</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 rounded-full bg-[#F5C1B3] flex items-center justify-center">
            <XProfileIcon name="checkDone" width="18" height="18" fill="#fff" />
          </div>
          <p className="text-p16-bold leading-7">LMS 2 học viên</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 rounded-full bg-[#F5C1B3] flex items-center justify-center">
            <XProfileIcon name="checkDone" width="18" height="18" fill="#fff" />
          </div>
          <p className="text-p16-bold leading-7">Chống gian lận thi cử</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 rounded-full bg-[#F5C1B3] flex items-center justify-center">
            <XProfileIcon name="checkDone" width="18" height="18" fill="#fff" />
          </div>
          <p className="text-p16-bold leading-7">
            AI Test tự động sau khoá học
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 rounded-full bg-[#F5C1B3] flex items-center justify-center">
            <XProfileIcon name="checkDone" width="18" height="18" fill="#fff" />
          </div>
          <p className="text-p16-bold leading-7">
            Website thương hiệu tuyển dụng
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 rounded-full bg-[#F5C1B3] flex items-center justify-center">
            <XProfileIcon name="checkDone" width="18" height="18" fill="#fff" />
          </div>
          <p className="text-p16-bold leading-7">
            TVC giới thiệu doanh nghiệp (có wartermark)
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 rounded-full bg-[#F5C1B3] flex items-center justify-center">
            <XProfileIcon name="checkDone" width="18" height="18" fill="#fff" />
          </div>
          <p className="text-p16-bold leading-7">ATS miễn phí</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 rounded-full bg-[#F5C1B3] flex items-center justify-center">
            <XProfileIcon name="checkDone" width="18" height="18" fill="#fff" />
          </div>
          <p className="text-p16-bold leading-7">
            Đăng tin tuyển dụng không giới hạn
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 rounded-full bg-[#F5C1B3] flex items-center justify-center">
            <XProfileIcon name="checkDone" width="18" height="18" fill="#fff" />
          </div>
          <p className="text-p16-bold leading-7">Dashboard tuyển dụng</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 rounded-full bg-[#F5C1B3] flex items-center justify-center">
            <XProfileIcon name="checkDone" width="18" height="18" fill="#fff" />
          </div>
          <p className="text-p16-bold leading-7">Dashboard quản lý học tập</p>
        </div>
      </div>
      <div>
        <Button
          title="Đăng ký"
          width="w-full"
          rounded="rounded-full"
          padding="py-4"
          height="h-[62px]"
          margin="mt-0"
          // hover='hover:shadow-[0px_16px_24px_0px_rgba(38,58,124,0.08)] hover:-translate-y-1 duration-200 transition-all'
          background="bg-[#FBE4DF]"
          onClick={() => handleToggleRegisterModal(0, 'Starter')}
        />
      </div>
    </div>
  )
}
