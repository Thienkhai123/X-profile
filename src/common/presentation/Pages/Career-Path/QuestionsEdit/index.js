import useModal from 'common/hooks/useModal'
import Modal from 'common/presentation/Modal'

import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import {
  addChildQuestion,
  addQuestion,
  getAllFaqs,
  getChildFaqEdit,
  removeQuestion,
  saveTempAllFaq,
  selectInitFaqs,
  updateChildFaq,
  updateEditFaq,
  updateQuestion,
  updateTempFaq
} from 'store/app/edit-mode-company/profile/questionsSlice'
import QuestionsEditView from '../../edit-mode-company/company/questionsEdit/QuestionsEditView'
import QuestionEditModal from '../../edit-mode-company/company/questionsEdit/QuestionEditModal'
import { delay, scrollToIdInElement } from 'store/helper/functionHelper'

import HideShowBlock from '../../Profile-Company/HideShowBlock'
import {
  selectFooterProfile,
  updateFooterEdit
} from 'store/app/edit-mode-company/profile/footerSlice'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'
import BlockEditorContainer from 'common/container/block-editor'
import QuestionsEditMode from '../../edit-mode-company/company/questionsEdit/QuestionsEditMode'

const QuestionsEdit = (props) => {
  const { editmode, isShowFAQs } = props
  const dispatch = useDispatch()
  const { query } = useRouter()
  const { companyId } = query || {}
  const isTyping = useSelector((state) =>
    selectLoading(state, APP_TYPES.EDIT.CHILDFAQ)
  )
  const { faqs, faqsEdit, allFaq, childFaq } = useSelector(selectInitFaqs) || {}
  const [modal, toggleModal] = useModal()
  const footerProfile = useSelector(selectFooterProfile)

  const onClickCancel = () => {
    if (companyId) {
      dispatch(getAllFaqs({ id: companyId }))
    }
    toggleModal()
  }

  const onClickSave = async () => {
    toggleModal()
    dispatch(saveTempAllFaq())
  }

  const onClickOutSide = () => {
    onClickSave()
  }
  const handleClickAddQuestion = () => {
    const template = {
      isCreate: true,
      faqAnswerId: 0,
      answerContent: '',
      content: '',
      position: 0
    }

    dispatch(addQuestion(template))
  }
  const handleClickAddChild = (data) => {
    dispatch(addChildQuestion(data))
  }
  const handleClickAddQuestionMulti = () => {
    const template = {
      isCreate: true,
      faqAnswerId: 0,
      answerContent: '',
      content: '',
      position: 0,
      faqAnswers: [
        {
          isCreate: true,
          faqAnswerId: 0,
          answerContent: '',
          content: '',
          position: 0
        }
      ]
    }

    dispatch(addQuestion(template))
  }

  const onChangeEdit = (data) => {
    dispatch(updateQuestion(data))
  }
  const handleRemove = (id) => {
    dispatch(removeQuestion({ id }))
  }
  const handleChangeIsShow = () => {
    dispatch(
      updateFooterEdit({
        ...footerProfile,
        meta: {
          ...footerProfile.meta,
          isShowFAQs: !isShowFAQs
        }
      })
    )
  }

  return (
    <div className="relative  bg-nude py-[3.25rem]">
      <div className=" max-w-[1140px] mx-auto">
        <HideShowBlock
          editMode={editmode}
          isShowBlock={isShowFAQs}
          handleChangeIsShow={handleChangeIsShow}
        />
        <div className="flex gap-[40px]  justify-center xl:justify-between">
          <BlockEditorContainer
            editmode={editmode}
            editState={
              <QuestionsEditMode
                toggleModal={toggleModal}
                faqs={allFaq}
                editMode={editmode}
                titleQuestions={faqs[0]?.content || ''}
                handleAnswer={async (content, id) => {
                  if (!isTyping) {
                    await dispatch(
                      updateTempFaq({
                        content: content,
                        type: 2,
                        id: id,
                        event: () => {
                          scrollToIdInElement('wrapper-faqs')
                        }
                      })
                    )
                    const answer = faqsEdit?.find(
                      (el) => el.content === content
                    )
                    if (answer) {
                      if (!answer?.faqAnswers) {
                        await dispatch(
                          updateTempFaq({
                            content: answer?.answerContent,
                            type: 1,
                            event: () => {
                              // await delay(0)
                              scrollToIdInElement('wrapper-faqs')
                            }
                          })
                        )
                        await dispatch(
                          updateTempFaq({
                            ...allFaq[0],
                            event: () => {
                              // await delay(2000)
                              scrollToIdInElement('wrapper-faqs')
                            }
                          })
                        )
                      } else {
                        dispatch(updateChildFaq(answer?.faqAnswers))
                        await dispatch(
                          updateTempFaq({
                            ...answer,
                            type: 0,
                            event: () => {
                              scrollToIdInElement('wrapper-faqs')
                            }
                          })
                        )
                      }

                      scrollToIdInElement('wrapper-faqs')
                    } else {
                    }
                    const childAnswer = childFaq.find(
                      (el) => el.content === content
                    )
                    if (childAnswer) {
                      await dispatch(
                        updateTempFaq({
                          content: childAnswer?.answerContent,
                          type: 1,
                          event: () => {
                            scrollToIdInElement('wrapper-faqs')
                          }
                        })
                      )
                      dispatch(
                        updateTempFaq({
                          ...allFaq[0],
                          event: async () => {
                            await delay(0)
                            scrollToIdInElement('wrapper-faqs')
                          }
                        })
                      )
                    }
                  }
                }}
                // isTyping={isTyping}
              />
            }
            viewState={
              <QuestionsEditView
                toggleModal={toggleModal}
                faqs={faqs}
                editMode={editmode}
                handleAnswer={async (content, id) => {
                  if (!isTyping) {
                    dispatch(updateEditFaq({ content: content, type: 2 }))
                    await dispatch(
                      getChildFaqEdit({
                        companyId: companyId,
                        faqAnswerId: id,
                        event: () => scrollToIdInElement('wrapper-faqs')
                      })
                    )
                    scrollToIdInElement('wrapper-faqs')
                  }
                }}
                isTyping={isTyping}
              />
            }
          />
        </div>
      </div>
      <Modal
        open={modal}
        toggleModal={onClickOutSide}
        childStyle="w-screen h-fit sm:w-fit max-h-[680px]  mt-[62px] shadow-md p-[40px] bg-white rounded-lg"
        modalStyle="w-[100vw] h-[100vh] p-2 flex justify-center items-center fixed bg-black/30 z-[10000] left-[calc(0%)] top-[calc(0%)]"
        title="Câu hỏi thường gặp"
        styleTitle="text-p28-bold text-neutral"
      >
        <QuestionEditModal
          faqs={faqsEdit}
          handleClickAddQuestion={handleClickAddQuestion}
          handleClickAddQuestionMulti={handleClickAddQuestionMulti}
          onChangeEdit={onChangeEdit}
          handleRemove={handleRemove}
          onClickCancel={onClickCancel}
          onClickSave={onClickSave}
          handleClickAddChild={handleClickAddChild}
        />
      </Modal>
    </div>
  )
}

export default QuestionsEdit
