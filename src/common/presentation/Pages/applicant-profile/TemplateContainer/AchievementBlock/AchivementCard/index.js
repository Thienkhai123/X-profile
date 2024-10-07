import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
import moment from 'moment'
import useOnClickOutside from 'common/hooks/useClickOutSide'

const AchievementCard = (props) => {
  const {
    imageId,
    value,
    group,
    achivementImages,
    handleRemoveAchievementItem,
    handleSelectedItem,
    showEditTool = true
  } = props
  const { title, time, content } = value || {}
  const menuActionRef = useRef(null)
  const [avatar, setAvatar] = useState(null)
  const [menuAction, toogleMenuAction] = useState(false)
  const handleCloseMenuAction = () => toogleMenuAction(false)

  useEffect(() => {
    if (imageId === 0) {
      setAvatar('/images/default-achievement.png')
    } else {
      const { imageUrl } =
        achivementImages?.find((img) => img.imageId === imageId) || {}
      setAvatar(imageUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useOnClickOutside(menuActionRef, handleCloseMenuAction)

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="flex flex-col items-center justify-center sm:max-w-[143px] max-w-[244px]">
        {showEditTool && (
          <div
            onClick={() => {
              toogleMenuAction(!menuAction)
            }}
            className="absolute sm:hidden right-0 top-0"
          >
            <XProfileIcon name="menuDot" />
          </div>
        )}

        {menuAction && (
          <div
            ref={menuActionRef}
            className="absolute right-1 z-30 top-5 bg-white border border-grey-3 rounded-lg w-[120px] p-2"
          >
            <div className="sm:hidden flex flex-col items-center gap-4">
              <div
                className="cursor-pointer flex items-center gap-2 px-4 py-2"
                onClick={() => handleSelectedItem(group)}
              >
                <XProfileIcon name="pen" />
                <p className="text-p16">Sửa</p>
              </div>
              <div
                className="cursor-pointer flex items-center gap-2 px-4 py-2"
                onClick={() => handleRemoveAchievementItem(group)}
              >
                <XProfileIcon name="trash" />
                <p className="text-p16">Xoá</p>
              </div>
            </div>
          </div>
        )}
        <Image
          alt=""
          src={avatar || '/images/default-achievement.png'}
          width={70}
          height={70}
          objectFit="contain"
          priority={true}
        />
        {/* <p className="text-blue-light text-p16-bold mt-[8px] mb-[4px] text-center line-clamp-1">
        {title}
      </p> */}
        <div className="group relative text-center mt-4">
          <span
            className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 -translate-y-1/2  opacity-0 m-4 mx-auto w-full py-2"
          >
            {title}
          </span>
          <p className="text-p14-bold text-card-title mb-[4px] text-center line-clamp-4 overflow-ellipsis	">
            {title}
          </p>
        </div>
        <p className="text-grey-2 text-p14 text-center">
          {!isNaN(new Date(time).getTime())
            ? moment(new Date(time)).format('MM/YYYY')
            : time}
        </p>
        {showEditTool && (
          <div className="sm:flex hidden items-center gap-4 mt-4">
            <div
              className="cursor-careerPath"
              onClick={() => handleSelectedItem(group)}
            >
              <XProfileIcon name="pen" />
            </div>
            <div
              className="cursor-careerPath"
              onClick={() => handleRemoveAchievementItem(group)}
            >
              <XProfileIcon name="trash" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

AchievementCard.propTypes = {
  imageId: PropTypes.number,
  value: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    time: PropTypes.any
  }),
  group: PropTypes.any,
  achivementImages: PropTypes.array,
  handleRemoveAchievementItem: PropTypes.func,
  handleSelectedItem: PropTypes.func
}
AchievementCard.defaultProps = {
  imageId: 0,
  value: {},
  group: null,
  achivementImages: [],
  handleRemoveAchievementItem: () => {},
  handleSelectedItem: () => {}
}

export default AchievementCard
