import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

const NavbarBetaContent = (props) => {
  const { description } = props
  return (
    <div
      id="navbarbeta"
      // className="xl:flex justify-between xl:h-[60px] bg-[#EDEDE8] py-[10px] px-[5px] xl:py-0 xl:px-0 sticky top-0 z-[1000] hidden "
    >
      {/* <div className="flex  items-end h-full">
        <div className="w-[91px] h-[45px] relative">
          <Image
            placeholder="blur"
            blurDataURL="/images/Header/layoutLeft.png"
            src="/images/Header/layoutLeft.png"
            alt="layoutRight.png"
            layout="fill"
            objectFit="contain"
            quality={100}
          />
        </div>
      </div>
      <div className="flex items-center justify-center text-center ">
        <p className="sm:text-p16 text-p12 sm:font-semibold">{description}</p>
      </div>
      <div className="relative block w-[154px] h-[full]">
        <Image
          placeholder="blur"
          blurDataURL="/images/Header/layoutRight.png"
          src="/images/Header/layoutRight.png"
          alt="layoutRight"
          layout="fill"
          objectFit="contain"
          quality={100}
        />
      </div> */}
    </div>
  )
}

NavbarBetaContent.propTypes = {
  description: PropTypes.string
}
NavbarBetaContent.defaultProps = {
  description:
    'Bạn là một trong những người đầu tiên trải nghiệm phiên bản beta này, hãy gửi những góp ý giúp X-Profile hoàn thiện nền tảng hơn nhé! ^^'
}

export default NavbarBetaContent
