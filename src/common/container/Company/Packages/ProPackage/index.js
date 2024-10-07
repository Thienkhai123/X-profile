import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import { convertCurrency } from 'store/helper/functionHelper'

export const ProPackage = (props) => {
  const {
    time = 'tháng',
    currency = 0,
    handleToggleRegisterModal = () => {}
  } = props
  return (
    <div className="relative xl:max-w-[550px] w-full p-10 rounded-3xl flex flex-col justify-between gap-8 bg-[#9FBBF4]">
      <div className="absolute top-9 -right-1 min-w-[145px] flex items-center justify-center gap-[10px] h-12 bg-button-2 rounded-[40px_4px_4px_40px] px-6 py overflow-hidden">
        <XProfileIcon name="likeFill" />
        <p className="text-p16-bold text-white leading-7 select-none">
          Đề xuất
        </p>
      </div>
      <div>
        <div>
          <div className="px-4 py-[5px] mb-4 bg-[#FFEBBF] rounded-full w-fit ">
            <p className="text-p18 leading-[30px] text-[#709AEE] ">Gói Pro</p>
          </div>
          <p className="text-h3 text-white">{`${convertCurrency(
            currency,
            false
          )} / ${time}`}</p>
        </div>
        <div className="flex flex-col gap-6 mt-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center">
              <XProfileIcon name="starsB2B" fill="#FFEBBF" />
            </div>
            <p className="text-p16-bold leading-7 text-white">
              Có tất cả quyền lợi ở gói Basic
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-5 h-5 rounded-full bg-[#FFEBBF] flex items-center justify-center">
              <XProfileIcon
                name="checkDone"
                width="18"
                height="18"
                fill="#9FBBF4"
              />
            </div>
            <p className="text-p16-bold leading-7 text-white">
              50 phút video số hoá nội dung đào tạo nội bộ
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-5 h-5 rounded-full bg-[#FFEBBF] flex items-center justify-center">
              <XProfileIcon
                name="checkDone"
                width="18"
                height="18"
                fill="#9FBBF4"
              />
            </div>
            <p className="text-p16-bold leading-7 text-white">
              Đánh giá hiệu quả sau đào tạo (2 tháng)
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-5 h-5 rounded-full bg-[#FFEBBF] flex items-center justify-center">
              <XProfileIcon
                name="checkDone"
                width="18"
                height="18"
                fill="#9FBBF4"
              />
            </div>
            <p className="text-p16-bold leading-7 text-white">Tích hợp Logo</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-5 h-5 rounded-full bg-[#FFEBBF] flex items-center justify-center">
              <XProfileIcon
                name="checkDone"
                width="18"
                height="18"
                fill="#9FBBF4"
              />
            </div>
            <p className="text-p16-bold leading-7 text-white">
              LMS 20 học viên
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-5 h-5 rounded-full bg-[#FFEBBF] flex items-center justify-center">
              <XProfileIcon
                name="checkDone"
                width="18"
                height="18"
                fill="#9FBBF4"
              />
            </div>
            <p className="text-p16-bold leading-7 text-white">
              Game hóa quy trình đánh giá
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-5 h-5 rounded-full bg-[#FFEBBF] flex items-center justify-center">
              <XProfileIcon
                name="checkDone"
                width="18"
                height="18"
                fill="#9FBBF4"
              />
            </div>
            <p className="text-p16-bold leading-7 text-white">
              Chống gian lận thi cử
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-5 h-5 rounded-full bg-[#FFEBBF] flex items-center justify-center">
              <XProfileIcon
                name="checkDone"
                width="18"
                height="18"
                fill="#9FBBF4"
              />
            </div>
            <p className="text-p16-bold leading-7 text-white">
              AI Test tự động sau khoá học
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <Button
          title="Đăng ký"
          width="w-full"
          rounded="rounded-full"
          padding="py-4"
          height="h-[62px]"
          margin="mt-0"
          // hover='hover:shadow-[0px_16px_24px_0px_rgba(38,58,124,0.08)] hover:-translate-y-1 duration-200 transition-all'
          background="bg-white"
          onClick={() => handleToggleRegisterModal(2, 'Pro')}
        />
      </div>
    </div>
  )
}
