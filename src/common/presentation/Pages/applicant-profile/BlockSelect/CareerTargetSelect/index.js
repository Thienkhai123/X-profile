import XProfileIcon from 'common/presentation/Icons'

const CareerTargetSelect = (props) => {
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
      <div className="w-full py-[24px] px-[28px] text-p16 text-grey-1">
        Bạn có thể chia sẻ về những mong muốn và mục tiêu ngắn hạn, dài hạn với
        nghề nghiệp để nhà tuyển dụng hiểu rõ hơn về bạn!
      </div>
    </div>
  )
}

CareerTargetSelect.propTypes = {}
CareerTargetSelect.defaultProps = {
  title: '',
  status: true,
  templateOptionName: ''
}

export default CareerTargetSelect
