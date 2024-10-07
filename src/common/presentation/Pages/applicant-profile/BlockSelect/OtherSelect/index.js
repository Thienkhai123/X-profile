import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'

const fakeImages = [
  '/images/anotherImage1.png',
  '/images/anotherImage2.png',
  '/images/anotherImage3.png',
  '/images/anotherImage4.png',
  '/images/anotherImage4.png'
]

const OtherSelect = (props) => {
  const { title, status } = props
  return (
    <div
      className={`border border-stoke rounded-lg overflow-hidden${
        status ? ' opacity-60' : 'opacity-100'
      }`}
    >
      <div
        className={`px-5 py-3  cursor-pointer flex items-center justify-between bg-stoke ${
          !status ? 'hover:bg-yellow-bg' : ''
        }`}
      >
        <div className="flex items-center gap-4">
          <XProfileIcon name="career" fill="#294F9B" />
          <p className="uppercase text-p18-bold text-blue-light">{title}</p>
        </div>
        {status && (
          <XProfileIcon
            name="check"
            fill="#F6BB3A"
            width={'20'}
            height={'20'}
          />
        )}
      </div>
      <div className="w-full py-[24px] px-[28px]">
        <p className=" text-p16 text-grey-1 ">
          Những trải nghiệm khác như các dự án cá nhân, hoạt động ngoại
          khóa,...sẽ giúp bạn nổi bật hơn và tạo điểm cộng trước nhà tuyển dụng
          đấy!{' '}
        </p>

        <div className=" mt-4 grid xl:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-[20px]">
          {fakeImages?.map((img, ind) => {
            return (
              <div
                key={ind}
                className="bg-grey-4 rounded-xl relative w-[114px] h-[114px] overflow-hidden"
              >
                <Image src={img} layout="fill" alt="" />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

OtherSelect.propTypes = {}
OtherSelect.defaultProps = {
  title: '',
  status: true,
  templateOptionName: ''
}

export default OtherSelect
