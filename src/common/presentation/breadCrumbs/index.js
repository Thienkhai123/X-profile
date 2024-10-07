import React from 'react'
import PropTypes, { element } from 'prop-types'
import { useRouter } from 'next/router'
import XProfileIcon from '../Icons'
import Link from 'next/link'

const BreadCrumbs = (props) => {
  const {
    type = false,
    nameList = [],
    styleBread = 'sm:text-p16-bold text-p14 font-normal',
    textBreadLast = 'text-grey-1',
    classNameType = 'text-grey-2 sm:text-p16 text-p14 font-normal',
    classNameTypeLast = '',
    typeArrow = false
  } = props
  const router = useRouter()
  const breadCrumItem = router.asPath.split('/')
  return (
    <div>
      {type ? (
        <div className="flex">
          {nameList.map((element, ind) => {
            return (
              <div className=" flex" key={ind}>
                <div className={classNameType}>
                  {element !== nameList[nameList.length - 1] ? (
                    <Link href={`/${element.href}`}>{element.name}</Link>
                  ) : (
                    <div className={classNameTypeLast}>{element.name}</div>
                  )}
                </div>
                {element !== nameList[nameList.length - 1] &&
                  (typeArrow ? (
                    <div className="rotate-90 mr-[20px]">
                      <XProfileIcon name="vector3" />
                    </div>
                  ) : (
                    <div className="text-grey-2">/</div>
                  ))}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="flex">
          {breadCrumItem.map((element, key) => {
            return (
              <div key={key} className=" flex">
                <div>
                  <a
                    className={`${
                      element === breadCrumItem[breadCrumItem.length - 1]
                        ? `${textBreadLast}`
                        : ''
                    } ${styleBread}`}
                    href={
                      element === breadCrumItem[breadCrumItem.length - 1]
                        ? null
                        : `/${element}`
                    }
                  >
                    {element === '' ? 'Home' : element}
                  </a>
                </div>
                {element !== breadCrumItem[breadCrumItem.length - 1] && (
                  <div className="rotate-90 mr-[20px]">
                    <XProfileIcon name="vector3" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

BreadCrumbs.propTypes = {}

export default BreadCrumbs
