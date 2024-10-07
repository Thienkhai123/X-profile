import XProfileIcon from 'common/presentation/Icons'

export const AlertSuccess = ({
  title = '(Nội dung thông báo)',
  description = '',
  information = '',
  link = '#'
}) => {
  return (
    <div className="p-[40px]">
      <div
        className="flex justify-center items-center px-[32px] py-[14px] border border-grey-4 shadow-toast  bg-white rounded-[64px]"
        style={{
          gap: title !== '' ? '14px' : ''
        }}
      >
        <div>
          <XProfileIcon name="toastSuccess" />
        </div>
        <div className="flex-1">
          <p
            className={`text-center text-p20 text-black  line-clamp-2 break-words `}
          >
            {title}
          </p>
          <a className="text-grey-1 underline" href={link}>
            {information}
          </a>
        </div>
      </div>
    </div>
  )
}
