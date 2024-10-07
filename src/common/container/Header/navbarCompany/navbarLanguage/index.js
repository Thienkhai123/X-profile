import React from 'react'

const NavbarLanguage = (props) => {
  const { locale, switchLanguage } = props
  return (
    <div>
      <select
        value={locale}
        className="custom-select form-control border text-p14 border-l-gray-700 border-l-2 block w-full p-1  border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
        onChange={(e) => switchLanguage(e.target.value)}
      >
        <option className="w-3" value="vi">
          🇻🇳
        </option>
        <option value="en">🇬🇧</option>
      </select>
    </div>
  )
}

export default NavbarLanguage
