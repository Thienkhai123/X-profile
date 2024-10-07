import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import XProfileIcon from 'common/presentation/Icons'
import dynamic from 'next/dynamic'
import { useDispatch } from 'react-redux'
import {
  removeImagesEdit,
  updateImagesEdit
} from 'store/app/edit-mode-company/profile/informationSlice'
import PropressBar from 'common/presentation/ProgressBar'

const InformationImageEditModal = (props) => {
  const {
    listImages,
    handleUploadImages = () => {},
    setEditImage = () => {},
    persent = 0,
    checkUpload
  } = props
  const [listImagesDnd, setListImagesDnd] = useState([])
  const dispatch = useDispatch()
  const DragDropContext = dynamic(
    () => import('react-beautiful-dnd').then((mod) => mod.DragDropContext),
    { ssr: false }
  )
  const Droppable = dynamic(
    () => import('react-beautiful-dnd').then((mod) => mod.Droppable),
    { ssr: false }
  )
  const Draggable = dynamic(
    () => import('react-beautiful-dnd').then((mod) => mod.Draggable),
    { ssr: false }
  )
  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const getItemStyle = (isDragging) => ({
    // change background colour if dragging
    background: isDragging ? '#FBECCA' : '#ECEEF0'
  })
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(
      listImagesDnd,
      result.source.index,
      result.destination.index
    )
    const dragItemIds = items.map((el) => el.position)
    const currentIds = listImagesDnd.map((el) => el.position)

    if (dragItemIds.toString() !== currentIds.toString()) {
      let clone = []
      for (let i = 0; i < items.length; i++) {
        let cloneItem = { ...items[i] }
        cloneItem.position = i + 1
        clone.push(cloneItem)
      }

      setListImagesDnd(clone)
      // sortBlockPosition(items)
    }
  }
  const handleChangeRemove = (index) => {
    dispatch(removeImagesEdit({ id: index }))
  }
  const handleSaveImages = () => {
    let clone = []
    for (let i = 0; i < listImagesDnd.length; i++) {
      let cloneItem = { ...listImagesDnd[i] }
      cloneItem.position = i + 1
      clone.push(cloneItem)
    }
    dispatch(updateImagesEdit(clone))
    setEditImage(false)
  }

  useEffect(() => {
    setListImagesDnd(listImages)
    return () => {}
  }, [listImages])

  return (
    <div className="">
      <div className="py-3 px-6 flex justify-end items-center  group border-b">
        <div
          onClick={() => handleSaveImages()}
          className="gap-2 rounded-lg hover:bg-button flex p-2 cursor-pointer"
        >
          <XProfileIcon name="save" />
          <p className="">Lưu</p>
        </div>
      </div>
      <div className="p-6 max-h-[312px] overflow-y-scroll">
        <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
          <Droppable
            droppableId="droppable"
            // isDropDisabled={editingBlockIds.length > 0}
            style={{ padding: 0 }}
          >
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {listImagesDnd.map((img, index) => {
                  const { image } = img || {}
                  const { imageUrl, position } = image || {}

                  return (
                    <Draggable
                      key={`item-${position}${index}`}
                      draggableId={`item-${position}${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          // className={`${!block?.isActive && 'hidden'} mb-6`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div
                            key={index}
                            className="p-4 bg-white flex items-center justify-between border-b last:border-none hover:bg-grey-4 transition-all rounded-lg cursor-pointer"
                          >
                            <div className="relative w-[150px] h-[100px] rounded-lg border">
                              <Image
                                src={imageUrl}
                                alt=""
                                layout="fill"
                                objectFit="contain"
                              />
                            </div>
                            <div>
                              <div
                                onClick={() => handleChangeRemove(index)}
                                className="gap-2 rounded-lg  hover:bg-white flex p-2"
                              >
                                <XProfileIcon name="trash" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <input
        id="input-list-img"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          handleUploadImages(e.target.files)
        }}
      />

      <label
        htmlFor="input-list-img"
        className="block p-6 border-t hover:bg-blue-light group transition-all rounded-b-lg cursor-pointer mb-[16px]"
      >
        <p className="group-hover:text-white">Upload File</p>
      </label>
      {checkUpload && persent <= 100 && (
        <div className="w-full">
          <PropressBar
            background="bg-[#ECB14E]"
            backgroundOut="bg-[#E6E6E6]"
            type={1}
            skillMatchingPercentage={persent}
            percentValue={100}
          />
        </div>
      )}
    </div>
  )
}

InformationImageEditModal.propTypes = {
  title: PropTypes.string,
  width: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
InformationImageEditModal.defaultProps = {
  title: 'Số năm thành lập',
  width: 'xl:w-[270px] w-[162px]',
  description: '10 năm'
}

export default InformationImageEditModal
