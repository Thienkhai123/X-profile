import XProfileIcon from 'common/presentation/Icons'

const DATA = [
  {
    content: 'Video số hoá nội dung đào tạo nội bộ',
    type: 'text',
    starter: '',
    basic: '20 phút',
    pro: '50 phút',
    customize: 'Tuỳ chỉnh'
  },
  {
    content: 'Không giới hạn kho đào tạo Onboarding',
    type: 'check',
    starter: '1',
    basic: '1',
    pro: '1',
    customize: '1'
  },
  {
    content: 'Không giới hạn Onboarding Template',
    type: 'check',
    starter: '1',
    basic: '1',
    pro: '1',
    customize: '1'
  },
  {
    content: 'Đánh giá hiệu quả sau đào tạo (2 tháng)',
    type: 'check',
    starter: '0',
    basic: '0',
    pro: '1',
    customize: '1'
  },
  {
    content: 'Tích hợp Logo',
    type: 'check',
    starter: '1',
    basic: '0',
    pro: '1',
    customize: '1'
  },
  {
    content: 'Giới hạn LMS',
    type: 'text',
    starter: '2 học viên',
    basic: '5 học viên',
    pro: '20 học viên',
    customize: 'Tuỳ chỉnh'
  },
  {
    content: 'Game hóa quy trình đánh giá',
    type: 'check',
    starter: '0',
    basic: '0',
    pro: '1',
    customize: '1'
  },
  {
    content: 'Chống gian lận thi cử',
    type: 'check',
    starter: '1',
    basic: '0',
    pro: '1',
    customize: '1'
  },
  {
    content: 'AI Test tự động sau khoá học',
    type: 'check',
    starter: '1',
    basic: '0',
    pro: '1',
    customize: '1'
  },
  {
    content: 'Website thương hiệu tuyển dụng',
    type: 'check',
    starter: 'Có wartermark',
    basic: '1',
    pro: '1',
    customize: '1'
  },
  {
    content: 'TVC giới thiệu doanh nghiệp',
    type: 'check',
    starter: '1',
    basic: '1',
    pro: '1',
    customize: '1'
  },
  {
    content: 'ATS Miễn phí',
    type: 'check',
    starter: '1',
    basic: '1',
    pro: '1',
    customize: '1'
  },
  {
    content: 'Đăng tin tuyển dụng không giới hạn',
    type: 'check',
    starter: '1',
    basic: '1',
    pro: '1',
    customize: '1'
  },
  {
    content: 'Bật 3 tin tuyển dụng miễn phí',
    type: 'check',
    starter: '0',
    basic: '0',
    pro: '0',
    customize: '1'
  },
  {
    content: 'Dashboard tuyển dụng',
    type: 'check',
    starter: '1',
    basic: '1',
    pro: '1',
    customize: '1'
  },
  {
    content: 'Dashboard quản lý học tập',
    type: 'check',
    starter: '1',
    basic: '1',
    pro: '1',
    customize: '1'
  },
  {
    content: 'Báo cáo phân tích Onboarding',
    type: 'check',
    starter: '0',
    basic: '1',
    pro: '1',
    customize: '1'
  },
  {
    content:
      'Tư vấn xây dựng khung năng lực và lộ trình đào tạo cá nhân hoá cho doanh nghiệp',
    type: 'check',
    starter: '0',
    basic: '0',
    pro: '0',
    customize: '1'
  }
]
const LandingPageModalContent = () => {
  return (
    <div className="mt-10 xl:overflow-x-visible overflow-x-scroll">
      <div className="w-full flex flex-col  ">
        <div className="grid grid-cols-[300px_161px_161px_161px_161px] bg-white mb-6">
          <div className="px-4 py-3 flex items-center justify-start">
            <p
              style={{ wordBreak: 'break-word' }}
              className="text-p16 leading-7 max-w-[268px]"
            ></p>
          </div>
          <div className="flex items-center justify-center py-[15px]">
            <div className="flex flex-col justify-center items-center">
              <p className="text-p16-bold leading-7 text-button-2">Gói Trial</p>
              <p className="text-p14 text-button-2">Miễn phí trong 55 ngày</p>
            </div>
          </div>
          <div className="flex items-center justify-center py-[15px]">
            <div className="flex flex-col justify-center items-center">
              <p className="text-p16-bold leading-7 text-button-2">Gói Basic</p>
              <p className="text-p14 text-button-2">1,166,667đ/tháng</p>
            </div>
          </div>
          <div className="flex items-center justify-center py-[15px]">
            <div className="flex flex-col justify-center items-center">
              <p className="text-p16-bold leading-7 text-button-2">Gói Pro</p>
              <p className="text-p14 text-button-2">2,916,667đ/tháng</p>
            </div>
          </div>
          <div className="flex items-center justify-center py-[15px]">
            <div className="flex flex-col justify-center items-center">
              <p className="text-p16-bold leading-7 text-button-2">
                Gói Custom
              </p>
              <p className="text-p14 text-button-2">-</p>
            </div>
          </div>
        </div>
        {DATA?.map((item, index) => {
          const { content, type, starter, basic, pro, customize } = item
          return (
            <div
              key={index}
              className="grid grid-cols-[300px_161px_161px_161px_161px]   rounded-lg   even:bg-light-blue odd:bg-white"
            >
              <div className="px-4 py-3 flex items-center justify-start">
                <p
                  style={{ wordBreak: 'break-word' }}
                  className="text-p16 leading-7 max-w-[268px]"
                >
                  {content}
                </p>
              </div>
              <div className="flex items-center justify-center py-[26px]">
                {type === 'text' ? (
                  <p className="text-p16-bold leading-7">{starter}</p>
                ) : starter === '1' ? (
                  <XProfileIcon name="checkDone" width="32" height="32" />
                ) : starter === '0' ? (
                  ''
                ) : (
                  <p className="text-p16-bold leading-7">{starter}</p>
                )}
              </div>
              <div className="flex items-center justify-center py-[26px]">
                {type === 'text' ? (
                  <p className="text-p16-bold leading-7">{basic}</p>
                ) : basic === '1' ? (
                  <XProfileIcon name="checkDone" width="32" height="32" />
                ) : (
                  ''
                )}
              </div>
              <div className="flex items-center justify-center py-[26px]">
                {type === 'text' ? (
                  <p className="text-p16-bold leading-7">{pro}</p>
                ) : pro === '1' ? (
                  <XProfileIcon name="checkDone" width="32" height="32" />
                ) : (
                  ''
                )}
              </div>
              <div className="flex items-center justify-center py-[26px]">
                {type === 'text' ? (
                  <p className="text-p16-bold leading-7">{customize}</p>
                ) : customize === '1' ? (
                  <XProfileIcon name="checkDone" width="32" height="32" />
                ) : (
                  ''
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LandingPageModalContent
