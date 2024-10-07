import Image from 'next/image'
import React from 'react'

const NavbarInfo = (props) => {
  const { image = '', characterId = null, isSideBar = false } = props

  return (
    <div className="cursor-pointer">
      <div
        className={`rounded-full border border-grey-4 ${
          isSideBar ? 'w-[64px] h-[64px]' : 'w-[40px] h-[40px]'
        }  overflow-hidden relative`}
      >
        <Image
          src={
            image !== null && image !== ''
              ? image
              : parseInt(characterId) === 0
              ? '/images/DefaultAvatarCuu.png'
              : parseInt(characterId) === 1
              ? '/images/DefaultAvatarChuot.png'
              : parseInt(characterId) === 2
              ? '/images/DefaultAvatarGau.png'
              : '/images/DefaultAvatarCuu.png'
          }
          alt="avatar-user"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  )
}

export default NavbarInfo
