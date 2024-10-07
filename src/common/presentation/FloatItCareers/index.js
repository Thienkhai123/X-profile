import XProfileIcon from '../Icons'

import Image from 'next/image'

const FloatItCareers = (props) => {
  const { handleCloseFloatingCareers = () => {} } = props
  const handleClick = () => {
    window.open('/itcareers')
  }

  return (
    <div>
      <div className="hidden w-[318px] h-[119px] animate-fadeIn  xl:block fixed left-14  bottom-14 	rounded-[8px] z-[9999]">
        <div className="w-full flex justify-end">
          <div
            onClick={() => handleCloseFloatingCareers()}
            className="w-6 h-6  drop-shadow-[0px_4px_16px_rgba(0,0,0,0.08)] cursor-pointer rounded-full bg-white flex items-center justify-center"
          >
            <XProfileIcon
              name="cross"
              stroke="#000000"
              width="12px"
              height="12px"
            />
          </div>
        </div>
        <div
          onClick={() => handleClick()}
          className="bg-white  drop-shadow-[0px_4px_16px_rgba(0,0,0,0.08)] cursor-pointer relative w-full h-[88px] rounded-[100px] px-6 py-5"
        >
          <p className="text-p16 font-light leading-6 -tracking-[.64px]  max-w-[178px] ">
            Bạn là ai trong thế giới Công nghệ thông tin?
          </p>
          <div className="absolute -top-8 right-6">
            <div className="w-[110px] h-[110px] relative ">
              <Image
                src="/images/floatingCareers.png"
                layout="fill"
                alt=""
                quality={100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FloatItCareers
