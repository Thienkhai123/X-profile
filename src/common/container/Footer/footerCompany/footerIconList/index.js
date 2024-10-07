import React from 'react'
import XProfileIcon from 'common/presentation/Icons'

const FooterIconList = (props) => {
  const { element } = props
  const { href, icon } = element
  return (
    <a href={href} aria-label="footer-xprofile">
      <XProfileIcon name={icon} width="35" height="35" />
    </a>
  )
}

FooterIconList.propTypes = {}

export default FooterIconList
