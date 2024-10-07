import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
import PropTypes from 'prop-types'

const ExamCampaignScreenStart = (props) => {
  const { handleClick, userName, examTitle, examCampaignDetail } = props

  return (
    <div>
      <p className="text-h2 my-6">{examTitle}</p>
      <div>
        <p className="text-p16 leading-[42px]">
          Xin chào <span className="font-bold">{userName}</span>
        </p>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {examCampaignDetail?.company?.name && (
          <div className="flex gap-4">
            <div className="mt-2 px-1">
              <Image
                alt="logo-company"
                src="/images/office-building.png"
                width={20}
                height={20}
                unoptimized
              />
            </div>
            <p className="text-p18 text-neutral leading-[42px]">
              Công ty:{' '}
              <span className="font-bold">
                {examCampaignDetail?.company?.name}
              </span>
            </p>
          </div>
        )}
        <div className="flex gap-4">
          <div className="mt-2">
            <XProfileIcon name="stopWatch" />
          </div>
          <p className="text-p18 text-neutral leading-[42px]">
            Thời gian bắt đầu{' '}
            <span className="font-bold">{examCampaignDetail?.start}</span> -
            Thời gian kết thúc{' '}
            <span className="font-bold">{examCampaignDetail?.end}</span>
          </p>
        </div>
      </div>

      {examCampaignDetail?.canJoin && (
        <>
          <div className="mt-4">
            <p className="text-p18">
              Nếu bạn đã nắm rõ toàn bộ thông tin, hãy bấm “Đồng ý” để tiếp tục
              nhé. Chúc bạn làm bài thi suôn sẻ nha :D
            </p>
          </div>

          <Button
            title="Đồng ý"
            margin="mx-auto mt-10"
            width="w-[171px]"
            height="h-[56px]"
            padding="py-3 px-8"
            rounded="rounded-lg"
            onClick={handleClick}
          />
        </>
      )}
      {!examCampaignDetail?.canJoin && (
        <Button
          title="Đồng ý"
          margin="mx-auto mt-10"
          width="w-[171px]"
          height="h-[56px]"
          padding="py-3 px-8 cursor-not-allowed opacity-80"
          rounded="rounded-lg"
          disabled
        />
      )}
    </div>
  )
}

ExamCampaignScreenStart.propTypes = {
  handleClick: PropTypes.func,
  userName: PropTypes.string,
  examTitle: PropTypes.string
}

ExamCampaignScreenStart.defaultProps = {
  handleClick: () => {},
  userName: '',
  examTitle: ''
}

export default ExamCampaignScreenStart
