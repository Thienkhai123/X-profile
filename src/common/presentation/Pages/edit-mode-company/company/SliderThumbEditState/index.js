import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  getCultureMediaEdit,
  selectInitialState,
  toogleModal,
  updateImageUpload,
  updateListImage
} from 'store/app/edit-mode-company/profile/thumbSlice'
import XProfileIcon from 'common/presentation/Icons'
import Button from 'common/presentation/Button'
import { useDispatch } from 'react-redux'
import { SliderThumb } from 'common/presentation/Swiper/SliderThumb'
import { urlToFile } from 'store/helper/functionHelper'
import { convertToWebp } from 'store/helper/serviceHelper'

import Modal from 'common/presentation/Modal'
import { useRouter } from 'next/router'
import { DialogCropImage } from 'common/presentation/Pages/applicant-profile/TemplateContainer/AnotherBlock/dialogCropImages/dialogCropImage'
import SliderThumbImageEditModal from 'common/presentation/Pages/Profile-Company/SliderThumbImageEditModal'
import { SliderThumbEdit } from 'common/presentation/Swiper/SliderThumbEdit'

const SliderThumbEditState = (props) => {
  const {
    handleUploadImage = () => {},
    medias,
    handleChangeRemove = () => {},
    errors = null,
    handleResetErrors = () => {},
    onChangeEdit = () => {},
    persent = 0,
    checkUpload = false
  } = props
  const dispatch = useDispatch()

  const router = useRouter()
  const { companyId } = router.query

  // useEffect(() => {
  //   if (companyId) {
  //     dispatch(
  //       getCultureMediaEdit({
  //         id: companyId
  //       })
  //     )
  //   }
  // }, [dispatch, companyId])

  return (
    <div id="CultureMedias" className=" w-full mx-auto py-[24px]">
      <div>
        <p className="text-center text-h2 mt-3">
          Hình ảnh văn hóa doanh nghiệp
        </p>
      </div>
      {medias?.length === 0 && (
        <div className="mt-3">
          <p className="text-center">
            Thêm ảnh để mọi người biết thêm về doanh nghiệp của bạn nhé
          </p>
        </div>
      )}

      <div
        key={medias?.length}
        className="max-w-[500px] md:max-w-[800px] xl:max-w-[946px] mx-auto mt-[20px]  px-5 xl:px-0"
      >
        <SliderThumbEdit
          breakpoints={{
            330: {
              slidesPerView: 1.5,
              slidesPerGroup: 1
            },
            1100: {
              slidesPerView: 3,
              slidesPerGroup: 1
            },
            1280: {
              slidesPerView: 5,
              slidesPerGroup: 1
            }
          }}
          hasArrow
          list={medias}
          handleUploadImage={handleUploadImage}
          handleChangeRemove={handleChangeRemove}
          onChangeEdit={onChangeEdit}
          persent={persent}
          checkUpload={checkUpload}
          errorText={errors?.CultureMedias && 'Không được bỏ trống'}
        />
      </div>
    </div>
  )
}

export default SliderThumbEditState
