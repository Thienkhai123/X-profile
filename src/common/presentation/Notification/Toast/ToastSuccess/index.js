import XProfileIcon from 'common/presentation/Icons'

export const ToastSuccess = ({
  icon = 'check',
  title = 'Title',
  description = 'Description',
  information = '',
  link = '#'
}) => {
  return (
    <div className="flex gap-2 bg-alert-success">
      <div>
        <XProfileIcon name={icon} />
      </div>
      <div className="flex-1">
        <p className="text-p14 font-bold text-black">{title}</p>
        <p className="text-p14 text-black">{description}</p>
        <a className="text-grey-1 underline" href={link}>
          {information}
        </a>
      </div>
    </div>
  )
}
