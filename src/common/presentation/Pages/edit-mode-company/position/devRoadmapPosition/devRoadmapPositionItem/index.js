import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import XProfileIcon from 'common/presentation/Icons'

const DevRoadmapPositionItem = (props) => {
  const {
    avatarUrl = '/images/uploadAvatarEdit.png',
    name,
    onChangeEdit = () => {},
    positionList,
    toggleModal = () => {},
    handleRemoveItem = () => {},
    index,
    imageUrl,
    number,
    tag,
    isErrorsName,
    isErrorsImageUrl
  } = props

  return (
    <div className="w-full xl:h-auto flex items-center gap-6">
      <div className="flex w-full flex-col justify-center items-center gap-[20px] h-full">
        {!imageUrl ? (
          <>
            <button
              className="opacity-0 h-0"
              id={`roadMap_imageUrl_${index}`}
            />
            <div className="border xl:w-[280px] xl:h-[280px] group flex flex-col border-dashed rounded-lg border-grey-2 items-center justify-center">
              <div className="absolute p-2 right-10 top-0 z-10 flex items-center justify-center rounded-full transition-all ease-out duration-700 bg-white shadow opacity-0 group-hover:opacity-100">
                <div
                  onClick={() => handleRemoveItem(index)}
                  className="gap-2 rounded-full w-[44px] h-[44px] hover:bg-button flex items-center justify-center p-2 cursor-pointer"
                >
                  <XProfileIcon name="trash" stroke="#000000" />
                </div>
              </div>
              <div
                onClick={() => toggleModal(parseInt(index))}
                className=" flex justify-center items-center cursor-pointer "
              >
                <Image
                  src={'/images/Upload.png'}
                  height={100}
                  width={100}
                  objectFit="contain"
                  alt=""
                  quality={100}
                />
              </div>
              <p className=" text-center text-button text-p16 mt-3">
                Chọn hình minh họa
              </p>
            </div>
            {(isErrorsImageUrl || isErrorsName) && (
              <p className="text-p16 text-center leading-[28px] text-semantic-red ">
                Không được bỏ trống
              </p>
            )}
          </>
        ) : (
          <div className=" w-[224px] h-[280px]  relative group">
            <div className="absolute p-2 right-0 top-0 z-10 flex items-center justify-center rounded-full transition-all ease-out duration-400 bg-white shadow opacity-0 group-hover:opacity-100">
              <div
                onClick={() => toggleModal(parseInt(index))}
                className="gap-2 rounded-full w-[44px] h-[44px]  hover:bg-button flex items-center justify-center p-2 cursor-pointer"
              >
                <XProfileIcon name="pen" />
              </div>
              <div
                onClick={() => handleRemoveItem(index)}
                className="gap-2 rounded-full w-[44px] h-[44px] hover:bg-button flex items-center justify-center p-2 cursor-pointer"
              >
                <XProfileIcon name="trash" stroke="#000000" />
              </div>
            </div>
            <div>
              <Image
                src={imageUrl}
                layout="fill"
                objectFit="contain"
                alt=""
                quality={100}
              />
            </div>
            <p
              style={{
                wordBreak: 'break-word'
              }}
              className="absolute m-auto top-2/3   left-0 right-0 text-white max-w-[80px]   max-h-[56px]   text-p14-bold bg-inherit  text-center w-auto"
            >
              {name}
            </p>
          </div>
        )}
      </div>

      {index !== number - 1 && tag && (
        <div className="w-[88px] gap-4 flex flex-col items-center justify-center">
          {positionList[index + 1]?.description ? (
            <div className="">
              <p className="w-full text-p18 text-grey-1 text-center">
                {`${positionList[index + 1].description}`}
              </p>
            </div>
          ) : positionList[index + 1]?.totalTime ? (
            positionList[index + 1]?.totalTime !== 0 && (
              <div className="">
                <p className="w-full text-p18 text-grey-1 h-14">
                  {`${positionList[index + 1].totalTime} năm`}
                </p>
              </div>
            )
          ) : (
            <div className="h-14"></div>
          )}
          <div className=" w-[40px] h-[40px] relative">
            <Image
              src={
                parseInt(tag) === 0
                  ? '/images/arrowSystemRoadmap/intern.svg'
                  : parseInt(tag) === 1
                  ? '/images/arrowSystemRoadmap/fresherJunior.svg'
                  : parseInt(tag) === 2
                  ? '/images/arrowSystemRoadmap/midSenior.svg'
                  : '/images/arrowSystemRoadmap/managerLeader.svg'
              }
              layout="fill"
              objectFit="contain"
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  )
}

DevRoadmapPositionItem.propTypes = {}
DevRoadmapPositionItem.defulatProps = {}

export default DevRoadmapPositionItem
