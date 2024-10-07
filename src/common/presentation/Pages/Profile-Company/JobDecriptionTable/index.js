import BreadCrumbs from 'common/presentation/breadCrumbs'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
import { Fragment } from 'react'

const JobDescriptionTable = (props) => {
  const { jobDescriptionList } = props

  return (
    <div className="w-full">
      <div>
        <div className="grid xl:grid-cols-[25%_50%_25%] grid-cols-3 gap-6 py-6 border-b border-grey-3 relative">
          <p className="xl:text-p18-bold text-p14-bold">Phần việc</p>
          <p className="xl:text-p18-bold text-p14-bold">Mô tả công việc</p>
          <p className="xl:text-p18-bold text-p14-bold">Vai trò</p>
        </div>
        {jobDescriptionList?.map((el, index) => {
          const { id, name, childs } = el
          return (
            <div
              key={index}
              className={`py-6 border-b  ${
                index === jobDescriptionList.length - 1
                  ? 'border-transparent'
                  : 'border-grey-3'
              }`}
            >
              <div className="grid grid-cols-[25%_75%]  ">
                <p className="xl:text-p18 text-p14">{name}</p>
                <div className="px-6">
                  {childs?.map((childEl, idx) => {
                    const { name, value } = childEl || {}
                    if (idx === 0) {
                      return (
                        <div key={idx} className="grid grid-cols-[75%_25%]">
                          <p className="xl:text-p18 text-p14 w-full break-words pr-6">
                            {name}
                          </p>
                          <p className="xl:text-p18 text-p14">{value}</p>
                        </div>
                      )
                    }
                  })}
                  {childs?.map((childEl, ind) => {
                    const { name, value } = childEl || {}
                    if (ind > 0) {
                      return (
                        <div
                          key={ind}
                          className="grid grid-cols-[75%_25%] my-6"
                        >
                          {/* <p className="xl:text-p18 text-p14"></p> */}
                          <p className="xl:text-p18 text-p14 w-full break-words pr-6">
                            {name}
                          </p>
                          <p className="xl:text-p18 text-p14">{value}</p>
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default JobDescriptionTable
