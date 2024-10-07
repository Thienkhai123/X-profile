import XProfileIcon from 'common/presentation/Icons'

export const ToastError = ({
  icon = 'exclamation',
  title = 'Title',
  description = 'Description',
  information = '',
  background = 'warning',
  link = '#'
}) => {
  return (
    <div
      className={`flex  gap-2 ${
        background === 'error' ? 'bg-alert-error' : 'bg-alert-warning'
      }`}
    >
      <div>
        <XProfileIcon
          name={icon}
          fill={background === 'error' ? '#F44336' : '#FF9800'}
        />
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
