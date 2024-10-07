import Button from 'common/presentation/Button'
import ButtonIcon from 'common/presentation/ButtonIcon'
import XProfileIcon from 'common/presentation/Icons'
import PropTypes from 'prop-types'

const CONTENTS = [
  {
    iconName: 'stopWatch',
    description:
      'Bài kiểm tra bao gồm 40 câu hỏi, sẽ mất khoảng 20 phút để hoàn thành. Lưu ý rằng, bộ đếm thời gian sẽ chính thức được tính khi bạn bấm "Bắt đầu".'
  },
  {
    iconName: 'monitorCamera',
    description:
      'Vui lòng để chế độ toàn màn hình trong suốt quá trình làm bài, mở camera trước và cho phép trình duyệt sử dụng máy ảnh/webcam của bạn, ghi hình toàn bộ khuôn mặt của bạn ở trung tâm màn hình và không xuất hiện thêm bất kỳ ai khác, được cho là hợp lệ.'
  },
  {
    iconName: 'smartphone2',
    description:
      'Dùng điện thoại để quét mã QR bên dưới, hiển thị website làm bài kiểm tra trên điện thoại.'
  },
  {
    iconName: 'camera',
    description:
      'Bạn sẽ được chụp ảnh nhanh định kỳ trong suốt quá trình thực hiện bài kiếm tra. Hình thức này được thực hiện để đảm bảo sự công bằng cho mọi thí sinh.'
  },
  {
    iconName: 'volumeLoudIcon',
    description:
      'Bật loa hoặc tai nghe của bạn (để phát âm thanh). Bạn được tự do sử dụng máy tính, bút và giấy.'
  }
]

const RenderUIParagraph = ({ iconName = 'stopWatch', description = '' }) => {
  return (
    <div className="flex gap-4">
      <div className="mt-2">
        <XProfileIcon name={iconName} />
      </div>
      <p className="text-p18 text-neutral leading-[42px]">{description}</p>
    </div>
  )
}

const ExamScreenStart = (props) => {
  const { handleChangeScreen, userName, examTitle } = props
  const handleBack = () => {
    window.location.replace('/')
  }
  return (
    <div>
      <ButtonIcon
        background="bg-transparent"
        rounded="rounded-lg border border-grey-3"
        iconName="arrowBackTest"
        title=" Trở về"
        width="w-auto"
        height="h-[56px]"
        padding="py-3 px-8"
        margin="m-0"
        textWeight="text-p18-bold"
        onClick={handleBack}
      />
      <p className="text-h2 mt-10 mb-6">{examTitle}</p>
      <div>
        <p className="text-p16 leading-[42px]">
          Xin chào <span className="font-bold">{userName}</span>,
          <br />
          Dưới đây là một số lưu ý trước khi bạn bắt đầu bài kiểm tra, nhớ đọc
          cẩn thận để tránh sai sót trong quá trình làm bài thi nhé ^^
        </p>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {CONTENTS.map((content, ind) => {
          const { iconName, description } = content
          return (
            <div key={ind}>
              <RenderUIParagraph
                iconName={iconName}
                description={description}
              />
            </div>
          )
        })}
      </div>

      <div className="mt-4">
        <p className="text-p18">
          Nếu bạn đã nắm rõ toàn bộ thông tin, hãy bấm “Đồng ý” để tiếp tục nhé.
          Chúc bạn làm bài kiểm tra suôn sẻ nha :D
        </p>
      </div>

      <Button
        title="Đồng ý"
        margin="mx-auto mt-10"
        width="w-[171px]"
        height="h-[56px]"
        padding="py-3 px-8"
        rounded="rounded-lg"
        onClick={() => handleChangeScreen(2)}
      />
    </div>
  )
}

ExamScreenStart.propTypes = {
  handleChangeScreen: PropTypes.func,
  userName: PropTypes.string,
  examTitle: PropTypes.string
}

ExamScreenStart.defaultProps = {
  handleChangeScreen: () => {},
  userName: '',
  examTitle: ''
}

export default ExamScreenStart
