import useOnClickOutside from 'common/hooks/useClickOutSide'
import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'

import PropTypes from 'prop-types'
import { Fragment, useRef, useState } from 'react'

import TextareaAutosize from 'react-textarea-autosize'

const QuestionEditModal = (props) => {
  const {
    faqs,
    handleClickAddQuestion = () => {},
    handleClickAddQuestionMulti = () => {},
    onChangeEdit = () => {},
    handleRemove = () => {},
    onClickCancel = () => {},
    onClickSave = () => {},
    handleClickAddChild = () => {}
  } = props
  const [showAddOpt, setShowAddOpt] = useState(false)
  const refAddOpt = useRef(null)
  const handleCloseAddOpt = () => setShowAddOpt(false)
  useOnClickOutside(refAddOpt, handleCloseAddOpt)
  return (
    <div className="">
      {/* <div className="py-10">
        <p className="text-h3 text-neutral">Câu hỏi thường gặp</p>
      </div> */}
      <div className="flex items-center justify-end">
        <div className="my-4 relative " ref={refAddOpt}>
          <button
            className=" w-[200px] border border-button-2 rounded-lg  flex gap-2 justify-between py-[10px] px-[24px] items-center"
            onClick={() => setShowAddOpt(!showAddOpt)}
          >
            <Fragment>
              <p className="sm:text-p18-bold text-p14  text-button-2 ">
                {'Thêm câu hỏi'}
              </p>
              <XProfileIcon name="arrowDown" stroke="#294F9B" />
            </Fragment>
          </button>
          {showAddOpt && (
            <div className="bg-white max-h-[110px] p-2 drop-shadow-[0_16px_24px_0_#0000000A] border border-grey-4 z-50 w-[200px]  absolute top-[56px]  right-0 rounded-lg">
              <div
                className="flex cursor-pointer transition-all justify-between rounded-lg items-center pl-4 hover:bg-light-nude py-1"
                onClick={() => {
                  handleClickAddQuestion(), setShowAddOpt(!showAddOpt)
                }}
              >
                <p className="sm:text-p18 text-p14 text-neutral">Câu hỏi đơn</p>
              </div>
              <div
                className="flex cursor-pointer transition-all justify-between rounded-lg items-center pl-4 hover:bg-light-nude py-1"
                onClick={() => {
                  handleClickAddQuestionMulti(), setShowAddOpt(!showAddOpt)
                }}
              >
                <p className="sm:text-p18 text-p14 text-neutral">
                  Câu hỏi lựa chọn
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="max-h-[440px] overflow-y-auto custom-scrollbar">
        {/* title */}
        <div className="grid grid-cols-9 gap-6 bg-light-nude px-6 py-4 rounded-lg">
          <div className="">
            <p className="text-p18-bold text-grey-1 ">STT</p>
          </div>
          <div className="col-span-3">
            <p className="text-p18-bold text-grey-1">Câu hỏi</p>
          </div>
          <div className="col-span-4">
            <p className="text-p18-bold text-grey-1">Câu trả lời</p>
          </div>

          <div className="col-span-1">
            <p className="text-p18-bold text-grey-1 text-center">Thao tác</p>
          </div>
        </div>
        {/* title */}
        {/* row */}
        {faqs?.map((el, index) => {
          const { content, answerContent, faqAnswers } = el
          if (!faqAnswers) {
            return (
              <div key={index}>
                <div className="grid grid-cols-9 gap-6 px-6 py-4 items-center">
                  <div>
                    <p className="text-p18 ">{index + 1}</p>
                  </div>
                  <div className="col-span-3">
                    <TextareaAutosize
                      className={`appearance-none border border-grey-3 resize-none rounded-lg py-4 px-6 w-full custom-scrollbar-none-border
                `}
                      defaultValue={content || ''}
                      placeholder="Nhập câu hỏi"
                      autoFocus
                      rows={5}
                      minRows={3}
                      onChange={(e) =>
                        onChangeEdit({
                          ...faqs[index],
                          id: index,
                          content: e?.target?.value,
                          type: 1
                        })
                      }
                    />
                  </div>

                  <div className="col-span-4 relative group">
                    <TextareaAutosize
                      className={`appearance-none min-w-[432px] border border-grey-3 resize-none rounded-lg py-4 px-6  custom-scrollbar-none-border
                `}
                      defaultValue={answerContent || ''}
                      disabled={!content}
                      placeholder="Nhập câu trả lời"
                      rows={5}
                      minRows={3}
                      onChange={(e) =>
                        onChangeEdit({
                          ...faqs[index],
                          id: index,
                          answerContent: e?.target?.value,
                          type: 1
                        })
                      }
                    />
                  </div>

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
              </div>
            )
          } else {
            return (
              <div key={index}>
                <div className="grid grid-cols-9 gap-6 px-6 py-4 items-center">
                  <div>
                    <p className="text-p18 ">{index + 1}</p>
                  </div>
                  <div className="col-span-3">
                    <TextareaAutosize
                      className={`appearance-none border border-grey-3 resize-none rounded-lg py-4 px-6 w-full custom-scrollbar-none-border
                `}
                      defaultValue={content || ''}
                      placeholder="Nhập câu hỏi"
                      autoFocus
                      rows={5}
                      minRows={3}
                      onChange={(e) =>
                        onChangeEdit({
                          ...faqs[index],
                          id: index,
                          content: e?.target?.value,
                          type: 0
                        })
                      }
                    />
                  </div>
                  {faqAnswers?.map((el, idx) => {
                    const {
                      answerContent: childAnswerContent,
                      content: childContent
                    } = el || {}
                    if (idx === 0) {
                      return (
                        <Fragment key={idx}>
                          <div className="col-span-4 relative group">
                            <div className="grid grid-cols-2 gap-6 ">
                              <TextareaAutosize
                                className={`appearance-none max-w-[204px] border border-grey-3 resize-none rounded-lg py-4 px-6  custom-scrollbar-none-border
              `}
                                defaultValue={childContent || ''}
                                disabled={!content}
                                placeholder="Nhập lựa chọn "
                                rows={5}
                                minRows={3}
                                onChange={(e) => {
                                  const cloneChild = [...faqAnswers]
                                  cloneChild[idx] = {
                                    ...cloneChild[idx],
                                    content: e?.target?.value
                                  }
                                  onChangeEdit({
                                    ...faqs[index],
                                    faqAnswers: cloneChild,
                                    id: index,
                                    type: 0
                                  })
                                }}
                              />
                              <TextareaAutosize
                                className={`appearance-none max-w-[204px] border border-grey-3 resize-none rounded-lg py-4 px-6  custom-scrollbar-none-border
              `}
                                defaultValue={childAnswerContent || ''}
                                disabled={!childContent}
                                placeholder="Nhập câu trả lời"
                                rows={5}
                                minRows={3}
                                onChange={(e) => {
                                  const cloneChild = [...faqAnswers]
                                  cloneChild[idx] = {
                                    ...cloneChild[idx],
                                    answerContent: e?.target?.value
                                  }
                                  onChangeEdit({
                                    ...faqs[index],
                                    faqAnswers: cloneChild,
                                    id: index,
                                    type: 0
                                  })
                                }}
                              />
                            </div>
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
                {faqAnswers?.map((child, ind) => {
                  const {
                    answerContent: childAnswerContent,
                    content: childContent
                  } = child || {}
                  if (ind > 0) {
                    return (
                      <div
                        key={ind}
                        className="grid grid-cols-9 gap-6 px-6 py-4 items-center"
                      >
                        <div></div>
                        <div className="col-span-3"></div>

                        <div className="col-span-4 relative group">
                          <div className="grid grid-cols-2 gap-6 ">
                            <TextareaAutosize
                              className={`appearance-none max-w-[204px] border border-grey-3 resize-none rounded-lg py-4 px-6  custom-scrollbar-none-border
                  `}
                              defaultValue={childContent || ''}
                              disabled={!content}
                              placeholder="Nhập lựa chọn "
                              rows={5}
                              minRows={3}
                              onChange={(e) => {
                                const cloneChild = [...faqAnswers]
                                cloneChild[ind] = {
                                  ...cloneChild[ind],
                                  content: e?.target?.value
                                }
                                onChangeEdit({
                                  ...faqs[index],
                                  faqAnswers: cloneChild,
                                  id: index,
                                  type: 0
                                })
                              }}
                            />
                            <TextareaAutosize
                              className={`appearance-none max-w-[204px] border border-grey-3 resize-none rounded-lg py-4 px-6  custom-scrollbar-none-border
                  `}
                              defaultValue={childAnswerContent || ''}
                              disabled={!childContent}
                              placeholder="Nhập câu trả lời"
                              rows={5}
                              minRows={3}
                              onChange={(e) => {
                                const cloneChild = [...faqAnswers]
                                cloneChild[ind] = {
                                  ...cloneChild[ind],
                                  answerContent: e?.target?.value
                                }
                                onChangeEdit({
                                  ...faqs[index],
                                  faqAnswers: cloneChild,
                                  id: index,
                                  type: 0
                                })
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  }
                })}
                <div className="grid grid-cols-9 gap-6 px-6 py-4 items-center">
                  <div></div>
                  <div className="col-span-3"></div>

                  <div className="col-span-4 relative ">
                    <div
                      onClick={() =>
                        handleClickAddChild({
                          id: index,
                          content: '',
                          answerContent: '',
                          isCreate: true,
                          faqAnswerId: 0
                        })
                      }
                      className="border group border-grey-3 hover:border-button border-dashed rounded-lg py-3 px-6 w-[204px] flex justify-center cursor-pointer"
                    >
                      <div className="group-hover:block hidden">
                        <XProfileIcon
                          name="add"
                          width={'24'}
                          height={'24'}
                          stroke="#F6BB3A"
                        />
                      </div>
                      <div className="group-hover:hidden ">
                        <XProfileIcon name="add" width={'24'} height={'24'} />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1 mx-auto"></div>
                </div>
              </div>
            )
          }
        })}

        {/* <div
          onClick={() => handleClickAddQuestion()}
          className="flex items-center gap-2 mt-8 cursor-pointer"
        >
          <XProfileIcon
            name="add"
            width={'24'}
            height={'24'}
            stroke="#294F9B"
          />
          <p className="text-p18-bold text-[#294F9B]">Thêm câu hỏi</p>
        </div> */}
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
          width="xl:w-[149px]"
          rounded="rounded-[8px]"
          // padding="p-[12px_32px]"
          height="h-[56px]"
          onClick={() => onClickSave()}
        />
      </div>
    </div>
  )
}

QuestionEditModal.propTypes = {
  toggleModal: PropTypes.func
}

QuestionEditModal.defaultProps = {
  toggleModal: () => {}
}

export default QuestionEditModal
