import React, { useState } from 'react'
import PropTypes, { element } from 'prop-types'
import { toogle } from 'store/ui/themeSlice'

const NavbarItem = (props) => {
  const { element, absoluteChildren = 'lg:absolute', type } = props
  const { title, icon, children, href } = element
  const [hidden, setHidden] = useState(false)

  return (
    <li
      className=" relative md:cursor-pointer group w-full "
      onClick={() => {
        setHidden(!hidden)
      }}
    >
      <a
        href={href}
        className={`flex items-center pl-2 pr-2 pb-2 w-full text-base font-normal rounded-t-lg transition duration-75 group  text-gray-400  hover:text-white`}
      >
        <svg
          aria-hidden="true"
          className=" flex-shrink-0 w-6 h-6  transition duration-75  text-gray-400 group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          {icon?.map((element, index) => {
            const { fillRule, d, clipRrule } = element
            return (
              <>
                <path
                  key={index || ''}
                  fillRule={fillRule || ''}
                  d={d || ''}
                  clipRule={clipRrule || ''}
                ></path>
              </>
            )
          })}
        </svg>
        <span className="flex-1 ml-3 text-left whitespace-nowrap">{title}</span>
      </a>
    </li>
  )
}

export default NavbarItem

NavbarItem.propTypes = {
  NAVIGATION_CONFIG: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      href: PropTypes.string,
      icon: PropTypes.arrayOf(
        PropTypes.shape({
          fillRule: PropTypes.string,
          d: PropTypes.string,
          clipRrule: PropTypes.string
        })
      ),
      children: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          href: PropTypes.string
        })
      )
    })
  )
}

NavbarItem.defaultProps = {
  NAVIGATION_CONFIG: [
    {
      id: 'applications',
      title: 'Trang chủ',
      translate: 'APPLICATIONS',
      type: 'group',
      href: '#',
      icon: [
        {
          fillRule: 'evenodd',
          d: 'M12 14l9-5-9-5-9 5 9 5z',
          clipRrule: 'evenodd'
        },
        {
          fillRule: 'evenodd',
          d: 'M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
          clipRrule: 'evenodd'
        },
        {
          fillRule: 'evenodd',
          d: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222',
          clipRrule: 'evenodd'
        }
      ],
      children: []
    }
  ]
}
