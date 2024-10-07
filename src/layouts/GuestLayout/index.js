import React, { Fragment, useEffect, useState } from 'react'
import NavbarCompany from 'common/container/Header/navbarCompany'
import { useRouter } from 'next/router'
import { ACCESS_TOKEN } from 'common/config/app.constants'
import useTrans from 'common/hooks/useTrans'
import { authService } from 'store/helper/authService'
import { selectUserProfile } from 'store/app/userSlice'
import { useSelector } from 'react-redux'

const GuestLayout = (props) => {
  const { component: Component } = props
  const trans = useTrans()
  const { HEADER } = trans
  const { push, pathname } = useRouter()
  const [firstLoading, setFirstLoading] = useState(false)
  const profile = useSelector(selectUserProfile)

  useEffect(() => {
    if (pathname.includes('/logout')) {
      authService.logOut()
      window.location.replace('/sign-in')
    } else {
      if (localStorage.getItem(ACCESS_TOKEN)) {
        push('/')
      } else {
        setFirstLoading(true)
      }
    }
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!firstLoading) {
    return <Fragment></Fragment>
  }

  return (
    <div className="min-h-[100vh] relative flex flex-col">
      <NavbarCompany
        typeNavbar="top"
        NAVIGATION={HEADER}
        isLogin={false}
        info={profile}
      />
      <Component {...props} component={null} />
    </div>
  )
}

export default GuestLayout
