import React from 'react'

const FooterLang = (props) => {
  const { locale, switchLanguage } = props
  return (
    <div>
      <select
        value={locale}
        className="custom-select form-control border text-p14 text-grey-4 block w-[79px] p-1 bg-inherit border-grey-4 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
        onChange={(e) => switchLanguage(e.target.value)}
      >
        <option className="w-auto" value="vi">
          VN
        </option>
        <option value="en">EN</option>
      </select>
    </div>
  )
}

FooterLang.propTypes = {}

export default FooterLang
