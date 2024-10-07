import Image from 'next/image'
import React from 'react'

const NavbarLogo = (props) => {
  const { logoInfor, type } = props
  const { image, companyName, href } = logoInfor
  return type === 'left' ? (
    <div className={`mb-5`}>
      <a href={href}>
        <div className="flex justify-center items-center">
          <Image width={100} height={40} src={image} alt="" />
        </div>
      </a>
    </div>
  ) : (
    <>
      <a href={href} className="flex items-center">
        <Image width={100} height={20} src={image} alt="" />
      </a>
    </>
  )
}

export default NavbarLogo
