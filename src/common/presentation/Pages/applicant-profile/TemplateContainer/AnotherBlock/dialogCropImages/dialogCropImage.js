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

export const DialogCropImage = ({
  isVisible,
  handleOnClose = () => {},
  src = undefined,
  aspect = 1 / 1,
  handleCropImage = () => {}
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
      title="Chỉnh sửa ảnh"
      styleTitle="text-h3 mb-[40px]"
    >
      <div className="max-h-[85vh] ">
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
              height: '55vh'
            }}
          />
        </ReactCrop>

        <div className="mt-[40px] flex justify-end">
          <Button
            title="Xác nhận"
            rounded="rounded-[8px]"
            background={'bg-[#F6BB3A]'}
            color="text-neutral"
            padding="py-[10px] px-[20px]"
            height="h-[56px]"
            width="w-[240px]"
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
    </Modal>
  )
}
