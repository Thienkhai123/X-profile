import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import XProfileIcon from 'common/presentation/Icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  addItemList,
  getAllWorkingDays,
  getWorkingDayImages,
  removeItem,
  selectItemList,
  selectLogoList,
  selectProfileEdit,
  updateItemList,
  updateworkingDayCaption
} from 'store/app/edit-mode-company/profile/workDaySlice'
import Modal from 'common/presentation/Modal'
import WorkDayEditDND from '../workDayEditDND'
import { useRouter } from 'next/router'
import WorkDayEditSlider from '../WorkDayEditSlider'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import useModal from 'common/hooks/useModal'
import PositionWorkingDayEditModal from '../positionWorkingDayEditModal'
import ModalWorkingDayImage from '../ModalWorkingDayImage'

const WorkDayEdit = (props) => {
  const {
    title,
    description,
    titleAdd,
    isEdit = false,
    errors = null,
    handleResetErrors = () => {},
    setErrors
  } = props

  const compareSortArray = (objectFirst, objectSecond) => {
    return objectFirst.position - objectSecond.position
  }
  // const [isEdit, setIsEdit] = useState(false)
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState({
    length: 0,
    forcus: false
  })

  const dispatch = useDispatch()
  const router = useRouter()

  const saveWorkingDayRef = useRef(null)

  // const [itemList, setList] = useState()

  const [open, toggleModal] = useModal()
  const [open1, toggleModalImage] = useModal()
  const [adding, setAdding] = useState(false)
  const itemList = useSelector(selectItemList)
  const logoList = useSelector(selectLogoList)
  const profile = useSelector(selectProfileEdit)
  // const workingDayCaption = useSelector(selectworkingDayCaption)

  const { companyId } = router.query

  const onChange = (data, id) => {
    dispatch(updateItemList(data))
    handleResetErrors(id)
  }

  const handleAdd = () => {
    const arraySort = [...itemList].sort(compareSortArray)
    const item = {
      imageUrl: '',
      title: '',
      description: '',
      position:
        arraySort.length !== 0
          ? arraySort[arraySort.length - 1].position + 1
          : 0,
      imageId: 0
    }
    dispatch(addItemList(item))
    setAdding(true)
    handleResetErrors('workingDayList')
  }

  const handleDelete = async (id) => {
    await dispatch(removeItem(id))
    setErrors(null)
  }

  const handlSaveEdit = async () => {
    setAdding(false)
  }

  const errorsList = []
  const errorsArray = Object.values(errors || {}) || []
  if (errorsArray?.length > 0) {
    errorsArray?.forEach((elm) => {
      if (elm.id !== '') {
        errorsList.push(elm.id)
      }
    })
  }

  useOnClickOutside(saveWorkingDayRef, handlSaveEdit)

  useEffect(() => {
    if (companyId) {
      dispatch(getAllWorkingDays({ id: companyId }))
      dispatch(getWorkingDayImages())
    }
  }, [dispatch, companyId])

  return (
    <div ref={saveWorkingDayRef}>
      <div className="bg-stoke xl:pt-[88px]  py-[5.5rem] xl:relative">
        <div className=" bg-no-repeat bg-center h-full  lg:bg-[length:100%_100%] bg-cover">
          <div className="flex justify-center items-center h-full">
            <div className="w-full">
              <div className="xl:mb-[24px] mb-[8px]">
                <div className="flex justify-center">
                  <div className="text-center xl:mb-4 mb-[12px] max-w-[650px]  sm:px-0 px-4">
                    <p className="xl:text-h2 text-p20-bold">{title}</p>
                  </div>
                </div>
                <div id="WorkingDayCaption" className="flex justify-center">
                  {isEdit ? (
                    <div className=" px-[16px] xl:px-0 xl:w-[1140px] w-full">
                      <input
                        className={`focus:border-b-[1px]  hover:border-b transition-all outline-none appearance-none py-[8px] placeholder:text-grey-3  text-center focus:outline-none bg-inherit w-full xl:text-p18 text-p12 font-normal text-grey-1
                        ${
                          errors?.WorkingDayCaption
                            ? 'border-b border-semantic-red'
                            : 'border-b border-transparent hover:border-semantic focus:border-semantic'
                        }`}
                        placeholder={description}
                        defaultValue={profile?.meta?.workingDayCaption}
                        maxLength={100}
                        onChange={(e) => {
                          setInput({
                            ...input,
                            length: e.target.value.length
                          })
                          handleResetErrors('WorkingDayCaption')
                          dispatch(updateworkingDayCaption(e.target.value))
                        }}
                        onFocus={(e) => {
                          setInput({
                            length: e.target.value.length,
                            forcus: true
                          })
                        }}
                        onBlur={() =>
                          setInput({
                            forcus: false
                          })
                        }
                      />
                      <div className="flex items-center justify-end">
                        {errors?.WorkingDayCaption && (
                          <p className="text-end text-p16 text-semantic-red leading-[28px]">
                            Không được bỏ trống
                          </p>
                        )}
                        {input.forcus && !errors?.WorkingDayCaption && (
                          <p className="text-end xl:text-p14 text-p12 text-grey-2">
                            {100 - input.length}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-center bg-inherit w-full xl:text-p18 text-p12 py-[8px] font-normal text-grey-1">
                      {profile?.meta?.workingDayCaption}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                {isEdit && (
                  <div className="w-full xl:w-[1140px] flex items-center justify-end gap-[20px]">
                    <button
                      onClick={() => {
                        handleAdd()
                      }}
                      className="w-auto flex items-center gap-[20px]  py-[12px]"
                    >
                      <div>
                        <XProfileIcon name="add" stroke="#294F9B" />
                      </div>
                      <p className="text-end text-button-2 xl:text-p18-bold text-p14-bold">
                        {titleAdd}
                      </p>
                    </button>
                  </div>
                )}
              </div>
              {/* <div className="flex items-center xl:gap-32 gap-[20px]"> */}
              <div className="hidden   w-auto xl:block ">
                <div className="absolute -bottom-[6px] ">
                  <Image
                    src={'/images/bearBossBackground.png'}
                    width={335.76}
                    height={326}
                    alt=""
                    quality={100}
                    objectFit="contain"
                  />
                </div>
              </div>
              <div className="flex justify-center ">
                <div className="">
                  <p
                    id="workingDayList"
                    className="text-p16 text-semantic-red h-[24px]"
                  >
                    {errors?.workingDayList &&
                      'Bạn phải thêm ít nhất ba buổi làm việc'}
                  </p>
                  {isEdit ? (
                    <WorkDayEditDND
                      itemList={itemList}
                      handleDelete={handleDelete}
                      isEdit={isEdit}
                      onChange={onChange}
                      setIndex={setIndex}
                      toggleModalImage={toggleModalImage}
                      autofocus={adding}
                      errors={errors}
                      errorsList={errorsList || []}
                    />
                  ) : (
                    <WorkDayEditSlider itemList={itemList} isEdit={isEdit} />
                  )}
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>

      <Modal
        childStyle="w-fit h-fit  mt-4 shadow-md p-4 bg-white rounded-lg"
        toggleModal={toggleModal}
        open={open}
      >
        <PositionWorkingDayEditModal
          toggleModal={toggleModal}
          handlSaveEdit={handlSaveEdit}
          handleDelete={handleDelete}
        />
      </Modal>
      <Modal
        toggleModal={toggleModalImage}
        open={open1}
        title="Chọn ảnh từ thư viện"
        styleTitle="text-p28-bold text-black"
        // modalStyle="w-[100vw] h-[100vh] p-2  px-[20px] flex justify-center items-start fixed bg-black/30 z-[200] left-[calc(0%)] top-[calc(0%)] z-[9999]"
        // childStyle="w-screen h-fit sm:w-[600px] mt-4 shadow-md p-4 bg-white rounded-lg max-h-[85vh] min-h-[50vh] overflow-y-scroll custom-scrollbar absolute top-1/3"
      >
        <ModalWorkingDayImage
          index={index}
          logoList={logoList}
          onChange={onChange}
          toggleModalImage={toggleModalImage}
        />
      </Modal>
    </div>
  )
}
WorkDayEdit.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  workingDays: PropTypes.array,
  titleAdd: PropTypes.string
}
WorkDayEdit.defaultProps = {
  title: 'Một ngày làm việc tại công ty',
  description:
    'Nhập mô tả tổng quan về môi trường làm việc mà doanh nghiệp của bạn mang đến cho nhân viên, giới hạn 100 chữ',
  workingDays: [],
  titleAdd: 'Thêm buổi làm việc'
}

export default WorkDayEdit
