import React from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectReviewEdit,
  updateComment
} from 'store/app/edit-mode-company/department/reviewSlice'
import Image from 'next/image'
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

const ReviewSortPositionModal = (props) => {
  const { toggleModal = () => {}, handleDelete = () => {} } = props

  const dispatch = useDispatch()
  const comments = useSelector(selectReviewEdit)

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
      comments,
      result.source.index,
      result.destination.index
    )
    const dragItemIds = items.map((el) => el.position)
    const currentIds = comments.map((el) => el.position)

    if (dragItemIds.toString() !== currentIds.toString()) {
      let clone = []
      for (let i = 0; i < items.length; i++) {
        let cloneItem = { ...items[i] }
        cloneItem.position = i + 1
        clone.push(cloneItem)
      }
      dispatch(updateComment(clone))
    }
  }

  return (
    <div className="p-[20px] xl:w-[700px] w-auto">
      <div className="grid gap-[12px] xl:h-[400px] h-auto overflow-y-hidden">
        <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                className="flex flex-col gap-[20px] overflow-auto"
              >
                {comments.map((comment, ind) => {
                  return (
                    <Draggable
                      key={`item-${comment?.position}${ind}`}
                      draggableId={`item--${comment?.position}${ind}`}
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
                            className="flex  bg-white justify-between border-b-[1px] gap-[20px]"
                          >
                            <div className="flex  bg-white justify-start gap-[20px]">
                              <div>
                                <div className="rounded-full bg-white">
                                  <Image
                                    src={
                                      comment?.avatarUrl
                                        ? comment?.avatarUrl
                                        : '/images/uploadAvatarEdit.png'
                                    }
                                    height={60}
                                    width={60}
                                    objectFit="contain"
                                    alt=""
                                    quality={100}
                                    className="rounded-full"
                                  />
                                </div>
                              </div>
                              <div className="w-auto">
                                <p
                                  className={`bg-inherit mb-[8px] w-full sm:text-p20-bold text-p18-bold ${
                                    comment?.name
                                      ? ' text-blue-light'
                                      : 'text-grey-1'
                                  }`}
                                >
                                  {comment?.name
                                    ? comment?.name
                                    : 'Chưa có tên'}
                                </p>
                                <p
                                  className={` w-full sm:text-p16 text-p14  bg-inherit ${
                                    comment?.description
                                      ? 'text-neutral'
                                      : 'text-grey-2'
                                  }`}
                                >
                                  {comment?.description
                                    ? comment?.description
                                    : 'Chưa có thông tin'}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-[12px] items-center  top-[12px] right-[12px]">
                              <button onClick={() => handleDelete(ind)}>
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
      <div className=" flex justify-end">
        <Button
          title="Cập nhật"
          width="w-[120px]"
          //   height="h-[52px]"
          rounded="rounded-[4px]"
          onClick={() => {
            toggleModal()
          }}
        />
      </div>
    </div>
  )
}

ReviewSortPositionModal.propTypes = {}
ReviewSortPositionModal.defaultPops = {}

export default ReviewSortPositionModal
