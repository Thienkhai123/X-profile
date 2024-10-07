import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import TextareaAutosize from 'react-textarea-autosize'
import XProfileIcon from 'common/presentation/Icons'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import Button from 'common/presentation/Button'

const NoteModal = (props) => {
  const { handleNoteLession, lessonNote } = props
  const [note, setNote] = useState(null)
  const [isActiveNote, setIsActiveNote] = useState(false)
  const noteRef = useRef(null)
  const textAreaRef = useRef(null)

  const handleSetIsACtiveNode = () => {
    if (isActiveNote) {
      handleNoteLession(note)
      setNote(null)
    }
    setIsActiveNote(false)
  }

  useOnClickOutside(noteRef, handleSetIsACtiveNode)

  return (
    <div className="pb-[8px]">
      <div
        className="bg-[#EAF1FF] p-[8px] rounded-full cursor-pointer"
        onClick={() => {
          setIsActiveNote(!isActiveNote)
        }}
      >
        {isActiveNote ? (
          <XProfileIcon name="cancelNote" />
        ) : (
          <XProfileIcon name="document" />
        )}
      </div>
      <div
        className={` duration-150 bg-[#EAF1FF] absolute z-[9999] top-[48px] right-[0px]  rounded-borderStep ${
          isActiveNote ? 'p-[24px] h-auto ' : 'h-0 hidden '
        }`}
        ref={noteRef}
        onClick={() => {
          textAreaRef.current.focus()
        }}
      >
        <div
          className="flex justify-between flex-col xl:resize-x overflow-auto custom-scrollbar-none-border max-w-[552px] min-w-[291px] xl:min-h-[320px]"
          style={{ direction: 'rtl' }}
        >
          <div>
            <p
              className={`duration-150 text-end  sm:text-[16px] font-bold leading-[28px] text-p14-bold ${
                isActiveNote
                  ? 'opacity-1  h-auto w-auto'
                  : 'opacity-0 h-0 hidden'
              }`}
            >
              Ghi chú
            </p>
            {isActiveNote && (
              <div
                className={`pt-[8px] opacity-1 overflow-y-auto custom-scrollbar-none-border `}
                style={{ direction: 'ltr' }}
              >
                <TextareaAutosize
                  ref={textAreaRef}
                  // minRows={10}
                  maxLength={1000}
                  defaultValue={lessonNote?.note || ''}
                  className="w-full h-full break-words  focus:outline-none sm:text-[16px] font-normal leading-[28px] text-p12 text-black bg-inherit resize-none  custom-scrollbar-none-border"
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            )}
          </div>
          {isActiveNote && (
            <div className="flex justify-start mt-[32px]">
              <Button
                title="Lưu"
                height="h-[36px]"
                textWeight="text-white text-[16px] font-bold leading-[28px]"
                background="bg-button-2"
                margin="m-0"
                rounded="rounded-[8px]"
                padding="px-[24px]"
                onClick={() => {
                  handleSetIsACtiveNode()
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

NoteModal.propTypes = {}

export default NoteModal
