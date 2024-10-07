import { Fragment, useEffect, useRef, useState } from 'react'

import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Modal from 'common/presentation/Modal'
import Button from 'common/presentation/Button'
import TextareaAutosize from 'react-textarea-autosize'
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 100
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

export const DialogSliderThumbCropImage = ({
  isVisible,
  handleOnClose = () => {},
  src = undefined,
  aspect = 1 / 1,
  description,
  handleCropImage = () => {},
  handleChangeDescription = () => {}
}) => {
  const [crop, setCrop] = useState()
  const imgRef = useRef(null)
  const [croppedImageUrl, setCroppedImageUrl] = useState(src)

  const onImageLoad = (e) => {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  const onCropComplete = async (crop) => {
    await makeClientCrop(crop)
  }

  const makeClientCrop = async (crop) => {
    if (imgRef.current && crop.width && crop.height) {
      const croppedImageUrlTemp = await getCroppedImg(
        imgRef.current,
        crop,
        'newFile.png'
      )
      setCroppedImageUrl(croppedImageUrlTemp)
    }
  }

  const getCroppedImg = async (image, crop, fileName) => {
    const canvas = document.createElement('canvas')
    const pixelRatio = window.devicePixelRatio
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')

    canvas.width = crop.width * pixelRatio * scaleX
    canvas.height = crop.height * pixelRatio * scaleY

    ctx?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    // ctx?.imageSmoothingQuality = 'high';

    ctx?.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    )

    return new Promise((resolve, reject) => {
      canvas?.toBlob(
        (blob) => {
          if (!blob) {
            console.error('Canvas is empty')
            return
          }
          window.URL.revokeObjectURL('fileUrl')
          const fileUrl = window.URL.createObjectURL(blob)
          resolve(fileUrl)
        },
        'image/png',
        1
      )
    })
  }

  // const onClose = (confirm) => {
  //   handleOnClose(confirm ? croppedImageUrl : null);
  //   setCroppedImageUrl(undefined);
  // };

  useEffect(() => {
    // setCrop(undefined)
    setCroppedImageUrl(src)
  }, [src])

  if (!isVisible) {
    return <Fragment></Fragment>
  }

  return (
    <Modal
      toggleModal={() => {
        handleOnClose()
        setCroppedImageUrl(undefined)
      }}
      open={isVisible}
      title="Chi tiết ảnh"
      styleTitle="text-h3 mb-[40px]"
      childStyle="w-screen h-fit sm:w-[1024px] mt-4 p-[40px] bg-white rounded-[16px]"
    >
      <div>
        <div className="  grid grid-cols-2 gap-8 h-[55vh] overflow-hidden">
          <div className="w-full flex items-center justify-center bg-black">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={onCropComplete}
              aspect={aspect}
              keepSelection
              minWidth={50}
              minHeight={50}
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={src}
                onLoad={onImageLoad}
                crossOrigin="anonymous"
                style={{
                  maxHeight: '55vh'
                }}
              />
            </ReactCrop>
          </div>
          <div className="flex flex-col justify-between ">
            <div>
              <p className="text-p18-bold ">Mô tả ảnh</p>
              <TextareaAutosize
                className={`text-p18 peer hover:border-semantic hover:border-b transition-all text-grey-1 w-full py-4 outline-0 resize-none focus:border-b focus:border-semantic focus:transition-all focus:duration-500 custom-scrollbar-none-border bg-transparent
            ${
              // errors?.Description
              //   ? 'border-b border-semantic-red'
              //   : 'border-b border-transparent'
              ''
            }`}
                maxLength={180}
                defaultValue={description}
                placeholder="Viết một đoạn mô tả ngắn về hình ảnh"
                rows={5}
                onChange={(e) => handleChangeDescription(e.target.value)}
              />
              <p className="opacity-0 peer-focus:opacity-100 transition-all duration-100 text-grey-2 text-p14 text-end">
                {180 - (description?.length || 0)}
              </p>
            </div>
            <div className=" flex justify-end items-center gap-4">
              <Button
                title="Huỷ"
                rounded="rounded-[8px]"
                background={'bg-grey-4'}
                color="text-neutral"
                padding="py-[10px] px-[20px]"
                height="h-[56px]"
                width="w-[98px]"
                margin="mt-0"
                textWeight={'text-p18 font-bold'}
                onClick={() => {
                  setCroppedImageUrl(undefined)
                  handleOnClose()
                }}
              />
              <Button
                title="Lưu"
                rounded="rounded-[8px]"
                background={'bg-[#F6BB3A]'}
                color="text-neutral"
                padding="py-[10px] px-[20px]"
                height="h-[56px]"
                width="w-[98px]"
                margin="mt-0"
                textWeight={'text-p18 font-bold'}
                onClick={() => {
                  handleCropImage(croppedImageUrl)
                  setCroppedImageUrl(undefined)
                  handleOnClose()
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
