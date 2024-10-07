import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import XProfileIcon from 'common/presentation/Icons'
import TextareaAutosize from 'react-textarea-autosize'

const FieldDetailItemEdit = (props) => {
  const {
    imageUrl,
    name,
    description,
    index,
    onChangeImage,
    onChangeText,
    setSelectedId,
    onDelete,
    toggleModalImage,
    setIndex = () => {}
  } = props

  const [hover, setHover] = useState({
    hoverItem: false,
    hoverImage: false
  })
  return (
    <div className=" flex gap-8  ">
      <div>
        {!imageUrl && (
          <div className="rounded-[16px] bg-white border-custom-img-funfact">
            <button
              className="p-[24px]"
              onClick={(e) => {
                toggleModalImage()
                setIndex(index)
              }}
            >
              <XProfileIcon name="add" width="24" height="24" />
            </button>
          </div>
        )}
        {imageUrl && (
          <div
            className={`relative rounded-[16px] w-[72px] h-[72px] flex justify-center items-center`}
            onMouseLeave={() => setHover({ ...hover, hoverImage: false })}
            onMouseMove={() => setHover({ ...hover, hoverImage: true })}
          >
            <Image
              src={imageUrl}
              height={64}
              width={64}
              objectFit="cover"
              alt=""
              quality={100}
            />
            {hover.hoverImage && (
              <div
                className="z-[100] cursor-pointer flex justify-center items-center  bg-black rounded-[16px] w-[72px] h-[72px] absolute opacity-50 "
                onClick={(e) => {
                  toggleModalImage()
                  setIndex(index)
                }}
              >
                <div className="absolute cursor-pointer">
                  <XProfileIcon
                    name="uploadLogo"
                    fill="#ffffff"
                    stroke="#ffffff"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="xl:w-full">
        <div
          onMouseLeave={() => setHover({ ...hover, hoverItem: false })}
          onMouseMove={() => setHover({ ...hover, hoverItem: true })}
          className="relative "
        >
          <input
            // autoFocus
            className="sm:text-h5 xl:w-full text-p14 peer/title line-clamp-1 break-words font-bold placeholder:text-grey-3 transition-all duration-200 
          border-b border-b-transparent 
          hover:border-semantic 
          focus:border-semantic
          text-blue-boild outline-0 p-1 pb-0 xl:mt-0 mt-1"
            placeholder="Nhập fun fact"
            value={name}
            maxLength={50}
            onChange={(e) =>
              onChangeText(
                {
                  imageUrl,
                  name: e.target.value,
                  description
                },
                index
              )
            }
          />
          <p className="opacity-0 peer-focus/title:opacity-100 transition-all duration-100 text-grey-2 text-p14 text-end">
            {50 - (name?.length || 0)}
          </p>
          <TextareaAutosize
            className={`sm:text-p16 text-p12 p-1 peer transition-all text-grey-1 w-full 
           outline-0 resize-none  focus:transition-all focus:duration-500 
           custom-scrollbar-none-border bg-transparent placeholder:text-grey-3
           border-b border-b-transparent 
          hover:border-semantic 
          focus:border-semantic
           `}
            maxLength={100}
            defaultValue={description}
            placeholder="Nhập mô tả"
            rows={5}
            onChange={(e) =>
              onChangeText(
                {
                  imageUrl,
                  name,
                  description: e.target.value
                },
                index
              )
            }
          />
          <p className="opacity-0 peer-focus:opacity-100 transition-all duration-100 text-grey-2 text-p14 text-end">
            {100 - (description?.length || 0)}
          </p>
          {/* <input
          className="sm:text-p16 text-p12 text-grey-1 hover:border-button outline-0 border border-transparent focus:border-button p-1 w-full resize-none mt-1 rounded-lg"
          placeholder="Nhập mô tả"
          maxLength={40}
          value={description}
          onChange={(e) =>
            onChangeText(
              {
                imageUrl,
                name,
                description: e.target.value
              },
              index
            )
          }
          rows={3}
        /> */}
          {hover.hoverItem && (
            <div
              className="absolute right-0 top-0 cursor-pointer p-[16px] rounded-full border-[#EDEDE8] z-[100] bg-white border hover:bg-button duration-300"
              onClick={() => onDelete(index)}
            >
              <XProfileIcon
                name="trash"
                width="24"
                height="24"
                stroke="black"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

FieldDetailItemEdit.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  onChangeImage: PropTypes.func,
  onChangeText: PropTypes.func,
  onDelete: PropTypes.func
}
FieldDetailItemEdit.defaultProps = {
  src: '',
  title: '',
  description: '',
  onChangeImage: () => {},
  onChangeText: () => {},
  setSelectedId: () => {},
  onDelete: () => {}
}

export default FieldDetailItemEdit
