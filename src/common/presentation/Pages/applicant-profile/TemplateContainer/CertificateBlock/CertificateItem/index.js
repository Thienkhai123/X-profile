import React, { useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'

const CertificateItem = (props) => {
  const {
    imageUrl,
    name,
    showEditTool,
    group,
    handleRemoveItem,
    handleSelectedItemMobile,
    handleSelectedItem
  } = props

  const [menuAction, setMenuAction] = useState(false)
  return (
    <div className="flex items-center justify-between w-full gap-4">
      <a href={imageUrl || ''} target="_blank" rel="noopener noreferrer">
        <div className="flex items-center gap-4 w-full group cursor-pointer">
          <XProfileIcon name="certificate" />
          <p className="text-black text-p16-bold group-hover:text-semantic">
            {name}
          </p>
        </div>
      </a>
      {showEditTool && (
        <>
          <div className="sm:flex items-center gap-4 hidden">
            <div
              className="cursor-pointer"
              onClick={() => handleSelectedItem(group)}
            >
              <XProfileIcon name="pen" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => handleRemoveItem(group)}
            >
              <XProfileIcon name="trash" />
            </div>
          </div>
          <div
            className="block sm:hidden relative"
            onClick={(e) => {
              setMenuAction(!menuAction), e.stopPropagation()
            }}
          >
            <XProfileIcon name="menuDot" />
            {menuAction && (
              <div className="absolute right-8 top-1  p-2 z-30 rounded-lg border border-grey-4 bg-white flex flex-col items-center justify-center">
                <div
                  className="cursor-careerPath px-4 py-2 flex items-center gap-2"
                  onClick={() => handleSelectedItemMobile(group)}
                >
                  <XProfileIcon name="pen" />
                  <p className="text-p16">Sửa</p>
                </div>
                <div
                  className="cursor-careerPath px-4 py-2 flex items-center gap-2"
                  onClick={() => handleRemoveItem(group)}
                >
                  <XProfileIcon name="trash" />
                  <p className="text-p16">Xoá</p>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

CertificateItem.propTypes = {}

export default CertificateItem
