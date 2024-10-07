import { HightLightJobMobile } from 'common/presentation/Card/HighlightJob/HightLightJobMobile'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const BenefitsCardEdit = (props) => {
  const {
    imageUrl,
    imageId,
    description,
    name,
    index,
    handleRemoveItem = () => {},
    toggleModal = () => {},
    onChangeEdit = () => {},
    benefitsList = [],
    isErrorsName,
    isErrorsDesciption,
    isErrorsImageUrl
  } = props

  // const divMode = (
  //   <div className="xl:mb-0">
  //     <div className="flex justify-center mb-3">
  //       <div className="text-center xl:w-[75px] w-[324px]">
  //         <Image
  //           src={imageUrl || '/images/uploadAvatarEdit.png'}
  //           width={100}
  //           height={100}
  //           objectFit="contain"
  //           alt=""
  //         />
  //       </div>
  //     </div>
  //     <div className="flex justify-center mb-3">
  //       <div className="text-center w-[366px]">
  //         <p className="xl:text-[28px] text-ellipsis overflow-hidden text-p20-bold text-blue-light">
  //           {content || ''}
  //         </p>
  //       </div>
  //     </div>
  //     <div className="flex justify-center">
  //       <div className="text-center w-[366px]">
  //         <p className="xl:text-p18 text-p12 text-ellipsis overflow-hidden text-grey-1">
  //           {title || ''}
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // )

  return (
    <div className="xl:mb-0 group">
      <div className="absolute p-2 right-0 top-0 z-10 flex items-center justify-center rounded-full transition-all ease-out duration-400 bg-white shadow opacity-0 group-hover:opacity-100">
        <div
          onClick={() => toggleModal(parseInt(index))}
          className="gap-2 rounded-full w-[44px] h-[44px]  hover:bg-button flex items-center justify-center p-2 cursor-pointer"
        >
          <XProfileIcon name="pen" />
        </div>
        <div
          onClick={() => handleRemoveItem(index)}
          className="gap-2 rounded-full w-[44px] h-[44px] hover:bg-button flex items-center justify-center p-2 cursor-pointer"
        >
          <XProfileIcon name="trash" stroke="#000000" />
        </div>
      </div>
      <div className="flex justify-center mb-6 ">
        <div
          onClick={() => toggleModal(parseInt(index))}
          className={`text-center flex flex-col items-center gap-3 justify-center w-[200px] ${
            !imageUrl ? 'border-custom-img' : ''
          } px-4 py-8  `}
        >
          <div>
            <Image
              src={imageUrl || '/images/Upload.png'}
              width={imageUrl ? 140 : 100}
              height={imageUrl ? 140 : 100}
              objectFit="contain"
              alt=""
            />
          </div>
          {!imageUrl && (
            <p className="text-p16-bold text-button">Chọn ảnh từ thư viện</p>
          )}
        </div>
      </div>
      {isErrorsImageUrl && (
        <p className="text-center text-p16 text-semantic-red">
          Vui lòng chọn hình ảnh
        </p>
      )}
      <div className="flex justify-center mb-6">
        <div className="text-center w-[366px]">
          <input
            id={`Benefits_name_${index}`}
            onChange={(e) =>
              onChangeEdit(
                {
                  ...benefitsList[index],
                  id: index,
                  name: e?.target?.value
                },
                `Benefits_name_${index}`
              )
            }
            maxLength={20}
            value={name}
            placeholder="Phúc lợi"
            className={`xl:text-[44px] border-b outline-none   transition-all peer text-p20-bold text-blue-light appearance-none  outline-0 focus:transition-all focus:duration-500 focus:border-b   bg-transparent w-full text-center ${
              isErrorsName
                ? 'border-b border-semantic-red'
                : 'border-b border-transparent hover:border-semantic focus:border-semantic'
            }`}
          />
          {!isErrorsName && (
            <div className="flex justify-end opacity-0 peer-focus:opacity-100">
              <p className="text-grey-2 text-p14">{20 - name?.length}</p>
            </div>
          )}

          {isErrorsName && (
            <p className="text-p16 text-center leading-[28px] text-semantic-red">
              Không được bỏ trống
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="text-center w-[366px]">
          <input
            id={`Benefits_desciption_${index}`}
            onChange={(e) =>
              onChangeEdit(
                {
                  ...benefitsList[index],
                  id: index,
                  description: e?.target?.value
                },
                `Benefits_desciption_${index}`
              )
            }
            maxLength={50}
            value={description}
            placeholder="Mô tả phúc lợi"
            className={`xl:text-p18 peer  border-b outline-none   transition-all text-p12 text-grey-1 appearance-none  outline-0 focus:transition-all focus:duration-500 focus:border-b   bg-transparent w-full text-center ${
              isErrorsDesciption
                ? 'border-b border-semantic-red'
                : 'border-b border-transparent hover:border-semantic focus:border-semantic'
            }`}
          />
          {!isErrorsDesciption && (
            <div className="flex justify-end opacity-0 peer-focus:opacity-100">
              <p className="text-grey-2 text-p14">{50 - description?.length}</p>
            </div>
          )}
          {isErrorsDesciption && (
            <p className="text-p16 text-center leading-[28px] text-semantic-red">
              Không được bỏ trống
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

BenefitsCardEdit.propTypes = {}

BenefitsCardEdit.defaultProps = {}

export default BenefitsCardEdit
