import React, { Fragment, useEffect, useRef, useState } from 'react'
import XProfileIcon from 'common/presentation/Icons'
import useTrans from 'common/hooks/useTrans'
import Image from 'next/image'
import Link from 'next/link'
import { Divider } from 'common/presentation/Divider'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import { ROLE_STORAGE } from 'common/config/app.constants'

const RoleOption = (props) => {
  const { handleClickRole = () => {}, roleId } = props
  const trans = useTrans()
  const { NOTIFICATION } = trans
  const roleRef = useRef(null)
  useOnClickOutside(roleRef, handleClickRole)
  const { ROLE } = trans
  const { roleCard } = ROLE || {}
  const [role, setRole] = useState(0)

  const handleRole = async (roleId, roleHref) => {
    localStorage.setItem(ROLE_STORAGE, roleId)
    window.location.href = roleHref
  }
  useEffect(() => {
    const roleStorage = localStorage.getItem(ROLE_STORAGE)
    if (roleStorage) {
      setRole(roleStorage)
    }
  }, [])

  return (
    <div
      ref={roleRef}
      className="absolute animate-fadeIn opacity-0 flex flex-col gap-4 right-10 top-24 z-20   p-4 transition ease-in-out duration-700 rounded-xl  bg-white drop-shadow-[0_0_20px_rgba(0,0,0,0.15)]"
    >
      {roleCard?.map((roleItem, index1) => {
        const { title, href, srcMini, id } = roleItem
        return (
          <div key={index1}>
            <div
              // href={href}
              onClick={() => handleRole(id, href)}
              className="text-p18 text-neutral hover:text-blue-light  rounded-lg cursor-pointer"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="relative flex flex-col justify-center items-center">
                    <Image
                      src={srcMini}
                      alt=""
                      width={'40'}
                      height={'40'}
                      objectFit="contain"
                    />
                  </div>
                  <p
                    className={`text-p16 hover:text-button-2 ${
                      parseInt(role) === parseInt(id)
                        ? 'text-button-2'
                        : 'text-neutral'
                    }  `}
                  >
                    {title}
                  </p>
                </div>

                <div className="w-6 h-6">
                  {parseInt(role) === parseInt(id) && (
                    <XProfileIcon
                      name="quizCheck"
                      fill="#294F9B"
                      width={'18'}
                      height={'18'}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RoleOption
