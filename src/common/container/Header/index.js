import React from 'react'
import { useRouter } from 'next/router'

const Header = () => {
  const { locale, asPath } = useRouter()
  const router = useRouter()
  const switchLanguage = (lang) => {
    router.push(asPath, asPath, { locale: lang })
  }

  return (
    <>
      <section className="w-full px-8 text-gray-700 bg-white">
        <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
          <div className="relative flex flex-col md:flex-row">
            <a
              href="common/container/Header/index#"
              className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
            >
              <span className="mx-auto text-p20 font-black leading-none text-gray-900 select-none">
                DEMO <span className="text-indigo-600">.</span>
              </span>
            </a>
            <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
              <a
                href="common/container/Header/index#"
                className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
              >
                Home
              </a>
              <a
                href="common/container/Header/index#"
                className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
              >
                Features
              </a>
              <a
                href="common/container/Header/index#"
                className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
              >
                Pricing
              </a>
              <a
                href="common/container/Header/index#"
                className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
              >
                Blog
              </a>
            </nav>
          </div>
          <select
            value={locale}
            className="custom-select form-control w-auto mr-30"
            onChange={(e) => switchLanguage(e.target.value)}
          >
            <option value="vi">🇻🇳</option>
            <option value="en">🇬🇧</option>
          </select>
        </div>
      </section>
    </>
  )
}

export default Header
