import XProfileIcon from 'common/presentation/Icons'

export const CareerPathDialog = ({ onClick = () => {} }) => {
  return (
    <div
      id="dialog-crp"
      className={`absolute hidden lg:w-[440px] w-[88vw] transition-all p-6 
      bg-white rounded-lg text-center text-neutral text-p16 leading-7 after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent z-30`}
    >
      <p id="dialog-crp-content"></p>
      <div id="dialog-crp-next-step" className="flex justify-end mt-2 hidden">
        <div className="flex gap-2 items-center" onClick={onClick}>
          <p className="text-button text-p14-bold leading-[26px]">Khám phá</p>
          <div>
            <XProfileIcon
              name="arrowRight"
              width="22.4"
              height="22.4"
              fill="#F6BB3A"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
