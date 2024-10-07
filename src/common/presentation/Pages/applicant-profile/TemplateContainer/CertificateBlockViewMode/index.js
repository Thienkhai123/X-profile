import React, { Fragment, useEffect, useState } from 'react'
import XProfileIcon from 'common/presentation/Icons'
import PropTypes from 'prop-types'
import Link from 'next/link'
import cloneDeep from 'lodash/cloneDeep'
import Button from 'common/presentation/Button'
import { Divider } from 'common/presentation/Divider'

const CertificateBlockViewMode = (props) => {
  const { title, dragStyle, childrenTemplate } = props
  const [currentCertificates, setCurrentCertificates] = useState({})
  const [seeMore, setSeeMore] = useState(false)

  const handleSeeMore = () => {
    setCurrentCertificates(cloneDeep(childrenTemplate))
    setSeeMore(true)
  }

  const initData = () => {
    const res = {}
    const cloneObj = cloneDeep(childrenTemplate)
    Object?.keys(cloneObj)?.map((key, ind) => {
      if (ind < 3) {
        res[key] = cloneObj[key]
      }
    })
    setCurrentCertificates(cloneDeep(res))
  }

  useEffect(() => {
    initData()
  }, [childrenTemplate])

  return (
    <div className=" rounded-xl border-2 border-stoke overflow-hidden bg-white">
      <div
        className="flex sm:px-6 px-3 sm:py-4 py-3 bg-stoke items-center justify-between"
        style={dragStyle}
      >
        <div className="flex items-center gap-1">
          <p className="uppercase sm:text-p18-bold text-p14-bold text-blue-light">
            {title}
          </p>
        </div>
      </div>
      <div className="sm:p-6 p-3 flex flex-col gap-6  bg-white min-h-[130px]">
        {currentCertificates &&
          Object.keys(currentCertificates)?.map((key, ind) => {
            const { value: imageUrl } =
              currentCertificates[key]['UserCertificateImage'] || {}
            const { value: name } =
              currentCertificates[key]['UserCertificateName'] || {}
            return (
              <Fragment key={name + ind}>
                {ind > 0 && <Divider />}

                <div className="flex items-center justify-between w-full gap-4">
                  <a
                    href={imageUrl || ''}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center gap-4 w-full group cursor-pointer">
                      <XProfileIcon name="certificate" />
                      <p className="text-black text-p16-bold group-hover:text-semantic">
                        {name}
                      </p>
                    </div>
                  </a>
                </div>
              </Fragment>
            )
          })}
        {Object?.keys(childrenTemplate)?.length > 3 && !seeMore && (
          <div className="flex flex-col justify-center">
            <Divider />
            <button
              className="text-button-2 text-p16-bold text-center mt-4"
              onClick={handleSeeMore}
            >
              Xem thêm chứng chỉ{' '}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

CertificateBlockViewMode.propTypes = {
  id: PropTypes.number,
  parentId: PropTypes.number,
  portfolioId: PropTypes.number,
  title: PropTypes.string,
  templateOptions: PropTypes.array,
  childrenTemplate: PropTypes.object,
  btnTitle: PropTypes.string,
  showUploadImage: PropTypes.bool,
  dragStyle: PropTypes.object,
  handleDelete: PropTypes.func,
  handleSaveTemplateOption: PropTypes.func,
  handleCreateElement: PropTypes.func,
  handleInAtiveChildrenTemplate: PropTypes.func,
  handleEditingId: PropTypes.func,
  handleRemoveEditingId: PropTypes.func
}
CertificateBlockViewMode.defaultProps = {
  id: 0,
  parentId: 0,
  portfolioId: 0,
  title: 'No title',
  btnTitle: '',
  templateOptionName: '',
  showUploadImage: false,
  templateOptions: [],
  childrenTemplate: {},
  dragStyle: {},
  handleDelete: () => {},
  handleSaveTemplateOption: () => {},
  handleCreateElement: () => {},
  handleInAtiveChildrenTemplate: () => {},
  handleEditingId: () => {},
  handleRemoveEditingId: () => {}
}

export default CertificateBlockViewMode
