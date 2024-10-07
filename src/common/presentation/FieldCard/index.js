import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import XProfileIcon from '../Icons'
import { generateAnimate } from 'store/helper/functionHelper'
import isEmpty from 'lodash/isEmpty'

const FieldCard = (props) => {
  const {
    id,
    title,
    logo,
    selected,
    onSelected,
    backgroundImage,
    meta,
    roleId
  } = props

  const {
    mouseAvatarColor,
    mouseAvatarHiglightColor,
    sheepAvatarColor,
    sheepAvatarHighlightColor
  } = meta || {}

  const [background, setBackground] = useState('rgb(226, 157, 152)')

  let activeRules = `{
    from {background: 'transparent'}
    to {background: ${background}}
  }`
  let unmountRules = `{
    from {background: ${background}}
    to {background: 'transparent'}
  }`

  useEffect(() => {
    if (roleId === 0) {
      setBackground(sheepAvatarHighlightColor)
    } else {
      setBackground(mouseAvatarHiglightColor)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta])

  if (isEmpty(logo) || isEmpty(meta)) {
    return <Fragment></Fragment>
  }

  return (
    <div
      className="w-full h-full group rounded-xl cursor-pointer"
      onMouseEnter={() => {
        if (!selected) {
          generateAnimate(id, 'hoverBackground', activeRules)
        }
      }}
      onMouseLeave={() => {
        if (!selected) {
          generateAnimate(id, 'removeBackground', unmountRules)
        }
      }}
      onClick={() => {
        onSelected(id)
        generateAnimate(id, 'removeBackground', unmountRules)
      }}
    >
      <div
        id={id}
        // className={`w-full sm:h-[212px] break-words sm:py-3 py-2 sm:px-4 px-2 transition rounded-xl`}
        className={` w-full break-words sm:py-3 py-2 sm:px-4 px-2 transition rounded-xl`}
        style={{
          backgroundColor: selected
            ? roleId === 0
              ? sheepAvatarHighlightColor
              : mouseAvatarHiglightColor
            : 'transparent'
        }}
      >
        {/* <div className="flex justify-center">
          <Image
            className="rounded-full "
            style={{
              background: roleId === 0 ? sheepAvatarColor : mouseAvatarColor
            }}
            width={120}
            height={120}
            src={logo}
            alt="bearBoss.png"
          />
        </div> */}
        <div className="text-center pl-2 pr-2 pt-2">
          <p
            className={`sm:text-p18-bold text-p14-bold sm:h-[84px] h-full line-clamp-3 ${
              selected
                ? 'text-white'
                : 'text-neutral transition group-hover:text-white'
            }`}
          >
            {title}
          </p>
        </div>
      </div>
      <div
        className={`flex justify-center ${
          selected
            ? 'transition-opacity duration-100 opacity-100'
            : 'transition-opacity opacity-0 group-hover:opacity-100'
        }`}
      >
        <XProfileIcon
          name="polygon3"
          fill={
            roleId === 0 ? sheepAvatarHighlightColor : mouseAvatarHiglightColor
          }
        />
      </div>
    </div>
  )
}

FieldCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  logo: PropTypes.string,
  background: PropTypes.string,
  selected: PropTypes.bool,
  onSelected: PropTypes.func,
  meta: PropTypes.object,
  roleId: PropTypes.number
}
FieldCard.defaultProps = {
  id: 0,
  title: 'Business Analyst',
  logo: '/images/bearBoss.png',
  background: 'rgb(226, 157, 152)',
  selected: false,
  onSelected: () => {},
  meta: {},
  roleId: 0
}
export default FieldCard
