import 'react-toastify/dist/ReactToastify.css'
import 'styles/globals.css'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { store } from 'store'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import PAGE_CONFIG from 'common/config/app.router'
import axios from 'axios'
import { authService } from 'store/helper/authService'
import Head from 'next/head'
import DefaultLayout from 'layouts/DefaultLayout'
import 'styles/custom.css'
import 'styles/map.css'

// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

import { useEffect, useState } from 'react'
import { firebaseCloudMessaging } from '../../firebase'
import MetaSeo from 'common/container/meta-seo'

const firebaseConfig = {
  apiKey: 'AIzaSyCtiWAjBmtHhZGek5d1_w5gvnxzLAtWX9o',
  authDomain: 'authenticate.xprofile.vn',
  projectId: 'xprofile-e6159',
  storageBucket: 'xprofile-e6159.appspot.com',
  messagingSenderId: '819920222943',
  appId: '1:819920222943:web:50518951c4689bed21876a',
  measurementId: 'G-5VXWVYPB55'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

axios.interceptors.request.use(function (config) {
  const token = authService.getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

function App(props) {
  const { Component, pageProps } = props
  const { pathname } = useRouter()

  const getLayout = () => {
    const page = Object.values(PAGE_CONFIG).find((i) => i.url === pathname)
    if (page) return page.layout
    else return DefaultLayout
  }

  const Layout = getLayout()

  return (
    <Provider store={store}>
      <MetaSeo />
      {Layout && <Layout {...pageProps} component={Component} />}
      <ToastContainer />
    </Provider>
  )
}

App.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object
}

export default App
