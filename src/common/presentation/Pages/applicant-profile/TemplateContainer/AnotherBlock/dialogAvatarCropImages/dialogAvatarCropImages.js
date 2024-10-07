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

export const DialogAvatarCropImages = ({
  isVisible,
  handleOnClose = () => {},
  src = undefined,
  aspect = 1 / 1,
  description,
  handleCropImage = () => {},
  title = 'Cập nhật ảnh đại diện',
  circularCrop = true
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
      title={title}
      styleTitle="text-h3 mb-[40px]"
      childStyle="w-screen h-fit sm:w-[698px] mt-4 p-[40px] bg-white rounded-[16px]"
    >
      <div>
        <div className="  grid grid-cols-1 gap-8 h-fit overflow-hidden">
          <div className="w-full flex items-center justify-center bg-black">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={onCropComplete}
              aspect={aspect}
              circularCrop={circularCrop}
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
                  maxHeight: '480px'
                }}
              />
            </ReactCrop>
          </div>
          <div className="flex xl:flex-row flex-col gap-4 xl:gap-0 items-center justify-end ">
            {/* <div>
              <Button
                title="Xoá ảnh"
                rounded="rounded-[8px]"
                background={'bg-white border border-semantic-red'}
                color="text-semantic-red"
                padding="py-[10px] px-8"
                height="h-[56px]"
                width="w-auto"
                margin="mt-0"
                textWeight={'text-p18 font-bold'}
                onClick={() => {
                  handleRemoveAvatar()
                  setCroppedImageUrl(undefined)
                  handleOnClose()
                }}
              />
            </div> */}
            <div className=" flex xl:flex-row flex-col justify-end items-center gap-4">
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
