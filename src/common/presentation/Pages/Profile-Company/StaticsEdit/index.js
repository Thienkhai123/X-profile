import useOnClickOutside from 'common/hooks/useClickOutSide'
import XProfileIcon from 'common/presentation/Icons'
import Modal from 'common/presentation/Modal'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  addHighlight,
  getAchivementImagesEdit,
  removeHighlight,
  selectAchivementImagesEdit,
  selectHighlightEdit,
  selectHighlightProfile,
  updateHighlight,
  updateStaticEdit
} from 'store/app/edit-mode-company/profile/staticsSlice'
import {
  getAchivementImages,
  selectAchivementImages
} from 'store/app/portfolioSlice'
import StaticsImageModal from '../StaticsImageModal'
import StaticsItemEdit from '../StaticsItemEdit'
import { Swiper, SwiperSlide } from 'swiper/react'
import { NextArrow, PreviousArrow } from 'common/presentation/Swiper/Arrows'
import { Grid, Navigation } from 'swiper'

const StaticsEdit = (props) => {
  const { isEdit = false, errors = null, setErrors, handleResetErrors } = props
  const highlight = useSelector(selectHighlightEdit)
  const profile = useSelector(selectHighlightProfile)
  const highlightTitle = profile?.meta?.highlightTitle
  const [activeIndex, setActiveIndex] = useState(0)
  const prevRef = useRef(null)
  const swiperRef = useRef(null)
  const nextRef = useRef(null)
  const achivementImages = useSelector(selectAchivementImagesEdit)
  const router = useRouter()
  const { companyId } = router.query
  const dispatch = useDispatch()
  const [openModalImages, setOpenModalImages] = useState(false)
  const [selectedImageId, setSelectedImageId] = useState(0)
  const [editingId, setEditingId] = useState(null)
  const toggleModal = (id) => {
    if (!openModalImages) {
      setEditingId(id)
      setOpenModalImages(true)
    } else {
      setEditingId(null)
      setOpenModalImages(false)
    }
  }
  const addHighLightItem = async () => {
    await dispatch(
      addHighlight({
        title: '',
        content: '',
        imageId: 0,
        imageUrl: '',
        email: '',
        firstPhone: '',
        secondPhone: null
      })
    )
  }
  const onChangeEdit = async (data, id) => {
    dispatch(updateHighlight(data))
    handleResetErrors(id)
  }

  const handleRemoveItem = (id) => {
    dispatch(removeHighlight({ id }))
    handleResetErrors([
      `Static_title_${id}`,
      `Static_content_${id}`,
      `Static_imageUrl_${id}`
    ])
  }
  const onChangeEditTitleHighLight = (data) => {
    dispatch(updateStaticEdit(data))
  }

  const handleCLose = () => {}
  const staticsRef = useRef(null)
  useOnClickOutside(staticsRef, handleCLose)

  const errorsList = []
  const errorsArray = Object.values(errors || {}) || []
  if (errorsArray?.length > 0) {
    errorsArray?.forEach((elm) => {
      if (elm.id !== '') {
        errorsList.push(elm.id)
      }
    })
  }

  useEffect(() => {
    if (highlight?.length === 0 || !highlight) {
      for (let i = 0; i < 3; i++) {
        addHighLightItem()
      }
    }
    dispatch(getAchivementImagesEdit())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId, highlight?.length])

  useEffect(() => {
    if (activeIndex > 0 && isEdit) {
      setActiveIndex(activeIndex + 1)
      const swiper = swiperRef.current.swiper
      swiper.slideTo(activeIndex + 1)
    } else {
      setActiveIndex(activeIndex + 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlight?.length, isEdit])
  return (
    <div ref={staticsRef} className={`bg-stoke h-auto px-10`}>
      <div className="flex justify-center">
        {isEdit && (
          <input
            onChange={(e) =>
              onChangeEditTitleHighLight({
                ...profile,
                meta: {
                  ...profile.meta,
                  highlightTitle: e.target.value
                }
              })
            }
            // maxLength={20}
            value={highlightTitle || ''}
            placeholder="Thành tích nổi bật"
            className="text-p20-bold lg:text-h2 hover:border-semantic hover:border-b focus:border-semantic focus:border-b appearance-none  bg-transparent outline-0 transition-all text-center xl:pt-[88px] bg-stoke placeholder:text-grey-3"
          />
        )}
      </div>

      {!isEdit && (
        <p className="text-h2 text-center  xl:pt-[88px] line-clamp-1">
          {highlightTitle || 'Thành tích nổi bật'}
        </p>
      )}

      {highlight.length >= 2 && isEdit && (
        <div
          onClick={() => addHighLightItem()}
          className={`flex items-center gap-3 justify-end cursor-pointer mb-4 ${
            highlight?.length === 40 && 'pointer-events-none opacity-75'
          } `}
        >
          <XProfileIcon name="add" width="24" height="24" stroke="#294F9B" />
          <p className="text-p18-bold text-blue-light ">Thêm thành tích</p>
        </div>
      )}
      <div
        id="staticList"
        className="flex justify-center  xl:pt-[52px] xl:pb-[88px] py-[40px] px-5 xl:px-0 "
      >
        <div className="relative xl:max-w-[1140px] w-screen  px-5 xl:px-0">
          <div
            className={`hidden xl:block ${
              highlight?.length > 3 ? 'opacity-100' : 'opacity-0'
            } `}
          >
            <PreviousArrow prevRef={prevRef} hasShadow={true} />
            <NextArrow nextRef={nextRef} hasShadow={true} />
          </div>
          <Swiper
            ref={swiperRef}
            breakpoints={{
              330: {
                slidesPerView: 1.5,
                slidesPerGroup: 1
              },
              800: {
                slidesPerView: 2,
                slidesPerGroup: 2
              },
              1100: {
                slidesPerView: 2,
                slidesPerGroup: 2
              },
              1280: {
                slidesPerView: 3,
                slidesPerGroup: 1
              }
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current
            }}
            modules={[Grid, Navigation]}
            initialSlide={activeIndex}
          >
            {highlight?.map((item, idx) => {
              const { content, imageId, imageUrl, title } = item
              const isErrorsImageUrl = errorsList?.some(
                (element) => element === `Static_imageUrl_${idx}`
              )
              const isErrorsContent = errorsList?.some(
                (element) => element === `Static_content_${idx}`
              )
              const isErrorsTitle = errorsList?.some(
                (element) => element === `Static_title_${idx}`
              )
              return (
                <SwiperSlide key={`hightlight-${idx}`}>
                  <StaticsItemEdit
                    isErrorsImageUrl={isErrorsImageUrl}
                    isErrorsContent={isErrorsContent}
                    isErrorsTitle={isErrorsTitle}
                    imageId={parseInt(imageId)}
                    isEdit={isEdit}
                    key={idx}
                    {...item}
                    index={idx}
                    handleRemoveItem={handleRemoveItem}
                    toggleModal={toggleModal}
                    achivementImages={achivementImages}
                    selectedImageId={selectedImageId}
                    openModalImages={openModalImages}
                    onChangeEdit={onChangeEdit}
                    highlight={highlight}
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
      {/* <div className="flex justify-center  xl:pt-[60px] xl:pb-[60px] py-[40px] px-5 xl:px-0 ">
      
        {highlight && (
          <div
            className={`grid lg:${
              isEdit ? 'grid-cols-3' : `grid-cols-${highlight?.length}`
            } md:grid-cols-${
              highlight?.length - highlight?.length + 2
            } grid-cols-${
              highlight?.length - highlight?.length + 1
            }  justify-between xl:w-[1140px] max-w-[1140px] gap-[20px]`}
          >
            {highlight?.map((item, idx) => {
              const { content, imageId, imageUrl, title } = item
              return (
                <StaticsItemEdit
                  imageId={parseInt(imageId)}
                  isEdit={isEdit}
                  key={idx}
                  {...item}
                  index={idx}
                  handleRemoveItem={handleRemoveItem}
                  toggleModal={toggleModal}
                  achivementImages={achivementImages}
                  selectedImageId={selectedImageId}
                  openModalImages={openModalImages}
                  onChangeEdit={onChangeEdit}
                  highlight={highlight}
                />
              )
            })}
            {highlight.length < 3 && isEdit && (
              <div
                onClick={() => addHighLightItem()}
                className="flex justify-center items-center border rounded-lg hover:bg-grey-4"
              >
                <XProfileIcon name="add" width="40" height="40" />
              </div>
            )}
          </div>
        )}
      </div> */}
      <Modal
        modalStyle="w-[100vw] h-[100vh] p-2 flex justify-center items-center fixed bg-black/30 z-[999999] left-[calc(0%)] top-[calc(0%)]"
        toggleModal={toggleModal}
        open={openModalImages}
        title="Chọn ảnh từ thư viện"
        styleTitle="text-p28-bold text-black"
      >
        <StaticsImageModal
          achivementImages={achivementImages}
          selectedImageId={selectedImageId}
          toggleModal={toggleModal}
          setSelectedImageId={setSelectedImageId}
          editingId={editingId}
          onChangeEdit={onChangeEdit}
          highlight={highlight}
        />
      </Modal>
    </div>
  )
}

StaticsEdit.propTypes = {}

StaticsEdit.defaultProps = {}

export default StaticsEdit
