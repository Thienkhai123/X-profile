import XProfileIcon from 'common/presentation/Icons'

export const CareerPathCancelButton = ({ onClick = () => {} }) => {
  return (
    <div
      id="cancel-btn-crp"
      onClick={onClick}
      className="opacity-0 h-0 overflow-hidden fixed z-30 hidden cursor-pointer rounded-full bg-white border border-grey-3 p-6 drop-shadow-[0_8px_24px_rgba(0,0,0,0.12)] bottom-[80px] right-[80px] hover:bg-yellow-bg"
    >
      <XProfileIcon name="close" />
    </div>
  )
}
