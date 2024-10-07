import { HightLightJobMobile } from 'common/presentation/Card/HighlightJob/HightLightJobMobile'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

const StaticsItemEdit = (props) => {
  const {
    imageUrl,
    imageId,
    content,
    title,
    index,
    handleRemoveItem = () => {},
    isEdit,
    toggleModal = () => {},
    achivementImages,
    selectedImageId,
    openModalImages,
    onChangeEdit = () => {},
    highlight = [],
    isErrorsImageUrl,
    isErrorsContent,
    isErrorsTitle
  } = props

  const divMode = (
    <div className="xl:mb-0">
      <div className="flex justify-center mb-3">
        <div className="text-center ">
          <Image
            src={imageUrl || '/images/Upload.png'}
            width={imageUrl ? 140 : 100}
            height={imageUrl ? 140 : 100}
            objectFit="contain"
            alt=""
          />
        </div>
      </div>
      <div className="flex justify-center mb-3">
        <div className="text-center w-[366px]">
          <p className="xl:text-h1  overflow-hidden text-p20-bold text-blue-light">
            {content || ''}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="text-center w-[316px]">
          <p className="xl:text-p18 text-p12 line-clamp-3 text-ellipsis overflow-hidden text-grey-1">
            {title || ''}
          </p>
        </div>
      </div>
    </div>
  )
  const editMode = (
    <div className="xl:mb-0 group relative">
      {highlight?.length >= 3 && (
        <>
          <div className="absolute p-2 right-10 duration-200 top-0 z-10 flex items-center justify-center rounded-full transition-all ease-out duration-400 bg-white shadow opacity-0 group-hover:opacity-100">
            <div
              onClick={() => toggleModal(parseInt(index))}
              className="gap-2 rounded-full w-[44px] h-[44px] duration-300  hover:bg-button flex items-center justify-center p-2 cursor-pointer"
            >
              <XProfileIcon name="uploadLogo" stroke="#000000" />
            </div>
            <div
              onClick={() => handleRemoveItem(index)}
              className="gap-2 rounded-full w-[44px] duration-300 h-[44px] hover:bg-button flex items-center justify-center p-2 cursor-pointer"
            >
              <XProfileIcon name="trash" stroke="#000000" />
            </div>
          </div>
          {/* <div className="absolute  right-10 top-0 z-10 flex items-center justify-center rounded-full transition-all ease-out duration-700 bg-white shadow opacity-0 group-hover:opacity-100">
            <div
              onClick={() => handleRemoveItem(index)}
              className="gap-2 rounded-full w-[55px] h-[55px] hover:bg-button flex items-center justify-center  cursor-pointer"
            >
              <XProfileIcon name="trash" stroke="#000000" />
            </div>
          </div> */}
        </>
      )}
      <div className="flex justify-center mb-3">
        <div
          // onClick={() => toggleModal(parseInt(index))}
          className={`text-center flex flex-col items-center gap-3 justify-center w-[200px] ${
            !imageUrl ? 'border-custom-img' : ''
          } px-4 py-8 `}
        >
          <div>
            <Image
              src={imageUrl || '/images/Upload.png'}
              width={imageUrl ? 140 : 100}
              height={imageUrl ? 140 : 100}
              objectFit="contain"
              quality={100}
              alt=""
            />
          </div>
          {!imageUrl && (
            <p className="text-p16-bold text-button">Chọn ảnh từ thư viện</p>
          )}
        </div>
      </div>
      {isErrorsImageUrl && (
        <p className="text-center text-p16 text-semantic-red h-[16px]">
          Vui lòng chọn hình ảnh
        </p>
      )}
      <div className="flex justify-center mb-3">
        <div className="text-center w-[366px]">
          <input
            id={`Static_content_${index}`}
            onChange={(e) =>
              onChangeEdit(
                {
                  ...highlight[index],
                  id: index,
                  content: e?.target?.value
                },
                `Static_content_${index}`
              )
            }
            maxLength={20}
            value={content || ''}
            placeholder="Con số nổi bật"
            className={`xl:text-h1 text-p20-bold placeholder:text-grey-3  hover:border-b transition-all text-blue-light peer appearance-none  outline-0 focus:transition-all focus:duration-500 focus:border-b   bg-transparent w-full text-center ${
              isErrorsContent
                ? 'border-b border-semantic-red'
                : 'border-b border-transparent hover:border-semantic focus:border-semantic'
            }`}
          />
          {isErrorsContent && (
            <p className="text-p16 text-semantic-red h-[16px]">
              Không được bỏ trống
            </p>
          )}
          <div className="flex justify-end opacity-0 peer-focus:opacity-100">
            <p className="text-grey-2 text-p14">{20 - content?.length}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="text-center w-[366px]">
          <TextareaAutosize
            id={`Static_title_${index}`}
            onChange={(e) =>
              onChangeEdit(
                {
                  ...highlight[index],
                  id: index,
                  title: e?.target?.value
                },
                `Static_title_${index}`
              )
            }
            value={title || ''}
            rows={2}
            maxLength={50}
            placeholder="Viết mô tả về thành tích này"
            className={`xl:text-p18 text-p12 placeholder:text-grey-3 hover:border-b transition-all outline-none custom-scrollbar-none-border text-grey-1 appearance-none peer outline-0 focus:transition-all focus:duration-500 focus:border-b bg-transparent w-full text-center resize-none ${
              isErrorsTitle
                ? 'border-b border-semantic-red'
                : 'border-b border-transparent hover:border-semantic focus:border-semantic'
            }`}
          />
          {isErrorsTitle && (
            <p className="text-p16 text-semantic-red h-[16px]">
              Không được bỏ trống
            </p>
          )}
          <div className="flex justify-end opacity-0 peer-focus:opacity-100">
            <p className="text-grey-2 text-p14">{50 - title?.length}</p>
          </div>
        </div>
      </div>
    </div>
  )

  return <div>{isEdit ? editMode : divMode}</div>
}

StaticsItemEdit.propTypes = {}

StaticsItemEdit.defaultProps = {}

export default StaticsItemEdit
