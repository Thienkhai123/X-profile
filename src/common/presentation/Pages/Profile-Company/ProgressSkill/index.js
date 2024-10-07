import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { selectUserProfile } from 'store/app/userSlice'

const ProgressSkill = (props) => {
  const { percentValue, userPercent, showUserScore } = props
  const userProfile = useSelector(selectUserProfile)
  const { avatarUrl, setting } = userProfile || {}
  const { characterId } = setting || {}
  const renderColorSkill = (percentValue) => {
    if (percentValue <= 30) {
      return 'pink-dark'
    } else if (percentValue <= 60) {
      return 'button'
    } else {
      return 'button-2'
    }
  }
  return (
    <div className="relative w-full h-2  bg-white rounded-full transition-all   flex items-center">
      {showUserScore && userPercent > 0 && (
        <div
          style={{ width: `${userPercent}%` }}
          className="absolute z-20 top-0 left-0 flex items-center transition-all"
        >
          <div
            className={`w-full bg-transparent transition-all text-p16  text-neutral text-center p-1  rounded-full `}
          ></div>
          <div className="absolute -right-2 ">
            <div
              className={` cursor-pointer  min-w-[15px] min-h-[15px] rounded-full bg-${renderColorSkill(
                userPercent
              )} flex items-center justify-center`}
            >
              <div className="min-w-[7px] min-h-[7px] rounded-full bg-white"></div>
              <div className="absolute -top-11 -right-2">
                <div className="relative w-[33.333px] h-10">
                  <Image
                    src={'/images/Union.svg'}
                    layout="fill"
                    objectFit="contain"
                    alt=""
                  />
                  <div className="absolute top-[5px] left-[5px] bg-white w-6 h-6 rounded-full overflow-hidden border border-grey-4">
                    <Image
                      src={
                        avatarUrl !== null && avatarUrl !== ''
                          ? avatarUrl
                          : parseInt(characterId) === 0
                          ? '/images/DefaultAvatarCuu.png'
                          : parseInt(characterId) === 1
                          ? '/images/DefaultAvatarChuot.png'
                          : parseInt(characterId) === 2
                          ? '/images/DefaultAvatarGau.png'
                          : '/images/DefaultAvatarCuu.png'
                      }
                      alt="avatar-user"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className={` bg-${renderColorSkill(
          percentValue
        )} transition-all text-p16  text-neutral text-center p-1 relative rounded-full `}
        style={{ width: `${percentValue}%` }}
      >
        {/* <div className="absolute group -right-2 -top-[34px] flex flex-col gap-1 items-center">
          <p
            className={`text-p14-bold  ${
              characterId === 0 ? 'text-pink-dark' : 'text-button'
            }`}
          >{`${percentValue}%`}</p>
          
        </div> */}
      </div>
    </div>
  )
}

ProgressSkill.propTypes = {
  type: PropTypes.string,
  background: PropTypes.string,
  percentValue: PropTypes.number,
  height: PropTypes.string,
  width: PropTypes.string
}
ProgressSkill.defaultProps = {
  percentValue: 100
}

export default ProgressSkill
