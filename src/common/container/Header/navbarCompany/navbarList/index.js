import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import NavbarItem from '../navbarItem'

const NavbarList = (props) => {
  const { element, type, company } = props
  const { companyId } = company || {}
  const { title, navbarList, href, passHref, ownedCompany, hrefList } = element
  const router = useRouter()
  return (
    <div className={`relative md:cursor-pointer group w-full `}>
      <a
        target={passHref ? '_blank' : '_self'}
        href={ownedCompany ? `/profile-company/${companyId}/edit` : href}
        rel="noopener noreferrer"
      >
        <div className={`xl:flex xl:justify-center hover:cursor-pointer`}>
          <p
            className={`${
              hrefList.includes(router.pathname) &&
              ' text-button-2 xl:text-button-2'
            } text-p16 leading-7 text-neutral hover:duration-50  hover:text-button-2`}
          >
            {title}
          </p>
        </div>
      </a>
      <div
        className={`absolute hidden hover:block group-hover:block rounded  z-20`}
      >
        {navbarList?.map((element, index) => {
          return (
            <>
              <div key={index} className={`p-2  rounded`}>
                <NavbarItem absoluteChildren="" element={element} type={type} />
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default NavbarList
