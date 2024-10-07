import React from 'react'
import PropTypes from 'prop-types'
import MessCard from '../MessCard'
import MessAnswer from '../MessAnswer'
import XProfileIcon from 'common/presentation/Icons'
import { Avatar } from 'common/presentation/Avatar'
import Image from 'next/image'

const MessDetail = (props) => {
  const { type, comment } = props
  const { content, avatarUrl, name, description } = comment

  return (
    <div className="relative  xl:w-full bg-white p-5 xl:px-28 xl:pt-[72px] xl:pb-12 shadow-[0px_0px_20px_rgba(0,0,0,0.1)] rounded-xl">
      <div className="hidden xl:block absolute left-10 top-10">
        <Image
          src="/images/comment-left.png"
          width={58.63}
          height={61}
          alt=""
        />
      </div>
      <div className="hidden xl:block absolute right-10 top-10">
        <Image
          src="/images/comment-right.png"
          width={58.63}
          height={61}
          alt=""
        />
      </div>
      <div className="mb-[20px]">
        <p className="sm:text-p18-bold text-p12-bold ">{comment?.quote}</p>
      </div>
      <div
        className="sm:text-p18 text-p12 min-h-[112px]"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      <div className="pt-10 flex justify-between items-center">
        <div className="flex gap-[22px] items-center">
          <Avatar
            avatarUrl={avatarUrl}
            width="w-[120px]"
            height="h-[120px]"
            border="border-[4px] border-stoke"
          />
          <div>
            <p className="sm:text-p20-bold text-p16-bold text-blue-light">
              {name}
            </p>
            <p className="sm:text-p16 text-p12 text-grey-1">{description}</p>
          </div>
        </div>
        <div className="hidden sm:block">
          <XProfileIcon name="answer" width={40} height={36} />
        </div>
        <div className="block sm:hidden">
          <XProfileIcon name="answer" width={24} height={23} />
        </div>
      </div>
    </div>
  )
}

MessDetail.propTypes = { type: PropTypes.number, comment: PropTypes.object }
MessDetail.defaultProps = { type: 0, comment: {} }

export default MessDetail
