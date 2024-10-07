import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import {
  selectItemList,
  updatePosition
} from 'store/app/edit-mode-company/profile/workDaySlice'
import { useDispatch } from 'react-redux'
import dynamic from 'next/dynamic'
import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'

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

const getListStyle = (isDraggingOver) => ({
  opacity: isDraggingOver ? '0.8' : '1'
})

const PositionWorkingDayEditModal = (props) => {
  const { toggleModal = () => {}, handleDelete = () => {} } = props
  const itemList = useSelector(selectItemList)

  const dispatch = useDispatch()

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(
      itemList,
      result.source.index,
      result.destination.index
    )
    const dragItemIds = items.map((el) => el.position)
    const currentIds = itemList.map((el) => el.position)

    if (dragItemIds.toString() !== currentIds.toString()) {
      let clone = []
      for (let i = 0; i < items.length; i++) {
        let cloneItem = { ...items[i] }
        cloneItem.position = i + 1
        clone.push(cloneItem)
      }
      dispatch(updatePosition(clone))
    }
  }

  return (
    <div className="w-[700px] p-[20px]">
      <div className="grid gap-[12px] h-[400px] overflow-y-hidden">
        <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                className="flex flex-col gap-[20px] overflow-auto"
              >
                {itemList.map((workingDay, ind) => {
                  return (
                    <Draggable
                      key={`item-${workingDay?.position}${ind}`}
                      draggableId={`item--${workingDay?.position}${ind}`}
                      index={ind}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div
                            key={ind}
                            className="flex bg-white  justify-between border-b-[1px] gap-[20px]"
                          >
                            <div className="flex  bg-white justify-start gap-[20px]">
                              <div>
                                <Image
                                  width={74}
                                  height={74}
                                  src={
                                    workingDay.imageUrl
                                      ? workingDay?.imageUrl
                                      : '/images/uploadAvatarEdit.png'
                                  }
                                  alt=""
                                  objectFit="cover"
                                />
                              </div>
                              <div>
                                <p
                                  className={`xl:text-p20-bold text-p16-bold ${
                                    workingDay?.title
                                      ? 'text-neutral'
                                      : 'text-grey-2'
                                  }`}
                                >
                                  {workingDay?.title
                                    ? workingDay?.title
                                    : 'Buổi làm việc chưa được cập nhật'}
                                </p>
                                <p
                                  className={`xl:text-p18 font-normal  text-p12 ${
                                    workingDay?.description
                                      ? 'text-grey-1'
                                      : 'text-grey-3'
                                  }`}
                                >
                                  {workingDay?.description
                                    ? workingDay?.description
                                    : 'Mô tả ngắn chưa được cập nhật'}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-[12px] items-center  top-[12px] right-[12px]">
                              <button onClick={() => handleDelete({ id: ind })}>
                                <XProfileIcon name="trash" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  )
                })}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="flex justify-end">
        <Button
          title="Cập nhật"
          width="w-[120px]"
          rounded="rounded-[4px]"
          onClick={() => {
            toggleModal()
          }}
        />
      </div>
    </div>
  )
}

PositionWorkingDayEditModal.propTypes = {}
PositionWorkingDayEditModal.defaultProps = {}

export default PositionWorkingDayEditModal
