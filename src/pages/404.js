import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from 'common/presentation/Button'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Head from 'next/head'
import PAGE_CONFIG from 'common/config/app.router'
import DefaultLayout from 'layouts/DefaultLayout'
import AuthLayout from 'layouts/AuthLayout'

const NotFound = () => {
  const router = useRouter()
  const { push } = router

  const handlePush = () => {
    push('/')
  }

  return (
    <Fragment>
      <div className="flex justify-center items-center h-[100vh]">
        <div className="text-center">
          <h1>404 - Page Not Found</h1>
          {/* {AuthLayout && <AuthLayout component={Development} />} */}
          <button
            className="mt-[8px] hover:text-grey-1 duration-300"
            onClick={() => handlePush()}
          >
            Quay về Trang chủ
          </button>
        </div>
      </div>
    </Fragment>
  )
}

export default NotFound
