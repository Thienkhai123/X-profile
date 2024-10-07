import XProfileIcon from 'common/presentation/Icons'

export const ToastCopyLink = ({
  icon = 'exclamation',
  title = 'Title',
  description = 'Description',
  information = '',
  background = 'warning',
  link = '#'
}) => {
  return (
    <div
      className={`flex  gap-2 ${background} py-[14px] px-[24px] rounded-full w-full`}
    >
      <p className="text-p14 font-bold text-black  text-center w-full">
        {title}
      </p>
    </div>
  )
}
