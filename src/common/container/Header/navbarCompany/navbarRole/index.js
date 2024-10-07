import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'common/presentation/Button'
import { ROLE_STORAGE } from 'common/config/app.constants'
import useTrans from 'common/hooks/useTrans'
import Image from 'next/image'
import XProfileIcon from 'common/presentation/Icons'

const RoleButton = (props) => {
  const {} = props

  const trans = useTrans()
  const { ROLE } = trans
  const { roleCard } = ROLE || {}
  const [role, setRole] = useState(0)

  useEffect(() => {
    const roleStorage = localStorage.getItem(ROLE_STORAGE)
    if (roleStorage) {
      setRole(roleStorage)
    }
  }, [])
  return (
    <div className="w-full min-w-[96px] h-[56px] px-2 py-[6px] rounded-[32px] flex items-center justify-between border border-grey-4">
      <div className="relative flex flex-col justify-center items-center">
        <Image
          src={roleCard[role]?.srcMini}
          alt=""
          width={'40'}
          height={'40'}
          objectFit="contain"
        />
      </div>
      <div>
        <XProfileIcon name="arrowDown" />
      </div>
    </div>
  )
}

export default RoleButton

RoleButton.propTypes = {}

RoleButton.defaultProps = {}
