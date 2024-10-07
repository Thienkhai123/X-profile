import Link from 'next/link'
import { element } from 'prop-types'
import React from 'react'

const FooterList = (props) => {
  const { element } = props
  const { title, content } = element
  return (
    <div>
      <p className="font-bold sm:text-p18-bold text-p14-bold sm:mb-[24px] mb-[16px]">
        {title}
      </p>
      {content?.map((element, index) => {
        const { href, titleContent } = element
        return (
          <div key={index} className="my-[5px]">
            <Link href={href}>
              <div className="hover:text-black sm:text-p14 text-p12 text-grey-1 hover:cursor-pointer">
                {titleContent}
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default FooterList
