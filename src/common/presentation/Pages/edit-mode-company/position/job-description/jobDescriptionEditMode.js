import BreadCrumbs from 'common/presentation/breadCrumbs'
import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { Fragment, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateDepartmentBannerEdit } from 'store/app/edit-mode-company/department/bannerSlice'
import { updatePositionBannerEdit } from 'store/app/edit-mode-company/position/bannerSlice'
import RoleOptionInput from './roleOptionInput'

const JobDescriptionEditMode = (props) => {
  const {
    jobDescriptionList,
    handleClickAddJob = () => {},
    handleClickAddChild = () => {},
    onChangeEdit = () => {},
    handleRemove = () => {},
    onClickCancel = () => {},
    onClickSave = () => {},
    errorsList = [],
    handleResetErrors
  } = props

  return (
    <div className="">
      {/* <div className="py-10">
        <p className="text-h3 text-neutral">Mô tả công việc</p>
      </div> */}
      <div className="max-h-[45vh] overflow-y-auto custom-scrollbar my-[40px]">
        {/* title */}
        <div className="grid grid-cols-12 gap-6 bg-light-nude px-6 py-4 rounded-lg">
          <div className="">
            <p className="text-p18-bold text-grey-1 ">STT</p>
          </div>
          <div className="col-span-3">
            <p className="text-p18-bold text-grey-1">Phần việc</p>
          </div>
          <div className="col-span-4">
            <p className="text-p18-bold text-grey-1">Mô tả công việc</p>
          </div>
          <div className="col-span-3">
            <p className="text-p18-bold text-grey-1">Vai trò</p>
          </div>
          <div className="col-span-1">
            <p className="text-p18-bold text-grey-1 text-center">Thao tác</p>
          </div>
        </div>
        {/* title */}
        {/* row */}
        {jobDescriptionList?.map((el, index) => {
          const isErrorsName = errorsList?.some(
            (element) => element === `jobDescription_name_${index}`
          )
          const { id, name, childs } = el
          return (
            <div key={index}>
              <div className="grid grid-cols-12 gap-6 px-6 py-4 items-center">
                <div>
                  <p className="text-p18 ">{index + 1}</p>
                </div>
                <div className="col-span-3">
                  <input
                    id={`jobDescription_name_${index}`}
                    type="text"
                    value={name || ''}
                    onChange={(e) =>
                      onChangeEdit(
                        {
                          ...jobDescriptionList[index],
                          id: index,
                          name: e?.target?.value
                        },
                        `jobDescription_name_${index}`
                      )
                    }
                    placeholder="Nhập phần việc chính"
                    className={`appearance-none border focus:outline-none rounded-lg py-4 px-6 w-full ${
                      isErrorsName ? 'border-semantic-red' : 'border-grey-3'
                    }`}
                  />
                  {isErrorsName && (
                    <p className="text-p16 text-end text-semantic-red leading-[28px]">
                      Không được bỏ trống
                    </p>
                  )}
                </div>

                {childs?.map((childEl, idx) => {
                  const isErrorsNameChild = errorsList?.some(
                    (element) =>
                      element === `jobDescription_nameChild_${index}_${idx}`
                  )
                  const isErrorsValueChild = errorsList?.some(
                    (element) =>
                      element === `jobDescription_valueChild_${index}_${idx}`
                  )
                  const { name, value } = childEl || {}
                  if (idx === 0) {
                    return (
                      <Fragment key={idx}>
                        <div className="col-span-4 relative group">
                          {childs.length > 1 && (
                            <div
                              onClick={(e) => {
                                const cloneChild = [...childs]
                                if (idx > -1) {
                                  cloneChild.splice(idx, 1)
                                  handleResetErrors([
                                    `jobDescription_nameChild_${index}_${idx}`,
                                    `jobDescription_valueChild_${index}_${idx}`
                                  ])
                                }
                                onChangeEdit({
                                  ...jobDescriptionList[index],
                                  childs: cloneChild,
                                  id: index
                                })
                              }}
                              className="absolute -top-1/2 -right-5 hover:bg-button bg-white shadow border border-grey-4 transition-all cursor-pointer  group-hover:w-[56px] w-0 h-0 group-hover:h-[56px] rounded-full flex justify-center items-center"
                            >
                              <XProfileIcon
                                name="trash"
                                width={'24'}
                                height={'24'}
                                stroke="#000000"
                              />
                            </div>
                          )}
                          <input
                            id={`jobDescription_nameChild_${index}_${idx}`}
                            type="text"
                            value={name || ''}
                            onChange={(e) => {
                              const cloneChild = [...childs]
                              cloneChild[idx] = {
                                ...cloneChild[idx],
                                name: e?.target?.value
                              }
                              onChangeEdit(
                                {
                                  ...jobDescriptionList[index],
                                  childs: cloneChild,
                                  id: index
                                },
                                `jobDescription_nameChild_${index}_${idx}`
                              )
                            }}
                            placeholder="Nhập mô tả công việc"
                            className={`appearance-none border focus:outline-none rounded-lg py-4 px-6 w-full ${
                              isErrorsNameChild
                                ? 'border-semantic-red'
                                : 'border-grey-3'
                            }`}
                          />
                          {isErrorsNameChild && (
                            <p className="text-p16 text-end text-semantic-red leading-[28px]">
                              Không được bỏ trống
                            </p>
                          )}
                        </div>
                        <div className="col-span-3">
                          <RoleOptionInput
                            value={value}
                            idFocus={`jobDescription_valueChild_${index}_${idx}`}
                            isErrorsValueChild={isErrorsValueChild}
                            onChangeRole={(data) => {
                              if (data) {
                                const { name } = data
                                const cloneChild = [...childs]
                                cloneChild[idx] = {
                                  ...cloneChild[idx],
                                  value: name
                                }
                                onChangeEdit(
                                  {
                                    ...jobDescriptionList[index],
                                    childs: cloneChild,
                                    id: index
                                  },
                                  `jobDescription_valueChild_${index}_${idx}`
                                )
                              }
                            }}
                          />
                          {isErrorsValueChild && (
                            <p className="text-p16 text-end text-semantic-red leading-[28px]">
                              Không được bỏ trống
                            </p>
                          )}
                        </div>
                      </Fragment>
                    )
                  }
                })}

                <div className="col-span-1 mx-auto">
                  <div
                    onClick={() => handleRemove(index)}
                    className="cursor-pointer"
                  >
                    <XProfileIcon
                      name="trash"
                      width={'24'}
                      height={'24'}
                      stroke="#000000"
                    />
                  </div>
                </div>
              </div>
              {childs?.map((row, ind) => {
                const isErrorsNameChild = errorsList?.some(
                  (element) =>
                    element === `jobDescription_nameChild_${index}_${ind}`
                )
                const isErrorsValueChild = errorsList?.some(
                  (element) =>
                    element === `jobDescription_valueChild_${index}_${ind}`
                )
                const { name, value } = row || {}
                if (ind > 0) {
                  return (
                    <div
                      key={ind}
                      className="grid grid-cols-12 gap-6 px-6 py-4 items-center"
                    >
                      <div></div>
                      <div className="col-span-3"></div>
                      <div className="col-span-4 relative group">
                        <div
                          onClick={() => {
                            const cloneChild = [...childs]
                            if (ind > -1) {
                              cloneChild.splice(ind, 1)
                              handleResetErrors([
                                `jobDescription_nameChild_${index}_${ind}`,
                                `jobDescription_valueChild_${index}_${ind}`
                              ])
                            }
                            onChangeEdit({
                              ...jobDescriptionList[index],
                              childs: cloneChild,
                              id: index
                            })
                          }}
                          className="absolute -top-1/2 -right-5 hover:bg-button bg-white border shadow border-grey-4 transition-all cursor-pointer  group-hover:w-[56px] w-0 h-0 group-hover:h-[56px] rounded-full flex justify-center items-center"
                        >
                          <XProfileIcon
                            name="trash"
                            width={'24'}
                            height={'24'}
                            stroke="#000000"
                          />
                        </div>
                        <input
                          id={`jobDescription_nameChild_${index}_${ind}`}
                          type="text"
                          onChange={(e) => {
                            const cloneChild = [...childs]
                            cloneChild[ind] = {
                              ...cloneChild[ind],
                              name: e?.target?.value
                            }
                            onChangeEdit(
                              {
                                ...jobDescriptionList[index],
                                childs: cloneChild,
                                id: index
                              },
                              `jobDescription_nameChild_${index}_${ind}`
                            )
                          }}
                          value={name || ''}
                          placeholder="Nhập mô tả công việc"
                          className={`appearance-none border focus:outline-none rounded-lg py-4 px-6 w-full ${
                            isErrorsNameChild
                              ? 'border-semantic-red'
                              : 'border-grey-3'
                          }`}
                        />
                        {isErrorsNameChild && (
                          <p className="text-p16 text-end text-semantic-red leading-[28px]">
                            Không được bỏ trống
                          </p>
                        )}
                      </div>
                      <div className="col-span-3">
                        <RoleOptionInput
                          value={value}
                          idFocus={`jobDescription_valueChild_${index}_${ind}`}
                          isErrorsValueChild={isErrorsValueChild}
                          onChangeRole={(data) => {
                            if (data) {
                              const { name } = data
                              const cloneChild = [...childs]
                              cloneChild[ind] = {
                                ...cloneChild[ind],
                                value: name
                              }
                              onChangeEdit(
                                {
                                  ...jobDescriptionList[index],
                                  childs: cloneChild,
                                  id: index
                                },
                                `jobDescription_valueChild_${index}_${ind}`
                              )
                            }
                          }}
                        />
                        {isErrorsValueChild && (
                          <p className="text-p16 text-end text-semantic-red leading-[28px]">
                            Không được bỏ trống
                          </p>
                        )}
                      </div>
                      <div className="col-span-1"></div>
                    </div>
                  )
                }
              })}
              <div className="grid grid-cols-12 gap-6 px-6  items-center">
                <div></div>
                <div className="col-span-3"></div>
                <div className="col-span-4">
                  <div
                    onClick={() =>
                      handleClickAddChild({ id: index, name: '', value: '' })
                    }
                    className="border border-grey-3 hover:border-button border-dashed rounded-lg py-3 px-6 w-full flex justify-center cursor-pointer"
                  >
                    <XProfileIcon
                      name="add"
                      width={'24'}
                      height={'24'}
                      // stroke="#294F9B"
                    />
                  </div>
                </div>
                <div className="col-span-3"></div>
                <div className="col-span-2"></div>
              </div>
            </div>
          )
        })}

        {/* row */}
        <div
          onClick={() => handleClickAddJob()}
          className="flex items-center gap-2 my-8 cursor-pointer"
        >
          <XProfileIcon
            name="add"
            width={'24'}
            height={'24'}
            stroke="#294F9B"
          />
          <p className="text-p18-bold text-[#294F9B]">Thêm phần việc</p>
        </div>
      </div>
      <div className="flex justify-end items-center gap-4">
        <Button
          title="Huỷ"
          width="xl:w-[98px]"
          rounded="rounded-[8px]"
          padding="p-[12px_32px]"
          height="h-[56px]"
          background="bg-grey-4"
          onClick={() => onClickCancel()}
        />
        <Button
          title="Xác nhận"
          width="xl:w-[154px]"
          rounded="rounded-[8px]"
          padding="p-[12px_32px]"
          height="h-[56px]"
          onClick={() => onClickSave()}
        />
      </div>
    </div>
  )
}

JobDescriptionEditMode.propTypes = {
  toggleModal: PropTypes.func
}

JobDescriptionEditMode.defaultProps = {
  toggleModal: () => {}
}

export default JobDescriptionEditMode
